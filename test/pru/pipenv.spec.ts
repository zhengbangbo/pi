import { expect, test } from 'vitest'
import { parsePru } from '../../src/parse'

const agent = 'pipenv'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePru(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single', _('test', 'pipenv run test'))
test('-', _('-', 'pipenv run -'))
