#! /usr/bin/env node
'use strict'

let fs = require('fs-extra')
let path = require('path')
let treeify = require('treeify')

function run (mock = false, mockArgv = []) {
  let argv = process.argv.slice(2)

  if (mock) argv = mockArgv

  let short = []
  for (let i in argv) {
    let arg = argv[i]
    if (arg.match(/^-\w+/)) {
      short = short.concat(arg.split('').filter(a => a !== '-'))
    }
  }
  argv = argv.concat(short)

  let rootOnly = argv.includes('--path-only') || argv.includes('p')
  let hideLink = argv.includes('--hide-links') || argv.includes('h')

  let locales = process.env.PATH.split(':')
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

  let output = treeify.asTree(tree, true)
  if (mock) {
    return output
  } else {
    console.log(output)
  }
}

function mock (argv) {
  return run(true, argv)
}

module.exports.run = run
module.exports.mock = mock
