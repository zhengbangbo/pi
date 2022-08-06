import { expect, test } from 'vitest'
import { getProjectToml } from '../src/fs'

test('get project toml', () => {
  const cwd = `${process.cwd()}/test/test-files`

  expect(getProjectToml(cwd, 'pyproject.toml').tool.poetry.scripts).toMatchInlineSnapshot(`
    {
      "run": "src.main:main",
    }
  `)
  expect(getProjectToml(cwd, 'Pipfile').scripts).toMatchInlineSnapshot(`
    {
      "printspam": "python -c \\"print('I am a silly example, no one would need to do this')\\"",
    }
  `)
})

