# slate-docx-deserializer
Microsoft Word deserializer for Slatejs

Slate is a completely customizable framework for building rich text editors. Unfortunately, when pasting Microsoft Word content into Slate, the formatting is lost. The mythical html format of Wordx has limited the creation of an accurate deserializer.
Fortunately, this plugin will meet your basic needs when pasting content from Word and maintaining its formatting. 

## Usage
 `yarn add slate-docx-deserializer`

If you want to use the deserializer in your Editor, import it

`import { withDocxDeserializer } from 'slate-docx-deserializer'`

## Customizing your own JSX

The Plugin allows you to use your own JSX. I used slate-hyperscript's jsx, but you may use your own by importing it and then passing it as a parameter when calling `withDocxDeserializer`. See `site/PasteDocxDeserializer.js` for an example.

## Checkout an Example

https://slate-docx-deserializer.netlify.app/


### The plugin currently supports the following:
* Tables
* Nested Lists
* Images
* Links
* Bold
* Italics
* Underlining
* Headings

The plugin does NOT support:
* Nested Ordered Lists (it currently supports nested unordered lists because of styling workarounds)

## Contributing!
* You can run some tests inside the `package` folder by running `yarn test`




