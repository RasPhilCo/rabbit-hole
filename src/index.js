#! /usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var treeify = require('treeify');

var argv = process.argv.slice(2)

var short = []
for (var i in argv) {
  var arg = argv[i]
  if (arg.match(/^-\w+/)) {
    short = short.concat(arg.split('').filter(a => a !== '-'))
  }
}
argv = argv.concat(short)

var rootOnly = argv.includes('--only-path') || argv.includes('p')
var hideLink = argv.includes('--hide-links') || argv.includes('h')

var locales = process.env.PATH.split(':')
let tree = {}
for (var i in locales) {
  var locale = locales[i]
  tree[locale] = {}
  if (!rootOnly){
    var links = fs.readdirSync(locale)
    for (var j in links) {
      let symlink = null
      try {
        symlink = fs.readlinkSync(`${locale}/${links[j]}`)
        symlink = path.resolve(symlink)
      } catch (err) {
        // we only want symlinks
        continue
      }
      tree[locale][links[j]] = hideLink ? null : symlink
    }
  }
}

console.log(treeify.asTree(tree, true))
