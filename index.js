#!/usr/bin/env node
const { program } = require('commander');
const version = require('./package.json').version
const { exec } = require("child_process");
const fs = require('fs')

program
  .version(version, '-v, --version')
  .command('init')
  .description('initialize your meet config')
  .action(() => {
    console.log('init')
  });
program
  .command('create <project>')
  .description('创建一个文件')
  .action(async (project) => {
    exec(`git clone git@github.com:wuhaohao1234/ts-node-example.git ${project}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`${stderr}`);
      }
      console.log(`$ cd ${project}`);
      console.log(`$ yarn or npm install`);
      console.log(`$ yarn test`);
      console.log(`$ yarn watch`);
      console.log(`$ yarn dev`);
      let str = String(fs.readFileSync(`./${project}/package.json`))
      str = str.replace('ts-node-example', project)
      fs.writeFileSync(`./${project}/package.json`, str)
      console.log(`${stdout}`);

    });

  })
program.parse(process.argv);