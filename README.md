# jQuery Toggle fields

> Adds form conditions to show and hide form fields.


## Usage

To get started you can:

 - Clone the repo: `git clone https://github.com/nomensa/jquery.toggle-fields.git`

Then it's just a case of including the following scripts on your page, best at the bottom:

```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="jquery.togglefields.js"></script>
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
    <body data-toggle-conditions="#field-1-with-condition, #field-2-with-condition">
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
|initCallback|function() {}|Callback when initialised|
|toggleClass|js-toggleFields--on|Class to represent toggled state, used on the target container|
|toggleOnCallback|function() {}|Callback when toggled on|
|toggleOffCallback|function() {}|Callback when toggled off|

### Init
```javascript
    toggleFields();
```

### Examples
See index.html for examples.


## Development
To ensure test suites continue to work while developing, this plugin requires:

 - [node.js](http://nodejs.org/) `~0.10.x`
 - [Grunt](http://gruntjs.com/) `~0.4.0`
 - [jQuery](http://jquery.com) `~v1.9.x`

### Node
First time setup of this plugin will require the node packages to be installed. On Windows use the command prompt with Ruby or on a Mac use terminal, install the global node.js packages:

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

Next install the plugin's node packages:

```bash
$ npm install
```

### Watcher

Running grunt (with watcher) will watch for any changes and recompile - best used during development:

```bash
$ grunt
```

#### Connect server (optional)

You can run a connect web server on `http://0.0.0.0:9001`, if required, when running grunt:

```bash
$ grunt --connect
# => Running "connect:server" (connect) task
# => Started connect web server on http://0.0.0.0:9001

# => Running "watch" task
# => Waiting...
```

## Testing

```bash
# Run Karma:
$ ./node_modules/karma/bin/karma start
```

## Todo
|Deadline|Task|
|--- |--- |
|October 2017|Test suites at 100% coverage|
|November 2017|Add destroy method|

Copyright &copy; 2017 [@nomensa](http://nomensa.com)
Licensed under [MIT](http://opensource.org/licenses/mit-license.php)
