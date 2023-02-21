
export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  agency: string,
  account: string,
  saldo: number,
  transfers : Array<ExtractTransfers>
}

export type ExtractTransfers = {
  id: string,
  value: number,
  date: string,
  hour: string,
  type: string,
  operation: string
}
