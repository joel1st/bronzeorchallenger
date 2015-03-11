#!/usr/bin/env node
var debug = require('debug')('bronze');
var app = require('../app');
var db = require('../db');

app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
