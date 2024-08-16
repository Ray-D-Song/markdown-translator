import { defineConfigObject, defineExtension, useCommand } from 'reactive-vscode'
import { window, workspace } from 'vscode'
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
      const { inputFile, fileName, filePath: inputPath } = await selectFile()
      const outputDir = await selectDir()
      let outputPath = `${outputDir}/${fileName}`

      if (inputPath === outputPath) {
        outputPath = `${outputDir}/translated-${fileName}`
      }

      await processTranslate(inputFile, outputPath, config)
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })

  useCommand('markdown-translator.translateCurrent', async () => {
    try {
      const editor = window.activeTextEditor
      if (editor) {
        const inputPath = editor.document.uri.fsPath
        const document = await workspace.openTextDocument(editor.document.uri)
        const inputFile = document.getText()
        const fileName = inputPath.split('/').pop() || ''

        const outputDir = await selectDir()
        let outputPath = `${outputDir}/${fileName}`

        if (inputPath === outputPath) {
          outputPath = `${outputDir}/translated-${fileName}`
        }

        await processTranslate(inputFile, outputPath, config)
      }
      else {
        window.showInformationMessage('No active editor')
      }
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })
})

export { activate, deactivate }
