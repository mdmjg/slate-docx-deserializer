
import { deserialize } from '../src/module.js';
import { parse } from '@babel/core';
// const deserialize = require('../src/module')

/**
 * @jest-environment jsdom
 */



test('deserialize nested list to equal {type: "bulleted-list", children: Array(4) }', () => {
  const input = "<body lang=EN-US style='tab-interval:.5in'><p class=MsoListParagraphCxSpFirst style='text-indent:-.25in;mso-list:l0 level1 lfo1'>Level 1.2</p> <p class=MsoListParagraphCxSpMiddle style='margin-left:1.0in;mso-add-space: auto; text - indent: -.25in; mso - list: l0 level2 lfo1'>Level 12</p><p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in;mso-list:l0 level1 lfo1'>Level 1.2</p> <p class=MsoListParagraphCxSpLast style = 'text-indent:-.25in;mso-list:l0 level1 lfo1'>Level 2.2</p ></body > ";
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const output = [{ "type": "p", "className": "P", "children": [{ "text": " " }] }, {
    "type": "bulleted-list", "children": [{
      "type": "list-item", className: "level1", "children": [{ "text": "Level 1.2" }]
    }, {
      "type": "list-item", className: "level2", "children": [{ "text": "Level 12" }]
    }, {
      "type": "list-item", className: "level1", "children": [{ "text": "Level 1.2" }
      ]
    }, {
      "type": "list-item", className: "level1", "children": [{ "text": "Level 2.2" }
      ]
    }]
  }]
  expect(deserialize(parsed_html.body)).toStrictEqual(output)
})