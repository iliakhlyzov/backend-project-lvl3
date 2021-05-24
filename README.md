### Hexlet tests and linter status:
[![Actions Status](https://github.com/iliakhlyzov/backend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/iliakhlyzov/backend-project-lvl3/actions)
<a href="https://codeclimate.com/github/iliakhlyzov/backend-project-lvl3/maintainability"><img src="https://api.codeclimate.com/v1/badges/cb9e7d6c62d4385ce80c/maintainability" /></a>
<a href="https://codeclimate.com/github/iliakhlyzov/backend-project-lvl3/test_coverage"><img src="https://api.codeclimate.com/v1/badges/cb9e7d6c62d4385ce80c/test_coverage" /></a>
[![GitHub Actions Demo](https://github.com/iliakhlyzov/backend-project-lvl3/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/iliakhlyzov/backend-project-lvl3/actions/workflows/github-actions-demo.yml)


<h2>Описание</h2>
PageLoader – утилита командной строки, которая скачивает страницы из интернета и сохраняет их на компьютере. Вместе со страницей она скачивает все ресурсы (картинки, стили и js) давая возможность открывать страницу без интернета.

По такому же принципу устроено сохранение страниц в браузере.

Пример использования:

    $ page-loader --output /var/tmp https://ru.hexlet.io/courses

    ✔ https://ru.hexlet.io/lessons.rss
    ✔ https://ru.hexlet.io/assets/application.css
    ✔ https://ru.hexlet.io/assets/favicon.ico
    ✔ https://ru.hexlet.io/assets/favicon-196x196.png
    ✔ https://ru.hexlet.io/assets/favicon-96x96.png
    ✔ https://ru.hexlet.io/assets/favicon-32x32.png
    ✔ https://ru.hexlet.io/assets/favicon-16x16.png
    ✔ https://ru.hexlet.io/assets/favicon-128.png

Утилита скачивает ресурсы параллельно и показывает прогресс по каждому ресурсу в терминале
____



Page was downloaded as 'ru-hexlet-io-courses.html'
Утилита скачивает ресурсы параллельно и показывает прогресс по каждому ресурсу в терминале