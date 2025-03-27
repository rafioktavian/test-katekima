const ID_TOKEN_KEY = 'token' as string

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return useCookie(ID_TOKEN_KEY).value || null
}

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string, expIn?: number): void => {
  useCookie(ID_TOKEN_KEY, { maxAge: expIn, path: '/' }).value = token
}

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  useCookie(ID_TOKEN_KEY).value = null
}

export default { getToken, saveToken, destroyToken }
