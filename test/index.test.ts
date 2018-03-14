import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('path-rabbit-hole', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('shows dirs on path', ctx => {
    expect(ctx.stdout).to.match(/├─ \/usr\/bin\n├─ \/(s)?bin\n/)
  })

  test
  .stdout()
  .do(() => cmd.run(['yes']))
  .it('finds executable', ctx => {
    expect(ctx.stdout).to.contain('├─ /usr/bin\n│  └─ yes\n')
  })

  test
  .stdout()
  .do(() => cmd.run(['--find-all']))
  .it('finds all', ctx => {
    expect(ctx.stdout).to.contain('├─ /usr/bin\n')
    expect(ctx.stdout).to.contain('│  ├─ yes\n')
  })

  test
  .stdout()
  .do(() => cmd.run(['-a', '-h']))
  .it('finds all but hides symlinks', ctx => {
    expect(ctx.stdout).to.contain('├─ apt')
  })

  test
  .stdout()
  .do(() => cmd.run(['mocha', '--path=./node_modules/.bin']))
  .it('finds executable on override path', ctx => {
    expect(ctx.stdout).to.match(/└─(.)+\/node_modules\/.bin/)
    expect(ctx.stdout).to.match(/\s{2}└─ mocha/)
    expect(ctx.stdout).to.match(/\s{4}└─ node_modules\/mocha\/bin\/mocha/)
  })
})
