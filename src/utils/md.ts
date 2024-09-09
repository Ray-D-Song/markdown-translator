import { writeFile } from 'node:fs/promises'
import path from 'node:path'
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

    this.filename = path.basename(from) ?? `${new Date().getTime()}.md`
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

    await writeFile(
      this.to === this.from ? path.join(path.dirname(this.to), `translated-${this.filename}`) : this.to,
      this.output,
      {
        flag: 'wx',
      },
    )
  }
}

export default MDFile
