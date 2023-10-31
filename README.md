# @architecturex/utils.cookies

## cookies

The cookies module provides a set of utility functions to work with browser cookies, including getting, setting, deleting cookies and extracting user data based on specific roles.

### Installation

`npm install @architecturex/utils.cookies`

### Features

- Get the value of a specific cookie.
- Set a new cookie with various options.
- Delete a specific cookie.
- Extract user data from cookies.

### Usage

```javascript
import cookies from '@architecturex/utils.cookies'
```

#### get(cookie: string, cookiesStr = '')

Returns the value of a specified cookie. If no cookiesStr is provided, it defaults to the client's document cookie.

```javascript
cookies.get('myCookie')
```

#### set(options: { name, value, days, secure, httpOnly })

Sets a new cookie.

```javascript
cookies.set({ name: 'myCookie', value: 'the value', days: 7, secure: false, httpOnly: true })
```

*Parameters:*

**options:** An object with the following properties:
- **name:** Name of the cookie.
- **value:** Value of the cookie.
- **days (optional):** Number of days until the cookie expires. Default is 7.
- **secure (optional):** Whether the cookie should have the Secure flag. Default is false.
- **httpOnly (optional):** Whether the cookie should have the HttpOnly flag. Default is true.

*Returns:*

true if the cookie is set successfully, false otherwise.

#### delete(name: string)

Deletes a specified cookie.

```javascript
cookies.delete('myCookie')
```

*Parameters:*

- **name:** The name of the cookie you want to delete.

#### getUserData(cookie = '', roles = [])

Extracts user data from cookies.

```javascript
const userData = cookies.getUserData('', ['admin', 'editor']);
```

*Parameters:*

- **cookie:** A string of the cookie (optional).
- **roles:** An array of role strings to check within the user cookie (optional).

*Returns:*

An object containing the user data extracted from the cookies.

### Contribution

Feel free to suggest improvements, report issues, or contribute to enhancing these utilities. Your feedback and contributions are welcome!
