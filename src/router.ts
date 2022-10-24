import {createRouter, createWebHistory} from "vue-router";
import Home from "./vievws/Home.vue"
import NewPost from "./vievws/NewPost.vue"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/posts/new",
            component: NewPost
        }
    ]
})