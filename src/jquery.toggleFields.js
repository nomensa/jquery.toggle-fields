/*
*  jquery.toggleFields.js
*  Providing the ability to show and hide form fields
*
*  Made by Nomensa
*  Under MIT License
*/
;(function($, window, document, undefined) {
    'use strict';

    // Create the defaults once
    var pluginName = 'toggleFields',
        defaults = {
            // Used on attributes added by the plugin
            namespace: 'toggle-fields',
            conditionIdentifier: 'data-toggle-condition',
            conditionsIdentifier: 'data-toggle-conditions',
            disabledClass: 'disabled',
            disabledAttr: 'disabled',
            helpTextIdentifier: 'form-row__instructions',
            nextFormRowsIdentifier: 'data-toggle-next',
            nextRowReferenceIdentifier: 'data-toggle-ref',
            targetIdentifier: 'data-toggle-target',
            toggleClass: 'js-toggleFields--on',
            initCallback: function initCallback() {},
            toggleOnCallback: function toggleOnCallback() {},
            toggleOffCallback: function toggleOffCallback() {},
            destroyCallback: function destroyCallback() {}
        };

    // The plugin constructor
    function ToggleFields(element, options) {
        // The form element
        this.element = $(element);
        // Extending the options
        this.settings = $.extend({}, defaults, options);
        // Store the plugin name
        this.name = pluginName;
        // Store the fields watched for changes
        this.fieldsToWatch = [];

        // Initialise plugin
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(ToggleFields.prototype, {

        init: function() {
            var self = this,
                conditions = self.element.find('[' + self.settings.conditionsIdentifier + ']');

            if (conditions.length !== 0) {
                var conditionValues = conditions.attr(self.settings.conditionsIdentifier),
                    conditionTargets = self.element.find(conditionValues);

                // Init callback
                self.settings.initCallback();

                // For each condition
                conditionTargets.each(function() {
                    var condition = self.element.find(this),
                        fieldToWatch,
                        nextFormRows = self.element.find('[' + self.settings.nextFormRowsIdentifier + ']'),
                        radioNameIdentifier,
                        targets,
                        wrapper = condition.parents('form');

                    // Add an identifier to the condition
                    condition.attr(self.settings.conditionIdentifier, '');

                    // If specified next form row
                    if (nextFormRows.length !== 0) {
                        // Only match next rows for the condition
                        nextFormRows = nextFormRows.filter('[' + self.settings.nextRowReferenceIdentifier + '="' + condition.attr('id') + '"]');
                    } else {
                        // Otherwise we assume the target is the next form row
                        nextFormRows = condition.parents().next();
                        // Add the nextFormRowsIdentifier as an attribute
                        nextFormRows.attr(self.settings.nextFormRowsIdentifier, '');
                    }

                    // Get all target fields from the row
                    targets = nextFormRows.find('> [' + self.settings.targetIdentifier + '], > .' + self.settings.helpTextIdentifier);

                    // If there are no form fields
                    if (targets.length === 0) {
                        // Set the targets to be the nextFormRow containers
                        targets = nextFormRows;
                    }

                    // Init toggle
                    self.applyToggle(self, condition, targets);

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

                    // Store the fields to watch for later
                    self.fieldsToWatch.push(fieldToWatch);

                    // Target the on change
                    fieldToWatch.on('change', function() {
                        // Update toggle
                        self.applyToggle(self, condition, targets);
                    });
                });
            }
        },
        applyToggle: function(self, condition, targets) {
            /*
             * Handles the disabled and enabled states
             * @param {object} Plugin instance
             * @param {jQueryObject} condition - The trigger for the condition
             * @param {jQueryObject} targets - The form fields to be toggled
             */
            var conditionContainer;

            condition = self.element.find(condition);
            targets = self.element.find(targets);

            // Initially disable all targets
            targets.each(function() {
                var target = $(this),
                    container = target.parent('[' + self.settings.nextFormRowsIdentifier + ']');

                // If the condition has been selected
                if (condition.is(':selected') || condition.is(':checked')) {

                    // If the target is an input field
                    if (target.is('input') || target.is('select')) {
                        // Remove the disable state
                        target.removeAttr(self.settings.disabledAttr);
                    }
                    // Remove the disabled class to the target
                    target.removeClass(self.settings.disabledClass);
                    // Remove toggle class to the container
                    container.removeClass(self.settings.toggleClass);
                    // Apply recursion when necessary
                    self.recursive(self, container);
                    // Call the toggleOffCallback
                    self.settings.toggleOffCallback();
                }
                // If the condition has not been selected
                else {
                    // Disable the targets if they have not already been disabled
                    if (!target.attr(self.settings.disabledAttr) || !target.hasClass(self.settings.disabledClass)) {
                        // If the target is an input field
                        if (target.is('input') || target.is('select')) {
                            // Add a disabled state
                            target.attr(self.settings.disabledAttr, self.settings.disabledAttr);
                        }
                        // Add a disabled class
                        target.addClass(self.settings.disabledClass);
                        // Apply recursive logic
                        container.addClass(self.settings.toggleClass);
                        // Call the toggleOnCallback
                        self.settings.toggleOnCallback();
                    }

                    // Apply recursion when necessary
                    self.recursive(self, container, condition);
                }
            });
        },
        recursive: function (self, container, condition) {
            /*
             * To re-toggle recursive conditions if they have already been met
             * @param {object} Plugin instance
             * @param {jQueryObject} container - The containing element of the targets
             * @param {jQueryObject} condition - The trigger for the condition before recursion
             */
            var recursiveIdentifer = 'data-toggle-recursive';

            // If the container is recursive
            if (container.is('[' + recursiveIdentifer + ']')) {
                var nextRecursiveContainer = container.next('[' + recursiveIdentifer + ']'),
                    nextRecursiveTargets =  nextRecursiveContainer.find('[' + self.settings.targetIdentifier + '], .' + self.settings.helpTextIdentifier);

                // If not using the condition before recursion
                if (!condition) {
                    // Use the recursive condition
                    condition = container.find('[' + self.settings.conditionIdentifier + ']');
                }

                // If there are no form fields
                if (nextRecursiveTargets.length === 0) {
                    // Set the targets to be the nextFormRow container
                    nextRecursiveTargets = nextRecursiveContainer;
                }

                // Re-run the logic if the recursive conditions have already been met
                self.applyToggle(self, condition, nextRecursiveTargets);
            }
        },
        destroy: function() {
            var self = this,
                targets = self.element.find('[' + self.settings.targetIdentifier + ']'),
                targetContainers = self.element.find('[' + self.settings.nextFormRowsIdentifier + ']'),
                helpText = self.element.find('.' + self.settings.helpTextIdentifier),
                boundFields = self.fieldsToWatch;

            // Run the destroy callback
            self.settings.destroyCallback();

            targets
                // Remove disabled attribute for each target
                .removeAttr(self.settings.disabledAttr)
                // Remove disabled class for each target
                .removeClass(self.settings.disabledClass);

            // Remove disabled class for each help text
            helpText.removeClass(self.settings.disabledClass);

            // Remove the toggle class from the target containers
            targetContainers.removeClass(self.settings.toggleClass);

            // Remove the data binding on the plugin element
            self.element.removeData('plugin_toggleFields');
            // Remove the event handlers on the fields to watch
            $.each(boundFields, function() {
                var field = $(this);
                field.off('change');
            });
        }
    });

    // Preventing against multiple instantiations
    $.fn[pluginName] = function(options) {

        return this.each(function() {

            // If the element does not have the plugin data
            if (!$.data(this, 'plugin_' + pluginName)) {
                // Bind the plugin to the element via the data method
                $.data(this, 'plugin_' + pluginName, new ToggleFields(this, options));
            }
        });
    };
})(jQuery, window, document);