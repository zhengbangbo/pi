# pi

```bash
pnpm i -g @zhengbangbo/pi

pi
```

[pipenv](https://pipenv.pypa.io/en/latest/) · [poetry](https://python-poetry.org/)

## pi - install
```bash
pi

# pipenv install
# poetry install
```

## pru - run
```bash
pru

# pipenv run
# poetry run
```

## psh - enter virtual environment
```bash
psh

# pipenv shell
# pipenv shell
```

## pun - uninstall
```bash
pun

# pipenv uninsatll
# poetry remove
```

## pu - update
```bash
pu

# pipenv update
# poetry update
```

## pci - clean install
```bash
pci

# pipenv clean
```

## pa - agent alias
```bash
pa

# pipenv
# poetry
```

## How?

**pi** assumes that you work with lockfiles (and you should)

Before it runs, it will detect your Pipfile.lock / poetry.lock to know current package manager and runs the corresponding commands.

## Todo

- [x] detect agent
- [ ] cover main commands
- [ ] install pipenv / poetry script
- [ ] maybe add virtualenv / conda agent

## Thanks

The idea of this project comes from [antfu/ni](https://github.com/antfu/ni).
