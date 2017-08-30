# Rabbit-hole

Find and follow symlinks off `$PATH`

## Installation

```bash
npm install -g rabbit-hole
```

## Usage

```bash
$ rh
├─ /usr/local/bin
...
│  ├─ brew: /usr/local/bin/Homebrew/bin/brew
...
├─ /usr/bin
...
```

```bash
$ rh --path-only # or -p
├─ /usr/local/bin
├─ /usr/bin
├─ /bin
├─ /usr/sbin
└─ /sbin
```

```bash
$ rh --hide-links # or -h
├─ /usr/local/bin
...
│  ├─ brew
...
├─ /usr/bin
...
```
