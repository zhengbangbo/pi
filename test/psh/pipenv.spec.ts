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

test('empty', _('', 'pipenv shell'))

test('single add', _('rich', 'pipenv shell'))

test('multiple add', _('rich httpx', 'pipenv shell'))

test('--dev', _('--dev pytest', 'pipenv shell'))
