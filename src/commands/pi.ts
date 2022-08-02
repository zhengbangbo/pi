import { parsePi } from '../parse'
import { run } from '../runner'

run(async(agent, args) => {
  return parsePi(agent, args)
})
