import axios from 'axios';
import path from 'path';
import { promises as fs } from 'fs';

const getFilename = (sitename, format = 'html') => {
  const { hostname, pathname } = new URL(sitename);
  const filename = `${hostname}${pathname}`.match(/\w+/g)
    .join('-');
  return `${filename}.${format}`;
};

const createFile = (pathdir, filename, data) => {
  fs.writeFile(path.join(pathdir, filename), data);
};

const pageLoader = (url, outputDir) => {
  const filename = getFilename(url);
  console.log(filename); // delete after test
  axios.get(url)
    .then(({ data }) => data)
    .then((data) => {
      createFile(outputDir, filename, data);
      console.log('ha')
    });
  // fs.access(outputDir + '/' + filename);
};

export default pageLoader;
