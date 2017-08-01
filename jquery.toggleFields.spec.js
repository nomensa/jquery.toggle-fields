'use strict';

describe('toggle-fields', function() {

    var markup =
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


    beforeEach(function() {
        var testElement = $(markup);
    });

    it('depends on jQuery', function() {
        expect($).toBeDefined();
    });

    describe('plugin init', function() {

        beforeEach(function() {
            toggleFields();
            document.body.insertAdjacentHTML('afterbegin', markup);
        });
        
        it('should disable the targets', function() {
            var targets = $('[data-toggle-target]');
            
            targets.each(function() {
                var target = $(this);

                // If the taret is a label 
                if (typeof target === 'label') {
                    
                }
            });
        });
    });

});