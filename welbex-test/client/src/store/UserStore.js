import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._posts = []
        this._selectedPost = {}
        this._userPosts = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setPosts(posts){
        this._posts = posts
    }

    setSelectedPost(post){
        this._selectedPost = post
    }

    setUserPosts(posts){
        this._userPosts = posts
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get posts(){
        return this._posts
    }

    get selectedPost(){
        return this._selectedPost
    }

    get userPosts(){
        return this._userPosts
    }
}
