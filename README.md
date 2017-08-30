# Rabbit-hole

Find and follow symlinks off `$PATH`

## Installation

```bash
npm install -g down-the-rabbit-hole
```

## Usage

Executables higher-up take precedence on `$PATH`.

#### Show the whole $PATH tree
```bash
$ rh
├─ /usr/local/bin
...
│  ├─ brew: /usr/local/bin/Homebrew/bin/brew
...
├─ /usr/bin
...
```

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
