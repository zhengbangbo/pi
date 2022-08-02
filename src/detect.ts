import { Agent, INSTALL_PAGE, LOCKS } from './agents'
import { findUp } from 'find-up'
import path from 'path'
import { cmdExists } from "./utils"
import terminalLink from 'terminal-link'
import prompts from 'prompts'

export interface DetectOptions {
  autoInstall?: boolean
  cwd?: string
}

export async function detect({ autoInstall, cwd }: DetectOptions) {
  let agent: Agent | null = null

  const lockPath = await findUp(Object.keys(LOCKS), { cwd } )

  // detect based on lock
  if (!agent && lockPath)
    agent = LOCKS[path.basename(lockPath)]
  
  // auto install
  if (agent && !cmdExists(agent.split('@')[0])) {
    if (!autoInstall) {
      console.warn(`[pi] Detected ${agent} but it doen't seem to be installed.\n`)

      if (process.env.CI)
        process.exit(1)

      const link = terminalLink(agent, INSTALL_PAGE[agent])
      const { tryInstall } = await prompts({
        name: 'tryInstall',
        type: 'confirm',
        message: `Would you link to globally install ${link}?`,
      })
      if (!tryInstall)
        process.exit(1)
    }
  }

  return agent
}
