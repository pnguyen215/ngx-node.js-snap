'use strict';
/* custom base */
exports.ops = require('os');
exports.dns = require('dns');
exports.networks = require('net');
exports.paths = require('path');
exports.fs = require('fs');
exports.https = require('http');
exports.spawn = require('child_process').spawn;

/* custom libs for API */
exports.express = require('express');
exports.cors = require('cors');
exports.bodyParser = require('body-parser');
exports.logger = require('morgan');
exports.dotenv = require('dotenv');
exports.httpStatus = require('http-status');
exports.chalk = require('chalk');
exports.morgan_json = require('morgan-json');
exports.winston = require('winston');
exports.winston_rotate = require('winston-daily-rotate-file');
exports.puppeteer = require('puppeteer');
exports.imagesScraper = require('image-scraper'); // https://www.npmjs.com/package/image-scraper
exports.downloaders = require('images-downloader').images;
exports.downloader = require('image-downloader').image;
exports.zip = require('jszip');
exports.exceljs = require('exceljs'); // https://www.npmjs.com/package/exceljs
exports.nodejs_web_scaper = require('nodejs-web-scraper');
exports.validation_url = require('valid-url');
exports.scrape = require('website-scraper'); // version 4.2.3 work, v5 not work cause only as ESM, no CommonJS 
// import scrape from 'website-scraper';