import path from 'path';
import axios from 'axios';
import { promises as fs } from 'fs';
import cheerio from 'cheerio';

export const processName = (name) => name
  .match(/\w+/gi)
  .filter((x) => x)
  .join('-');

export const urlToFileName = (link, defaultFormat = '.html') => {
  const { dir, name, ext } = path.parse(link);
  const filename = processName(path.join(dir, name));
  const format = ext || defaultFormat;
  return `${filename}${format}`;
};

export const urlToDirName = (link, end = '_files') => {
  const { dir, name, ext } = path.parse(link);
  const dirname = processName(path.join(dir, name, ext));
  return `${dirname}${end}`;
};

export const loadPage = (link) => axios.get(link.toString(), { responseType: 'arraybuffer' })
  .then(({ data }) => data);

export const createDir = (dirpath) => fs.mkdir(dirpath);
export const buildPath = path.join;

export const createFile = (filepath, data) => fs
  .writeFile(filepath, data, { encoding: 'utf-8' });

export const processAssets = (html, assetsDirname, origin) => {
  const $ = cheerio.load(html, { decodeEntities: false });
  const tagAttrNamesMap = {
    link: 'href',
    img: 'src',
  };
  const assets = Object.entries(tagAttrNamesMap).flatMap(([tagName, attrName]) => {
    const patternElement = `${tagName}[${attrName}]`;
    const localAssets = $(patternElement).toArray().filter((element) => {
      const url = new URL($(element).attr(attrName), origin);
      return url.origin === origin;
    });
    return localAssets.map((element) => {
      const urlPath = $(element).attr(attrName);
      const url = new URL(urlPath, origin);
      const relativePath = path.join(assetsDirname, urlToFileName(`${url.hostname}${url.pathname}`));
      $(element).attr(attrName, relativePath);
      return { relativePath, link: url.toString() };
    });
  });

  return { data: $.html(), assets };
};

export const loadContent = (link) => axios.get(link, { responseType: 'arraybuffer' })
  .then(({ data }) => data);
