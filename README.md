# roperzh.com

:warning: this repo is no longer maintained, check out my new site at https://github.com/roperzh/roperzh.com


This is the data for my personal website, proudly powered by [Hugo](http://hugo.spf13.com/)

## Dependencies

- Hugo v0.13
- Node.js && Grunt.js

## Quick start

To compile / watch the assets, run:

```bash
$ npm install
$ grunt
```

To start the Hugo server, run:

```bash
$ hugo server --watch --buildDrafts
```

## Deployment

At first place, you need to configure your `deploy.sh` file, a sample is
provided in the document root. Then just run:

```bash
$ npm run deploy
```

Voilà!
