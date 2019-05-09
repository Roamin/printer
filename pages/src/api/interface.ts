export default interface ApiInterface {
  [key: string]: {
    async?: boolean
    channel: string
  }
}
