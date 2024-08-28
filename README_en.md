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
    "description": "OpenAI API endpoint, you can change this to use third-party API"
  },
  "markdownTranslator.httpsProxy": {
    "type": "string",
    "default": "",
    "description": "https proxy"
  },
  "markdownTranslator.targetLanguage": {
    "type": "string",
    "default": "English",
    "description": "target language"
  },
  "markdownTranslator.model": {
    "type": "string",
    "default": "gpt-3.5-turbo",
    "description": "OpenAI model"
  },
  "markdownTranslator.temperature": {
    "type": "number",
    "default": 0.1,
    "description": "Randomness of the generated text"
  },
  "markdownTranslator.apiCallInterval": {
    "type": "number",
    "default": 0,
    "description": "If you hit the API rate limit, you can set this to a positive number"
  },
  "markdownTranslator.fragmentSize": {
    "type": "number",
    "default": 2048,
    "description": "The maximum number of characters for each API call"
  },
  "markdownTranslator.codeBlockPreservationLines": {
    "type": "number",
    "default": 5,
    "description": "The maximum number of lines for code blocks, sent to the API as-is for context"
  },
  "markdownTranslator.prompt": {
    "type": "string",
    "default": "I am translating the documentation for Developer.\nTranslate the Markdown content I'll paste later into %%%%%.\n\nYou must strictly follow the rules below.\n\n- Never change the Markdown markup structure. Don't add or remove links. Do not change any URL.\n- Never change the contents of code blocks even if they appear to have a bug.\n- Always preserve the original line breaks. Do not add or remove blank lines.\n- Never touch the permalink such as `{/*examples*/}` at the end of each heading.\n- Never touch HTML-like tags such as `<Notes>`.",
    "description": "Prompt for translate"
  },
  "markdownTranslator.concurrent": {
    "type": "boolean",
    "default": false,
    "description": "Whether concurrent execution is performed in multi-file translation"
  }
}
```

## Known Issues
* Unable to translate comments within code

## v0.2.0
* support translate all md/mdx files in workspace (overwrite the original file)

## Acknowledgements
* [antfu](https://github.com/antfu): [starter-vscode](https://github.com/antfu/starter-vscode)
* [_Kerman](https://github.com/KermanX): [reactive-vscode](https://github.com/KermanX/reactive-vscode)
* [smikitky](https://github.com/smikitky): [chatgpt-md-translator](https://github.com/smikitky/chatgpt-md-translator)
