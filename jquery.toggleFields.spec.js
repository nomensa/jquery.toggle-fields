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

    describe('Plugin init', function() {

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
        
        it('should disable the targets', function() {
            var targets = $('[data-toggle-target]');

            targets.each(function() {
                var target = $(this);

                // If the taret is a label 
                if (target.is('label')) {
                    expect(target.attr('aria-label') === 'Disabled').toBe(true);
                } else {
                    expect(typeof target.attr('disabled') !== 'undefined' ).toBe(true);
                }
            });
        });

        describe('On triggering the condition', function() {

            it('should enable the targets', function() {
                var selectField = $('#demo_example_a_field_1'),
                    condition = $('#demo_example_a_field_1_option'),
                    targets = $('[data-toggle-target]');

                // Emulate selecting the option with the condition
                selectField
                    .val(condition.val())
                    .change();


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
});