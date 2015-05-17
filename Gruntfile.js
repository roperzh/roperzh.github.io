'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('jit-grunt')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'static/js/vendor/*.js',
    'static/js/_global-definitions.js',
    'static/js/services/_*.js',
    'static/js/behaviors/_*.js',
    'static/js/main.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'static/js/*.js',
        '!static/build/js/scripts.js',
        '!static/**/*.min.*'
      ]
    },
    sass: {
      options: {
        sourceMap: false
      },
      dev: {
        files: {
          'static/build/css/main.css': 'static/scss/main.scss'
        }
      },
      build: {
        files: {
          'static/build/css/main.css': 'static/scss/main.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'static/build/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'static/build/js/scripts.min.js': [jsFileList]
        }
      }
    },
    cssmin: {
      options: {
        // shorthandCompacting: false,
        // roundingPrecision: -1
      },
      build: {
        files: {
          'static/build/css/main.min.css': ['static/build/css/main.css']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'static/build/css/'
          }
        },
        src: 'static/build/css/main.css'
      },
      build: {
        src: 'static/build/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'static/vendor/modernizr/modernizr.js',
        outputFile: 'static/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['static/build/js/scripts.min.js'],
            ['static/build/css/main.min.css']
          ]
        },
        extra: {
          shiv: false
        },
        uglify: true,
        parseFiles: true
      }
    },
    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: 'static/img/icons',
          src: ['*.svg', '*.png'],
          dest: "static/build/css/icons"
        }],
        options: {
          enhanceSVG: true
        }
      }
    },
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'static/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'static/build/img/'
        }]
      }
    },
    watch: {
      sass: {
        files: [
          'static/scss/*.scss',
          'static/scss/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer:dev'],
        options: {
          spawn: false
        }
      },
      js: {
        files: [
          jsFileList
        ],
        tasks: ['newer:concat'],
        options: {
          spawn: false
        }
      },
      images: {
        files: [
          'static/img/*.*',
          'static/img/**/*.*'
        ],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    "watch"
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'sass',
    'autoprefixer:dev',
    'concat'
  ]);

  grunt.registerTask('build', [
    'sass:build',
    'autoprefixer:build',
    'cssmin:build',
    'uglify',
  ]);
};
