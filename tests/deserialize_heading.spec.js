import { deserialize } from '../src/module.js';
import { parse } from '@babel/core';
// const deserialize = require('../src/module')

/**
 * @jest-environment jsdom
 */


test('deserialize  <h3>Hi</h3> to equal {type: "H3", className: "H3" children: Array(1) }', () => {
  const input = '<h3>Hi</h3>';
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const output = [{ "type": "p", "className": "P", "children": [{ "text": " " }] }, { "type": "H3", "className": "H3", "children": [{ "text": "Hi" }] }]
  expect(deserialize(parsed_html.body)).toStrictEqual(output)
})




