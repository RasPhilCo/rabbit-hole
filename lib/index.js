#! /usr/bin/env node
'use strict'

let fs = require('fs-extra')
let path = require('path')
let treeify = require('treeify')

let argv = process.argv.slice(2)

let short = []
for (let i in argv) {
  let arg = argv[i]
  if (arg.match(/^-\w+/)) {
    short = short.concat(arg.split('').filter(a => a !== '-'))
  }
}
argv = argv.concat(short)

let rootOnly = argv.includes('--only-path') || argv.includes('p')
let hideLink = argv.includes('--hide-links') || argv.includes('h')

let locales = process.env.PATH.split(':')
let tree = {}
for (let i in locales) {
  let locale = locales[i]
  tree[locale] = {}
  if (!rootOnly) {
    let links = fs.readdirSync(locale)
    for (let j in links) {
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
