import _ from 'lodash';
import path from 'path';
import os from 'os';
import nock from 'nock';
import { promises as fs } from 'fs';
import pageLoader from '../index.js';

/*
  перед каждым тестом мы создаем временную директорию, в которой мы будем сохранять файл
  в начале теста нужно проверить, что в созданной директории нет файла
  далее бы блокируем http соединение для сайта, на который хотим отправить запрос, с помощью
  библиотеки nock которая подменяет метод http;
  полученный ответ программа должна сохранить во временную директорию. данные в этом
  файле должны быть такими же, как и полученные данные
  после всего мы удаляем директорию и файлы
*/

nock.disableNetConnect();

const baseUrl = 'https://ru.hexlet.io';
const page = '/courses';
const expectedData = 'data from ya.ru';
const expectedFilename = 'ru-hexlet-io-courses.html';

let tmpDirPath = '';

const readFile = (dirpath, filename) => fs.readFile(path.resolve(dirpath, filename), 'utf-8');
const existsFile = async (dirpath, filename) => fs.readdir(dirpath)
  .then((filenames) => filenames.includes(filename));

beforeEach(async () => {
  tmpDirPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-')); // перехватывание всех запросов на эту страницу
});

afterAll(async () => {
  await fs.unlink(path.join(tmpDirPath, expectedFilename)).catch(_.noop);
  await fs.rmdir(tmpDirPath);
});

test('tmpdir', async () => {
  const isFileExistsBefore = await existsFile(tmpDirPath, expectedFilename);
  console.log(await existsFile(tmpDirPath, expectedFilename));
  expect(isFileExistsBefore).toBeFalsy();

  nock(baseUrl).get(page).reply(200, expectedData);
  await pageLoader(`${baseUrl}${page}`, tmpDirPath);

  const isFileExistsAfter = await existsFile(tmpDirPath, expectedFilename);
  expect(isFileExistsAfter).toBeTruthy();

  const data = await readFile(tmpDirPath, expectedFilename);
  expect(data).toEqual(expectedData);
});
