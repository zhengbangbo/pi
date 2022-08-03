import { expect, test } from 'vitest'
import { AGENTS, DEFAULT_AGENT, agents } from '../src/agents'

test('Command must same for every agent', () => {
  expect(Object.keys(AGENTS.pipenv)).toEqual(Object.keys(AGENTS.poetry))
})

test('agents', () => {
  expect(agents).toMatchInlineSnapshot(`
    [
      "pipenv",
      "poetry",
    ]
  `)
})

test('default agent', () => {
  expect(DEFAULT_AGENT).toMatchInlineSnapshot('"pipenv"')
})
