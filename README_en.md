# Markdown Translator
A vscode plugin that translates markdown files using ChatGPT.
You can use it to translate your blogs or documentation into other languages, or translate others' documents to help with your reading.

## Instructions
After installing the plugin, go to `Settings`, search for `markdown translator`, set `Api Key` and `Target Language`.
Then open the markdown file you want to translate, right-click and select translate to start the translation. (Or select markdown translator in the command palette)

Here is the complete configuration:
```json
{
  "markdownTranslator.apiKey": {
    "type": "string",
    "default": "",
    "description": "OpenAI API key"
  },
  "markdownTranslator.endpoint": {
    "type": "string",
    "default": "https://api.openai.com/v1/chat/completions",
    "description": "请求的 URL 地址"
  },
  "markdownTranslator.httpsProxy": {
    "type": "string",
    "default": "",
    "description": "代理地址"
  },
  "markdownTranslator.targetLanguage": {
    "type": "string",
    "default": "English",
    "description": "目标语言, 默认英文"
  },
  "markdownTranslator.model": {
    "type": "string",
    "default": "gpt-3.5-turbo",
    "description": "模型"
  },
  "markdownTranslator.temperature": {
    "type": "number",
    "default": 0.1,
    "description": "这个参数决定了模型回答的随机性"
  },
  "markdownTranslator.apiCallInterval": {
    "type": "number",
    "default": 0,
    "description": "请求间隔, 如果你触发了调用限制, 就把他设置成正数"
  },
  "markdownTranslator.fragmentSize": {
    "type": "number",
    "default": 2048,
    "description": "每个请求包含的最多字符"
  },
  "markdownTranslator.codeBlockPreservationLines": {
    "type": "number",
    "default": 5,
    "description": "请求中包含的代码行数, 用于为 AI 提供上下文"
  },
  "markdownTranslator.prompt": {
    "type": "string",
    "default": "I am translating the documentation for Developer.\nTranslate the Markdown content I'll paste later into %%%%%.\n\nYou must strictly follow the rules below.\n\n- Never change the Markdown markup structure. Don't add or remove links. Do not change any URL.\n- Never change the contents of code blocks even if they appear to have a bug.\n- Always preserve the original line breaks. Do not add or remove blank lines.\n- Never touch the permalink such as `{/*examples*/}` at the end of each heading.\n- Never touch HTML-like tags such as `<Notes>`.",
    "description": "prompt"
  },
  "markdownTranslator.concurrent": {
    "type": "boolean",
    "default": false,
    "description": "在多文件翻译的时候是否并发执行"
  }
}
```

## Known Issues
* Unable to translate comments in code

## v0.2.0
* Rewrote file handling logic
* Supports translating entire workspace's md/mdx files, currently only supports Chinese (overwrites original file)

## Acknowledgements
* [antfu](https://github.com/antfu): [starter-vscode](https://github.com/antfu/starter-vscode)
* [_Kerman](https://github.com/KermanX): [reactive-vscode](https://github.com/KermanX/reactive-vscode)
* [smikitky](https://github.com/smikitky): [chatgpt-md-translator](https://github.com/smikitky/chatgpt-md-translator) 

{ /*examples*/ }
