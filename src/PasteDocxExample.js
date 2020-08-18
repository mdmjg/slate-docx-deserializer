import React, { useState, useCallback, useMemo } from 'react'
import { Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'
import { Element, Leaf } from './components'
import { withDocxSerializer } from './docxSerializer'

const PasteDocxExample = () => {
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withDocxSerializer(withReact(withHistory(createEditor()))),
    []
  )
  return (
    <>
      <h1>Hi</h1>
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    </>
  )
}

const initialValue = [
  {
    children: [
      {
        text:
          "By default, pasting content into a Slate editor will use the clipboard's ",
      },
      { text: "'text/plain'", code: true },
      {
        text:
          " data. That's okay for some use cases, but sometimes you want users to be able to paste in content and have it maintaing its formatting. To do this, your editor needs to handle ",
      },
      { text: "'text/html'", code: true },
      { text: ' data. ' },
    ],
  },
  {
    children: [{ text: 'This is an example of doing exactly that!' }],
  },
  {
    children: [
      {
        text:
          "Try it out for yourself! Copy and paste some Microsoft Word text content into this editor and it's formatting should be preserved.",
      },
    ],
  },
]

export default PasteDocxExample
