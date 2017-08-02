'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({

        // Grunt plugin for Karma
        karma: {
            all: {
                configFile: 'karma.conf.js'
            }
        }

    });

    grunt.registerTask('test', ['karma']);
};