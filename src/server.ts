import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { minify } from 'html-minifier';
const cheerio = require('cheerio')

const minifyOpts = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true
};

const lowerStylesDown = (html) => {
  const $ = cheerio.load(html)
  const styles = $('link[href*=".bundle.css"]');
  $(styles).remove();
  $('script[src*="inline."]').before($(styles).toString());
  return $.html()
};

const PORT = process.env.PORT || 4000;

enableProdMode();

const app = express();

const template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  const opts = { document: lowerStylesDown(template), url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => minify(html, minifyOpts))
    .then(minifiedHtml => callback(null, minifiedHtml));
});

app.set('view engine', 'html');
app.set('views', 'src');

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
