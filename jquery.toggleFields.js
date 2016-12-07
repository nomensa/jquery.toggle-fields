/*
 * Toggles an disabled or enabled state on form fields
 *
 * Requires the following DOM attributes:
 * * [data-toggle-conditions="#field-1-with-condition, #field-2-with-condition"] - Required: List of condition IDs, prepended with a hash, comma separated.
 * * [data-toggle-target] - Required: The form field to toggle.
 * * [data-toggle-next] - Optional: The next form row to toggle
 * * [data-toggle-ref="#field-1-with-condition"] - Required if using 'data-toggle-next': Identifies which condition it relates to
*/
'use strict';

var pluginName = 'toggleFields',
    defaults,
    counter = 0,
    conditionsIdentifier = 'data-toggle-conditions',
    conditions = $('[' + conditionsIdentifier + ']'),
    helpTextIdentifier = 'form-row__instructions',
    nextFormRowsIdentifier = '[data-toggle-next]',
    defaults = {
        initCallback: function initCallback() {},
        destroyCallback: function destroyCallback() {},
        toggleClass: 'js-toggleFields--on',
        toggleOnCallback: function toggleOnCallback() {},
        toggleOffCallback: function toggleOffCallback() {}
    },
    disabledClass = 'disabled',
    disabledAttr = 'disabled';

function toggleFields(options) {
    /*
        Constructor function for the toggle fields plugin
    */
    var options = $.extend({}, defaults, options);

    if (conditions.length !== 0) {
        var conditionValues = conditions.attr(conditionsIdentifier),
            conditionTargets = $(conditionValues);

        // Init callback
        options.initCallback();

        // For each condition
        conditionTargets.each(function() {
            var condition = $(this),
                fieldToWatch,
                nextFormRows = $(nextFormRowsIdentifier),
                nextRowReferenceIdentifier = 'data-toggle-ref',
                radioNameIdentifier,
                targets,
                wrapper = condition.parents('form');

            // If specified next form row
            if (nextFormRows.length !== 0) {
                // Only match next rows for the condition
                nextFormRows = nextFormRows.filter('[' + nextRowReferenceIdentifier + '="' + condition.attr('id') + '"]');
            } else {
                // Otherwise we assume the target is the next form row
                nextFormRows = condition.parents().next();
                // Add the nextFormRowsIdentifier
                nextFormRows.attr(nextFormRowsIdentifier, '');
            }

            // Get all target fields from the row
            targets = nextFormRows.find('[data-toggle-target], .' + helpTextIdentifier);

            // If there are no form fields
            if (targets.length === 0) {
                // Set the targets to be the nextFormRow containers
                targets = nextFormRows;
            }

            // Init toggle
            toggleFields__applyToggle(condition, targets);

            // If the condition is an option in a select box
            if (condition.is('option')) {
                // The field to watch is the select box
                fieldToWatch = condition.parents('select');
            }
            // If the condition is a radio button
            else if (condition.is(':radio')) {
                radioNameIdentifier = condition.attr('name');
                // The field to watch needs to be aware of the group of radio buttons
                fieldToWatch = condition.parents().find('[name^="' + radioNameIdentifier + '"]');
            } else {
                // Otherwise the field should be the element with the condition identifier
                fieldToWatch = condition;
            }

            // Target the on change
            fieldToWatch.on('change', function() {
                // Update toggle
                toggleFields__applyToggle(condition, targets);
            });
        });
    }
}

/*
 * Handles the disabled and enabled states
 */
function toggleFields__applyToggle(condition, targets) {
    var options = $.extend({}, defaults, options);

    condition = $(condition);
    targets = $(targets);

    // Initially disable all targets
    targets.each(function() {
        var target = $(this),
            container = target.parents(nextFormRowsIdentifier);

        // If the condition has been selected
        if (condition.is(':selected') || condition.is(':checked')) {
            // If the target is an input field
            if (target.is('input') || target.is('select')) {
                // Remove the disable state
                target.removeAttr(disabledAttr);
            }
            // Remove the disabled class to the target
            target.removeClass(disabledClass);
            // Remove toggle class to the container
            container.removeClass(options.toggleClass);
            // Call the toggleOffCallback
            options.toggleOffCallback();
        } else {
            // Disable the targets if they have not already been disabled
            if (!target.attr(disabledAttr) || !target.hasClass(disabledClass)) {
                // If the target is an input field
                if (target.is('input') || target.is('select')) {
                    // Add a disabled state
                    target.attr(disabledAttr, disabledAttr);
                }
                // Add a disabled class
                target.addClass(disabledClass);
            }

            // Apply toggle class to the container
            container.addClass(options.toggleClass);
            // Call the toggleOnCallback
            options.toggleOnCallback();
        }
    });
}