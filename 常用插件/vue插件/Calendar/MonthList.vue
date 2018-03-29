<template>
  <div class="month-list">
    <div v-for="(month, index) in months" :key="index" style="margin-top: .2rem;">
      <div class="year" v-if="month.month === 0">{{month.year}}</div>
      <Month
        :month="month.month"
        :year="month.year"
        :monthNames="monthNames"
        :firstDay="firstDay"
        :onSelect="onSelect"
        :onDeselect="onDeselect"
        :selectedDates="selectedDates"
      />
    </div>
  </div>
</template>

<script>
import Month from './Month.vue'

export default {
  components: {
    Month
  },
  props: {
    disable: {
      type: Array
    },
    months: {
      type: Array,
      required: true
    },
    monthNames: {
      type: Array,
      required: true
    },
    firstDay: {
      type: Number,
      required: true
    },
    onSelect: {
      type: Function,
      required: true
    },
    onDeselect: {
      type: Function,
      required: true
    },
    selectedDates: {
      type: Array,
      required: true
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
.month-list .year:first-child {
  display:none;
}

.year {
  margin-top: 15px;
  font-size: 1.5rem;
}
</style>
