export interface Config {
  apiEndpoint: string
  apiKey: string
  prompt: string
  model: string
  apiCallInterval: number
  fragmentSize: number
  temperature: number
  codeBlockPreservationLines: number
  httpsProxy?: string
  outputPath: string
}
