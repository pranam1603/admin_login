/* AccessToken */
export function getAccessToken() {return localStorage.getItem('acsToken') }
export function setAccessToken(accessToken) {
    console.log({set: accessToken});
    if (accessToken !== "undefined" && accessToken !== null) localStorage.setItem('acsToken', accessToken)
}

/* RefreshToken */
export function getRefreshToken() {return localStorage.getItem('rfsToken') }
export function setRefreshToken(refreshToken) {
    console.log({set: refreshToken});
    if (refreshToken !== "undefined" && refreshToken !== null) localStorage.setItem('rfsToken', refreshToken)
}

/* User */
export function getUser() {return localStorage.getItem('user') }
export function setUser(user) {
    console.log({set: user});
    if (user !== "undefined" && user !== null) localStorage.setItem('user', user)
}