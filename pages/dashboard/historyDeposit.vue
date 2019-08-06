<template>
  <div>
    <!-- br-pageheader -->
    <div class="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
      <h4 class="tx-gray-800 mg-b-5">History Deposit</h4>
      <!-- <p class="mg-b-0">Dashboard cards are used in an overview or summary of a project, for crm or form cms.</p> -->
    </div>

    <div class="br-pagebody">
      <div class="m-1 p-1">
        <div class="card mb-2">
          <div class="card-header bg-info text-white">Filter</div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Tanggal</label>
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
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Cari</label>
                  <b-input-group>
                    <b-form-input
                      v-model="filter"
                      v-on:keyup.enter.native="searchMe"
                      placeholder="Type to Search"
                      title="Untuk mendapatkan keseluruhan data yang anda cari, silahkan untuk mereset tangal ke kosong terlebih dahulu."
                    />
                    <b-input-group-append>
                      <b-btn @click="clearMe">
                        <i class="fa fa-trash" title="clear search"></i>
                      </b-btn>
                      <b-btn :disabled="!filter" @click="searchMe">
                        <i class="fa fa-search" title="cari!"></i>
                      </b-btn>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Page Limit</label>
                  <b-form-select :options="pageOptions" v-model="perPage" @change="limitPage" />
                </div>
              </div>
            </div>

            <div class="row d-flex justify-content-between">
              <div class="col-3">
                <div class="form-group">
                  <button class="btn btn-outline-primary" @click="exportExcel">Export Excel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-2">
          <b-container>
            <!-- Main table element -->
            <b-table
              show-empty
              no-local-sorting
              no-provider-paging
              no-provider-sorting
              no-provider-filtering
              @sort-changed="sortingChanged"
              stacked="md"
              small
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
            >
              <template slot="status" slot-scope="row">{{row.value}}</template>
              <template slot="action" v-if="row.item.bukti !== ''" slot-scope="row">
                <b-button v-b-popover.hover="'Bukti'" size="sm" @click="zoomImage(row.item.bukti)">
                  <i v-if="row.detailsShowing" class="fa fa-eye-slash"></i>
                  <i v-else class="fa fa-eye"></i>
                </b-button>
              </template>
            </b-table>

            <div class="row">
              <div class="col-md-12 col-sm-12">
                <b-pagination
                  align="center"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  v-model="currentPage"
                  @change="toPage"
                />
              </div>
              <div class="col-md-12 col-sm-12">
                <h6 class="text-center">total {{totalRows}} data</h6>
              </div>
            </div>
          </b-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let dummyData = [
  {
    id: 1,
    tanggal: "19/01/2018",
    keterangan: "keterangan",
    debit: "10000",
    kredit: "20000",
    saldo: "30000",
    catatan: "Transfer",
    bukti:
      "https://storage.googleapis.com/bandros-vendor-storage/bandros-vendor-wl/vwl_24340b48-3b05-4797-8fce-feff8ca19df7dashboardlistvendor.png"
  },
  {
    id: 2,
    tanggal: "19/02/2018",
    keterangan: "rekap",
    debit: "10000",
    kredit: "20000",
    saldo: "30000",
    catatan: "Transfer",
    bukti:
      "https://storage.googleapis.com/bandros-vendor-storage/bandros-vendor-wl/vwl_24340b48-3b05-4797-8fce-feff8ca19df7dashboardlistvendor.png"
  },
  {
    id: 3,
    tanggal: "19/03/2018",
    keterangan: "transfer",
    debit: "10000",
    kredit: "20000",
    saldo: "30000",
    catatan: "1122",
    bukti: ""
  },
  {
    id: 4,
    tanggal: "19/04/2018",
    keterangan: "ket",
    debit: "10000",
    kredit: "20000",
    saldo: "30000",
    catatan: "Transfer",
    bukti:
      "https://storage.googleapis.com/bandros-vendor-storage/bandros-vendor-wl/vwl_24340b48-3b05-4797-8fce-feff8ca19df7dashboardlistvendor.png"
  },
  {
    id: 5,
    tanggal: "19/05/2018",
    keterangan: "ked",
    debit: "10000",
    kredit: "20000",
    saldo: "30000",
    catatan: "1122",
    bukti: ""
  },
  {
    id: 6,
    tanggal: "19/06/2018",
    keterangan: "tran",
    debit: "10000",
    kredit: "20000",
    saldo: "0",
    catatan: "1122",
    bukti: ""
  },
  {
    id: 7,
    tanggal: "19/07/2018",
    keterangan: "namaku1",
    debit: "10000",
    kredit: "0",
    saldo: "30000",
    catatan: "1122",
    bukti:
      "https://storage.googleapis.com/bandros-vendor-storage/bandros-vendor-wl/vwl_24340b48-3b05-4797-8fce-feff8ca19df7dashboardlistvendor.png"
  },
  {
    id: 8,
    tanggal: "19/08/2018",
    keterangan: "namaku1",
    debit: "0",
    kredit: "20000",
    saldo: "0",
    catatan: "1122",
    bukti: ""
  }
];

