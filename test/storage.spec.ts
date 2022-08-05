import { expect, test } from 'vitest'
import { dump, load } from '../src/storage'

test('load', async () => {
  expect(await load()).toMatchInlineSnapshot('{}')
})

test('dump', async () => {
  await dump()
  expect(await load()).toMatchInlineSnapshot('{}')
})
