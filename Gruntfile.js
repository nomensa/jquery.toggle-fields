'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({

        //Start a connect web server
        connect: {
            server: {
                options: {
                    livereload: 35729,
                    hostname: '0.0.0.0',
                    port: 9001
                }
            }
        },

        // Task for checking JavaScript Code Style with jscs
        jscs: {
            options: {
                config: '.jscsrc'
            },
            files: [
                'Gruntfile.js',
                'jquery.toggleFields.js'
            ]
        },

        // Minify files with UglifyJS
        uglify: {
            options: {
                preserveComments: 'some'
            },
            target: {
                files: {
                    'jquery.toggleFields.min.js': ['jquery.toggleFields.js']
                }
            }
        },

        // Grunt plugin for Karma
        karma: {
            all: {
                configFile: 'karma.conf.js'
            }
        },

        watch: {
            options: {
                debounceDelay: 250,
                livereload: 35729
            },
            html: {
                files: [
                    'index.html',
                ]
            },
            js: {
                files: [
                    'jquery.toggleFields.js',
                ],
                tasks: [
                    'uglify'
                ]
            },
            test: {
                files: [
                    'Gruntfile.js',
                    'jquery.toggleFields.js',
                    'jquery.toggleFields.spec.js'
                ],
                tasks: [
                    'karma'
                ]
            }
        },
        version: {
            options: {
                prefix: '@version:\\s+[\'"]'
            },
            src: [
                'jquery.toggleFields.js',
                'jquery.toggleFields.min.js'
            ]
        }
    });

    grunt.registerTask('default', 'watch (@options: --connect)', function() {
    /**
     * Defaut task
     * $ grunt
     * @options: --connect (run watch with a connect web server)
     */
        if ( grunt.option('connect') ) {
            grunt.task.run([
                'connect',
                'watch'
            ]);
        } else {
            grunt.task.run([
                'watch'
            ]);
        }
    });

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('release', ['test', 'version']);
};