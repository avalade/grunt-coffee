(function() {

  module.exports = function(grunt) {
    var helper, path;
    helper = function(src, destPath, options, extension) {
      var coffee, dest, js;
      coffee = require("coffee-script");
      js = "";
      extension = (extension ? extension : ".js");
      dest = destPath;
      destPath = (destPath ? destPath : path.dirname(src));
      if (destPath.indexOf(extension, destPath.length - extension.length) === -1) {
        dest = path.join(destPath, path.basename(src, ".coffee") + extension);
      }
      options = options || {};
      if (options.bare !== false) {
        options.bare = true;
      }
      try {
        js = coffee.compile(grunt.file.read(src), options);
        return grunt.file.write(dest, js);
      } catch (e) {
        grunt.log.error("Error in " + src + ":\n" + e);
        return false;
      }
    };
    path = require("path");
    return grunt.registerMultiTask("coffee", "Compile CoffeeScript files", function() {
      var dest, extension, options, _ref;
      _ref = [this.files.dest, this.data.options, this.data.extension], dest = _ref[0], options = _ref[1], extension = _ref[2];
      this.files.forEach(function(fileobj) {
        return grunt.file.expand(fileobj.src, {
          filter: "isFile"
        }).forEach(function(filepath) {
          return helper(filepath, fileobj.dest, grunt.util._.clone(options), extension);
        });
      });
      return grunt.task.current.errorCount === 0;
    });
  };

}).call(this);
