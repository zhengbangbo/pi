import { expect, test } from 'vitest'
import { parsePu } from '../../src/parse'

const agent = 'pipenv'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePu(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single', _('test', 'pipenv update test'))
