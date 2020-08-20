import React, { useState, useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'
import { Element, Leaf } from '../package/src/components'
import { withDocxDeserializer } from 'slate-docx-deserializer'
import { jsx } from 'slate-hyperscript'


const PasteDocxExample = () => {
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withDocxDeserializer(withReact(withHistory(createEditor())), jsx),
    []
  )
  return (
    <div class='container'>
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    </div>

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
          " data. That's okay for some use cases, but sometimes you want users to be able to paste in content and have it maintaining its formatting. To do this, your editor needs to handle ",
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
          "Try it out for yourself! Copy and paste some Microsoft Word text content into this editor and its formatting should be preserved.",
      },
    ],
  },
]

export default PasteDocxExample
