import { test, expect } from 'vitest';
import { cmdExists, exclude, remove } from '../src/utils';

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

test("cmd exists", () => {
  expect(cmdExists("node")).toMatchInlineSnapshot('true')
  expect(cmdExists("fowejfowej")).toMatchInlineSnapshot('false')
})
