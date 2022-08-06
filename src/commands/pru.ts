import type { Choice } from 'prompts'
import prompts from 'prompts'
import { read_last_run_script, save_last_run_script } from '../storage'
import { parsePru } from '../parse'
import { runCli } from '../runner'
import { getProjectToml } from '../fs'
import { PROJECTS } from '../agents'

runCli(async (agent, args, ctx) => {
  if (args.length === 0) {
    const names = Object.entries(scripts()) as [string, string][]

    if (!names.length) {
      console.warn('Don\'t have any script.')
      return
    }

    const choices: Choice[] = names
      .filter(i => !i[0].startsWith('?'))
      .map(([cmd, value]) => ({
        title: cmd,
        value,
        description: value,
      }))

    if (args[0] === '-')
      args[0] = await read_last_run_script()

    await add_last_run_script_to_choices(choices)

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
      console.error(`[prompts] ${e}`)
      process.exit(1)
    }
  }

  save_last_run_script(args)

  return parsePru(agent, args)

  function scripts() {
    let scripts = {}

    if (agent === 'poetry') { scripts = project_file().tool.poetry.scripts || {} }
    else if (agent === 'pipenv') { scripts = project_file().scripts || {} }
    else {
      console.warn(`${agent} is not supported.`)
      process.exit(1)
    }
    return scripts
  }

  async function add_last_run_script_to_choices(choices: Choice[]) {
    if (await read_last_run_script()) {
      const last = choices.find(async i => i.value === await read_last_run_script())
      if (last)
        // Convenient for users to quickly select the last used command
        choices.unshift(last)
    }
  }

  function project_file() {
    return getProjectToml(ctx?.cwd, project_file_name())
  }

  function project_file_name() {
    return PROJECTS[agent] || process.exit(1)
  }
})

