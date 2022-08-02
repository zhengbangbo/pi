import { expect, test } from 'vitest'
import { parsePru } from '../../src/parse'

const agent = 'poetry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePru(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single', _('test', 'poetry run test'))

