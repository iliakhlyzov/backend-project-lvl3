import { promises as fs } from 'fs';
import path from 'path';
import {
  urlToFileName,
  urlToDirName,
  loadPage,
  createFile,
  processAssets,
  buildPath,
  loadContent,
} from './tools.js';

const pageLoader = (url, rawOutputDir) => {
  const outputDir = rawOutputDir === process.cwd()
    ? rawOutputDir : path.join(process.cwd(), rawOutputDir);
  const pageLink = `${url.hostname}${url.pathname}`;
  const pageFilepath = buildPath(outputDir, urlToFileName(`${pageLink}.`));
  const assetsDirname = urlToDirName(pageLink);
  const assetsDirpath = buildPath(outputDir, assetsDirname);

  return loadPage(url.toString())
    .then((page) => fs.mkdir(assetsDirpath).then(() => page))
    .then((page) => processAssets(page, assetsDirname, url.origin))
    .then(({ data, assets }) => createFile(pageFilepath, data).then(() => assets))
    .then((assets) => {
      const promises = assets.map(({ relativePath, link }) => {
        const filepath = buildPath(outputDir, relativePath);
        return loadContent(link).then((data) => createFile(filepath, data));
      });
      return Promise.all(promises).then(() => console.log('done'));
    })
    .catch((err) => console.log(err));
};

export default pageLoader;

/*
нам передают сайт и директорию в которой мы будем хранить сайт
1) загружаем контент страницы
2) получаем все ссылки на этой странице
3) загружаем данные находящиеся по этим ссылкам
4)
 */
