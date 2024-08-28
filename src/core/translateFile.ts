import type { Config } from '../types'
import bar from '../utils/bar'
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
    (status) => {
      if (isSplitStatus(status)) {
        bar.text = `markdown translator: ${status.members[0].lastToken}`
      }
    },
  )
  if (result.status === 'error')
    throw new Error(result.message)

  const translatedText = (result as DoneStatus).translation
  const finalResult = `${restoreCodeBlocks(translatedText, codeBlocks)}\n`
  return processResult(finalResult)
}

function isSplitStatus(status: any): status is { status: 'split', members: { lastToken: string }[] } {
  return status.status === 'split'
}

export {
  translateFile,
}
