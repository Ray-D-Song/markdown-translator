function containsChinese(content: string): boolean {
  const chineseRegex = /[\u4E00-\u9FA5]/
  return chineseRegex.test(content)
}

export {
  containsChinese,
}
