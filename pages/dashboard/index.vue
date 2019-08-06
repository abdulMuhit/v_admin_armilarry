<template>
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
                <b-input-group-text slot="append" class="pointer" title="Clear" @click="clearDate">
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
      <div class="col-sm-6 col-xl-3">
        <div class="bg-secondary rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-social-usd tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Menunggu Pembayaran</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.bayar}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
      <div class="col-sm-6 col-xl-3 mg-t-20 mg-sm-t-0">
        <div class="bg-info rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-ios-paper tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Total Order Diproses</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.proses}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
      <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
        <div class="bg-primary rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-bag tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Total Order Dipacking</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.packing}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
      <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
        <div class="bg-br-primary rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-paper-airplane tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Total Order Dikirim</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.kirim}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
      <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-20">
        <div class="bg-teal rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-android-done-all tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Total Order Selesai</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.selesai}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
      <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-20">
        <div class="bg-danger rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-alert tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Total Order yg Batal</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.batal}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
      <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-20">
        <div class="bg-warning rounded overflow-hidden">
          <div class="pd-25 d-flex align-items-center">
            <i class="ion ion-ios-timer tx-60 lh-0 tx-white op-7"></i>
            <div class="mg-l-20">
              <p
                class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
              >Expired</p>
              <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.expired}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- col-3 -->
    </div>
    <!-- row -->
  </div>
  <!-- br-pagebody -->
</template>

<script>
export default {
  name: "landing",
  layout: "Auth",
  data: function() {
    return {
      selectedDate: {
        start: null,
        end: null
      },
      visibility: "hidden",
      formats: {
        title: "MMMM YYYY",
        weekdays: "W",
        navMonths: "MMM",
        input: ["DD-MM-YYYY", "DD-MM-YYYY", "DD/MM/YYYY"],
        dayPopover: "DD_MM-YYY", // Only for `v-date-picker`
        data: ["DD-MM-YYYY", "DD-MM-YYYY", "DD/MM/YYYY"]
      },
      report: {
        proses: 0,
        kirim: 0,
        batal: 0,
        expired: 0,
        selesai: 0,
        packing: 0,
        bayar: 0
      }
    };
  },
  watch: {
    selectedDate(value) {
      this.visibility = "hidden";
    }
  },
  mounted: function() {
    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 1);
    let endDate = new Date();

    this.selectedDate.start = startdate;
    this.selectedDate.end = endDate;
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
