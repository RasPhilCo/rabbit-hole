#! /usr/bin/env node
'use strict'

let fs = require('fs-extra')
let path = require('path')
let treeify = require('treeify')

function run () {
  let argv = process.argv.slice(2)
  let tree = _traverse(argv)
  console.log(tree)
}

function mock (argv) {
  return _traverse(argv)
}

function _traverse (argv = []) {
  let searchName
  if (argv[0] === 'find') searchName = argv[1]

  let short = []
  let dir
  for (let i in argv) {
    let arg = argv[i]
    if (arg.match(/^-\w+/)) {
      short = short.concat(arg.split('').filter(a => a !== '-'))
    }
    if (arg.match(/--path/)) {
      dir = arg.split('=')[1]
    }
  }
  argv = argv.concat(short)
  if (dir) {
    dir = dir.split(':').map(s => path.resolve(s)).join(':')
  }

  let rootOnly = argv.includes('--path-only') || argv.includes('p')
  let hideLink = argv.includes('--hide-links') || argv.includes('h')

  let locales = (dir || process.env.PATH).split(':')
  let tree = {}
  for (let i in locales) {
    let locale = locales[i]
    tree[locale] = {}
    if (!rootOnly) {
      let links
      try {
        links = fs.readdirSync(locale)
      } catch (err) {
        continue
      }
      for (let j in links) {
        let name = links[j]
        if (searchName && searchName !== name) continue
        let symlink = null
        try {
          let bin = `${locale}/${links[j]}`
          symlink = fs.readlinkSync(bin)
          if (symlink.includes('./')) {
            symlink = path.join(locale, symlink)
          }
        } catch (err) {}
        tree[locale][name] = hideLink ? null : symlink
      }
    }
  }

  return treeify.asTree(tree, true)
}

module.exports.run = run
module.exports.mock = mock
