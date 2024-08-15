import { defineConfigObject, defineExtension, useCommand } from 'reactive-vscode'
import { window } from 'vscode'
import { selectDir, selectFile } from './utils/file'
import { processTranslate } from './processTranslate'
import { logger } from './utils/logger'

const { activate, deactivate } = defineExtension(() => {
  const config = defineConfigObject('markdownTranslator', {
    apiKey: String,
    endpoint: String,
    httpsProxy: String,
    prompt: String,
    targetLanguage: String,
    model: String,
    temperature: Number,
    fragmentSize: Number,
    apiCallInterval: Number,
    codeBlockPreservationLines: Number,
  })

  useCommand('markdown-translator.translate', async () => {
    try {
      const { inputFile, fileName } = await selectFile()
      const outputDir = await selectDir()
      const outputPath = `${outputDir}/${fileName}`
      await processTranslate(inputFile, outputPath, config)
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })
})

export { activate, deactivate }
