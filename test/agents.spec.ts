import { expect, test } from 'vitest'
import { AGENTS, DEFAULT_AGENT, INSTALL_PAGE, LOCKS, PROJECTS, agents } from '../src/agents'

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

test('PROJECTS', () => {
  expect(PROJECTS).toMatchInlineSnapshot(`
    {
      "Pipfile": "pipenv",
      "pyproject.toml": "poetry",
    }
  `)
  expect(Object.values(PROJECTS)).toMatchInlineSnapshot(`
    [
      "pipenv",
      "poetry",
    ]
  `)
  expect(Object.keys(PROJECTS).find(key => PROJECTS[key] === 'pipenv')).toMatchInlineSnapshot('"Pipfile"')
})

test('LOCKS', () => {
  expect(LOCKS).toMatchInlineSnapshot(`
    {
      "Pipfile.lock": "pipenv",
      "poetry.lock": "poetry",
    }
  `)
})

test('INSTALL_PAGE', () => {
  expect(INSTALL_PAGE).toMatchInlineSnapshot(`
    {
      "pipenv": "https://pipenv.pypa.io/en/latest/",
      "poetry": "https://python-poetry.org/docs/#installation",
    }
  `)
})
