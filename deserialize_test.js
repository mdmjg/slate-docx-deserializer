// import { deserialize } from './src/module.js'
const deserialize = require('../src/module')

// test normal element
// test lists
// test images

// input = {<h3>Hi</h3>}
// output = {type: H3, children: [{text: 'Hi}]}
console.log(deserialize('<h3>Hi</h3>'))

// test('deserialize  <h3>Hi</h3> to equal {type: "H3", children: [{text: "Hi"}]}', () => {
//   expect(deserialize('<h3>Hi</h3>')).toBe({
//     type: 'H3',
//     children: [{ text: 'Hi' }],
//   })
// })
