'use strict';
const createRouter = require('@arangodb/foxx/router');
const db = require('@arangodb').db;
const { query } = require("@arangodb");
const collectionName = 'ga';
const router = createRouter();

module.context.use(router);

router.get('/ga-log', function (req, res) {
    const run = query`
        INSERT { "parms": "GET" , "time": DATE_NOW(), "version": 1} INTO 'gaLog'
    `

    res.send(run);
  })
  .response(['text/plain'], 'A generic greeting.')
  .summary('Generic greeting')
  .description('Prints a generic greeting.');

  router.post('/ga-log', function (req, res) {
    const run = query`
        INSERT { "parms": ${req} , "time": DATE_NOW()} INTO 'gaLog'
    `

    res.send(run);
  })
  .response(['text/plain'], 'A generic greeting.')
  .summary('Generic greeting')
  .description('Prints a generic greeting.');

