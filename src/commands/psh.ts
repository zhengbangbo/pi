import { parsePsh } from '../parse'
import { run } from '../runner'

run(async(agent, args) => {
  return parsePsh(agent, args)
})
