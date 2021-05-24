import pageLoader from './src/index.js';

export default (url, outputDir = process.cwd()) => pageLoader(url, outputDir);
