import { defineConfigObject, defineExtension, useCommand, useStatusBarItem, useWorkspaceFolders } from 'reactive-vscode'
import { window, workspace } from 'vscode'
import { getAllMDFiles, selectDir, selectFile } from './utils/file'
import { processTranslate } from './processTranslate'
import MDFile from './utils/md'
import bar from './utils/bar'
import { logger } from './utils/logger'

const { activate, deactivate } = defineExtension(() => {
  const pluginConfig = defineConfigObject('markdownTranslator', {
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
    concurrent: Boolean,
  })

  useCommand('markdown-translator.translate', async () => {
    try {
      const { input, fileName, from } = await selectFile()
      const toDir = await selectDir()
      const to = `${toDir}/${fileName}`

      const mdFile = new MDFile(
        from,
        to,
        input,
      )

      window.showInformationMessage(`Start translate`)

      bar.show()

      const output = await processTranslate(mdFile.input, pluginConfig)
      mdFile.setOutput(output)
      await mdFile.write()

      bar.hide()
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })

  useCommand('markdown-translator.translateCurrent', async () => {
    try {
      const editor = window.activeTextEditor
      if (editor) {
        const from = editor.document.uri.fsPath
        const document = await workspace.openTextDocument(editor.document.uri)
        const input = document.getText()
        const fileName = from.split('/').pop() || ''

        const toDir = await selectDir()
        const to = `${toDir}/${fileName}`

        const mdFile = new MDFile(
          from,
          to,
          input,
        )

        window.showInformationMessage(`Start translate`)

        bar.show()

        const output = await processTranslate(mdFile.input, pluginConfig)
        mdFile.setOutput(output)
        await mdFile.write()

        bar.hide()
      }
      else {
        window.showInformationMessage('No active editor')
      }
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })

  useCommand('markdown-translator.translateAll', async () => {
    try {
      const mdFiles = await getAllMDFiles()
      const tasks = mdFiles.map(file =>
        async () => {
          const document = await workspace.openTextDocument(file)
          const input = document.getText()
          const mdFile = new MDFile(
            file.fsPath,
            file.fsPath,
            input,
            true,
          )

          window.showInformationMessage(`Start translate ${mdFile.filename}`)
          const output = await processTranslate(mdFile.input, pluginConfig)
          mdFile.setOutput(output)
          await mdFile.write()
        })

      for (const task of tasks) {
        await task()
      }
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })
})

export { activate, deactivate }
