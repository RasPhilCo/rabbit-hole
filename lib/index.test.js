let rh = require('./rh')

test('only shows dirs on path', function () {
  // expect.assertions(2)
  let output = rh.mock(['-p'])
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
  output = rh.mock(['--only-path'])
  expect(output).toMatch('├─ /usr/bin\n├─ /bin\n')
})

test('shows symlinks', function () {
  let output = rh.mock()
  expect(output).toMatch('├─ apt: /')
})

test('hides symlinks', function () {
  // expect.assertions(2)
  let output = rh.mock(['-h'])
  expect(output).toMatch('├─ apt\n')
  output = rh.mock(['--hide-links'])
  expect(output).toMatch('├─ apt\n')
})
