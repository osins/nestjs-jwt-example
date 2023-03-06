import { compare, hash, genSaltSync } from 'bcrypt'
import { optional } from 'osins-utils'

export const salt = async () => {
  return genSaltSync()
}

export const encrypt = async (text: string, salt: string) => {
  return await hash(text, salt)
}

export const verify = async (text: string, hash: string) => {
  if (optional(text).isEmpty() || optional(hash).isEmpty())
    return false
  return await compare(text, hash)
}
