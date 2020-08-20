import { ELEMENT_TAGS, TEXT_TAGS } from './native'

export const makeDeserializer = (jsx) => {
  const deserialize = (el, imageTags) => {
    if (
      el.attributes &&
      el.attributes.getNamedItem('class') &&
      el.attributes.getNamedItem('class').value.match(/done/g)
    ) {
      return null
    }

    if (isList(el)) {
      return deserializeList(el, imageTags)
    }
    return deserializeElement(el, imageTags)
  }

  function deserializeList(el, imageTags) {
    const siblings = getSiblings(el)
    const type = 'UL'
    const list_wrapper = document.createElement(type)
    for (let i = 0; i < siblings.length; i++) {
      list_wrapper.appendChild(siblings[i])
    }

    const attrs = ELEMENT_TAGS[type](list_wrapper)
    const children = Array.from(list_wrapper.childNodes)
      .map(child => {
        return deserializeListItem(child, imageTags)
      })
      .flat()

    return jsx('element', attrs, children)
  }
  function deserializeElement(el, imageTags) {
    if (el.nodeType === 3) {
      if (el.parentNode.nodeName === 'O:P') {
        if (el.parentNode.parentNode.nodeName === 'P') {
          return el.textContent
        }
      }

      if (el.textContent.match(/^[\s]*$/gm)) {
        return null
      } else {
        // sometimes work adds line breaks when pasting
        const regex = /\n(?!\n)/g
        el.textContent = el.textContent.replace(regex, ' ')
        return el.textContent
      }
    } else if (el.nodeType !== 1) {
      return null
    } else if (el.nodeName === 'BR') {
      return '\n'
    }

    const { nodeName } = el

    let parent = el

    if (
      nodeName === 'PRE' &&
      el.childNodes[0] &&
      el.childNodes[0].nodeName === 'CODE'
    ) {
      parent = el.childNodes[0]
    }

    let children = Array.from(parent.childNodes)
      .map(child => {
        return deserialize(child, imageTags)
      })
      .flat()

    if (el.nodeName === 'BODY') {
      const filler = jsx('element', { type: 'p', className: 'P' }, [
        { text: ' ' },
      ])
      children.unshift(filler)
      return jsx('fragment', {}, children)
    }

    if (ELEMENT_TAGS[nodeName]) {
      if (nodeName === 'IMG') {
        const src = el.getAttribute('src')
        if (imageTags[src]) {
          el.setAttribute('src', imageTags[src])
          children = []
        }
        const attrs = ELEMENT_TAGS[nodeName](el)
        return jsx('element', attrs, children)
      }
      if (nodeName === 'H3' || nodeName === 'H2' || nodeName === 'H1') {
        return jsx('element', { type: nodeName, className: nodeName }, children)
      }
      const attrs = ELEMENT_TAGS[nodeName](el)
      return jsx('element', attrs, children)
    }

    if (TEXT_TAGS[nodeName]) {
      const attrs = TEXT_TAGS[nodeName](el)
      return children.map(child => jsx('text', attrs, child))
    }

    return children
  }

  function deserializeListItem(el, imageTags) {
    const level = el.getAttribute('style')
    const content = getTextfromList(el)
      .map(c => {
        return deserializeElement(c, imageTags)
      })
      .flat()
    return jsx(
      'element',
      { type: 'list-item', className: 'level'.concat(level) },
      content
    )
  }

  return deserialize

}



// gets ALL the
function getSiblings(el) {
  // const level = el.attributes.getNamedItem('style').value.match(/level(\d+)/)[1]
  const siblings = []
  while (
    el &&
    el.attributes.getNamedItem('class') &&
    el.attributes.getNamedItem('class').value.match(/MsoListParagraph/g)
  ) {
    const level = el.attributes
      .getNamedItem('style')
      .value.match(/level(\d+)/)[1]
    el.setAttribute('class', 'done') // we set this attribute to avoid getting stuck in an infinite loop
    el.setAttribute('style', level)
    siblings.push(el)
    el = el.nextElementSibling
  }

  return siblings
}

// Docx lists begin with "MsoListParagraph".
function isList(el) {
  if (
    el.attributes &&
    el.attributes.getNamedItem('class') &&
    el.attributes.getNamedItem('class').value.match(/MsoListParagraph/g)
  ) {
    return true
  }
  return false
}

// Future functionality: Ordered Lists
function isOrderedList(el) {
  const val = el.textContent[0]
  const regex = /^\d+$/
  if (regex.test(val)) {
    return true
  }
  return false
}


// receives a list item and returns the text inside it
// sometimes the text will be inside a text tag or inside a span tag.
// when it is inside a text tag, the span is irrelevant, but it contains empty text inside
function getTextfromList(el) {
  const children = Array.from(el.childNodes)
  const result = []
  children.map(child => {
    if (TEXT_TAGS[child.nodeName] || child.nodeName === '#text') {
      result.push(child)
    } else if (child.nodeName === 'SPAN') {
      child.textContent = child.textContent.replace(
        /(^(\W)(?=\s)*)|(o\s)(?!\w)/gm,
        ''
      )
      result.push(child)
    }
  })
  return result
}
