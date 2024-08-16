[中文](https://github.com/Ray-D-Song/markdown-translator) | [English](https://github.com/Ray-D-Song/markdown-translator/blob/main/README_en.md)

# Markdown Translator
使用 ChatGPT 翻译 markdown 文件的 vscode 插件.
你可以用它来翻译你的博客或说明到别的语言, 或者翻译他人的文档来帮助你阅读.

## 使用说明
安装插件后, 进入`设置`, 搜索`markdown translator`, 设置`Api Key`和`Target Language`.
然后打开你需要翻译的 markdown 文件, 右键选择 translate 就会开始翻译. (或者在命令面板选择 markdown translator)

以下是完整配置项:
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
  }
}
```

## 已知问题
* 无法翻译代码中的注释

## 感谢
* [antfu](https://github.com/antfu): [starter-vscode](https://github.com/antfu/starter-vscode)
* [_Kerman](https://github.com/KermanX): [reactive-vscode](https://github.com/KermanX/reactive-vscode)
* [smikitky](https://github.com/smikitky): [chatgpt-md-translator](https://github.com/smikitky/chatgpt-md-translator)
