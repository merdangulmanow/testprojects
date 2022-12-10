import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const    registration = async (name, email, password) => {
    const {data} = await $host.post('auth/signup', {name, email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('auth/signin', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchOneUser = async() => {
    const {data} = await $authHost.get('users/one')
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchAllPosts = async()=> {
    const {data} = await $authHost.get('posts')
    return data
}

export const addNewPost = async (post) => {
    const {data} = await $authHost.post('posts', post)
    return data
}

export const updatePost = async(post, postId) => {
    const {data} = await $authHost.put(`posts/`+postId, post)
    return data
}