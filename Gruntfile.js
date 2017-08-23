module.exports = function(grunt) {
    'use strict';

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
        },

        // Validate files with JSHint
        jshint: {
            globals: {
                Modernizr: true,
                jQuery: true
            },
            jshintrc: '.jshintrc',
            files: [
                'Gruntfile.js',
                'src/jquery.toggleFields.js'
            ]
        },

        // Task for checking JavaScript Code Style with jscs
        jscs: {
            options: {
                config: '.jscsrc'
            },
            files: [
                'Gruntfile.js',
                'src/jquery.toggleFields.js'
            ]
        }
    });

    grunt.registerTask('test', ['jshint', 'jscs', 'karma']);
};