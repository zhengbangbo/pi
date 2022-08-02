import { expect, test } from 'vitest'
import { parsePsh } from '../../src/commands'

const agent = 'poetry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePsh(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'poetry shell'))

test('single add', _('rich', 'poetry shell'))

test('multiple add', _('rich httpx', 'poetry shell'))

test('--dev', _('--dev pytest', 'poetry shell'))
