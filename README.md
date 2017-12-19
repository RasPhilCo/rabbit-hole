# Rabbit-hole

Find any executable on `$PATH` and view its symlink chain

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
$ rh find brew
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
$ rh find jest --path='./node_modules/.bin'
└─ /path/to/node_modules/.bin
   └─ jest
      └─ /path/to/node_modules/jest-cli/bin/jest.js
```

#### Find all executables & symlinks on $PATH
```bash
$ rh find-all
```

#### Find all executables but hide symlinks
```bash
$ rh find-all --hide-symlinks # or -h
```
