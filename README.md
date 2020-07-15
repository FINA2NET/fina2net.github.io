## Installation

[install node](https://nodejs.org/en/)

> check node version.

```shell
$ node --version # output v8.11.1 or above
```
> check npm version.
```shell
$ npm --version # output 5.6.0 or above
```
> Install the [gulp](https://gulpjs.com/) command line utility
```shell
$ npm install --global gulp-cli
```
> install node dependencies.
```shell
$ npm install
```

## Developing
To make changes you need to edit [.pug](https://pugjs.org/api/getting-started.html) or [.scss](https://sass-lang.com/guide) files which are located in ./src folder.

Images located in ./assets/img folder.

> Every change in .pug or .scss file requires rebuilding of html and css.
>
>You can use npm.
```shell
$ npm start
```
>Also, you can use gulp.
```shell
$ gulp default
```

"npm start" and "gulp default" both add file watchers on .gulp and .scss files and automatically rebuilds html and css when changes detected.

