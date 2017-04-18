'use strict';
  
  // 模板简单介绍信息
  exports.description = 'qc的模板';

  // 开始回答项目相关问题前，控制台打印的相关信息
  exports.notes = '请填写项目信息';

  // 结束回答项目相关问题后，控制台打印出来的信息
  exports.after = '项目手脚架已经搭建好了，开始干活吧~'+'\n'+
    '1、npm install 安装项目依赖的node模块'+'\n'+
    '2、grunt watchit 运行监听任务';

  // 如果运行grunt-init运行的那个目录下，有目录或文件符合warnOn指定的模式
  // 则会警告，防止用户不小心把当前目录下的文件覆盖了，一般都为*，如果要强制跳过，可加上--force
  exports.warnOn = '*';

  // The actual init template.
  exports.template = function(grunt, init, done) {

    init.process({type: 'qctemp'}, [
      // 项目创建的时候，需要回答的问题
      init.prompt('name', 'name'),
      init.prompt('description', 'description'),
      init.prompt('version', '1.0.0'),
      init.prompt('author_name', 'qc'),
      init.prompt('author_email', 'qiuchen1103@qq.com'),
    ], function(err, props) {

      props.keywords = [];

      // 需要拷贝处理的文件，这句一般不用改它
      var files = init.filesToCopy(props);

      // 实际修改跟处理的文件，noProcess表示不进行处理
      init.copyAndProcess(files, props, {noProcess: 'libs/**'});

      // 生成package.json，供Grunt、npm使用
      init.writePackageJSON('package.json', {
        name: 'name',
        version: '1.0.0',
        main: 'index.html',
        script: 'grunt qunit',
        devDependencies: {
          "grunt": "^0.4.5",
          "grunt-contrib-connect": "^0.11.2",
          "grunt-contrib-uglify": "^0.11.0",
          "grunt-contrib-watch": "^0.6.1",
          "grunt-contrib-copy": "^0.8.2",
          "grunt-contrib-cssmin": "^0.14.0",
          "grunt-contrib-less": "^1.1.0",

          "vue-loader": "^11.1.4",
          "vue-template-compiler": "^2.2.1",
          "webpack": "^2.2.1",

          "babel-core": "^6.0.0",
          "babel-loader": "^6.0.0",
          "babel-preset-latest": "^6.0.0",
          "cross-env": "^3.0.0",
          "css-loader": "^0.25.0",
          "file-loader": "^0.9.0",

          "webpack-dev-server": "^2.2.0"
        },
        dependencies: {
          "vue": "^2.2.1"
        }
      });

      // All done!
      done();
    });
  };