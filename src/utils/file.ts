import path from 'node:path'
import { glob } from 'glob'
import { window, workspace } from 'vscode'
import { logger } from './logger'

async function getAllMDFiles() {
  return await workspace.findFiles('**/*.{md,mdx}', '**/node_modules/**')
}

async function selectFile() {
  const files = await getAllMDFiles()
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
  const input = document.getText()

  return { input, fileName: inFileItem.label, from: inFileItem.uri.fsPath }
}

async function selectDir() {
  const workspaceFolders = workspace.workspaceFolders
  let dirItems: { label: string, description: string, fsPath: string }[] = []

  for (const folder of workspaceFolders || []) {
    const dirs = await glob('**/', { cwd: folder.uri.fsPath, ignore: ['**/node_modules/**', '**/.git/**', '**/.vscode/**', '**/dist/**', '**/.dist/**'] })
    dirItems = dirItems.concat(dirs.map(dir => ({
      label: path.basename(dir),
      description: dir,
      fsPath: dir === '.' ? folder.uri.fsPath : path.join(folder.uri.fsPath, dir),
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
  getAllMDFiles,
}
