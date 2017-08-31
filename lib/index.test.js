let rh = require('./rh')

test('only shows dirs on path', function () {
  let output = rh.mock(['-p'])
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
  output = rh.mock(['--path-only'])
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
})

test('shows symlinks', function () {
  let output = rh.mock()
  expect(output).toMatch('├─ apt: /')
})

test('hides symlinks', function () {
  let output = rh.mock(['-h'])
  expect(output).toMatch('├─ apt\n')
  output = rh.mock(['--hide-links'])
  expect(output).toMatch('├─ apt\n')
})

test('finds brew', function () {
  let output = rh.mock(['find', 'brew'])
  expect(output).toMatch(/│\s{2}└─ brew: \/usr\/local\/Homebrew\/bin\/brew/)
})

test('finds heroku', function () {
  let output = rh.mock(['find', 'heroku'])
  expect(output).toMatch(/│\s{2}└─ heroku: \/usr\/local\/Cellar\/heroku\/\d{1,2}\.\d{1,2}\.\d{1,2}\/bin\/heroku/)
})

test('override path', function () {
  let output = rh.mock(['find', 'jest', `--path=./node_modules`])
  expect(output).toMatch(/└─(.)+\/node_modules/)
  expect(output).toMatch(/\s{2}└─ jest/)
})
