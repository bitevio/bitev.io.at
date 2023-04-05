<template>
  <q-dialog transition-show="" maximized="" full-height="" full-width="">
    <q-card>
      <q-card-actions class="q-pa-md bg-dark text-white">
        <q-icon name="mdi-calendar" />
        <q-toolbar-title> Planning </q-toolbar-title>
        <q-space />
        <q-btn flat round v-close-popup icon="mdi-close"> </q-btn>
      </q-card-actions>
      <q-card-actions class="q-py-sm">
        <q-toggle v-model="state.showCalendar" />

        <q-toolbar-title> Calendar </q-toolbar-title>
        <q-space />
      </q-card-actions>
      <q-separator />
      <q-card-section style="height: 80vh; width: 100%" class="scroll">
        <div class="row q-col-gutter-md">
          <div v-if="state.showCalendar" class="col-12 col-md-7">
            <q-tabs v-model="calendarState.monthYear.key">
              <q-tab v-for="d of state.ranges" :label="d.label" :name="d.key"></q-tab>
            </q-tabs>

            <q-markup-table flat separator="cell" class="calendar">
              <thead>
                <tr>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(raw, step) of 6">
                  <td class="bg-lite" v-for="day of 7">
                    <q-smart-reactif
                      v-slot="{ hover }"
                      class="fit flex flex-center"
                      v-show="
                        isInMonth({
                          day: day,
                          step: day + step * 7,
                          raw: raw,
                        })
                      "
                    >
                      <div
                        class="fit bg-white flex flex-center"
                        :class="hover ? 'cursor-pointer bg-black text-white' : ''"
                      >
                        <div class="">
                          {{
                            isInMonth({
                              day: day,
                              step: day + step * 7,
                            }).dayInt
                          }}
                        </div>
                      </div>
                    </q-smart-reactif>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
          <div class="col-12 col-md-5 bg-white">
            <q-card-actions>
              <q-toolbar-title class="text-bold"> Events </q-toolbar-title>
              <q-space />
              <q-btn color="black" label="Add" outline="" icon="mdi-plus" />
            </q-card-actions>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import "v-calendar/dist/style.css";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import { reactive, onMounted, watch } from "vue";
import moment from "moment";
import groupBy from "json-groupby";

const props = defineProps({
  entry: {},
  field: {},
});

console.log("Props", props);

const state = reactive({
  showCalendar: true,
  ranges: [],
  rangesBy: {},
  date: {
    from: props.entry[props.field.eventStartField] || moment().format("YYYY-MM-DD"),
    to: props.entry[props.field.eventEndField] || moment().format("YYYY-MM-DD"),
  },
});

const calendarState = reactive({
  monthYear: {
    key: moment(state.date.from).format("YYYY-MM"),
    dates: [],
  },
});

watch(
  () => calendarState.monthYear.key,
  (val) => {
    reformat();
  }
);

function reformat() {
  calendarState.monthYear.dates = state.rangesBy[calendarState.monthYear.key] || [];
}

onMounted(() => {
  getAllDates(state.date.from, state.date.to);
});

function getAllDates(startDate, endDate) {
  startDate = moment(startDate);
  endDate = moment(endDate);
  var now = startDate.clone(),
    dates = [];
  while (now.isSameOrBefore(endDate)) {
    dates.push({
      date: now.format("DD/MM/YYYY"),
      day: now.isoWeekday(),
      week: now.week(),
      dayInt: Number(now.format("DD")),
      key: now.format("YYYY-MM"),
      label: now.format("DD ddd"),
    });
    now.add(1, "days");
  }

  var ranges = [];
  var dgroup = groupBy(dates, ["key"]);
  state.rangesBy = dgroup;

  Object.keys(dgroup).map((e) => {
    ranges.push({
      key: e,
      label: moment(e).format("MMMM. YYYY"),
      // dates: dgroup[e],
    });
  });
  state.ranges = ranges;
}

function isInMonth(val) {
  var jumpTo = Number(moment(calendarState.monthYear.key + "-01").isoWeekday());
  var coef = val.step - jumpTo + 1;
  if (coef < 0) return false;
  reformat();
  var check = {
    day: val.day,
    step: val.step,
  };

  //console.log(calendarState.monthYear.dates);

  // get exact date to match calendar

  var isL = calendarState.monthYear.dates.filter((e, index) => {
    //console.log(coef, e.dayInt);
    return e.day == check.day && coef == e.dayInt;
  });

  if (isL.length) {
    return isL[0];
  }

  return false;
}
</script>