export default {
  name: "HistoryDeposit",
  layout: "Auth",
  data() {
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
      filter: null,
      perPage: 5,
      pageOptions: [5, 10, 15],
      items: [],
      fields: [
        {
          idx: 1,
          key: "tanggal",
          label: "Tanggal",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 2, key: "keterangan", label: "Keterangan", sortable: true },
        { idx: 3, key: "debit", label: "Keluar(Debit)", sortable: true },
        {
          idx: 4,
          key: "kredit",
          label: "Masuk(Kredit)",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 5, key: "saldo", label: "Saldo", sortable: true },
        { idx: 6, key: "catatan", label: "Catatan", sortable: true },
        { idx: 7, key: "action", label: "Bukti" }
      ],
      currentPage: 1,
      totalRows: 0,
      idx: 0,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc"
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    inputState() {
      if (!this.selectedDate) {
        return {
          type: "is-danger",
          message: "All Dates"
        };
      }
      return {
        type: "is-primary",
        message: ""
      };
    }
  },
  created() {
    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 1);
    let endDate = new Date();

    this.selectedDate.start = startdate;
    this.selectedDate.end = endDate;
    this.getData();
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
    exportExcel: function() {
      let that = this;
      let randomNumber = Math.floor(Math.random() * 6) + 5;
      let start = 0;
      let sd = "",
        ed = "";

      if (that.startDate !== "" || that.endDate !== "") {
        sd = that.$formatDate(that.startDate);
        ed = that.$formatDate(that.endDate);
      }

      let status = this.status;
      let dataTablesS = new FormData();
      dataTablesS.append("draw", randomNumber);
      dataTablesS.append("order[0][column]", [that.idx]);
      dataTablesS.append("order[0][dir]", [that.sortDirection]);
      dataTablesS.append("start", start);
      dataTablesS.append("length", that.perPage);
      dataTablesS.append("search[value]", [that.filter]);
      dataTablesS.append("startDate", sd);
      dataTablesS.append("endDate", ed);
      dataTablesS.append("status", status);

      let nameFile = "laporantransaksi" + Date.now() + ".xlsx";

      that.$store
        .dispatch("exportExcel", dataTablesS)
        .then(r => {
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", nameFile); //or any other extension
          document.body.appendChild(link);
          link.click();

          that.$notify.success({
            title: "Info",
            message: "File di download "
          });

          document.body.removeChild(link);
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Logout error " + e
          });
        });
    },
    clearMe: function() {
      let that = this;
      that.filter = "";
      that.getData();
    },
    searchMe: function() {
      let that = this;
      that.getData();
    },
    limitPage: function(e) {
      this.perPage = e;
      this.getData();
    },
    toPage(e) {
      let that = this;
      that.getData(e);
    },
    sortingChanged: function(e) {
      let that = this;
      function filterthis(arr, fil) {
        return arr.filter(word => word.key === fil);
      }
      if (e.sortBy) {
        let idx = filterthis(that.fields, e.sortBy);
        that.idx = idx[0].idx;
        if (e.sortDesc) {
          that.sortDirection = "desc";
        } else {
          that.sortDirection = "asc";
        }
      }
      that.getData();
    },
    clearDate: function() {
      this.selectedDate = null;
      this.getData();
    },
    onDatePick: function(dates) {
      console.log("dates", dates);
      /*
                    let that = this;
                    let sd = "", ed = "";

                    if (that.selectedDate.start !== "" || that.selectedDate.end !== ""){
                        sd = that.$formatDate(that.selectedDate.start);
                        ed = that.$formatDate(that.selectedDate.end);
                    }

                    console.log("sd, ed ", sd, ed);
                */
      this.getData();
    },
    getData: function(e) {
      console.log("get data ", e);
      this.items = dummyData;
    },
    zoomImage: function(url) {
      console.log("zoom image url ", url);
      this.$zoom(url, {
        allowZoom: true, // When false, zooming is not available. Image will be shown on 100% size.
        autoScale: true, // When true, if the image is larger than the screen, it will be automatically scaled down until suitable. Along with 'allowZoom'
        closeOnClickModal: false // When false, clicking modal layer will close the viewer.
      });
    }
  }
};
</script>

<style scoped>
</style>
