import axios from 'axios';
import path from 'path';
import { promises as fs } from 'fs';

const getFilename = (sitename, format = 'html') => {
  const { hostname, pathname } = new URL(sitename);
  const filename = `${hostname}${pathname}`.match(/\w+/gi)
    .filter((x) => x)
    .join('-');
  return `${filename}.${format}`;
};

const createFile = (pathdir, filename, data) => fs.writeFile(
  path.resolve(pathdir, filename), data,
);

const pageLoader = (url, outputDir) => {
  const filename = getFilename(url);
  return axios.get(url)
    .then(({ data }) => data)
    .then((data) => createFile(outputDir, filename, data));
};

export default pageLoader;
