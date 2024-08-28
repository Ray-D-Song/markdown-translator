import type { ConfigObject } from 'reactive-vscode'
import { translateFile } from './core/translateFile'

async function processTranslate(inputFile: string, config: ConfigObject<any>) {

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
  }
  return await translateFile(inputFile, translateConfig)
}

export {
  processTranslate,
}
