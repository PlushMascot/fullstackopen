import loginService from '../services/login'
import blogService from '../services/blogs'

export const setUser = (content) => {
    console.log('content: ', content);
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            data: { name: content.name, username: content.username, token: content.token }
        })
    }
}

export const login = (content) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username: content.username,
                password: content.password
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: 'SET_USER',
                data: user
            })
        } catch (exception) {
            return exception
        }
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}

const userReducer = (state = null, action) => {
    console.log('state: ', state);
    switch (action.type) {
        case 'SET_USER':
            console.log("heii", action.data)
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export default userReducer