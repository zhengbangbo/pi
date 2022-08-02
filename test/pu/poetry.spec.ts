import { expect, test } from 'vitest'
import { parsePu } from '../../src/parse'

const agent = 'poetry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePu(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single', _('test', 'poetry update test'))
