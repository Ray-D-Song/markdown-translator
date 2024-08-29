import { writeFile } from 'node:fs/promises'
import { logger } from './logger'

class MDFile {
  from: string
  to: string
  input: string
  output?: string
  overwrite: boolean
  filename: string

  constructor(from: string, to: string, input: string, override?: boolean) {
    this.from = from
    this.to = to
    this.input = input
    this.overwrite = override || false

    this.filename = from.split('/').pop() ?? `${new Date().getTime()}.md`
  }

  setOutput(output: string) {
    this.output = output
  }

  async write() {
    if (!this.output) {
      logger.error('no ouput content')
      return
    }
    if (this.overwrite) {
      await writeFile(this.to, this.output, {
        flag: 'w',
      })
      return
    }

    const arr = this.to.split('/')
    const toDirPath = arr
      .splice(arr.length - 1)
      .join('/')

    await writeFile(
      this.to === this.from ? `${toDirPath}/translated-${this.filename}` : this.to,
      this.output,
      {
        flag: 'wx',
      },
    )
  }
}

export default MDFile
