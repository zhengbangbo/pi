import { expect, test } from 'vitest'
import type { Choice } from 'prompts'
import { getProjectToml } from '../../src/fs'

test('get scritpts', async () => {
  const cwd = `${process.cwd()}/test/test-files`
  const project_file = getProjectToml(cwd)
  const scripts = project_file.tool.poetry.scripts
  expect(scripts).toMatchInlineSnapshot(`
    {
      "run": "src.main:main",
    }
  `)
  const names = Object.entries(scripts) as [string, string][]
  expect(names).toMatchInlineSnapshot(`
    [
      [
        "run",
        "src.main:main",
      ],
    ]
  `)
  const choices: Choice[] = names
    .filter(i => !i[0].startsWith('?'))
    .map(([cmd, value]) => ({
      title: cmd,
      value,
      description: value,
    }))
  expect(choices).toMatchInlineSnapshot(`
    [
      {
        "description": "src.main:main",
        "title": "run",
        "value": "src.main:main",
      },
    ]
  `)
})
