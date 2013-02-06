#
# grunt-coffee
# https://github.com/avalade/grunt-coffee
#
# Copyright (c) 2012 Aaron D. Valade
# Licensed under the MIT license.
#

module.exports = (grunt) ->

    helper = (src, destPath, options, extension) ->

        coffee = require("coffee-script")
        js = ""

        extension = (if extension then extension else ".js")

        dest = destPath
        destPath = (if destPath then destPath else path.dirname(src))
        if destPath.indexOf(extension, destPath.length - extension.length) == -1
            dest = path.join(destPath, path.basename(src, ".coffee") + extension)

        options = options or {}
        options.bare = true  if options.bare isnt false

        try
            js = coffee.compile(grunt.file.read(src), options)
            grunt.file.write dest, js
        catch e
            grunt.log.error "Error in " + src + ":\n" + e
            false

    path = require("path")

    grunt.registerMultiTask "coffee", "Compile CoffeeScript files", ->
        [dest, options, extension] = [@files.dest, @data.options, @data.extension]
        @files.forEach (fileobj) ->
            grunt.file.expand(fileobj.src, {filter: "isFile"}).forEach (filepath) ->
                helper filepath, fileobj.dest, grunt.util._.clone(options), extension

        (grunt.task.current.errorCount == 0)
