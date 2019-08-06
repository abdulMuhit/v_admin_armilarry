<template>
  <div>
    <!-- br-pageheader -->
    <div class="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
      <h4 class="tx-gray-800 mg-b-5">Statistik Produk</h4>
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
        <div class="col mg-t-20 mg-sm-t-0">
          <div class="bg-secondary rounded overflow-hidden">
            <div class="pd-25 d-flex align-items-center">
              <i class="ion ion-ios-list tx-60 lh-0 tx-white op-7"></i>
              <div class="mg-l-20">
                <p
                  class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
                >Total SKU</p>
                <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.totalSku}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- col-3 -->
        <div class="col mg-t-20 mg-sm-t-0">
          <div class="bg-info rounded overflow-hidden">
            <div class="pd-25 d-flex align-items-center">
              <i class="ion ion-ios-paper tx-60 lh-0 tx-white op-7"></i>
              <div class="mg-l-20">
                <p
                  class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
                >Stok Vendor</p>
                <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.stokVendor}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- col-3 -->
        <div class="col mg-t-20 mg-sm-t-0">
          <div class="bg-primary rounded overflow-hidden">
            <div class="pd-25 d-flex align-items-center">
              <i class="ion ion-bag tx-60 lh-0 tx-white op-7"></i>
              <div class="mg-l-20">
                <p
                  class="tx-10 tx-spacing-1 tx-mont tx-medium tx-uppercase tx-white-8 mg-b-10"
                >Stok Bandros</p>
                <p class="tx-24 tx-white tx-lato tx-bold mg-b-2 lh-1">{{report.stokBandros}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- col-3 -->
      </div>
      <!-- row -->

      <div class="row row-sm">
        <div class="col-xl-6 col-md-6 col-sm-12 mg-t-10 mg-sm-t-10">
          <apexcharts width="100%" type="line" :options="chartOptions" :series="series"></apexcharts>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 mg-t-10 mg-sm-t-10">
          <apexcharts width="100%" type="donut" :options="chartOptionDonuts" :series="seriesDonuts"></apexcharts>
        </div>
      </div>
      <div class="row row-sm"></div>
    </div>
    <!-- br-pagebody -->
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "StatistikProduk",
  layout: "Auth",
  components: {
    apexcharts: VueApexCharts
  },
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
      report: {
        stokBandros: 10,
        stokVendor: 6,
        totalSku: 5
      },
      /*  chartOptions: {
                    chart: {
                        id: 'barangMasukKeluar'
                    },
                    xaxis: {
                        categories: [5, 10, 15, 20, 25, 30, 35, 40]
                    },
                    title: {
                        text: 'Barang Masuk Keluar pertanggal '+ this.data().selectedDate,
                        align: 'left'
                    },
                },*/
      series: [
        {
          name: "Barang Masuk",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          name: "Barang Keluar",
          data: [2, 4, 5, 10, 19, 50, 30, 20]
        }
      ],
      seriesDonuts: [44, 55, 41, 17, 15, 22, 13, 10, 44, 29, 11]
    };
  },
  mounted: function() {
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
    },
    chartOptions() {
      let that = this;
      return {
        xaxis: {
          categories: [5, 10, 15, 20, 25, 30, 35, 40]
        },
        title: {
          text:
            "Barang Masuk Keluar pertanggal " +
            that.$formatDate(that.selectedDate.start) +
            " - " +
            that.$formatDate(that.selectedDate.end),
          align: "left"
        }
      };
    },
    chartOptionDonuts() {
      return {
        chart: {
          id: "vuechart2"
        },
        dataLabels: {
          enabled: true
        },
        labels: [
          "Pembelian (in)",
          "Titip (in)",
          "Retur Web(in)",
          "Pengembalian Pinjaman (in)",
          "Penambahan Penyesuaian (in)",
          "Order Web (out)",
          "Order Vendor (out)",
          "Order Langsung (out)",
          "Retur vendor (out)",
          "Peminjaman (out)",
          "Penyesuaian minus (out)"
        ],
        legend: {
          position: "bottom"
        },
        responsive: [
          {
            breakpoint: 300,
            options: {
              chart: {
                width: 1000
              },
              legend: {
                position: "left"
              }
            }
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>
