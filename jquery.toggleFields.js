'use strict';

var conditionIdentifier = 'data-toggle-condition',
    conditionsIdentifier = 'data-toggle-conditions',
    conditions = $('[' + conditionsIdentifier + ']'),
    helpTextIdentifier = 'form-row__instructions',
    nextFormRowsIdentifier = 'data-toggle-next',
    nextRowReferenceIdentifier = 'data-toggle-ref',
    defaults = {
        initCallback: function initCallback() {},
        destroyCallback: function destroyCallback() {},
        toggleClass: 'js-toggleFields--on',
        toggleOnCallback: function toggleOnCallback() {},
        toggleOffCallback: function toggleOffCallback() {}
    },
    disabledClass = 'disabled',
    disabledAttr = 'disabled',
    targetIdentifier = 'data-toggle-target';

/* 
 * toggleFields
 * Enables logic to show or enable form fields when conditions are met.
 */
function toggleFields() {
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
                nextFormRows = $('[' + nextFormRowsIdentifier + ']'),
                radioNameIdentifier,
                targets,
                wrapper = condition.parents('form');

            // Add an identifier to the condition
            condition.attr(conditionIdentifier, '');

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
            targets = nextFormRows.find('> [' + targetIdentifier + '], > .' + helpTextIdentifier);

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
 * @param {jQueryObject} condition - The trigger for the condition
 * @param {jQueryObject} targets - The form fields to be toggled
 */
function toggleFields__applyToggle(condition, targets) {
    var options = $.extend({}, defaults, options),
        conditionContainer;

    condition = $(condition);
    targets = $(targets);

    // Initially disable all targets
    targets.each(function() {
        var target = $(this),
            container = target.parent('[' + nextFormRowsIdentifier + ']');

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
            // Apply recursion when necessary
            toggleFields__recursive(container);
            // Remove ARIA to the container to convey the enabled state
            targets.removeAttr('aria-label');
            // Call the toggleOffCallback
            options.toggleOffCallback();
        } 
        // If the condition has not been selected
        else {
            // Disable the targets if they have not already been disabled
            if (!target.attr(disabledAttr) || !target.hasClass(disabledClass)) {
                // If the target is an input field
                if (target.is('input') || target.is('select')) {
                    // Add a disabled state
                    target.attr(disabledAttr, disabledAttr);
                }
                // Add a disabled class
                target.addClass(disabledClass);
                // Apply recursive logic
                container.addClass(options.toggleClass);
                // Add ARIA to the container to convey the disabled state
                targets.attr('aria-label', 'Disabled');
                // Call the toggleOnCallback
                options.toggleOnCallback();
            }

            // Apply recursion when necessary
            toggleFields__recursive(container, condition);
        }
    });
}

/*
 * To re-toggle recursive conditions if they have already been met
 * @param {jQueryObject} container - The containing element of the targets
 * @param {jQueryObject} condition - The trigger for the condition before recursion
 */
function toggleFields__recursive(container, condition) {
    var recursiveIdentifer = 'data-toggle-recursive';

    // If the container is recursive
    if (container.is('[' + recursiveIdentifer + ']')) {
        var nextRecursiveContainer = container.next('[' + recursiveIdentifer + ']'),
            nextRecursiveTargets =  nextRecursiveContainer.find('[' + targetIdentifier + '], .' + helpTextIdentifier);

        // If not using the condition before recursion
        if (!condition) {
            // Use the recursive condition
            var condition = container.find('[' + conditionIdentifier + ']');
        }

        // If there are no form fields
        if (nextRecursiveTargets.length === 0) {
            // Set the targets to be the nextFormRow container
            nextRecursiveTargets = nextRecursiveContainer;
        }

        // Re-run the logic if the recursive conditions have already been met
        toggleFields__applyToggle(condition, nextRecursiveTargets);
    }
}

/*
 * Remove any traces of the toggleFields function on the page
 */
function toggleFields__destroy() {


}