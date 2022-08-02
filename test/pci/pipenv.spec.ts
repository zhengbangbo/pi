import { expect, test } from 'vitest'
import { parsePci } from '../../src/parse'

const agent = 'pipenv'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePci(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'pipenv clean'))
