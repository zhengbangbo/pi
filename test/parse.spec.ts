import {test, expect} from 'vitest'
import { getCommand } from '../src'

test("pipenv", () => {
  expect(getCommand("pipenv", "add", ["rich"])).toMatchInlineSnapshot('"pipenv install rich"')
  expect(getCommand("pipenv", "add", ["httpx", "rich"])).toMatchInlineSnapshot('"pipenv install httpx rich"')
})
