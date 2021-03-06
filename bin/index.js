#!/usr/bin/env node
/* eslint-disable no-console, import/extensions */

import program from 'commander';
import pageLoader from '../index.js';

program
  .version('0.0.1')
  .description('Page loader utility.')
  .option('-o, --output [dir]', 'output path', process.cwd())
  .arguments('<url>')
  .action((url) => {
    pageLoader(url, program.opts().output);
  })
  .parse(process.argv);
