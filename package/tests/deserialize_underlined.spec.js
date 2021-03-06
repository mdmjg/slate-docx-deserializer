
import { makeDeserializer } from '../src/module.js';
import { parse } from '@babel/core';
import { jsx } from "slate-hyperscript"

/**
 * @jest-environment jsdom
 */

test('deserialize <p class=MsoNormal><u><span>Underlined<o:p></o:p></span></u></p> to have property {"underline": true, "text": "Underlined" }', () => {
  const deserialize = makeDeserializer(jsx)
  const input = "<p class=MsoNormal><u><span>Underlined<o:p></o:p></span></u></p>"
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const result = deserialize(parsed_html.body)
  expect(result[1]).toHaveProperty('children',
    [{ "underline": true, "text": "Underlined" }])
})