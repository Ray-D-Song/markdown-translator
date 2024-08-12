import { defineExtension, useCommand } from 'reactive-vscode'
import { window } from 'vscode'

const { activate, deactivate } = defineExtension(() => {
  useCommand('markdown translator.translate', () => {
    window.showInformationMessage('Hello World!')
  })
})

export { activate, deactivate }
