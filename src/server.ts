import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { minify } from 'html-minifier';
const cache = require('express-cache-headers')

const minifyOpts = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true
};

const aboveTheFoldCss = `
*, ::after, ::before { box-sizing: inherit; }
html { box-sizing: border-box; font-family: sans-serif; line-height: 1.15; text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; }
body { margin: 0px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 1rem; font-weight: 400; line-height: 1.5; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255); }
article, aside, dialog, figcaption, figure, footer, header, hgroup, main, nav, section { display: block; }
.navbar { position: relative; padding: 0.5rem 1rem; }
.navbar, .navbar > .container, .navbar > .container-fluid { display: flex; flex-wrap: wrap; -webkit-box-align: center; align-items: center; -webkit-box-pack: justify; justify-content: space-between; }
.navbar-toggler { padding: 0.25rem 0.75rem; font-size: 1.25rem; line-height: 1; background: 0px 0px; border: 1px solid transparent; border-radius: 0.25rem; }
.fixed-top { top: 0px; }
.fixed-bottom, .fixed-top { position: fixed; right: 0px; left: 0px; z-index: 1030; }
a { color: rgb(0, 123, 255); text-decoration: none; background-color: transparent; }
[role="button"], a, area, button, input, label, select, summary, textarea { touch-action: manipulation; }
.navbar-brand { display: inline-block; padding-top: 0.3125rem; padding-bottom: 0.3125rem; margin-right: 1rem; font-size: 1.25rem; line-height: inherit; white-space: nowrap; }
.container { margin-right: auto; margin-left: auto; padding-right: 15px; padding-left: 15px; width: 100%; max-width: 1140px; }
.form-row { display: flex; flex-wrap: wrap; margin-right: -5px; margin-left: -5px; }
.col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-auto, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-auto, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-auto, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-auto { position: relative; width: 100%; min-height: 1px; padding-right: 15px; padding-left: 15px; }
.col { flex-basis: 0px; -webkit-box-flex: 1; flex-grow: 1; max-width: 100%; }
.col-sm-12 { -webkit-box-flex: 0; flex: 0 0 100%; max-width: 100%; }
.col-md-12 { -webkit-box-flex: 0; flex: 0 0 100%; max-width: 100%; }
.col-lg-5 { -webkit-box-flex: 0; flex: 0 0 41.6667%; max-width: 41.6667%; }
.col[_ngcontent-c2] { margin: 10px 0px; }
.form-row > .col, .form-row > [class*="col-"] { padding-right: 5px; padding-left: 5px; }
button, input, optgroup, select, textarea { margin: 0px; font-family: inherit; font-size: inherit; line-height: inherit; }
button, input { overflow: visible; }
.form-control { display: block; width: 100%; padding: 0.5rem 0.75rem; font-size: 1rem; line-height: 1.25; color: rgb(73, 80, 87); background-color: rgb(255, 255, 255); background-image: none; background-clip: padding-box; border: 1px solid rgba(0, 0, 0, 0.15); border-radius: 0.25rem; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
.form-control[_ngcontent-c2] { height: 100% !important; }
button, select { text-transform: none; }
select.form-control:not([size]):not([multiple]) { height: calc(2.25rem + 2px); }
.col-lg-2 { -webkit-box-flex: 0; flex: 0 0 16.6667%; max-width: 16.6667%; }
[type="reset"], [type="submit"], button, html [type="button"] { -webkit-appearance: button; }
.btn { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.5rem 0.75rem; font-size: 1rem; line-height: 1.25; border-radius: 0.25rem; transition: all 0.15s ease-in-out; }
.btn-outline-danger { color: rgb(220, 53, 69); background-color: transparent; background-image: none; border-color: rgb(220, 53, 69); }
.btn-group-lg > .btn, .btn-lg { padding: 0.5rem 1rem; font-size: 1.25rem; line-height: 1.5; border-radius: 0.3rem; }
.btn-block { display: block; width: 100%; }
.btn.disabled, .btn:disabled { opacity: 0.65; }
.btn-outline-danger.disabled, .btn-outline-danger:disabled { color: rgb(220, 53, 69); background-color: transparent; }
h1, h2, h3, h4, h5, h6 { margin-top: 0px; margin-bottom: 0.5rem; }
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 { margin-bottom: 0.5rem; font-family: inherit; font-weight: 500; line-height: 1.1; color: inherit; }
.h4, h4 { font-size: 1.5rem; }
.text-center { text-align: center !important; }
*, ::after, ::before { box-sizing: inherit; }
html { box-sizing: border-box; font-family: sans-serif; line-height: 1.15; text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; }
body { margin: 0px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 1rem; font-weight: 400; line-height: 1.5; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255); }
article, aside, dialog, figcaption, figure, footer, header, hgroup, main, nav, section { display: block; }
.navbar { position: relative; padding: 0.5rem 1rem; }
.navbar, .navbar > .container, .navbar > .container-fluid { display: flex; flex-wrap: wrap; -webkit-box-align: center; align-items: center; -webkit-box-pack: justify; justify-content: space-between; }
.navbar-toggler { padding: 0.25rem 0.75rem; font-size: 1.25rem; line-height: 1; background: 0px 0px; border: 1px solid transparent; border-radius: 0.25rem; }
.fixed-top { top: 0px; }
.fixed-bottom, .fixed-top { position: fixed; right: 0px; left: 0px; z-index: 1030; }
a { color: rgb(0, 123, 255); text-decoration: none; background-color: transparent; }
[role="button"], a, area, button, input, label, select, summary, textarea { touch-action: manipulation; }
.navbar-brand { display: inline-block; padding-top: 0.3125rem; padding-bottom: 0.3125rem; margin-right: 1rem; font-size: 1.25rem; line-height: inherit; white-space: nowrap; }
.container { margin-right: auto; margin-left: auto; padding-right: 15px; padding-left: 15px; width: 100%; max-width: 1140px; }
.row { display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px; }
.col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-auto, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-auto, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-auto, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-auto { position: relative; width: 100%; min-height: 1px; padding-right: 15px; padding-left: 15px; }
.col-10 { flex: 0 0 83.3333%; max-width: 83.3333%; }
.col-10, .col-11 { -webkit-box-flex: 0; }
.form-row { display: flex; flex-wrap: wrap; margin-right: -5px; margin-left: -5px; }
.col { flex-basis: 0px; -webkit-box-flex: 1; flex-grow: 1; max-width: 100%; }
.col-sm-12 { -webkit-box-flex: 0; flex: 0 0 100%; max-width: 100%; }
.col-md-12 { -webkit-box-flex: 0; flex: 0 0 100%; max-width: 100%; }
.col-lg-5 { -webkit-box-flex: 0; flex: 0 0 41.6667%; max-width: 41.6667%; }
.col[_ngcontent-c2] { margin: 10px 0px; }
.form-row > .col, .form-row > [class*="col-"] { padding-right: 5px; padding-left: 5px; }
button, input, optgroup, select, textarea { margin: 0px; font-family: inherit; font-size: inherit; line-height: inherit; }
button, input { overflow: visible; }
.form-control { display: block; width: 100%; padding: 0.5rem 0.75rem; font-size: 1rem; line-height: 1.25; color: rgb(73, 80, 87); background-color: rgb(255, 255, 255); background-image: none; background-clip: padding-box; border: 1px solid rgba(0, 0, 0, 0.15); border-radius: 0.25rem; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
.form-control[_ngcontent-c2] { height: 100% !important; }
button, select { text-transform: none; }
select.form-control:not([size]):not([multiple]) { height: calc(2.25rem + 2px); }
.col-lg-2 { -webkit-box-flex: 0; flex: 0 0 16.6667%; max-width: 16.6667%; }
[type="reset"], [type="submit"], button, html [type="button"] { -webkit-appearance: button; }
.btn { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.5rem 0.75rem; font-size: 1rem; line-height: 1.25; border-radius: 0.25rem; transition: all 0.15s ease-in-out; }
.btn-outline-danger { color: rgb(220, 53, 69); background-color: transparent; background-image: none; border-color: rgb(220, 53, 69); }
.btn-group-lg > .btn, .btn-lg { padding: 0.5rem 1rem; font-size: 1.25rem; line-height: 1.5; border-radius: 0.3rem; }
.btn-block { display: block; width: 100%; }
.btn.disabled, .btn:disabled { opacity: 0.65; }
.btn-outline-danger.disabled, .btn-outline-danger:disabled { color: rgb(220, 53, 69); background-color: transparent; }
h1, h2, h3, h4, h5, h6 { margin-top: 0px; margin-bottom: 0.5rem; }
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 { margin-bottom: 0.5rem; font-family: inherit; font-weight: 500; line-height: 1.1; color: inherit; }
.h6, h6 { font-size: 1rem; }
.card { position: relative; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; flex-direction: column; min-width: 0px; word-wrap: break-word; background-color: rgb(255, 255, 255); background-clip: border-box; border: 1px solid rgba(0, 0, 0, 0.125); border-radius: 0.25rem; }
.card[_ngcontent-c3] { margin-bottom: 10px; }
.card-block[_ngcontent-c3] { padding: 20px; }
.h4, h4 { font-size: 1.5rem; }
.card-title { margin-bottom: 0.75rem; }
.card-subtitle { margin-top: -0.375rem; }
.card-subtitle, .card-text:last-child { margin-bottom: 0px; }
.mb-2 { margin-bottom: 0.5rem !important; }
.text-muted { color: rgb(134, 142, 150) !important; }
.lead { font-size: 1.25rem; font-weight: 300; }
.btn-outline-primary { color: rgb(0, 123, 255); background-color: transparent; background-image: none; border-color: rgb(0, 123, 255); }
.btn-group-sm > .btn, .btn-sm { padding: 0.25rem 0.5rem; font-size: 0.875rem; line-height: 1.5; border-radius: 0.2rem; }
*, ::after, ::before { box-sizing: inherit; }
html { box-sizing: border-box; font-family: sans-serif; line-height: 1.15; text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; }
body { margin: 0px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 1rem; font-weight: 400; line-height: 1.5; color: rgb(33, 37, 41); background-color: rgb(255, 255, 255); }
article, aside, dialog, figcaption, figure, footer, header, hgroup, main, nav, section { display: block; }
.navbar { position: relative; padding: 0.5rem 1rem; }
.navbar, .navbar > .container, .navbar > .container-fluid { display: flex; flex-wrap: wrap; -webkit-box-align: center; align-items: center; -webkit-box-pack: justify; justify-content: space-between; }
.navbar-toggler { padding: 0.25rem 0.75rem; font-size: 1.25rem; line-height: 1; background: 0px 0px; border: 1px solid transparent; border-radius: 0.25rem; }
.fixed-top { top: 0px; }
.fixed-bottom, .fixed-top { position: fixed; right: 0px; left: 0px; z-index: 1030; }
a { color: rgb(0, 123, 255); text-decoration: none; background-color: transparent; }
[role="button"], a, area, button, input, label, select, summary, textarea { touch-action: manipulation; }
.navbar-brand { display: inline-block; padding-top: 0.3125rem; padding-bottom: 0.3125rem; margin-right: 1rem; font-size: 1.25rem; line-height: inherit; white-space: nowrap; }
.container { margin-right: auto; margin-left: auto; padding-right: 15px; padding-left: 15px; width: 100%; max-width: 1140px; }
.row { display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px; }
.jumbotron { padding: 4rem 2rem; margin-bottom: 2rem; background-color: rgb(233, 236, 239); border-radius: 0.3rem; }
h1, h2, h3, h4, h5, h6 { margin-top: 0px; margin-bottom: 0.5rem; }
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 { margin-bottom: 0.5rem; font-family: inherit; font-weight: 500; line-height: 1.1; color: inherit; }
.h1, h1 { font-size: 2.5rem; }
.h6, h6 { font-size: 1rem; }
.mb-2 { margin-bottom: 0.5rem !important; }
.text-muted { color: rgb(134, 142, 150) !important; }
p { margin-top: 0px; margin-bottom: 1rem; }
.lead { font-size: 1.25rem; font-weight: 300; }
hr { box-sizing: content-box; height: 0px; overflow: visible; margin-top: 1rem; margin-bottom: 1rem; border-width: 1px 0px 0px; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image: initial; border-top-style: solid; border-top-color: rgba(0, 0, 0, 0.1); }
.my-4 { margin-top: 1.5rem !important; margin-bottom: 1.5rem !important; }
`

const lowerStylesDown = (html) => {
  const link = html.match(/<link href="styles..+.bundle.css" rel="stylesheet"\/>/)[0]
  const href = '/' + link.match(/href="([^"]+)"/)[1]

  return html.replace(link, `<style>${aboveTheFoldCss}</style>`).replace('</body>', `
  <script>
  function loadCSS(href){
    var ss = window.document.createElement('link'), ref = window.document.getElementsByTagName('head')[0];
    ss.rel = 'stylesheet';
    ss.href = href;
    ss.media = 'only x';
    ref.parentNode.insertBefore(ss, ref);
    setTimeout(() => ss.media = 'all',0);
  }
  loadCSS('${href}');
  </script>
  </body>
  `)
};

const PORT = process.env.PORT || 8080;

enableProdMode();

const app = express();
app.use(cache(60));

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
