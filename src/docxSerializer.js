import { imagePastingListener } from './utils'
import { deserialize } from './module'

export const withDocxSerializer = editor => {
  const { insertData, isInline, isVoid, insertFragment } = editor

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
    // console.log(html)
    // image tags have to be cleaned out and converted
    const imageTags = imagePastingListener(rtf, html)

    if (html) {
      const parsed_html = new DOMParser().parseFromString(html, 'text/html')
      console.log(parsed_html.body)
      const h3 = document.createElement('h3')
      h3.textContent = 'hi'
      const test_output = deserialize(h3)
      console.log(test_output)
      // console.log(deserialize(test_input))
      const fragment = deserialize(parsed_html.body, imageTags)
      console.log(fragment)
      editor.insertFragment(fragment)
      return
    }

    insertData(data)
  }
  return editor
}
