import { writeFile } from 'node:fs/promises'
import type { Config } from '../types'
import { logger } from '../utils/logger'
import configureApiCaller from './api'
import { replaceCodeBlocks, restoreCodeBlocks, splitStringAtBlankLines } from './md'
import { translateMultiple } from './translate'
import type { DoneStatus } from './status'
import { processResult } from './processResult'

async function translateFile(
  inFile: string,
  config: Config,
) {
  const markdown = inFile

  const { output: replacedMd, codeBlocks } = replaceCodeBlocks(
    markdown,
    config.codeBlockPreservationLines,
  )
  const fragments = splitStringAtBlankLines(
    replacedMd,
    config.fragmentSize,
  ) ?? [replacedMd]

  const callApi = configureApiCaller({
    apiEndpoint: config.apiEndpoint,
    apiKey: config.apiKey,
    rateLimit: config.apiCallInterval,
    httpsProxy: config.httpsProxy,
  })

  const result = await translateMultiple(
    callApi,
    fragments,
    config,
    () => {},
  )
  if (result.status === 'error')
    throw new Error(result.message)

  const translatedText = (result as DoneStatus).translation
  const finalResult = `${restoreCodeBlocks(translatedText, codeBlocks)}\n`
  await writeFile(config.outputPath, processResult(finalResult), 'utf-8')
}

export {
  translateFile,
}
