import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
const treeify = require('treeify')

class PathRabbitHole extends Command {
  static description = 'Find any executable on $PATH and view its symlink chain'

  static examples = [
    `$ rh
├─ /usr/local/bin
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
`,
    `$ rh brew
├─ /usr/local/bin
│  └─ brew
│     └─ /usr/local/Homebrew/bin/brew
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
`,
  ]

  static flags = {
    version: flags.version(),
    help: flags.help(),
    path: flags.string({char: 'p', description: 'path string to traverse'}),
    'hide-symlinks': flags.boolean({char: 'd'}),
    'find-all': flags.boolean({char: 'a'})
  }

  static args = [{name: 'executable'}]

  async run() {
    const {args, flags} = this.parse(PathRabbitHole)

    // set path
    const pathToTraverse = flags.path || process.env.PATH || ''

    // split path into locales and
    // start populating tree
    let locales = pathToTraverse.split(':')
    let tree: any = {}
    for (let locale of locales) {
      tree[locale] = {}
      // skip tree sub-branches
      // if no executable or find-all
      if (args.executable || flags['find-all']) {
        const findName = flags['find-all'] ? undefined : args.executable
        const hideLink = flags['hide-symlinks'] || false
        // read the locale's content
        let contents
        try {
          contents = fs.readdirSync(locale)
        } catch { continue }
        // enumerate contents
        for (let name of contents) {
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
          } catch {}
          // populate tree with name and link/null
          tree[locale][name] = hideLink ? null : {}
          if (!hideLink && symlink) {
            tree[locale][name][symlink] = {}
            this.followSymlink(tree[locale][name][symlink], symlink)
          }
        }
      }
    }
    const pathTree = treeify.asTree(tree, true)
    this.log(pathTree)
  }

  private followSymlink(node: any, symlink: string) {
    let furtherlink = null
    try {
      furtherlink = fs.readlinkSync(symlink)
      if (furtherlink.includes('./')) {
        furtherlink = path.join(symlink, '..', furtherlink)
      }
    } catch {
      return
    }
    if (furtherlink) {
      node[furtherlink] = {}
      this.followSymlink(node[furtherlink], furtherlink)
    }
  }
}

export = PathRabbitHole
