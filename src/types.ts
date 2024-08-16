export interface Config {
  apiEndpoint: string
  apiKey: string
  prompt: string
  model: string
  needOverwrite: boolean
  apiCallInterval: number
  fragmentSize: number
  temperature: number
  codeBlockPreservationLines: number
  httpsProxy?: string
  outputPath: string
}
