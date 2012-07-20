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
var relativeDest = function(src) {
  var out = path.resolve(path.dirname(src),path.basename(src, '.coffee') + '.js');
  return out;
};

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
    if (fs.existsSync(relativeDest(src))) {
      fs.unlinkSync(relativeDest(src));
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
    grunt.helper('coffee', [src], null);
    test.equal(grunt.file.read(relativeDest(src)),
               '\nconsole.log("Hello CoffeeScript!");\n',
               'it should compile the coffee');
    test.done();
  }
};
