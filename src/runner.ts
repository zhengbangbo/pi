import { execaCommand } from 'execa'
import prompts from 'prompts'
import { agents } from './agents'
import type { Agent } from './agents'
import type { DetectOptions } from './detect'
import { detect } from './detect'

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
  const cwd = process.cwd()

  let agent = await detect({ ...options, cwd }) || 'prompt'
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
  const command = await fn(agent as Agent, args, {
    hasLock: Boolean(agent),
    cwd,
  })
  // }

  if (!command)
    return

  await execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd })
}
