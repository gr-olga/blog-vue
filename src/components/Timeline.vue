<script setup lang="ts">
import {ref, computed} from "vue";
import {TimelinePost, today, thisMonth, thisWeek} from "../posts";
import {DateTime} from "luxon";
import TimelineItem from "./TimelineItem.vue";

// type Period = 'Today'| 'This week'| 'This month'
// const periods:Period[] = ['Today', 'This week', 'This month']

const periods = ['Today', 'This week', 'This month'] as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>("Today")

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
      .map(post => {
        return {
          ...post, created: DateTime.fromISO(post.created)
        }
      })
      .filter(post => {
        if (selectedPeriod.value === "Today") {
          return post.created >= DateTime.now().minus({day: 1})
        }
        if (selectedPeriod.value === "This week") {
          return post.created >= DateTime.now().minus({week: 1})
        }
        return post
      })
})

</script>

<template>

  <nav class="is-primary panel">
    {{ selectedPeriod }}
    <span class="panel-tabs">
    <a
        v-for="period of periods"
        :class="{'is-active' : period === selectedPeriod}"
        :key="period"
        @:click="selectPeriod(period)"
    >
      {{ period }}
    </a>
  </span>
    <TimelineItem
        v-for="post of posts"
        :key="post.id"
        :post="post"
    />
  </nav>
</template>