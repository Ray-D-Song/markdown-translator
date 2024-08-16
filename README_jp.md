# Markdown Translator
ChatGPTを使用してMarkdownファイルを翻訳するVSCodeプラグインです。
ブログや説明書を他の言語に翻訳したり、他の人のドキュメントを翻訳して読むのに役立てることができます。

## 使用方法
プラグインをインストールしたら、`設定`に移動し、`markdown translator`を検索して`Api Key`と`Target Language`を設定します。
次に翻訳したいMarkdownファイルを開き、右クリックして`translate`を選択すると翻訳が開始されます（またはコマンドパネルで`markdown translator`を選択します）。

以下は完全な設定項目です:
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

## Known Issues
* コード内のコメントを翻訳できません

## Special Thanks
* [antfu](https://github.com/antfu): [starter-vscode](https://github.com/antfu/starter-vscode)
* [_Kerman](https://github.com/KermanX): [reactive-vscode](https://github.com/KermanX/reactive-vscode)
* [smikitky](https://github.com/smikitky): [chatgpt-md-translator](https://github.com/smikitky/chatgpt-md-translator)
