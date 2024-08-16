import { glob } from 'glob'
import type { Uri } from 'vscode'
import { window, workspace } from 'vscode'

async function selectFile() {
  const files: Uri[] = await workspace.findFiles('**/*.{md,mdx}', '**/node_modules/**')
  const fileItems = files.map(file => ({
    label: workspace.asRelativePath(file).split('/').pop() || '',
    description: workspace.asRelativePath(file),
    uri: file,
  }))

  const inFileItem = await window.showQuickPick(fileItems, {
    placeHolder: 'Select input files',
  })

  if (!inFileItem) {
    throw new Error('No file selected')
  }

  const document = await workspace.openTextDocument(inFileItem.uri)
  const inputFile = document.getText()

  return { inputFile, fileName: inFileItem.label, filePath: inFileItem.uri.fsPath }
}

async function selectDir() {
  const workspaceFolders = workspace.workspaceFolders
  let dirItems: { label: string, description: string, fsPath: string }[] = []

  for (const folder of workspaceFolders || []) {
    const dirs = await glob('**/', { cwd: folder.uri.fsPath, ignore: ['**/node_modules/**', '**/.git/**', '**/.vscode/**', '**/dist/**', '**/.dist/**'] })
    dirItems = dirItems.concat(dirs.map(dir => ({
      label: dir.split('/').filter(Boolean).pop() || '',
      description: dir,
      fsPath: `${folder.uri.fsPath}/${dir}`,
    })))
  }

  const selectedDir = await window.showQuickPick(dirItems, {
    placeHolder: 'Select a directory',
  })

  if (!selectedDir) {
    throw new Error('No directory selected')
  }
  const outputDir = selectedDir.fsPath

  return outputDir
}

export {
  selectFile,
  selectDir,
}
