
import { deserialize } from '../src/module.js';
import { parse } from '@babel/core';
// const deserialize = require('../src/module')

/**
 * @jest-environment jsdom
 */



test('deserialize list to equal {type: "ul", className: "H3", children: Array(1) }', () => {
  const input = "<body lang=EN-US style='tab-interval:.5in'><!--StartFragment--> <p class=MsoListParagraph style='text-indent:-.25in;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-fareast-font-family:Symbol;mso-bidi-font-family: Symbol;mso-bidi-font-style:italic'><span style='mso-list:Ignore'>·<span style='font:7.0pt \"Times New Roman\"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]><i>Level 1.2<o:p></o:p></i></p> <!--EndFragment--> </body>";
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const output = [{ "type": "p", "className": "P", "children": [{ "text": " " }] }, {
    "type": "bulleted-list", "children": [{
      "type": "list-item", className: "level1", "children": [{ "italic": true, "text": "Level 1.2" }]
    }]
  }]
  expect(deserialize(parsed_html.body)).toStrictEqual(output)
})