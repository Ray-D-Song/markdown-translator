import type { ConfigObject } from 'reactive-vscode'
import { useStatusBarItem } from 'reactive-vscode'
import { window } from 'vscode'
import { translateFile } from './core/translateFile'

// TODO: better types
async function processTranslate(inputFile: string, outputPath: string, config: ConfigObject<any>, needOverwrite: boolean) {
  window.showInformationMessage(`Start translate`)
  const bar = useStatusBarItem({
    text: `markdown translator:    `,
  })
  bar.show()

  const translateConfig = {
    apiEndpoint: config.endpoint,
    apiKey: config.apiKey,
    prompt: config.prompt.replace('%%%%%', config.targetLanguage),
    model: config.model,
    needOverwrite,
    apiCallInterval: config.apiCallInterval,
    fragmentSize: config.fragmentSize,
    temperature: config.temperature,
    codeBlockPreservationLines: config.codeBlockPreservationLines,
    httpsProxy: config.httpsProxy,
    outputPath,
  }
  await translateFile(inputFile, translateConfig, bar)
  bar.hide()
}

export {
  processTranslate,
}
