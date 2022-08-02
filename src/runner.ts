import { Agent } from './agents'
import { execaCommand } from 'execa'
import type { DetectOptions } from './detect'
import { detect } from './detect'
import { agents } from './agents'
import prompts from 'prompts'

export interface RunnerContext {
  hasLock?: boolean
  cwd?: string
}

export type Runner = (agent: Agent, args: string[], ctx?: RunnerContext) => Promise<string | undefined> | string | undefined

export async function runCli(fn: Runner, options: DetectOptions = {}) {
  const args = process.argv.slice(2).filter(Boolean)
  try {
    await run(fn, args, options)
  }
  catch (error) {
    process.exit(1)
  }
}

export async function run(fn: Runner, args: string[], options: DetectOptions = {}) {
  let cwd = process.cwd()
  let command

  let agent = await detect({ ...options, cwd })  || 'prompt'
  if (agent === 'prompt') {
    agent = (await prompts({
      name: 'agent',
      type: 'select',
      message: 'Choose the agent',
      choices: agents.filter(i => !i.includes('@')).map(value => ({ title: value, value })),
    })).agent
    if (!agent)
      return
  }
  command = await fn(agent as Agent, args, {
    hasLock: Boolean(agent),
    cwd,
  })
  // }

  if (!command)
    return

  await execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd })
}
