import {defineStore} from 'pinia'
import {TimelinePost, Post, thisMonth, thisWeek, today} from "../posts";
import {Period} from "../constants";
import {DateTime} from "luxon";

interface PostsState {
    ids: string[],
    all: Map<string, Post>,
    selectedPeriod: Period
}
export const usePost = defineStore("posts", {
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth]
        ]),
        selectedPeriod: "Today"
    }),
    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
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