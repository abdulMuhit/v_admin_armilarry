<template>
  <div>
    <!-- br-pageheader -->
    <div class="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
      <h4 class="tx-gray-800 mg-b-5">LeadBoard</h4>
      <!-- <p class="mg-b-0">Dashboard cards are used in an overview or summary of a project, for crm or form cms.</p> -->
    </div>

    <div class="br-pagebody mg-t-5 pd-x-30 pt-4 card">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <no-ssr>
              <v-date-picker
                :popover-visibility="visibility"
                v-model="selectedDate"
                mode="range"
                :formats="formats"
                is-double-paned
                show-caps
              >
                <b-input-group slot-scope="props" :type="inputState.type">
                  <b-input-group-text
                    slot="append"
                    class="pointer"
                    title="Clear"
                    @click="clearDate"
                  >
                    <!--<strong class="text-danger">Clear<strong>-->
                    <i class="fa fa-trash" title="clear" />
                  </b-input-group-text>
                  <b-input-group-text
                    v-if="selectedDate"
                    slot="append"
                    class="pointer"
                    title="Cari"
                    @click="onDatePick(selectedDate)"
                  >
                    <!--<strong class="text-danger">Pick</strong>-->
                    <i class="fa fa-search" title="cari!" />
                  </b-input-group-text>
                  <b-form-input
                    type="text"
                    :value="props.inputValue"
                    :placeholder="inputState.message"
                    readonly
                    expanded
                    @click="openCalendar"
                    @change.native="props.updateValue($event.target.value)"
                  >></b-form-input>
                </b-input-group>
              </v-date-picker>
            </no-ssr>
          </div>
        </div>
      </div>

      <div class="row row-sm">
        <div class="col-sm-6 col-xl-4 mg-t-20 mg-xl-t-20" v-for="(rank, key) in report" :key="key">
          <div class="bg-secondary rounded overflow-hidden">
            <div class="pd-25 d-flex align-items-center">
              <!--<i class="ion ion-social-usd tx-60 lh-0 tx-white op-7"></i>-->
              <img src="../../assets/img/koin-bandros.png" />
              <div class="mg-l-20">
                <p
                  class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
                >#{{rank.id}}</p>
                <p
                  class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
                >{{rank.nama}}</p>
                <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{rank.total | currency}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- col-3 -->
      </div>
      <!-- br-pagebody -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Leadboard",
  layout: "Auth",
  data: function() {
    return {
      visibility: "hidden",
      selectedDate: {
        start: null,
        end: null
      },
      formats: {
        title: "MMMM YYYY",
        weekdays: "W",
        navMonths: "MMM",
        input: ["DD-MM-YYYY", "DD-MM-YYYY", "DD/MM/YYYY"],
        dayPopover: "DD_MM-YYY", // Only for `v-date-picker`
        data: ["DD-MM-YYYY", "DD-MM-YYYY", "DD/MM/YYYY"]
      },
      report: [
        { id: 1, nama: "Joko", total: 400000 },
        { id: 2, nama: "Desy", total: 30000 },
        { id: 3, nama: "Marlix", total: 200000 },
        { id: 4, nama: "Bexaz", total: 130000 },
        { id: 5, nama: "Bedaz", total: 110000 },
        { id: 6, nama: "Rumi", total: 10000 }
      ]
    };
  },
  filters: {
    currency: function(value) {
      //return 'Rp' + parseFloat(value).toFixed(2);
      /*function convertToRupiah(angka)
                {
                    var rupiah = '';
                    var angkarev = angka.toString().split('').reverse().join('');
                    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
                    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
                }*/
      let rupiah = "";
      let angkarev = value
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";

      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("")
      );
    }
  },
  created: function() {
    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 1);
    let endDate = new Date();

    this.selectedDate.start = startdate;
    this.selectedDate.end = endDate;
  },
  watch: {
    selectedDate(value) {
      this.visibility = "hidden";
    }
  },
  methods: {
    openCalendar() {
      this.visibility = this.visibility == "hidden" ? "visible" : "hidden";
      // console.log("open callender ", this.visibility);
    },
    clearDate: function() {
      console.log("clear date");
      this.selectedDate = null;
    },
    onDatePick: function(dates) {
      console.log("dates", dates);
      let that = this;
      let sd = "",
        ed = "";

      if (that.selectedDate.start !== "" || that.selectedDate.end !== "") {
        sd = that.$formatDate(that.selectedDate.start);
        ed = that.$formatDate(that.selectedDate.end);
      }

      console.log("sd, ed ", sd, ed);
    }
  },
  computed: {
    inputState() {
      if (!this.selectedDate) {
        return {
          type: "is-danger",
          message: "Date required."
        };
      }
      return {
        type: "is-primary",
        message: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
