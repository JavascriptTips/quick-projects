/**
 * Created by zyg on 16/10/10.
 */
var fs = require('fs');
var path = require('path');

var copy = require('../lib/copy');
var readJson = require('../lib/readJson')

module.exports = function (commander,config) {

  commander
    .command('g <template-name>')
    .option('-n,--name <name>', 'directory name')
    .action((templateName, options)=> {
      var name = options.name;

      if(!name){
        name = templateName;
      }

      const finalTemplateDir = path.join(config.templateDir,templateName);
      const targetDir = path.join(config.cwd,name);

      if(config.tempList.indexOf(templateName) !== -1){

        //clone common files
        copy(config.commonDir,targetDir)

        //clone project
        copy(finalTemplateDir, targetDir);

        //替换名字
        var packagePath = path.join(targetDir,'package.json')
        var targetPackageObj = readJson(packagePath);

        targetPackageObj.name = name
        targetPackageObj.description = name

        fs.writeFileSync(packagePath,JSON.stringify(targetPackageObj,null,2));

        console.log(`${templateName} build complete!`);
      }else{
        console.error(`${templateName} not found`);
      }

    });
};