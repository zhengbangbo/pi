import { Agent, AGENTS, Command } from './agents'
import { version } from '../package.json'
import { Runner } from './runner'

export function getCommand(
  agent: Agent,
  command: Command,
  args: string[] = [],
) {

  const c = AGENTS[agent][command]

  if (typeof c === 'function')
    return c(args)

  if (c === null ){
    return c
  }

  return c.replace('{0}', args.join(' ')).trim()
}

export const parsePi = <Runner>((agent, args, ctx) => {
  if (args.length === 1 && args[0] === '-v') {
    // eslint-disable-next-line no-console
    console.log(`@zhengbangbo/pi v${version}`)
    process.exit(0)
  }

  if (args.length === 0 || args.every(i => i.startsWith('-')))
    return getCommand(agent, 'install', args)

  return getCommand(agent, 'add', args)
})

export const parsePru = <Runner>((agent, args, ctx) => {
  if (args.length === 0)
    args.push('start')
    
  return getCommand(agent, 'run', args)
})

export const parsePsh = <Runner>((agent, args, ctx) => {
  return getCommand(agent, 'shell', args)
})

export const parsePui = <Runner>((agent, args, ctx) => {
  return getCommand(agent, 'uninstall', args)
})

export const parsePu = <Runner>((agent, args, ctx) => {
  return getCommand(agent, 'upgrade', args)
})

export const parsePci = <Runner>((agent, args, ctx) => {
  return getCommand(agent, 'clean', args)
})

export const parsePa = <Runner>((agent, args, ctx) => {
  return getCommand(agent, 'agent', args)
})
