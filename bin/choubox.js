#! /usr/bin/env node

const path = require('path');

const package = require("../package.json");

const program = require('commander');

program
    .version(package.version)
    .usage('<command> [options]')
    .description(package.description);

program
    .command('create <dir>')
    .description('create a development directory')
    .action((dir, cmd) => {
        // console.log(dir, cmd);
        require('../lib/create')(dir, cmd);
    })

program
    .command('init')
    .description('init webpack config')
    .action(() => {
        require('../lib/init')();
    })

program.parse(process.argv)