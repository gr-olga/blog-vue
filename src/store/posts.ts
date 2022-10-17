// import {reactive, readonly} from "vue";
//
// interface PostState {
//     foo: string
// }

//
// export class PostStore {
//     #state: PostState
//
//     constructor() {
//         this.#state = reactive<PostState>({
//             foo: 'foo'
//         })
//     }
//     getState(){
//         return readonly(this.#state)
//     }
//     updateFoo (foo: string){
//         this.#state.foo = foo
//     }
// }
//
// const store = new PostStore()
// export  function usePost(){
//    return  store
// }

import {defineStore} from 'pinia'
import {Post, thisMonth, thisWeek, today} from "../posts";

// interface PostState {
//     foo: string
// }
//
// export const usePost = defineStore('posts', {
//     state: (): PostState => ({
//         foo: 'foo'
//     }),
//     actions: {
//         updateFoo(foo: string) {
//             this.foo = foo
//         }
//     }
// })

interface PostsState {
    ids: string[],
    all: Map<string, Post>
}

export const usePost = defineStore("posts", {
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth]
        ])
    })
})