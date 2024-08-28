import { writeFile } from 'node:fs/promises'
import { translateFile } from '../core/translateFile'
import config from './config'

const markdown = `
[中文](https://github.com/Ray-D-Song/markdown-translator) | [English](https://github.com/Ray-D-Song/markdown-translator/blob/main/README_en.md) | [Japanese](https://github.com/Ray-D-Song/markdown-translator/blob/main/README_jp.md)

# Markdown Translator
使用 ChatGPT 翻译 markdown 文件的 vscode 插件.
你可以用它来翻译你的博客或说明到别的语言, 或者翻译他人的文档来帮助你阅读.

## 感谢
* [antfu](https://github.com/antfu): [starter-vscode](https://github.com/antfu/starter-vscode)
* [_Kerman](https://github.com/KermanX): [reactive-vscode](https://github.com/KermanX/reactive-vscode)
* [smikitky](https://github.com/smikitky): [chatgpt-md-translator](https://github.com/smikitky/chatgpt-md-translator)
`
async function translateMarkdownFile() {
  const result = await translateFile(markdown, config)
  await writeFile('./translate.test.md', result)
}

export {
  translateMarkdownFile,
}
