"use strict";
var errors = {
  youtubeVideoNotFound: 'Your youtube video did not appear to exist, if you just uploaded it wait a little longer :)',
  databaseError: 'Something must be broken, sorry!',
  notFound: 'The thing that you\'re trying to access can\'t be found, sorry!'
};

var produceError = function(errorType, errorNumber){
  var err = new Error(errors[errorType]);
  err.status = errorNumber || 404;
  return err;
};

module.exports = produceError;