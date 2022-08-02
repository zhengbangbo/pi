import { expect, test } from 'vitest'
import { parsePi } from '../../src/parse'

const agent = 'pipenv'
const _ = (arg: string, expected: string) => () => {
  expect(
    parsePi(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'pipenv install'))

test('single add', _('rich', 'pipenv install rich'))

test('multiple add', _('rich httpx', 'pipenv install rich httpx'))

test('--dev', _('--dev pytest', 'pipenv install --dev pytest'))
