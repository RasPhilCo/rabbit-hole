# Rabbit-hole

Find any executable on `$PATH` and view its symlink chain

[![Version](https://img.shields.io/npm/v/rabbit-hole.svg)](https://npmjs.org/package/rabbit-hole)
[![CircleCI](https://circleci.com/gh/RasPhilCo/rabbit-hole/tree/master.svg?style=shield)](https://circleci.com/gh/RasPhilCo/rabbit-hole/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/RasPhilCo/rabbit-hole?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/rabbit-hole/branch/master)
[![Codecov](https://codecov.io/gh/RasPhilCo/rabbit-hole/branch/master/graph/badge.svg)](https://codecov.io/gh/RasPhilCo/rabbit-hole)
[![Greenkeeper](https://badges.greenkeeper.io/RasPhilCo/rabbit-hole.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/RasPhilCo/rabbit-hole/badge.svg)](https://snyk.io/test/github/RasPhilCo/rabbit-hole)
[![Downloads/week](https://img.shields.io/npm/dw/rabbit-hole.svg)](https://npmjs.org/package/rabbit-hole)
[![License](https://img.shields.io/npm/l/rabbit-hole.svg)](https://github.com/RasPhilCo/rabbit-hole/blob/master/package.json)


## Installation

```bash
npm install -g path-rabbit-hole
```

## Usage

Executables higher-up in the tree take precedence on `$PATH`.

#### Show the $PATH tree
```bash
$ rh
├─ /usr/local/bin
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
```

#### Find an executable on $PATH
```bash
$ rh brew
├─ /usr/local/bin
│  └─ brew
│     └─ /usr/local/Homebrew/bin/brew
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
```

#### Provide a path to search through
```bash
$ rh jest --path='./node_modules/.bin'
└─ /path/to/node_modules/.bin
   └─ jest
      └─ /path/to/node_modules/jest-cli/bin/jest.js
```

#### Find all executables & symlinks on $PATH
```bash
$ rh --find-all # or -a
```

#### Find all executables but hide symlinks
```bash
$ rh -a --hide-symlinks # or -d
```
