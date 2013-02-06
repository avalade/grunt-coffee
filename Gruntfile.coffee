module.exports = (grunt) ->

    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')

        jshint:
            files: [ "src/**/*.js", "test/**/*.js" ]
            options:
                curly: true
                eqeqeq: true
                immed: true
                latedef: true
                newcap: true
                noarg: true
                sub: true
                undef: true
                boss: true
                eqnull: true
                node: true
                es5: true

            globals: {}

        clean:
            src: ["tmp/"]

        coffee:
            coffee:
                files:
                    "tasks/coffee.js": "src/coffee.coffee"
                options:
                    bare: false

            test1:
                files:
                    "tmp/hello_world.js": ["test/fixtures/hello_world.coffee"]
                options:
                    bare: false

            test2:
                files:
                    "tmp/hello_world_bare.js": "test/fixtures/hello_world.coffee"
                options:
                    bare: true

        nodeunit:
            files: [ "test/**/*.js" ]

        watch:
            files: "<config:jshint.files>"
            tasks: "default"


    grunt.loadTasks "tasks"

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask "default", ["coffee:coffee", "jshint", "coffee:test1", "coffee:test2", "nodeunit"]
