# jQuery Toggle fields

> Adds form conditions to show and hide form fields.


## Usage

To get started you can:

 - Clone the repo: `git clone git@gitlab:anevins/toggle-fields.git`

Then it's just a case of including the following scripts on your page, best at the bottom:

```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="jquery.togglefields.js"></script>
```

### DOM requirements
Requires the following DOM attributes:
 * `[data-toggle-conditions="#field-1-with-condition, #field-2-with-condition"]` - Required: List of condition IDs, prepended with a hash, comma separated.
 * `[data-toggle-target]` - Required: The form field to toggle.
 * `[data-toggle-next]` - Optional: The next form row to toggle


## Development

This plugin requires:

 - [node.js](http://nodejs.org/) `~0.10.x`
 - [Grunt](http://gruntjs.com/) `~0.4.0`
 - [jQuery](http://jquery.com) `~v1.9.x`

### Node
First time setup of this plugin will require the node packages to be installed. On Windows use the command prompt with Ruby or on a Mac use terminal, install the global node.js packages:

```bash
$npm install
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

Copyright &copy; 2014 [@nomensa](http://nomensa.com)

Licensed under [MIT](http://opensource.org/licenses/mit-license.php)