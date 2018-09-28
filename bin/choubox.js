#! /usr/bin/env node

const path = require('path');

const package = require("../package.json");

const program = require('commander');

program
    .version(package.version)
    .usage('<command> [options]')
    .description(package.description);

program
    .command('init <dir>')
    .description('choubox init project!')
    .action((dir, cmd) => {
        require('../lib/init')(dir, cmd);
    })

program
    .command('create <dir>')
    .description('choubox create a development directory!')
    .action((dir, cmd) => {
        // console.log(dir, cmd);
        require('../lib/create')(dir, cmd);
    })

program.parse(process.argv)