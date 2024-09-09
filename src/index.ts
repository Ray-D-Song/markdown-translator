import path from 'node:path'
import { defineConfigObject, defineExtension, useCommand } from 'reactive-vscode'
import { window, workspace } from 'vscode'
import { getAllMDFiles, selectDir, selectFile } from './utils/file'
import { processTranslate } from './processTranslate'
import MDFile from './utils/md'
import bar from './utils/bar'
import { containsChinese } from './utils/char'

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
      const to = path.join(toDir, fileName)

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
        const fileName = path.basename(from)

        const toDir = await selectDir()
        const to = path.join(toDir, fileName)

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
      const tasks: Array<() => PromiseLike<void>> = []
      const files = await getAllMDFiles()
      let i = 0
      let len = 0
      for (const file of files) {
        const document = await workspace.openTextDocument(file)
        const input = document.getText()
        if (containsChinese(input)) {
          continue
        }
        const mdFile = new MDFile(
          file.fsPath,
          file.fsPath,
          input,
          true,
        )

        tasks.push(async () => {
          window.showInformationMessage(`Start translate ${mdFile.filename}(${++i}/${len})`)
          const output = await processTranslate(mdFile.input, pluginConfig)
          mdFile.setOutput(output)
          await mdFile.write()
        })
      }

      len = tasks.length
      window.showInformationMessage(`${len} files to translate`)
      if (!pluginConfig.concurrent) {
        for (const task of tasks) {
          await task()
        }
      }
      else {
        await Promise.all(tasks.map(task => task()))
      }
    }
    catch (error) {
      window.showErrorMessage((error as Error).message)
    }
  })
})

export { activate, deactivate }
