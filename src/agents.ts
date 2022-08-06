export const DEFAULT_AGENT: Agent = 'pipenv'

const pipenvRun = (agent: string) => (args: string[]) => {
  if (args.length > 1)
    return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`
  else
    return `${agent} run ${args[0]}`
}

const pipenv = {
  agent: 'pipenv {0}',
  run: pipenvRun('pipenv'),
  install: 'pipenv install',
  add: 'pipenv install {0}',
  upgrade: 'pipenv update {0}',
  uninstall: 'pipenv uninstall {0}',
  shell: 'pipenv shell',
  clean: 'pipenv clean',
}

const poetry = {
  agent: 'poetry {0}',
  run: 'poetry run {0}',
  install: 'poetry install',
  add: 'poetry add {0}',
  upgrade: 'poetry update {0}',
  uninstall: 'poetry remove {0}',
  shell: 'poetry shell',
  clean: null,
}

export const AGENTS = {
  pipenv,
  poetry,
}

export const PROJECTS: Record<Agent, string> = {
  pipenv: 'Pipfile',
  poetry: 'pyproject.toml',
}

export const LOCKS: Record<string, Agent> = {
  'Pipfile.lock': 'pipenv',
  'poetry.lock': 'poetry',
}

export const INSTALL_PAGE: Record<Agent, string> = {
  pipenv: 'https://pipenv.pypa.io/en/latest/',
  poetry: 'https://python-poetry.org/docs/#installation',
}

export type Agent = keyof typeof AGENTS
export type Command = keyof typeof AGENTS.pipenv

export const agents = Object.keys(AGENTS) as Agent[]
