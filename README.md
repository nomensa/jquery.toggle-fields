# jQuery Toggle fields

> Adds logic to disable and enable form fields.

The plugin simply:
- Adds/ removes a disabled class to textual elements;
- Adds/ removes a disabled class & disabled attribute to input elements.

## Usage

To get started you can:

 - Clone the repo: `git clone https://github.com/nomensa/jquery.toggle-fields.git`

Then it's just a case of including the following scripts on your page, best at the bottom:

```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="jquery.toggleFields.js"></script>
```

### DOM requirements
|Attribute|Value|Explanation|Required|
|--- |--- |--- |--- |
|[data-toggle-conditions](#data-toggle-conditions)|#field-1-with-condition, #field-2-with-condition|A condition is a form field that triggers the toggle. This represents a jQuery selector. Multiple conditions must be separated with a comma and space.|Required|
|[data-toggle-target](#data-toggle-target)|None|The individual element to be toggled. Expected form field or textual element.|Required|
|[data-toggle-next](#data-toggle-next-data-toggle-ref)|None|Required if using multiple conditions. Used on the wrapping element of the targets.|Required|
|[data-toggle-ref](#data-toggle-next-data-toggle-ref)|#field-1-with-condition|Required if using multiple conditions. Used on the wrapping element of the targets. Matches the ID in the 'data-toggle-conditions' attribute.|Required|
|[data-toggle-recursive](#data-toggle-recursive)|none|Required if using recursive conditions. Used to identify a recursive condition; one that relies on another condition.|Required|

#### DOM requirement examples
##### data-toggle-conditions
```html
    <div data-toggle-conditions="#field-1-with-condition, #field-2-with-condition">
```
##### data-toggle-target
```html
    <label data-toggle-target for="field-1-with-condition-example"> Label for a form field </label>
    <input data-toggle-target id="field-1-with-condition-example"/>
```
##### data-toggle-next & data-toggle-ref
```html
   <div data-toggle-next data-toggle-ref="field-1-with-condition"> The wrapping element of the targets </div>
```
##### data-toggle-recursive
```html
   <div data-toggle-next data-toggle-ref="field-2-with-condition" data-toggle-recursive> The wrapping element of the targets </div>
```

### Options

|Option|Default|Explanation|
|--- |--- |--- |
|conditionIdentifier|'data-toggle-condition'|(attribute) Used to identify the element with the condition|
|conditionsIdentifier|'data-toggle-conditions'|(attribute) Used to identify all conditions in the DOM|
|disabledClass|'disabled'|(class) The class added for the disabled state|
|disabledAttr|'disabled'|(attribute) The disabled attribute added on form elements|
|helpTextIdentifier|'form-row__instructions'|(class) Used to identify any additional text related to the targets|
|nextFormRowsIdentifier|'data-toggle-next'|(attribute) Used to identify the wrapper for the targets|
|nextRowReferenceIdentifier|'data-toggle-ref'|(attribute) Used to identify the condition in which the wrapper belongs to|
|targetIdentifier|'data-toggle-target'|(attribute) Used to identify the targets for the conditions|
|toggleClass|'js-toggleFields--on'|(class) Identifies whether the toggle has applied'
|toggleClass|js-toggleFields--on|(class) Represents toggled state, used on the target container|
|initCallback|function(){}|Callback when initialised|
|toggleOnCallback|function(){}|Callback when toggled on|
|toggleOffCallback|function(){}|Callback when toggled off|


### Init
```javascript
    $('form').toggleFields();
```

### Init with options
```javascript
    var options = {
        conditionIdentifier: 'data-toggle-condition',
        conditionsIdentifier: 'data-toggle-conditions',
        disabledClass: 'disabled',
        disabledAttr: 'disabled',
        helpTextIdentifier: 'form-row__instructions',
        nextFormRowsIdentifier: 'data-toggle-next',
        nextRowReferenceIdentifier: 'data-toggle-ref',
        targetIdentifier: 'data-toggle-target',
        toggleClass: 'js-toggleFields--on'
        initCallback: function initCallback() {},
        toggleOnCallback: function toggleOnCallback() {},
        toggleOffCallback: function toggleOffCallback() {}
    };

    $('form').toggleFields(options);
```

### Examples
See index.html for examples.


## Development
To ensure test suites continue to work while developing, this plugin requires:

 - [node.js](http://nodejs.org/) `~0.10.x`
 - [Grunt](http://gruntjs.com/) `~0.4.0`
 - [jQuery](http://jquery.com) `~v1.9.x`

### Node
First time setup of this plugin will require the node packages to be installed. 

If you have NVM installed, make sure to use the correct node version:
```bash
$ nvm use 0.10
```
Next install the plugin's node packages:

```bash
$ npm install
```

### Grunt
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to install and use Grunt.

You will need to install the Grunt CLI (command line interface):

```bash
$ npm install -g grunt-cli
# => if you have used grunt before you probably have this (this can be run from any directory)
```

## Running
We use `http-server` to serve the demo page:
```bash
$ http-server
```
## Testing
We use Karma to build the test suites, which in turn uses Jasmine.

```bash
# Run Karma:
$ npm test
```
The Jasmine file is `jquery.toggleFields.spec.js`.

The test coverage is then compiled in the `coverage` folder.
Inside the `coverage` folder, open the `PhantomJS 1.9.8 (Linux 0.0.0)` folder to see the latest test coverage.

## Todo
No tasks currently in our todo list.

Copyright &copy; 2017 [@nomensa](http://nomensa.com)
Licensed under [MIT](http://opensource.org/licenses/mit-license.php)
