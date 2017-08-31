# Rabbit-hole

Find and follow symlinks off `$PATH`

## Installation

```bash
npm install -g down-the-rabbit-hole
```

## Usage

Executables higher-up take precedence on `$PATH`.

#### Find an executable on $PATH
```bash
$ rh find brew
├─ /usr/local/bin
│  └─ brew: /usr/local/Homebrew/bin/brew
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
```

#### Show the whole $PATH tree
```bash
$ rh
├─ /usr/local/bin
│  ├─ ...
│  ├─ brew: /usr/local/Homebrew/bin/brew
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

#### Show directories on $PATH only
```bash
$ rh --path-only # or -p
├─ /usr/local/bin
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
```

#### Hide symlink source
```bash
$ rh --hide-links # or -h
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
   └─ jest: /path/to/node_modules/jest-cli/bin/jest.js
```
