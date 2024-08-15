import * as crypto from 'node:crypto'

type CodeBlocks = Record<string, string>

interface ReplaceResult {
  output: string
  codeBlocks: CodeBlocks
}

export function replaceCodeBlocks(mdContent: string, preservationLines = 5): ReplaceResult {
  const codeBlockRegex = /(\s*)```.*\n\1([\s\S]*?)\n\1```/g
  const codeBlocks: CodeBlocks = {}
  const output = mdContent.replace(codeBlockRegex, (match, indent, content) => {
    const lines = match.split('\n')
    if (lines.length > preservationLines) {
      const id = crypto.randomBytes(8).toString('hex')
      codeBlocks[id] = content
      return `${lines[0]}\n${indent}(((((${id})))))\n${indent}\`\`\``
    }
    return match
  })
  return { output, codeBlocks }
}

export function restoreCodeBlocks(mdContent: string, codeBlocks: CodeBlocks): string {
  const placeholderRegex = /\(\(\(\(\(([a-z0-9]+)\)\)\)\)\)/g
  return mdContent.replace(placeholderRegex, (match, id) => {
    return codeBlocks[id] ?? match
  })
}

export function splitStringAtBlankLines(input: string, fragmentLength: number): string[] | null {
  const lines = input.split('\n')
  let inCodeBlock = false
  let currentFragment: string[] = []
  const fragments: string[] = []
  let nearstToHalfDiff: number = Number.POSITIVE_INFINITY
  let nearstToHalfIndex = -1

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('```'))
      inCodeBlock = !inCodeBlock

    if (!inCodeBlock && lines[i].trim() === '') {
      const currentLength = currentFragment.join('\n').length

      if (fragmentLength > 0) {
        if (currentLength + lines[i].length > fragmentLength) {
          fragments.push(currentFragment.join('\n'))
          currentFragment = []
        }
      }
      else {
        const halfLength = Math.floor(lines.length / 2)
        if (Math.abs(halfLength - i) < nearstToHalfDiff) {
          nearstToHalfDiff = Math.abs(halfLength - i)
          nearstToHalfIndex = i
        }
      }
    }
    currentFragment.push(lines[i])
  }

  if (fragmentLength === 0) {
    if (nearstToHalfIndex <= 0)
      return null // no split point found
    fragments.push(lines.slice(0, nearstToHalfIndex).join('\n'))
    fragments.push(lines.slice(nearstToHalfIndex).join('\n'))
    return fragments
  }

  fragments.push(currentFragment.join('\n'))
  return fragments
}
