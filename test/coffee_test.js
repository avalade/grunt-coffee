"use strict";

var grunt = require('grunt'),
    fs = require('fs'),
    path = require('path'),
    src = 'test/fixtures/hello_world.coffee',
    destFolder = 'tmp/';

fs.existsSync = fs.existsSync ? fs.existsSync : path.existsSync;

exports.coffee = {

  setUp: function(done) {
    done();
  },

  'task': function(test) {
    test.expect(2);

    test.equal(grunt.file.read(destFolder + '/hello_world_bare.js'),
               '\nconsole.log("Hello CoffeeScript!");\n',
               'it should compile the coffee');

    test.equal(grunt.file.read(destFolder + '/hello_world.js'),
               '(function() {\n\n  console.log("Hello CoffeeScript!");\n\n}).call(this);\n',
               'it should compile the coffee');

    test.done();
  }
};
