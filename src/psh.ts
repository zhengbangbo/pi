import { parsePsh } from './commands'
import { run } from './runner'

run(async(agent, args) => {
  return parsePsh(agent, args)
})
