import { expect, test } from 'vitest'
import { parsePui } from '../../src/parse'

const agent = 'poetry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePui(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single', _('rich', 'poetry remove rich'))
