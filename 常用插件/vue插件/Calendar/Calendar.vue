<template>
  <div class="vue-infinite-calendar">
    <div class="calendar-header" :style="{width: width}">
      <!--
      <a href="javascript:void(0)" class="today-button" @click="scrollToDate(new Date())">Today</a>
      -->
      <div class="current-year" v-show="false">{{currentYear}}</div>
      <div class="week-days">
        <div :class="{'week-day': true, 'isToday': todayName == index}" v-for="(weekday, index) in weekdays" :key="index">{{weekday}}</div>
      </div>
    </div>
    <div class="calendar-container" :style="{width: width, height: height}" @scroll="handleScroll">
      <MonthList
        :year="currentYear"
        :months="months"
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
import MonthList from './MonthList.vue'

export default {
  components: {
    MonthList
  },
  data () {
    return {
      currentYear: new Date().getFullYear(),
      selectedDates: []
    }
  },
  computed: {
    todayName () {
      const today = new Date()
      return (today.getDay() - this.firstDay) > 0 ? today.getDay() : (today.getDay()- this.firstDay + 7)
    },
    weekdays () {
      let weekDays = []
      let firstDay = this.firstDay
      while (weekDays.length !== 7) {
        weekDays.push(this.dayNames[firstDay])
        firstDay += 1
        if (firstDay >= this.dayNames.length) { firstDay = 0 }
      }
      return weekDays
    },
    months () {
      let month = this.min.getMonth()
      let year = this.min.getFullYear()
      let currentDate = this.min
      let displayedMonths = []

      while (currentDate.getTime() < this.max.getTime()) {
        displayedMonths.push({ year: year, month: month })
        month += 1
        if (month >= 12) {
          year += 1
          month -= 12
        }
        currentDate = new Date(year, month)
      }
      return displayedMonths
    },
    headerHeight () {
      return this.$el.querySelector('.calendar-header').getBoundingClientRect().height
    }
  },
  created () {
    this.selected.forEach((date) => {
      const isoDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      this.selectedDates.push(isoDate)
    })
  },
  mounted () {
    this.scrollToDate(new Date())
  },
  props: {
    selected: {
      type: Array,
      default () { return [] }
    },
    min: {
      type: Date,
      default () {
        return new Date(2018, 0, 1)
      }
    },
    max: {
      type: Date,
      default () {
        return new Date(2018, 11, 31)
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    monthNames: {
      type: Array,
      default () {
        return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    },
    dayNames: {
      type: Array,
      default () { return ['日', '一', '二', '三', '四', '五', '六'] }
    },
    firstDay: {
      type: Number,
      default: 1 // Monday
    },
    onSelect: {
      type: Function,
      default () { }
    },
    onDeselect: {
      type: Function,
      default () { }
    }
  },
  methods: {
    scrollToDate (date) {
      const month = date.getMonth()
      const year = date.getFullYear()
      this.scrollToMonth(year, month)
    },
    scrollToMonth (year, month) {
      const headerHeight = this.headerHeight
      const offset = this.$el.querySelector(`.month[data-month="${month}"][data-year="${year}"]`).offsetTop
      this.$el.querySelector('.calendar-container').scrollTop = offset - headerHeight
    },
    handleScroll () {
      const headerHeight = this.headerHeight
      const scrollTop = this.$el.querySelector('.calendar-container').scrollTop
      const years = this.$el.querySelectorAll('.year')
      for (let i = 0; i < years.length; i++) {
        const year = years[i]
        if (scrollTop <= year.offsetTop - (headerHeight - 10)) {
          if (i !== 0) { this.currentYear = Number(year.innerHTML) - 1 }
          return
        }
      }
      this.currentYear = this.max.getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
.vue-infinite-calendar {
  position: relative;
}

.calendar-container {
  padding-top: .4rem;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: .1rem;
}

.calendar-header {
  background-color: white;
  box-shadow: 0 1px 4px #ccc;
  width: inherit;
  margin: 0 auto;
  position: fixed;
  top: .44rem;
  left: 0;
  .current-year {
    font-size: 1.5rem;
  }

  .today-button {
    text-decoration: none;
  }

  .week-days {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    .week-day {
      display: inline-block;
      width: 14.28571%;
      text-align: center;
      &:first-child, &:last-child {
        color: #57c986;
      }
    }
  }
  .isToday {
    color: #ff893c;
  }
}
</style>
