import type { ConfigObject } from 'reactive-vscode'
import { useStatusBarItem } from 'reactive-vscode'
import { window } from 'vscode'
import { translateFile } from './core/translateFile'

// TODO: better types
async function processTranslate(inputFile: string, outputPath: string, config: ConfigObject<any>) {
  window.showInformationMessage(`Start translate`)
  const bar = useStatusBarItem({
    text: `Translating 0%`,
  })
  bar.show()

  const translateConfig = {
    apiEndpoint: config.endpoint,
    apiKey: config.apiKey,
    prompt: config.prompt.replace('%%%%%', config.targetLanguage),
    model: config.model,
    apiCallInterval: config.apiCallInterval,
    fragmentSize: config.fragmentSize,
    temperature: config.temperature,
    codeBlockPreservationLines: config.codeBlockPreservationLines,
    httpsProxy: config.httpsProxy,
    outputPath,
  }
  await translateFile(inputFile, translateConfig)
}

export {
  processTranslate,
}
