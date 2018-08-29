// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    cjs_jsnext: {
      library: {
        options: {
          main: 'scripts/main.js',
        },
        dest: 'scripts/'
      }
    },
    sass: { // Begin Sass Plugin
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'stylesheets/css',
          ext: '.css'
        }]
      }
    },
    postcss: { // Begin Post CSS Plugin
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'stylesheets/css/main.css'
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'stylesheets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'stylesheets/css',
          ext: '.min.css'
        }],  
      },          
    },
    uglify: {
      build: {
        src: 'scripts/main.js',
        dest: 'scripts/main.min.js'
      },
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass:dist', 'postcss','cssmin']
      },
      js: {
        files: 'scripts/**/*.js',
        tasks: ['uglify']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'stylesheets/*.css',
            'scripts/*.js',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:rupeshp1018/groceryListWeb.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      }
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-bundle-jsnext-lib');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Register Grunt tasks
  grunt.registerTask('default', ['browserSync', 'watch']);
};