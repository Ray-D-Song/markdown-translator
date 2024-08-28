interface Config {
  apiEndpoint: string
  apiKey: string
  prompt: string
  model: string
  apiCallInterval: number
  fragmentSize: number
  temperature: number
  codeBlockPreservationLines: number
  httpsProxy?: string
}

export type {
  Config
}