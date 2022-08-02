import { expect, test } from 'vitest'
import { parsePi } from '../../src/parse'

const agent = 'poetry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePi(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'poetry install'))

test('single add', _('rich', 'poetry add rich'))

test('multiple add', _('rich httpx', 'poetry add rich httpx'))

test('--dev', _('--dev pytest', 'poetry add --dev pytest'))
