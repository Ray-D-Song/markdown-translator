import { defineExtension, useCommand, useQuickPick, useStatusBarItem, useWorkspaceFolders } from 'reactive-vscode'
import { FileType, type Uri, window, workspace } from 'vscode'
import { getAllDir } from './utils/fs-utils'

const { activate, deactivate } = defineExtension(() => {
  useCommand('markdown-translator.translate', async () => {
    await selectWorkspaceFile()
  })
})

async function selectWorkspaceFile() {
  const files: Uri[] = await workspace.findFiles('**/*.{md,mdx}', '**/node_modules/**')
  const fileItems = files.map(file => ({
    label: workspace.asRelativePath(file),
    description: workspace.asRelativePath(file),
  }))

  const selectedFile = await window.showQuickPick(fileItems, {
    placeHolder: 'Select input files',
  })
  if (!selectedFile) {
    return
  }

  const dirs = await getAllDir()
  const outputPath = await window.showQuickPick(
    dirs.map(dir => ({
      label: workspace.asRelativePath(dir.name),
      description: workspace.asRelativePath(dir.path),
    })) ?? [],
    {
      placeHolder: 'Select output directory',
    },
  )
  if (!outputPath) {
    return
  }

  window.showInformationMessage(`Start translate: ${selectedFile.label.split('/').pop()}`)
  const bar = useStatusBarItem({
    text: `Translating 0%`,
  })
  bar.show()
  setTimeout(() => {
    bar.text = `Translating 50%`
    window.showInformationMessage(`Translated: ${selectedFile.label.split('/').pop()}`)
  }, 3000)
}

export { activate, deactivate }
