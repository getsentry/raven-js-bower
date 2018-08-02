const versions = [
    '3.18.1',
    '3.19.0',
    '3.19.1',
    '3.20.0',
    '3.20.1',
    '3.21.0',
    '3.22.0',
    '3.22.1',
    '3.22.2',
    '3.22.3',
    '3.22.4',
    '3.23.0',
    '3.23.1',
    '3.23.2',
    '3.23.3',
    '3.24.0',
    '3.24.1',
    '3.24.2',
    '3.25.0',
    '3.25.1',
    '3.25.2',
    '3.26.0',
    '3.26.1',
    '3.26.2',
    'raven-js@3.26.3',
    'raven-js@3.26.4',
  ];

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function init(){
  await asyncForEach(versions, async version => {
    const realVersion = version.replace("raven-js@", "");
    const basePath = '/Users/haza/Projects/demo-projects/bower/raven-js/raven-js';
    execSync(`cd ${basePath}; git checkout ${version}`);
    if (fs.existsSync(path.join(basePath, 'bower.json')) && fs.existsSync(path.join(basePath, 'dist'))) {
      execSync(`cp -f ${basePath}/bower.json /Users/haza/Projects/raven-js-bower/bower.json`);
      execSync(`rm -rf /Users/haza/Projects/raven-js-bower/dist`);
      execSync(`cp -Rf ${basePath}/dist /Users/haza/Projects/raven-js-bower/dist`);
      execSync(`git add -A`);
      execSync(`git commit -m "release: ${realVersion}"`);
      execSync(`git tag ${realVersion}`);
    } else {
      console.log('file bower.json/dist does not exist.');
    }
  });
}

function sleep(ms){
 return new Promise(resolve=>{
     setTimeout(resolve,ms)
 })
}

init();