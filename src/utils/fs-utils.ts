import * as fs from 'node:fs'
import * as path from 'node:path'
import { useWorkspaceFolders } from 'reactive-vscode'
import type { WorkspaceFolder } from 'vscode'

interface Directory {
  path: string
  name: string
}

async function getAllDir(): Promise<Directory[]> {
  const workspaces = (useWorkspaceFolders().value || [])
    .map(workspace => workspace.uri.fsPath)

  const dirList: Array<Directory> = []

  async function getDir(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        dirList.push({
          path: fullPath,
          name: entry.name,
        })
        await getDir(fullPath)
      }
    }
  }

  for (const workspace of workspaces) {
    await getDir(workspace as string)
  }

  return dirList
}

export {
  getAllDir,
}
