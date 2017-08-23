'use strict';

describe('toggle-fields', function() {

    var defaultForm = 
        '<form>' +
            '<div data-toggle-conditions="#demo_example_a_field_1_option"></div>' +
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
        '</form>',
        radioForm =
        '<form>' +
            '<div data-toggle-conditions="#demo_example_field_2"></div>' +
            '<label for="label_id_3">' +
                '<input id="label_id_3" checked="checked" name="fieldset_1" type="radio"> No' +
            '</label>' +
            '<label for="demo_example_field_2">' +
                '<input id="demo_example_field_2" name="fieldset_1" type="radio"> Yes' +
            '</label>'+
            '<div data-toggle-next data-toggle-ref="demo_example_field_2">' +
                '<label data-toggle-target for="label_id_5">An additional field</label>' + 
                '<select id="label_id_5" data-toggle-target>' +
                    '<option>---------</option>' +
                '</select>' +
            '</div>' +
        '</form>',
        checkboxForm =
        '<form>' + 
            '<div data-toggle-conditions="#demo_example_field_2"></div>' +
            '<label for="demo_example_field_2">' +
                '<input id="demo_example_field_2" type="checkbox"> No' +
            '</label>' +
            '<div data-toggle-next data-toggle-ref="demo_example_field_2">' +
                '<label data-toggle-target for="label_id_5">An additional field</label>' + 
                '<select id="label_id_5" data-toggle-target>' +
                    '<option>---------</option>' +
                '</select>' +
            '</div>' +
        '</form>',
        recursiveForm = 
        '<form>' + 
            '<div data-toggle-conditions="#demo_example_field_3, #demo_example_field_4, #demo_example_field_5"></div>' +
            '<label for="label_id_7">First toggle</label>' +
            '<select id="label_id_7" data-toggle-target>' + 
                '<option>---------</option>' + 
                '<option id="demo_example_field_3">foo</option>' + 
            '</select>' + 
            '<div data-toggle-next data-toggle-ref="demo_example_field_3" data-toggle-recursive>' + 
                '<label data-toggle-target for="label_id_8">Second toggle</label>' + 
                '<select id="label_id_8" data-toggle-target>' + 
                    '<option>---------</option>' + 
                    '<option id="demo_example_field_4">bar</option>' + 
                '</select>' + 
            '</div>' + 
            '<div data-toggle-next data-toggle-ref="demo_example_field_4" data-toggle-recursive>' + 
                '<label data-toggle-target for="label_id_9">Third toggle</label>' + 
                '<select id="label_id_9" data-toggle-target>' + 
                    '<option>---------</option>' + 
                    '<option id="demo_example_field_5">bar</option>' + 
                '</select>' + 
            '</div>' + 
            '<div data-toggle-next data-toggle-ref="demo_example_field_5" data-toggle-recursive>' + 
                '<p>Foo paragraph that belongs to the third toggle.</p>' + 
            '</div>' + 
        '</form>',
        helpTextForm =
        '<form>' +
            '<div data-toggle-conditions="#demo_example_a_field_1_option"></div>' + 
            '<div>' +
                '<label for="demo_example_a_field_1">Select an option</label>' +
                '<select id="demo_example_a_field_1">' +
                    '<option>---------</option>' +
                    '<option id="demo_example_a_field_1_option">foo</option>' +
                '</select>' +
            '</div>' +
            '<div data-toggle-next data-toggle-ref="demo_example_a_field_1_option">' +
                '<label data-toggle-target for="demo_example_a_field_2">An additional field</label>' +
                '<select aria-describedby="instructions_id_1" id="demo_example_a_field_2" data-toggle-target>' +
                    '<option>Foo option</option>' +
                '</select>' +
                '<p id="instructions_id_1" class="helptext-foo">For example: name@example.com</p>' +
            '</div>' +
        '</form>';


    beforeEach(function() {
        // Clean the DOM
        $('body').empty();
    });

    it('depends on jQuery', function() {
        expect($).toBeDefined();
    });

    describe('Initialising the plugin:', function() {

        it('Should disable the targets', function() {
            // Add form markup
            $('body').append(defaultForm);

            var form = $('form'),
                targets = $('[data-toggle-target]');

            // Init plugin
            form.toggleFields();

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
    });

    describe('Triggering the condition: ', function() {

        it('Should enable the targets', function() {
            // Add form markup
            $('body').append(defaultForm);

            var selectField = $('#demo_example_a_field_1'),
                condition = $('#demo_example_a_field_1_option'),
                targets = $('[data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields();

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

    describe('When there are no targets in the nextFormRowsIdentifier:', function() {

        it('Should apply the toggle directly to the nextFormRowsIdentifier element', function() {
            // Add form markup
            $('body').append(defaultForm);

            var targets = $('[data-toggle-target]'),
                nextFormRows = $('[data-toggle-next]'),
                form = $('form');

            // Remove the targets
            targets.remove();
            // Init plugin
            form.toggleFields();
            // The container should be disabled instead
            expect(nextFormRows.hasClass('disabled')).toBe(true);
        });
    });

    describe('If the condition is part of a related group of radio buttons', function() {

        it('Should know when another related radio buttons have been selected', function() {
            // Add form markup
            $('body').append(radioForm);

            var condition = $('#demo_example_field_2'),
                relatedRadio = $('#label_id_3'),
                targets = $('[data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields();

            // Select the other radio button
            relatedRadio.trigger('click');
            // For each target
            targets.each(function() {
                // The target should be disabled
                expect($(this).hasClass('disabled')).toBe(true);
            });
        });
    });

    describe('If the condition is a checkbox:', function() {

        it('Should recognise when the checkbox is unchecked', function() {
            // Add form markup
            $('body').append(checkboxForm);

            var condition = $('#demo_example_field_2'),
                targets = $('[data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields();
            // Trigger the condition
            condition.trigger('click');
            targets.each(function() {
                // The target should be enaled
                expect($(this).hasClass('disabled')).toBe(false);
            });
        });
    });

    describe('If using recursions:', function() {

        it('Should only enable first recursion when first condition met', function() {
            // Add form markup
            $('body').append(recursiveForm);

            var condition1 = $('#demo_example_field_3'),
                condition2 = $('demo_example_field_4'),
                condition3 = $('demo_example_field_5'),
                condition2Targets = $('[data-toggle-ref="demo_example_field_3"] [data-toggle-target]'),
                condition3Targets = $('[data-toggle-ref="demo_example_field_4"] [data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields();

            // First condition
            condition1
                // Target the select
                .parents('select')
                // Select the condition
                .val(condition1.val())
                // Trigger the change event
                .trigger('change');

            // Second condition targets should be enabled
            condition2Targets.each(function() {
                expect($(this).hasClass('disabled')).toBe(false);
            });
            // Third condition targets should be disabled
            condition3Targets.each(function() {
                expect($(this).hasClass('disabled')).toBe(true);
            });
        });

        it('Should disable all conditions when first condition is not met', function() {
            // Add form markup
            $('body').append(recursiveForm);

            var condition1 = $('#demo_example_field_3'),
                condition2 = $('demo_example_field_4'),
                condition3 = $('demo_example_field_5'),
                condition2Targets = $('[data-toggle-ref="demo_example_field_3"] [data-toggle-target]'),
                condition3Targets = $('[data-toggle-ref="demo_example_field_4"] [data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields();

            // Enable first condition
            condition1
                // Target the select
                .parents('select')
                // Select the condition
                .val(condition1.val())
                // Trigger the change event
                .trigger('change');

            // Disable first condition
            condition1
                // Target the select
                .parents('select')
                // Select an option other than the condition
                .val('---------')
                // Trigger the change event
                .trigger('change');

            // Second condition targets should be disabled
            condition2Targets.each(function() {
                expect($(this).hasClass('disabled')).toBe(true);
            });
            // Third condition targets should be disabled
            condition3Targets.each(function() {
                expect($(this).hasClass('disabled')).toBe(true);
            });
        });
    })

    describe('Plugin options: ', function() {

        beforeEach(function() {
            $('body')
                // Clean the DOM
                .empty()
                // Add form markup
                .append(defaultForm);
        });

        it('Should configure "disabledClass"', function() {
            var options = {
                    disabledClass: 'foo'
                },
                targets = $('[data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields(options);
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
                target = $('select[data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields(options);

            expect(typeof target.attr(options.disabledAttr) !== 'undefined').toBe(true);
        });

        it('Should configure "conditionIdentifier"', function() {
            var options = {
                    conditionIdentifier: 'condition-identifier'
                },
                condition = $('#demo_example_a_field_1_option'),
                form = $('form');

            // Init plugin
            form.toggleFields(options);

            expect(typeof condition.attr(options.conditionIdentifier) !== 'undefined').toBe(true);
        });

        it('Should configure "conditionsIdentifier"', function() {
            var options = {
                    conditionsIdentifier: 'conditions-identifier'
                },
                targets = $('[data-toggle-target]'),
                conditions = $('[data-toggle-conditions]'),
                form = $('form');

            // Remove the normal conditions element
            conditions.remove();
            // Add new conditions element with different identifier
            form.append('<div conditions-identifier="#demo_example_a_field_1_option"></div>');

            // Init plugin
            form.toggleFields(options);

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
                helpText = '<p help-text-identifier data-toggle-target> Foo </p>',
                form = $('form');

            // Add help text
            $(helpText).insertAfter(targetField);
            // Init plugin
            form.toggleFields(options);
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
                targets = $('[data-toggle-target]'),
                form = $('form');

            originalRows
                // Remove original identifier 
                .removeAttr(originalRowsIdentifier)
                // Add new identifier
                .attr(options.nextFormRowsIdentifier, '');

            // Disrupt the DOM to ensure the option is being used
            originalRows.before('<div></div>');

            // Init plugin
            form.toggleFields(options);

            // Each target
            targets.each(function() {
                var target = $(this);

                // Each target should still be disabled
                expect(target.hasClass('disabled')).toBe(true);
            });
        });

        describe('If "nextFormRowsIdentifier" not provided:', function() {

            it('Should assume the sibling elements', function() {
                var options = {
                        nextFormRowsIdentifier: 'field-that-does-not-exist'
                    },
                    originalRowsIdentifier = 'data-toggle-next',
                    originalRefIdentifier = 'data-toggle-ref',
                    originalRows = $('[' + originalRowsIdentifier + ']'),
                    targets = $('[data-toggle-target]'),
                    form = $('form');

                originalRows
                    // Remove original identifiers
                    .removeAttr(originalRowsIdentifier)
                    .removeAttr(originalRefIdentifier);

                // Init plugin
                form.toggleFields(options);

                // Each target
                targets.each(function() {
                    var target = $(this);

                    // Each target should still be disabled
                    expect(target.hasClass('disabled')).toBe(true);
                });
            });
        });

        it('Should configure "nextRowReferenceIdentifier"', function() {
            var options = {
                    nextRowReferenceIdentifier: 'next-row-reference-identifier'
                },
                originalNextRowIdentifier = 'data-toggle-ref',
                originalNextRow = $('[' + originalNextRowIdentifier + ']'),
                originalNextRowValue = originalNextRow.attr(originalNextRowIdentifier),
                targets = $('[data-toggle-target]'),
                form = $('form');

            originalNextRow
                // Remove original identifier 
                .removeAttr(originalNextRowIdentifier)
                // Add new identifier
                .attr(options.nextRowReferenceIdentifier, originalNextRowValue);

            // Init plugin
            form.toggleFields(options);

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
                newTargets = $('[' + options.targetIdentifier + ']'),
                form = $('form');

            originalTargets
                // Remove original identifier
                .removeAttr(originalTargetIdentifier)
                // Add new identifier
                .attr(options.targetIdentifier, '');

            // Init plugin
            form.toggleFields(options);

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
                container = $('[data-toggle-ref]'),
                form = $('form');

                // Init plugin
                form.toggleFields(options);

                // The container should have the new toggle class
                expect(container.hasClass(options.toggleClass)).toBe(true);
        });

        it('Should configure "initCallback"', function() {
            var options = {
                    initCallback: function() {
                        $('body').addClass('foo');
                    }
                },
                form = $('form');

            // Init plugin
            form.toggleFields(options);
            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });

        it('Should configure "toggleOnCallback"', function() {
            var options = {
                    toggleOnCallback: function() {
                        $('body').addClass('foo');
                    }
                },
                form = $('form');

            // Init plugin
            form.toggleFields(options);
            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });

        it('Should configure "toggleOffCallback"', function() {
            var options = {
                    toggleOffCallback: function() {
                        $('body').addClass('foo');
                    }
                },
                form = $('form'),
                selectField = $('#demo_example_a_field_1'),
                condition = $('#demo_example_a_field_1_option'),
                targets = $('[data-toggle-target]'),
                form = $('form');

            // Init plugin
            form.toggleFields(options);

            // Emulate selecting the option with the condition
            selectField
                .val('---------')
                .change();

            // The container should have the new toggle class
            expect($('body').hasClass('foo')).toBe(true);
        });
    });

    describe('Destroy method:', function() {

        beforeEach(function() {
            $('body')
                // Clean the DOM
                .empty()
                // Add form markup
                .append(helpTextForm);
        });

        it('Should remove all traces of the plugin', function() {
            var options = {
                    destroyCallback: function() {
                        $('body').addClass('foo');
                    },
                    toggleClass: 'toggleclass-foo',
                    helpTextIdentifier: 'helptext-foo'
                },
                form = $('form'),
                targets,
                targetContainer,
                helpText;

            // Init plugin
            form.toggleFields(options);

            // Get all targets
            targets = $('[data-toggle-target]');
            // Get all target containers
            targetContainer = $('[data-toggle-ref]');
            // Get all help text
            helpText = $('.' + options.helpTextIdentifier);

            // Call the destroy method
            form.data('plugin_toggleFields').destroy();

            // It should run a callback destroy function before it has been destroyed
            expect($('body').hasClass('foo')).toBe(true);

            // For each target
            targets.each(function() {
                var target = $(this);

                // It should remove the disabled attribute on targets
                expect(typeof target.attr('disabled') === 'undefined').toBe(true);
                // It should remove the disabled class on targets
                expect(target.hasClass('disabled')).toBe(false);
            });

            // It should remove the disabled class on help text
            expect(helpText.hasClass(options.toggleClass)).toBe(false);

            // It should remove the toggle class on the target container
            expect(targetContainer.hasClass(options.toggleClass)).toBe(false);
            // It should remove its data bindings
            expect(typeof form.data('plugin_toggleFields') === 'undefined').toBe(true);
        });
    });
});