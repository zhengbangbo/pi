/* eslint-disable no-use-before-define */
export const DEFAULT_AGENT: Agent = 'pipenv'

const pipenvRun = (agent: string) => (args: string[]) => {
  if (args.length > 1)
    return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`
  else
    return `${agent} run ${args[0]}`
}

export const AGENTS = {
  pipenv: {
    run: pipenvRun('pipenv'),
    install: 'pipenv install',
    add: 'pipenv install {0}',
    shell: 'pipenv shell'
  }
}

export const LOCKS: Record<string, Agent> = {
  'Pipfile.lock': 'pipenv'
}

export type Agent = keyof typeof AGENTS
export type Command = keyof typeof AGENTS.pipenv
