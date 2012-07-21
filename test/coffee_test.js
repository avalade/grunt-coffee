var grunt = require('grunt'),
    fs = require('fs'),
    path = require('path');

fs.existsSync = fs.existsSync ? fs.existsSync : path.existsSync;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var src = 'test/fixtures/hello_world.coffee';
var destFolder = 'tmp/js';
var dest1 = 'test/fixtures/hello_world.js';
var dest2 = 'test/fixtures/hello_world.coffee.js';

exports['coffee'] = {
  setUp: function(done) {
    done();
  },

  tearDown: function(done) {
    if (fs.existsSync(destFolder)) {
      if ( fs.existsSync(destFolder + '/hello_world.js') ) {
        fs.unlinkSync(destFolder + '/hello_world.js');
      }
      fs.rmdirSync(destFolder);
    }

    if (fs.existsSync(dest1)) {
      fs.unlinkSync(dest1);
    }
    if (fs.existsSync(dest2)) {
      fs.unlinkSync(dest2);
    }
    done();
  },

  'helper': function(test) {
    test.expect(2);

    grunt.helper('coffee', [src], destFolder);
    test.equal(grunt.file.read(destFolder + '/hello_world.js'),
               '\nconsole.log("Hello CoffeeScript!");\n',
               'it should compile the coffee');

    grunt.helper('coffee', [src], destFolder, { bare:false });
    test.equal(grunt.file.read(destFolder + '/hello_world.js'),
               '(function() {\n\n  console.log("Hello CoffeeScript!");\n\n}).call(this);\n',
               'it should compile the coffee');

    test.done();
  },

  'helper-nodest': function(test) {
    test.expect(1);
    grunt.helper('coffee', [src]);
    test.equal(grunt.file.read(dest1),
               '\nconsole.log("Hello CoffeeScript!");\n',
               'it should compile the coffee');
    test.done();
  },

  'helper-extension': function(test) {
    test.expect(1);
    grunt.helper('coffee', [src], null, {}, '.coffee.js');
    test.ok(fs.existsSync(dest2));
    test.done();
  }
};
