'use strict';

describe('toggle-fields', function() {

    var defaultForm =
        '<div data-toggle-conditions="#demo_example_a_field_1_option"></div>' + 
        '<form class="example-a">' +
            '<div>' +
                '<label for="demo_example_a_field_1">Select an option</label>' +
                '<select id="demo_example_a_field_1">' +
                    '<option>---------</option>' +
                    '<option id="demo_example_a_field_1_option">foo</option>' +
                '</select>' +
            '</div>' +
            '<div data-toggle-next data-toggle-ref="demo_example_a_field_1_option">' +
                '<label data-toggle-target for="demo_example_a_field_2">An additional field</label>' +
                '<select id="demo_example_a_field_2" data-toggle-target>' +
                    '<option>Foo option</option>' +
                '</select>' +
            '</div>' +
        '</form>';

    it('depends on jQuery', function() {
        expect($).toBeDefined();
    });

    describe('Initialising the plugin:', function() {

        beforeEach(function() {
            var body = $('body');

            body
                // Clean the DOM
                .empty()
                // Add form markup
                .append(defaultForm);
            // Init plugin
            toggleFields();
        });
        
        it('Should disable the targets', function() {
            var targets = $('[data-toggle-target]');

            targets.each(function() {
                var target = $(this);

                // If the taret is a label 
                if (target.is('label')) {
                    expect(target.hasClass('disabled')).toBe(true);
                } else {
                    expect(typeof target.attr('disabled') !== 'undefined' ).toBe(true);
                }
            });
        });

        describe('Triggering the condition: ', function() {

            it('Should enable the targets', function() {
                var selectField = $('#demo_example_a_field_1'),
                    condition = $('#demo_example_a_field_1_option'),
                    targets = $('[data-toggle-target]');

                // Emulate selecting the option with the condition
                selectField
                    .val(condition.val())
                    .change();

                // Each target
                targets.each(function() {
                    var target = $(this);

                    // If the taret is a label 
                    if (target.is('label')) {
                        // The aria-label attribute should be removed
                        expect(typeof target.attr('aria-label') === 'undefined').toBe(true);
                    } else {
                        // The disabled attriubte should be removed
                        expect(typeof target.attr('disabled') === 'undefined' ).toBe(true);
                    }
                });
            });
        });
    });

    describe('Plugin options: ', function() {

        beforeEach(function() {
            var body = $('body');

            body
                // Clean the DOM
                .empty()
                // Add form markup
                .append(defaultForm);
        });

        it('Should configure "disabledClass"', function() {
            var options = {
                    disabledClass: 'foo'
                },
                targets = $('[data-toggle-target]');

            // Init plugin
            toggleFields(options);
            // Each target
            targets.each(function() {
                var target = $(this);

                // Each target should still be disabled
                expect(target.hasClass(options.disabledClass)).toBe(true);
            });
        });

        it('Should configure "disabledClass"', function() {
            var options = {
                    disabledAttr: 'disabled-attr'
                },
                target = $('select[data-toggle-target]');

            // Init plugin
            toggleFields(options);

            expect(typeof target.attr(options.disabledAttr) !== 'undefined').toBe(true);
        });

        it('Should configure "conditionIdentifier"', function() {
            var options = {
                    conditionIdentifier: 'condition-identifier'
                },
                condition = $('#demo_example_a_field_1_option');

            // Init plugin
            toggleFields(options);

            expect(typeof condition.attr(options.conditionIdentifier) !== 'undefined').toBe(true);
        });

        it('Should configure "conditionsIdentifier"', function() {
            var options = {
                    conditionsIdentifier: 'conditions-identifier'
                },
                targets = $('[data-toggle-target]'),
                conditions = $('[data-toggle-conditions]');

            // Remove the normal conditions element
            conditions.remove();
            // Add new conditions element with different identifier
            $('body').append('<div conditions-identifier="#demo_example_a_field_1_option"></div>');

            // Init plugin
            toggleFields(options);

            // Each target
            targets.each(function() {
                var target = $(this);

                // Check if the condition is applied
                expect(target.hasClass('disabled')).toBe(true);
            });
        });

        it('Should configure "helpTextIdentifier"', function() {
            var options = {
                    helpTextIdentifier: 'help-text-identifier'
                },
                targetField = $('select[data-toggle-target]'),
                helpText = '<p help-text-identifier data-toggle-target> Foo </p>';

            // Add help text
            $(helpText).insertAfter(targetField);
            // Init plugin
            toggleFields(options);
            // Get help text again
            helpText = $('[' + options.helpTextIdentifier + ']');

            // Check if the help text has the disabled attribute
            expect(helpText.hasClass('disabled')).toBe(true);
        });

        it('Should configure "nextFormRowsIdentifier"', function() {
            var options = {
                    nextFormRowsIdentifier: 'next-form-rows-identifier'
                },
                originalRowsIdentifier = 'data-toggle-next',
                originalRows = $('[' + originalRowsIdentifier + ']'),
                targets = $('[data-toggle-target]');

            originalRows
                // Remove original identifier 
                .removeAttr(originalRowsIdentifier)
                // Add new identifier
                .attr(options.nextFormRowsIdentifier, '');

            // Disrupt the DOM to ensure the option is being used
            originalRows.before('<div></div>');

            // Init plugin
            toggleFields(options);

            // Each target
            targets.each(function() {
                var target = $(this);

                // Each target should still be disabled
                expect(target.hasClass('disabled')).toBe(true);
            });
        });

        it('Should configure "nextRowReferenceIdentifier"', function() {
            var options = {
                    nextRowReferenceIdentifier: 'next-row-reference-identifier'
                },
                originalNextRowIdentifier = 'data-toggle-ref',
                originalNextRow = $('[' + originalNextRowIdentifier + ']'),
                originalNextRowValue = originalNextRow.attr(originalNextRowIdentifier),
                targets = $('[data-toggle-target]');

            originalNextRow
                // Remove original identifier 
                .removeAttr(originalNextRowIdentifier)
                // Add new identifier
                .attr(options.nextRowReferenceIdentifier, originalNextRowValue);

            // Init plugin
            toggleFields(options);

            // Each target
            targets.each(function() {
                var target = $(this);

                // Each target should still be disabled
                expect(target.hasClass('disabled')).toBe(true);
            });
        });

        it('Should configure "targetIdentifier"', function() {
            var options = {
                    targetIdentifier: 'target-identifier'
                },
                originalTargetIdentifier = 'data-toggle-target',
                originalTargets = $('[' + originalTargetIdentifier + ']'),
                newTargets = $('[' + options.targetIdentifier + ']');

            originalTargets
                // Remove original identifier
                .removeAttr(originalTargetIdentifier)
                // Add new identifier
                .attr(options.targetIdentifier, '');

            // Init plugin
            toggleFields(options);

            // Each target
            newTargets.each(function() {
                var target = $(this);

                // Each target should still be disabled
                expect(target.hasClass('disabled')).toBe(true);
            });
        });

        it('Should configure "toggleClass"', function() {
            var options = {
                    toggleClass: 'toggle-class'
                },
                container = $('[data-toggle-ref]');

                // Init plugin
                toggleFields(options);

                // The container should have the new toggle class
                expect(container.hasClass(options.toggleClass)).toBe(true);
        });

        it('Should configure "initCallback"', function() {
            var options = {
                    initCallback: function() {
                        $('body').addClass('foo');
                    }
                };

            // Init plugin
            toggleFields(options);
            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });

        it('Should configure "destroyCallback"', function() {
            var options = {
                    destroyCallback: function() {
                        $('body').addClass('foo');
                    }
                };

            // Init plugin
            toggleFields(options);
            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });

        it('Should configure "toggleOnCallback"', function() {
            var options = {
                    toggleOnCallback: function() {
                        $('body').addClass('foo');
                    }
                };

            // Init plugin
            toggleFields(options);
            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });

        it('Should configure "toggleOffCallback"', function() {
            var options = {
                    toggleOffCallback: function() {
                        $('body').addClass('foo');
                    }
                };

            // Init plugin
            toggleFields(options);
            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });
    });
});