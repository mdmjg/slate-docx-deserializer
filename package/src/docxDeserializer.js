import { imagePastingListener } from './utils'
import { makeDeserializer } from './module'

export const withDocxDeserializer = (editor, jsx) => {
  const { insertData, isInline, isVoid, insertFragment } = editor
  const deserialize = makeDeserializer(jsx)


  editor.insertFragment = element => {
    insertFragment(element)
  }

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const html = data.getData('text/html')
    const rtf = data.getData('text/rtf')
    // image tags have to be cleaned out and converted
    const imageTags = imagePastingListener(rtf, html)

    if (html) {
      const parsed_html = new DOMParser().parseFromString(html, 'text/html')
      const fragment = deserialize(parsed_html.body, imageTags)
      editor.insertFragment(fragment)
      return
    }

    insertData(data)
  }
  return editor
}
