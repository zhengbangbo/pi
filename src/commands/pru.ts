import type { Choice } from 'prompts'
import prompts from 'prompts'
import { dump, load } from '../storage'
import { parsePru } from '../parse'
import { runCli } from '../runner'
import { getProjectToml } from '../fs'

runCli(async (agent, args, ctx) => {
  const storage = await load()

  if (args[0] === '-') {
    if (!storage.last_run_command) {
      console.error('No last command found')
      process.exit(1)
    }
    args[0] = storage.last_run_command
  }

  if (args.length === 0) {
    const project_file = getProjectToml(ctx?.cwd) || {}
    let scripts = {}

    if (agent === 'poetry')
      scripts = project_file.tool.poetry.srcipts || {}
    else if (agent === 'pipenv')
      scripts = project_file.scripts || {}
    else
      process.exit(1)

    const names = Object.entries(scripts) as [string, string][]

    if (!names.length)
      return

    const choices: Choice[] = names
      .filter(i => !i[0].startsWith('?'))
      .map(([cmd, value]) => ({
        title: cmd,
        value,
        description: value,
      }))

    if (storage.last_run_command) {
      const last = choices.find(i => i.value === storage.last_run_command)
      if (last)
        // Convenient for users to quickly select the last used command
        choices.unshift(last)
    }

    try {
      const { selected } = await prompts({
        name: 'selected',
        message: 'script to run',
        type: 'autocomplete',
        choices,
      })
      if (!selected)
        return
      args.push(selected)
    }
    catch (e) {
      process.exit(1)
    }
  }

  if (storage.last_run_command !== args[0]) {
    storage.last_run_command = args[0]
    dump()
  }

  // eslint-disable-next-line no-console
  console.log(`${agent} start to run: ${args}`)

  return parsePru(agent, args)
})
