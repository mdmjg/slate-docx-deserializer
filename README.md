# slate-docx-deserializer
Microsoft Word deserializer for Slatejs

Slate is a completely customizable framework for building rich text editors. Unfortunately, when pasting Microsoft Word content into Slate, the formatting is lost. The scary html format of Wordx has limited the creation of an accurate deserializer.
Fortunately, this plugin will meet your basic needs when pasting content from Word and maintaining its formatting. 

### Usage
 `yarn add slate-docx-deserializer`

If you want to use the deserializer in your Editor, import it

`import { withDocxDeserializer } from 'slate-docx-deserializer`

The deserializer supports slate's slate-hyperscript jsx. To customize your own jsx, just go into `package/src/module.js` and import your own jsx. 

### Checkout an Example

https://slate-docx-deserializer.netlify.app/


The plugin currently supports the following:
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




