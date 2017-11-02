# Rabbit-hole

Find executables and follow symlinks on `$PATH`

## Installation

```bash
npm install -g path-rabbit-hole
```

## Usage

Executables higher-up take precedence on `$PATH`.

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

#### Show the $PATH tree
```bash
$ rh
├─ /usr/local/bin
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
```

#### Show all executables & symlinks on $PATH
```bash
$ rh list
├─ /usr/local/bin
│  ├─ ...
│  └─ brew
│     └─ /usr/local/Homebrew/bin/brew
│  ├─ ...
├─ /usr/bin
│  ├─ ...
├─ /bin
│  ├─ ...
├─ /usr/sbin
│  ├─ ...
└─ /sbin
   ├─ ...
```

#### Show executables but hide symlinks
```bash
$ rh list --hide-links # or -h
├─ /usr/local/bin
...
│  ├─ brew
...
├─ /usr/bin
...
```

#### Provide a path
```bash
$ rh find jest --path='./node_modules/.bin'
└─ /path/to/node_modules/.bin
   └─ jest
      └─ /path/to/node_modules/jest-cli/bin/jest.js
```
