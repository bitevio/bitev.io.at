<template>
  <div v-show="false" :class="`${props.action}-route`" v-close-popup="props.depth"></div>
</template>
<script setup>
const props = defineProps({
  action: {
    type: String,
    default: "stop-on-close",
  },
  depth: {
    type: Number,
    default: 1,
  },
});
</script>
