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
    defaults = {
        initCallback: function() {},
        destroyCallback: function() {}
    },
    disabledClass = 'disabled',
    disabledAttr = 'disabled';

function toggleFields(options) {
    /*
        Constructor function for the toggle fields plugin
    */
    var options = $.extend({}, defaults, options);

    if (conditions.length !== 0) {
        var conditionTargets = $(conditions.attr(conditionsIdentifier));

        // Init callback
        options.initCallback();

        // For each condition
        conditionTargets.each(function() {
            var condition = $(this),
                targets,
                fieldToWatch,
                radioNameIdentifier,
                nextFormRows = $('[data-toggle-next]'),
                nextRowReferenceIdentifier = 'data-toggle-ref';

            // If specified next form row
            if (nextFormRows.length !== 0) {
                // Only match next rows for the condition
                nextFormRows = nextFormRows.filter('[' + nextRowReferenceIdentifier + '="' + condition.attr('id') + '"]');
                targets = nextFormRows;
            } else {
                // Otherwise we assume the target is the next form row
                targets = condition.parents().next();
            }

            // Get all input fields and labels from the row
            targets = targets.find('[data-toggle-target], .' + helpTextIdentifier);

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
                fieldToWatch = $('[name^="' + radioNameIdentifier + '"]');
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
    condition = $(condition);
    targets = $(targets);

    // Initially disable all targets
    targets.each(function() {
        var target = $(this);

        // If the condition has been selected
        if (condition.is(':selected') || condition.is(':checked')) {
            // Enabled the targets
            if (target.is('label') || target.is('.' + helpTextIdentifier)) {
                // Remove the disabled class
                target.removeClass(disabledClass);
            }
            // If the target is an input field
            else if (target.is('input') || target.is('select')) {
                // Remove the disable state
                target.removeAttr(disabledAttr);
                target.removeClass(disabledClass);
            }
        } else {
            // Disable the targets if they have not already been disabled
            if (!target.attr(disabledAttr) || !target.hasClass(disabledClass)) {
                // If the target is a label
                if (target.is('label') || target.is('.' + helpTextIdentifier)) {
                    // Add a disabled class
                    target.addClass(disabledClass);
                }
                // If the target is an input field
                else if (target.is('input') || target.is('select')) {
                    // Add a disabled state
                    target.attr(disabledAttr, disabledAttr);
                    target.addClass(disabledClass);
                }
            }
        }
    });
}

/*
 * Removes reference of the condition
 */
function toggleFields__destroy(conditions) {

    conditions.each(function() {
        var condition = $(this),
            targets = condition.find('[data-toggle-target], .' + helpTextIdentifier);

        // Destroy callback
        options.destroyCallback();

        // Remove the disable state
        targets.removeAttr(disabledAttr);
        targets.removeClass(disabledClass);
    });
}

$.fn[pluginName] = function (options) {
/*
    Guards against multiple instantiations
*/
    return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName, new ShowHide(this, options));
        }
    });
};