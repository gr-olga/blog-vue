<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import {usePost} from "../store/posts";
import {periods} from "../constants";

const postStore = usePost()
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
    <a
        v-for="period of periods"
        :class="{'is-active' : period === postStore.selectedPeriod}"
        :key="period"
        @:click="postStore.setSelectedPeriod(period)"
    >
      {{ period }}
    </a>
  </span>
    <TimelineItem
        v-for="post of postStore.filterPosts"
        :key="post.id"
        :post="post"
    />
  </nav>
</template>