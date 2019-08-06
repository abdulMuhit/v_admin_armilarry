<template>
  <div>
    <!-- br-pageheader -->
    <div class="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
      <h4 class="tx-gray-800 mg-b-5">Retur</h4>
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
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
            ></b-table>

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
    tanggal_order: "19/01/2018",
    tanggal_retur: "19/01/2018",
    nama: "namaku1",
    provinsi: "Jabar",
    kabkot: "bandung",
    kecamatan: "cikutra",
    noresi: "1122",
    status: "dikirim",
    kurir: "JNE",
    SKU: "BDZ-002",
    nama_produk: "Shoe",
    warna: "biru",
    ukuran: "42",
    qty: 2,
    terjual: 6,
    harga: 3000,
    jumlah: 18000
  },
  {
    id: 2,
    tanggal: "19/01/2018",
    tanggal_order: "19/01/2018",
    tanggal_retur: "19/01/2018",
    nama: "namaku2",
    provinsi: "Jabar",
    kabkot: "bandung",
    kecamatan: "cikutra",
    noresi: "1122",
    status: "dikirim",
    kurir: "JNE",
    SKU: "BDZ-002",
    nama_produk: "Shoe",
    warna: "biru",
    ukuran: "42",
    qty: 2,
    terjual: 6,
    harga: 3000,
    jumlah: 18000
  },
  {
    id: 3,
    tanggal: "19/01/2018",
    tanggal_order: "19/01/2018",
    tanggal_retur: "19/01/2018",
    nama: "namaku3",
    provinsi: "Jabar",
    kabkot: "bandung",
    kecamatan: "cikutra",
    noresi: "1122",
    status: "dikirim",
    kurir: "JNE",
    SKU: "BDZ-002",
    nama_produk: "Shoe",
    warna: "biru",
    ukuran: "42",
    qty: 2,
    terjual: 6,
    harga: 3000,
    jumlah: 18000
  },
  {
    id: 4,
    tanggal: "19/01/2018",
    tanggal_order: "19/01/2018",
    tanggal_retur: "19/01/2018",
    nama: "namaku4",
    provinsi: "Jabar",
    kabkot: "bandung",
    kecamatan: "cikutra",
    noresi: "1122",
    status: "dikirim",
    kurir: "JNE",
    SKU: "BDZ-002",
    nama_produk: "Shoe",
    warna: "biru",
    ukuran: "42",
    qty: 2,
    terjual: 6,
    harga: 3000,
    jumlah: 18000
  },
  {
    id: 5,
    tanggal: "19/01/2018",
    tanggal_order: "19/01/2018",
    tanggal_retur: "19/01/2018",
    nama: "namaku5",
    provinsi: "Jabar",
    kabkot: "bandung",
    kecamatan: "cikutra",
    noresi: "1122",
    status: "dikirim",
    kurir: "JNE",
    SKU: "BDZ-002",
    nama_produk: "Shoe",
    warna: "biru",
    ukuran: "42",
    qty: 2,
    terjual: 6,
    harga: 3000,
    jumlah: 18000
  },
  {
    id: 6,
    tanggal: "19/01/2018",
    tanggal_order: "19/01/2018",
    tanggal_retur: "19/01/2018",
    nama: "namaku6",
    provinsi: "Jabar",
    kabkot: "bandung",
    kecamatan: "cikutra",
    noresi: "1122",
    status: "dikirim",
    kurir: "JNE",
    SKU: "BDZ-002",
    nama_produk: "Shoe",
    warna: "biru",
    ukuran: "42",
    qty: 2,
    terjual: 6,
    harga: 3000,
    jumlah: 18000
  }
];
export default {
  name: "retur",
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
        { idx: 1, key: "id", label: "ID", sortable: true },
        {
          idx: 2,
          key: "tanggal_order",
          label: "Tanggal Order",
          sortable: true,
          sortDirection: "desc"
        },
        {
          idx: 3,
          key: "tanggal_retur",
          label: "Tanggal Retur",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 4, key: "SKU", label: "SKU", sortable: true },
        { idx: 5, key: "warna", label: "Warna", sortable: true },
        {
          idx: 6,
          key: "ukuran",
          label: "Ukuran",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 7, key: "qty", label: "Qty", sortable: true },
        { idx: 8, key: "harga", label: "Harga", sortable: true },
        { idx: 9, key: "jumlah", label: "Jumlah" }
      ],
      currentPage: 1,
      totalRows: 0,
      idx: 0,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc"
    };
  },
  watch: {
    selectedDate(value) {
      this.visibility = "hidden";
    }
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
  mounted() {
    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 1);
    let endDate = new Date();

    this.selectedDate.start = startdate;
    this.selectedDate.end = endDate;
    this.getData();
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

      let loader = that.$loading.show({
        // Optional parameters
        container: that.fullPage ? null : that.$refs.formContainer,
        canCancel: true,
        onCancel: that.onCancel
      });
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

          that.$toasted.info("download success: ", {
            duration: 2000
          });

          document.body.removeChild(link);
        })
        .catch(e => {
          console.log("error ", e);
          that.$toasted.error("Export to excel error " + e, {
            duration: 2000
          });
        })
        .then(() => {
          loader.hide();
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
      this.getData();
    },
    getData: function(e) {
      console.log("get data ", e);
      console.log("selected status ", this.selectedCheckbox);
      this.items = dummyData;
    }
  }
};
</script>

<style scoped>
</style>
