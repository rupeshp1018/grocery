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
    'gh-pages': {
      options: {
        base: '.'
      },
      src: ['**']
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
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-bundle-jsnext-lib');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Register Grunt tasks
  grunt.registerTask('default', ['watch']);
};