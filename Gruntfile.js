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
    critical: {
      options: {
        base: './public',
        css: [
          'public/build/css/main.css'
        ],
        width: 320,
        height: 480,
        minify: true
      },
      home: {
        src: 'public/index.html',
        dest: 'public/index.html'
      },
      about: {
        src: 'public/about/index.html',
        dest: 'public/about/index.html'
      },
      work: {
        src: 'public/work/index.html',
        dest: 'public/work/index.html'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'static/js/*.js',
        '!static/build/js/main.js'
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
        dest: 'static/build/js/main.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'static/build/js/main.js': [jsFileList]
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
          'static/build/css/main.css': ['static/build/css/main.css']
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
        src: 'static/build/css/main.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'static/vendor/modernizr/modernizr.js',
        outputFile: 'static/js/vendor/modernizr.js',
        files: {
          'src': [
            ['static/build/js/main.js'],
            ['static/build/css/main.css']
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

  grunt.registerTask('build', [
    'sass:build',
    'autoprefixer:build',
    'cssmin:build',
    // 'critical:home',
    // 'critical:about',
    // 'critical:work',
    'uglify',
  ]);
};
