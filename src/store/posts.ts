import {defineStore} from 'pinia'
import {TimelinePost, Post, thisMonth, thisWeek, today} from "../posts";
import {Period} from "../constants";
import {DateTime} from "luxon";

interface PostsState {
    ids: string[],
    all: Map<string, Post>,
    selectedPeriod: Period
}

function delay() {
    return new Promise<void>(res => setTimeout(res, 1500))
}

export const usePost = defineStore("posts", {
    state: (): PostsState => ({
        ids: [],
        all: new Map(),
        selectedPeriod: "Today"
    }),
    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
        },
        async fetchPosts() {
            const res = await window.fetch("http://localhost:8000/posts")
            const data = (await res.json()) as Post[]
            await delay()

            let ids: string[] = []
            let all = new Map<string, Post>()
            for (const post of data) {
                ids.push(post.id)
                all.set(post.id, post)
            }
            this.ids = ids
            this.all = all
        }
    },
    getters: {
        filterPosts: (state): TimelinePost[] => {
            return state.ids
                .map(id => {
                    const post = state.all.get(id)
                    if (!post) {
                        throw  Error("not found")
                    }
                    return {
                        ...post, created: DateTime.fromISO(post.created)
                    }
                })
                .filter(post => {
                    if (state.selectedPeriod === "Today") {
                        return post.created >= DateTime.now().minus({day: 1})
                    }
                    if (state.selectedPeriod === "This week") {
                        return post.created >= DateTime.now().minus({week: 1})
                    }
                    return post
                })
        }
    }
})