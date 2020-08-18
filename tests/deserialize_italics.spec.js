
import { deserialize } from '../src/module.js';
import { parse } from '@babel/core';
// const deserialize = require('../src/module')

/**
 * @jest-environment jsdom
 */

test('deserialize <p><i>italic</i></p> to have property {"italic": true, "text": "italic" }', () => {
  const input = "<p><i>italic</i></p>"
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const result = deserialize(parsed_html.body)
  expect(result[1]).toHaveProperty('children',
    [{ "italic": true, "text": "italic" }])
})