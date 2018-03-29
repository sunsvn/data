<template>
  <div :class="{day: true, 'flex-c flex-c-c': true, 'is-today': isToday, 'is-selected': selected, 'disabledDay': isDisable, 'is-weekend': isWeekend, 'is-public': isPublic && getSpecDate }" @click="handleClick(day, isDisable)">
    <p>{{getSpecDate}}</p>
    <span v-if="isToday" class="todayDesc">今天</span>
    <span v-if="isPublic && getSpecDate" class="publicDesc">{{isPublic.desc}}</span>
  </div>
</template>

<script>

export default {
  methods: {
    handleClick (day, isDisable) {
      if (isDisable) return false
      this.selected = !this.selected
      if (this.selected) { this.onSelect(day) } else { this.onDeselect(day) }
    }
  },
  computed: {
    getSpecDate () {
      return this.day.getMonth() === this.month ? this.day.getDate() : '' 
    },
    isPublic () {
      if (this.publicDates && this.publicDates.length) {
        for (let i = 0, l = this.publicDates.length; i < l; i++) {
          if (this.dateStr === this.publicDates[i].date) {
            return this.publicDates[i]
          }
        }
        return false
      }
      return false
    },
    isWeekend () {
      const today = new Date(this.day)
      return today.getDay() === 6 || today.getDay() === 0
    },
    dateStr () {
      const today = new Date(this.day)
      return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    },
    isDisable () {      
      return this.disableDates.includes(this.dateStr) || (this.day.getMonth() !== this.month)
    },
    isToday () {
      const today = new Date()
      const day = this.day
      return day.getFullYear() === today.getFullYear() &&
             day.getMonth() === today.getMonth() &&
             day.getDate() === today.getDate()
    }
  },
  mounted () {
    this.selected = this.isSelected
    
  },
  data () {
    return {
      selected: false
    }
  },
  props: {
    month: {
      type: Number,
      required: true
    },
    day: {
      type: Date,
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
    isSelected: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.day {
  cursor: pointer;
  height: 48px;
  text-align: center;
  border-radius: 6px;
  flex: 1;
  margin: 6px 3px;
}

.day p {
  width: 100%;
  display: block;
}

.day.is-today {
  background-color:#eee;
}

.day.is-selected {
  background-color: #0093d5;
  color: #fff;
}

.day.is-selected:hover {
  background-color: #0093d5;
  color: #fff;
}

.day:hover {
  background-color: whitesmoke;
}
.disabledDay {
  color: #ddd;
}
.is-weekend {
  color: #57c986;
}
.is-public {
  background-color: #ff893c;
  color: #fff;
}
.publicDesc, .todayDesc {
  display: block;
  font-size: .12rem;
}
</style>
