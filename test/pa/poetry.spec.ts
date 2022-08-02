import { expect, test } from 'vitest'
import { parsePa } from '../../src/parse'

const agent = 'poetry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePa(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('install rich', 'poetry install rich'))
