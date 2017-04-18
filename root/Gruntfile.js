module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),  
      
      // less编译任务
      less: {
        development: {
          files: [{
              expand: true,
              cwd: './workPlace/',
              src: ['**/*.less'],
              dest: './css/',
              ext: '.css'
          }]
        }
      },
      // 压缩任务
      uglify: {
        compressjs: {
          files: {
            'js/build.min.js' : ['js/build.js']
          }
        }
      },
      cssmin: {
        compress: {
          files: {
            "css/main.min.css": ["css/main.css"]
          }
        }
      },

      // 复制任务
      copy: {
         main: {
            files: [
              {src: ['css/**','js/**','img/**','*.html'], dest: 'demo/'} // 复制path目录下的所有目录和文件
            ]
          }
      },

      // 监听任务
      watch: {
        scripts: {
          files: ['workPlace/*.less', 'workPlace/*.js', 'workPlace/js_module/*.js', 'workPlace/vue_component/*.vue', '*.html'],
          tasks: ['less', 'uglify', 'cssmin', 'copy']
        },

        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'demo/**',
                '*.html',
                'workPlace/*.less',
                'workPlace/*.js', 
                'workPlace/js_module/*.js', 
                'workPlace/vue_component/*.vue',
                'img/**'
            ]
        }
      },

      // 实时预览任务
      connect: {
        options: {
            port: 9000,
            open: true,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        server: {
          options: {
            port: 9001,
            base: './'
          }
        }
      }
    });

  // 任务加载
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // 任务注册
  grunt.registerTask(
    'watchit', 
    ['less', 'uglify', 'cssmin', 'copy', 'connect','watch']
  );
  grunt.registerTask(
    'compile',
    ['less', 'uglify', 'cssmin', 'copy']
  );
  grunt.registerTask(
    'default',
    ['less', 'uglify', 'cssmin', 'copy']
  );

};