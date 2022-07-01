import { ConfigurationModel } from '@/main/application'

export const configurationSetup = (): ConfigurationModel => ({
  baseURL: process.env.BASE_URL,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  accessTokenName: process.env.ACCESS_TOKEN_NAME,
  publicKey: process.env.SECURITY_PUBLIC_KEY
})
