
import { deserialize } from '../src/module.js';
import { parse } from '@babel/core';
// const deserialize = require('../src/module')

/**
 * @jest-environment jsdom
 */

test('deserialize <p><b>bold</b></p> to have property {"bold": true, "text": "bold" }', () => {
  const input = "<p><b>bold</b></p>"
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const result = deserialize(parsed_html.body)
  expect(result[1]).toHaveProperty('children',
    [{ "bold": true, "text": "bold" }])
})