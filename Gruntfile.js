// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // copy plugin
    copy: {
      build: {
        cwd: 'src',
        src: ['**', '!**/*.scss'],
        dest: 'build',
        expand: true
      },
    },
    clean: {
      build: {
        src: ['build']
      },
      stylesheets: {
        src: ['build/**/*.css', 'build/stylesheets', '!build/main.min.css']
      },
      scripts: {
        src: ['build/**/*.js', 'build/scripts', '!build/main.min.js']
      },
    },
    cjs_jsnext: {
      library: {
        options: {
          main: 'src/scripts/main.js',
        },
        dest: 'src/scripts/'
      }
    },
    sass: { // Begin Sass Plugin
      dist: {
        files: [{
          expand: true,
          cwd: 'src/stylesheets/sass',
          src: ['*.scss'],
          dest: 'build/stylesheets/css',
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
        src: 'build/stylesheets/css/main.css'
      }
    },
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'build/stylesheets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/',
          ext: '.min.css'
        }],  
      },          
    },
    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'build/main.min.js': ['build/scripts/main.js']
        }
      },
    },
    json_bake: {
      options: {

      },
      main: {
        'build/groceries.json': ['build/scripts/json/groceries.json']
      }
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: 'src/stylesheets/sass/**/*.scss',
        tasks: ['stylesheets']
      },
      js: {
        files: 'src/scripts/**/*.js',
        tasks: ['scripts']
      },
      copy: {
        files: ['src/**', 'src/stylesheets/**/*.scss'],
        tasks: ['copy']
      }
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bundle-jsnext-lib');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-json-bake');

  // Register Grunt tasks
  grunt.registerTask(
    'stylesheets',
    'Compiles the stylesheets.',
    ['sass:dist', 'postcss', 'cssmin', 'clean:stylesheets']
  );
  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files.',
    ['uglify', 'clean:scripts']
  );
  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    ['clean', 'copy', 'stylesheets', 'json_bake', 'scripts']
  );
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('deploy', ['gh-pages']);
};