
import { makeDeserializer } from '../src/module.js';
import { parse } from '@babel/core';
// const deserialize = require('../src/module')
import { jsx } from "slate-hyperscript"

/**
 * @jest-environment jsdom
 */



test('deserialize table to match object of type table', () => {
  const deserialize = makeDeserializer(jsx)
  const input = "<table class=MsoTableGrid> <tr><td ><p class=MsoNormal></p></td><td ><p class=MsoNormal></p></td></tr><tr ><td ><p class=MsoNormal></p></td><td ><p class=MsoNormal></p></td></tr></table>";
  const parsed_html = new DOMParser().parseFromString(input, 'text/html')
  const output = [{ "type": "p", "className": "P", "children": [{ "text": " " }] }, {
    "type": "table", "children": [{
      "type": "table-row", "children": [{ "children": [{ "children": [], "type": "paragraph" }], "type": "table-cell" }, { "children": [{ "children": [], "type": "paragraph" }], "type": "table-cell" }]
    }, {
      "type": "table-row", "children": [{ "children": [{ "children": [], "type": "paragraph" }], "type": "table-cell" }, { "children": [{ "children": [], "type": "paragraph" }], "type": "table-cell" }]
    }]
  }]
  // const output = [{ "children": [{ "text": " " }], "className": "P", "type": "p" }, { "children": [{ "children": [{ "children": [{ "children": [{ "text": " " }], "type": "paragraph" }], "type": "table-cell" }, { "children": [{ "children": [{ "text": " " }], "type": "paragraph" }], "type": "table-cell" }], "type": "table-row" }, { "children": [{ "children": [{ "children": [{ "text": " " }], "type": "paragraph" }], "type": "table-cell" }, { "children": [{ "children": [{ "text": " " }], "type": "paragraph" }], "type": "table-cell" }], "type": "table-row" }], "type": "table" }]
  const result = deserialize(parsed_html.body)
  expect(result).toMatchObject(output)
})