import security from '@architecturex/utils.security'

const isClient = typeof window !== 'undefined'

const cookies = {
  get(cookie: string, cookiesStr = '') {
    if (!cookiesStr && isClient) {
      cookiesStr = document.cookie
    }

    const cookiesObj = cookiesStr.split('; ').reduce((prev: any, current: string) => {
      const [name, ...value] = current.split('=')
      prev[name] = value.join('=')
      return prev
    }, {})

    let parsed = cookiesObj[cookie] || ''

    try {
      parsed = JSON.parse(cookiesObj[cookie])
    } catch (e) {
      // console.log(e)
    }

    return parsed
  },
  set({
    name = '',
    value = '',
    days = 7,
    secure = false,
    httpOnly = false
  }: {
    name: string,
    value: string,
    days?: number,
    secure?: boolean,
    httpOnly?: boolean
  }) {
    if (!name) {
      return false
    }

    let cookieString = `${name}=${value}`

    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      cookieString += `; expires=${date.toUTCString()}`
    }

    if (secure) {
      cookieString += '; Secure';
    }

    if (httpOnly) {
      cookieString += '; HttpOnly';
    }

    cookieString += '; path=/'

    document.cookie = cookieString

    return true
  },
  delete(name: string) {
    this.set({
      name,
      value: '',
      days: -1
    });
  },
  getUserData(cookie = '', roles = []) {
    if (isClient) {
      cookie = document.cookie
    }

    const atCookie = 'at'

    const at = cookie.includes(atCookie) && this.get(atCookie, cookie)

    const decodedAt = security.base64.decode(at)

    console.log('decodedAt', decodedAt)

    const theme = cookie.includes('theme') && this.get('theme', cookie)
    const language = cookie.includes('language') && this.get('language', cookie)

    const userData: any = {
      at,
      user,
      isLogged: !!at && !!user,
      preferences: {
        theme,
        language,
      }
    }

    if (roles.length > 0) {
      roles.forEach((role: string) => {
        if (user?.role.includes(role)) {
          userData[`is${role.charAt(0).toUpperCase() + role.slice(1)}`] = true;
        }
      });
    }

    return userData
  }
}

export default cookies
