let rh = require('./rh')

test('shows dirs on path', function () {
  let output = rh.mock()
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
})

test('finds executable', function () {
  let output = rh.mock('find', 'tar')
  expect(output).toMatch(`├─ /usr/bin
│  └─ tar
│     └─ bsdtar
`)
})

test('finds all', function () {
  let output = rh.mock('find-all')
  expect(output).toMatch('├─ /bin')
  expect(output).toMatch('│  ├─ bash')
  expect(output).toMatch('├─ /usr/bin')
})

test('finds all but hides symlinks', function () {
  let output = rh.mock('find-all', '-h')
  expect(output).toMatch('├─ apt\n')
  output = rh.mock('find-all', '--hide-symlinks')
  expect(output).toMatch('├─ apt\n')
})

test('finds executable on override path', function () {
  let output = rh.mock('find', 'jest', `--path=./node_modules/.bin`)
  expect(output).toMatch(/└─(.)+\/node_modules\/.bin/)
  expect(output).toMatch(/\s{2}└─ jest/)
  expect(output).toMatch(/\s{4}└─ (.)+\/jest\.js/)
})

test('shows help', function () {
  let output = rh.mock('help')
  expect(output).toMatch('View rh README at https://github.com/RasPhilCo/rabbit-hole\n')
  output = rh.mock('gibberish')
  expect(output).toMatch('View rh README at https://github.com/RasPhilCo/rabbit-hole\n')
})
