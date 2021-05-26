#!/usr/bin/env node
/* eslint-disable no-console, import/extensions */

import program from 'commander';
import pageLoader from '../index.js';

program
  .version('0.0.1')
  .description('Page loader utility.')
  .option('-o, --output [dir]', process.cwd())
  .arguments('<url>')
  .action(async (url) => {
    await pageLoader(url, program.opts().output);
  })
  .parse();
