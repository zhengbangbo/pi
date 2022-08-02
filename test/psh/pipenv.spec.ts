import { expect, test } from 'vitest'
import { parsePsh } from '../../src/parse'

const agent = 'pipenv'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePsh(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test.skip('empty', _('', 'pipenv shell'))
