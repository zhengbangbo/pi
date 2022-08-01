import { Agent, AGENTS, Command } from './agents'

export function getCommand(agent: Agent, commnad: Command, args: string[]) {
  const c = AGENTS[agent][commnad]

  if (typeof c === 'function')
    return c(args)

  return c.replace('{0}', args.join(' '))
}

export function parsePi(agent: Agent, _args: string[]): string {
  let command: Command = 'install'
  let args: string[] = []

  if (_args.length === 0) {
    command = 'install'
    args = []
  }
  else {
    command = 'add'
    args = _args
  }

  return getCommand(agent, command, args)
}
