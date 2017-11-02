let rh = require('./rh')

test('only shows dirs on path', function () {
  let output = rh.mock()
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
  output = rh.mock()
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
})

test('shows symlinks', function () {
  let output = rh.mock('list')
  expect(output).toMatch('├─ /bin')
  expect(output).toMatch('│  ├─ bash')
  expect(output).toMatch('├─ /usr/bin')
})

test('hides symlinks', function () {
  let output = rh.mock('list', '-h')
  expect(output).toMatch('├─ apt\n')
  output = rh.mock('list', '--hide-links')
  expect(output).toMatch('├─ apt\n')
})

test('finds tar', function () {
  let output = rh.mock('find', 'tar')
  expect(output).toMatch(`├─ /usr/bin
│  └─ tar
│     └─ bsdtar
`)
})

test('override path', function () {
  let output = rh.mock('find', 'jest', `--path=./node_modules/.bin`)
  expect(output).toMatch(/└─(.)+\/node_modules\/.bin/)
  expect(output).toMatch(/\s{2}└─ jest/)
  expect(output).toMatch(/\s{4}└─ (.)+\/jest\.js/)
})

test('shows help', function () {
  let output = rh.mock('help')
  expect(output).toMatch('View rh README at https://github.com/RasPhilCo/rabbit-hole\n')
})
