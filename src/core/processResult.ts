const blackList = [`I'm ready`, `Translate`, 'translate', '*examples*']

function processResult(result: string) {
  const lines = result.split('\n')
  if (lines.length > 0 && blackList.some(item => lines[lines.length - 1].includes(item))) {
    lines.pop()
  }

  return lines.join('\n')
}

export {
  processResult,
}
