const versions = [
  '0.1.0',
  '0.1.1',
  '0.1.2',
  '0.1.3',
  '0.1.4',
  '0.2',
  '0.2.1',
  '0.3',
  '0.4',
  '0.5',
    '0.5.1',
    '0.5.2',
    '1.0.0',
    '1.0.1',
    '1.0.2',
    '1.0.3',
    '1.0.4',
    '1.0.5',
    '1.0.6',
    '1.0.7',
    '1.0.8',
    '1.1.0',
    '1.1.1',
    '1.1.2',
    '1.1.3',
    '1.1.4',
    '1.1.5',
    '1.1.6',
    '1.1.7',
    '1.1.8',
    '1.1.9',
    '1.1.10',
    '1.1.11',
    '1.1.12',
    '1.1.13',
    '1.1.14',
    '1.1.15',
    '1.1.16',
    '1.1.17',
    '1.1.18',
    '1.1.19',
    '1.1.20',
    '1.1.21',
    '1.1.22',
    '1.2.0',
    '1.3.0',
    '2.0.0',
    '2.0.1',
    '2.0.2',
    '2.0.4',
    '2.0.5',
    '2.1.0',
    '2.1.1',
    '2.2.0',
    '2.2.1',
    '2.3.0',
    '2.4.0',
    '2.4.1',
    '2.4.2',
    '2.5.0',
    '2.6.0',
    '2.6.1',
    '2.6.2',
    '3.0.0',
    '3.0.1',
    '3.0.2',
    '3.0.3',
    '3.0.4',
    '3.0.5',
    '3.1.0',
    '3.1.1',
    '3.2.0',
    '3.2.1',
    '3.3.0',
    '3.4.0',
    '3.4.1',
    '3.5.0',
    '3.5.1',
    '3.6.0',
    '3.6.1',
    '3.7.0',
    '3.8.0',
    '3.8.1',
    '3.9.0',
    '3.9.1',
    '3.9.2',
    '3.10.0',
    '3.11.0',
    '3.12.0',
    '3.12.1',
    '3.12.2',
    '3.13.0',
    '3.13.1',
    '3.14.0',
    '3.14.1',
    '3.14.2',
    '3.15.0',
    '3.16.0',
    '3.16.1',
    '3.17.0',
    '3.18.0',
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