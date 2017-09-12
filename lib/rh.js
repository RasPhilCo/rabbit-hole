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
  // parse args and flags
  let parsedArgv = [].concat(argv)
  let providedPath
  for (let i in argv) {
    let arg = argv[i]
    // split any short flags
    if (arg.match(/^-\w{2,}/)) {
      parsedArgv = parsedArgv.concat(arg.split('').filter(a => a !== '-').map(a => `-${a}`))
    }
    // check for a provided path
    if (arg.match(/--path/)) {
      let p = arg.split('=')[1]
      if (p) {
        providedPath = p.split(':').map(s => path.resolve(s)).join(':')
      }
    }
  }
  // set switches
  let rootOnly = parsedArgv.includes('--path-only') || parsedArgv.includes('-p')
  let hideLink = parsedArgv.includes('--hide-links') || parsedArgv.includes('-h')
  // set args
  let findName = argv[0] === 'find' ? argv[1] : undefined
  // set path
  let pathToTraverse = providedPath || process.env.PATH

  // if help
  // show README
  if (argv[0] === 'help' || argv[0] === '--help') {
    return 'View rh README at https://github.com/RasPhilCo/rabbit-hole\n'
  }

  // if find cmd
  // ignore rootOnly
  if (findName) rootOnly = false

  // split path into locales and
  // start populating tree
  let locales = pathToTraverse.split(':')
  let tree = {}
  for (let i in locales) {
    let locale = locales[i]
    tree[locale] = {}
    // skip tree sub-branches
    // if rootOnly
    if (!rootOnly) {
      // read the locale's content
      let contents
      try {
        contents = fs.readdirSync(locale)
      } catch (err) { continue }
      // enumerate contents
      for (let j in contents) {
        let name = contents[j]
        // if looking for name, skip unmatched
        if (findName && findName !== name) continue
        // get symlink if it exists
        let symlink = null
        try {
          let bin = `${locale}/${name}`
          symlink = fs.readlinkSync(bin)
          if (symlink.includes('./')) {
            symlink = path.join(locale, symlink)
          }
        } catch (err) {}
        // populate tree with name and link/null
        tree[locale][name] = hideLink ? null : symlink
      }
    }
  }

  return treeify.asTree(tree, true)
}

module.exports.run = run
module.exports.mock = mock
