#!/usr/bin/env node

'use strict';

var program = require('commander'),
    actions = require('./actions');

// Allow self signed certs!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

program.version('0.1.0');

program.command('login <url>')
    .description('Login to server')
    .action(actions.login);

program.command('put <file> [files...]')
    .option('-a --all', 'Also include hidden files and folders.', false)
    .description('Put a file, last argument is destination if provided')
    .action(actions.put);

program.command('get [file]')
    .description('Get a file or directory listing')
    .action(actions.get);

program.command('del <file>')
    .option('-r --recursive', 'Recursive delete directories.', false)
    .option('-d --dry-run', 'Only list files to delete.', false)
    .description('Delete a file or directory')
    .action(actions.del);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else { // https://github.com/tj/commander.js/issues/338
    var knownCommand = program.commands.some(function (command) { return command._name === process.argv[2]; });
    if (!knownCommand) {
        console.error('Unknown command: ' + process.argv[2]);
        process.exit(1);
    }
}
