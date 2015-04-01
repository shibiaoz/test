'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
// var toMkdir = function  (folder,context) {
//     folder = folder || 'test';
//     context.mkdir(folder)
// }
module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
     //this.mkdir('app_test'); //创建文件夹
    // this.copy('test.html','app_test/index.html');//copy文件，默认路径是template下的
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exceptional ' + chalk.red('Like') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    },{
          type: 'input',
          name: 'projectName',
          message: '项目名 (会用来生成主angular模块,control文件及template文件):',
          default: 'Sample',
          validate: function(input) {
              if (this.existedProjects && this.existedProjects.indexOf(this._.underscored(input)) > -1) {
                  return input + ' 已存在！';
              } else {
                  return true;
              }
          }.bind(this)
        }
    ];

    this.prompt(prompts, function (props) {
      this.log('=======below is prompt answers=============');
      this.log(props);
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      //toMkdir('myApp',this);//自己封装的创建文件夹
      this.fs.copy(
        this.templatePath('test.html'),
        this.destinationPath('myApp/index2.html')
      );
      //img copy
      this.fs.copy(
        this.templatePath('public/img/first.png'),
        this.destinationPath('public/img/first.png')
      );
      //css copy 
      this.fs.copy(
        this.templatePath('public/css/reset.css'),
        this.destinationPath('public/css/reset.css')
      );
      //js copy
      this.fs.copy(
        this.templatePath('public/js/lib.js'),
        this.destinationPath('public/js/lib.js')
      );

      this.log(this.sourceRoot());


    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
