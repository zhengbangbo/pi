import { parsePi } from './commands'
import { run } from './runner'

run(async(agent, args) => {
  return parsePi(agent, args)
})
