import { test, expect } from 'vitest';
import { exclude, remove } from '../src/utils';

test("exclude", () => {
  expect(exclude(["rich", "httpx"], "--dev")).toMatchInlineSnapshot(`
    [
      "rich",
      "httpx",
    ]
  `)
})

test("remove", () => {
  expect(remove(["rich", "httpx"], "httpx")).toMatchInlineSnapshot(`
    [
      "rich",
    ]
  `)
})
