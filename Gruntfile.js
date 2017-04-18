module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      development: {
        files: {
          'css/styles.css': 'scss/styles.scss',
        }
      },
    },
    concat: {
      corecss: {
        src: [
          'css/easy-autocomplete.css',
          'css/material-design-iconic-font.css',
          'css/tagmanager.css',
          'css/bootstrap.css',
          'css/select2.css',
          'css/bootstrap-theme.css',
          'css/styles.css',
        ],
        dest: 'css/dist/main.css'
      },
      corejs: {
        src: [
          'js/jquery-1.11.1.min.js',
          'js/bootstrap.js',
          'js/bloodhound.js',
          'js/formValidation.js',
          'js/jqBootstrapValidation.js',
          'js/pubsub.js',
          'js/scrollreveal.min.js',
          'js/select2.min.js',
          'js/tagmanager.js',
          'js/typeahead.jquery.js',
          'js/scripts.js',
        ],
        dest: 'js/dist/main.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: true,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/dist/main.css': ['css/dist/main.css'],
        }
      }
    },
    uglify: {
      corejs: {
        files: {
          'js/dist/main.js': ['js/dist/main.js']
        }
      }
    },
    watch: {
      styles: {
        files: [ // which files to watch
          'scss/*.scss',
          'js/*.js'
        ],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sass','concat','cssmin', 'watch']);


}