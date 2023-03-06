import { compare, hash, genSaltSync } from 'bcrypt'
import utils from 'osins-utils'

export const salt = async () => {
  return genSaltSync()
}

export const encrypt = async (text: string, salt: string) => {
  return await hash(text, salt)
}

export const verify = async (text: string, hash: string) => {
  if (utils.optional(text).isEmpty() || utils.optional(hash).isEmpty())
    return false
  return await compare(text, hash)
}
