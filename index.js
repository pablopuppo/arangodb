'use strict';
const createRouter = require('@arangodb/foxx/router');
const joi = require('joi');
const db = require('@arangodb').db;
const { query } = require("@arangodb");
const foxxColl = db._collection('gaLog');
const collectionName = 'ga';
const router = createRouter();

module.context.use(router);

router.get('/ga-log', function (req, res) {
    const run = query`
        for l in gaLog return l
    `.toArray();
    
    res.send(JSON.parse(run));
  })
  .response(['text/plain'], 'A generic greeting.')
  .summary('Generic greeting')
  .description('Prints a generic greeting.');

router.post('/ga-log', function (req, res) {
    const data = req.body;
    if (data._key) {
      const run = query`
      FOR l in gaLog FILTER l._key == '${data._key}' update l WITH { diff: 'ok' } INTO 'gaLog'
  `

    res.send(run);
    }
    const meta = foxxColl.save(req.body);
    res.send(Object.assign(data, meta));
  })
  .body(joi.object().required(), 'Entry to store in the collection')
  .response(joi.object().required(), 'Entry stored in the collection')
  .summary('Generic greeting')
  .description('Prints a generic greeting.');

