import React from 'react'
import "./styles.css"


export const Element = props => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'H1':
      return <h1 {...attributes}>{children}</h1>
    case 'H2':
      return <h2 {...attributes}>{children}</h2>
    case 'H3':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <ListItem {...props} />
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link':
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      )
    case 'image':
      return <ImageElement {...props} />
    case 'table':
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-cell':
      return <td {...attributes}>{children}</td>
    default:
      return <TextItem {...props}>{children}</TextItem>
  }
}

export const TextItem = ({ attributes, children, element }) => {
  const style = element.className
  return <p className={style}>{children}</p>
}

export const ListItem = ({ attributes, children, element }) => {
  const level = element.className
  return (
    <div className={level}>
      <li {...attributes}>{children}</li>
    </div>
  )
}

export const ImageElement = ({ attributes, children, element }) => {
  return (
    <img
      src={element.url}
    />
  )
}

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }

  return <span {...attributes}>{children}</span>
}
