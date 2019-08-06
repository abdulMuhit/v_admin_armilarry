<template>
  <div>
    <!-- br-pageheader -->
    <div class="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
      <h4 class="tx-gray-800 mg-b-5">Waiting List Vendor</h4>
      <!-- <p class="mg-b-0">Dashboard cards are used in an overview or summary of a project, for crm or form cms.</p> -->
    </div>

    <div class="br-pagebody">
      <div class="m-1 p-1">
        <div class="card mb-2">
          <div class="card-header bg-info text-white">Filter</div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-sm-12">
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
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    id="status"
                    class="form-control"
                    v-model="status"
                    @change="statusChange"
                  >
                    <option value="all">All</option>
                    <option value="waiting">waiting</option>
                    <option value="rejected">rejected</option>
                    <option value="accepted">accepted</option>
                  </select>
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
            >
              <template slot="status" slot-scope="row">{{row.value}}</template>
              <template slot="actions" slot-scope="row">
                <b-button v-b-popover.hover="'Details'" size="sm" @click.stop="getDataVendor(row)">
                  <i v-if="row.detailsShowing" class="fa fa-eye-slash"></i>
                  <i v-else class="fa fa-eye"></i>
                </b-button>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-card-header class="d-flex justify-content-between">
                    <div>ID : {{row.item.id}}</div>
                    <div>
                      <b-button
                        variant="primary"
                        v-b-popover.hover="'Detail'"
                        size="sm"
                        @click.stop="info(row.item, row.index, $event.target)"
                        class="mr-1"
                      >
                        <i class="fa fa-edit"></i>
                      </b-button>

                      <b-button
                        variant="primary"
                        v-b-popover.hover="'to Pdf'"
                        size="sm"
                        @click.stop="exportPdf(row, pictureVendorList[row.item.id])"
                        class="mr-1"
                      >
                        <i class="fa fa-file-pdf"></i>
                      </b-button>
                    </div>
                  </b-card-header>
                  <b-card-body>
                    <!--:source="s1_path+value.path_url+'?size=200'"-->
                    <div class="row">
                      <div
                        class="col"
                        v-for="(value, key) in pictureVendorList[row.item.id]"
                        :key="key"
                      >
                        <div
                          class="card-profile-img zoomPointer"
                          @click="zoomImage(bucket_path+value.path_url)"
                        >
                          <ImageItem
                            class="wd-65"
                            v-if="value.path_url"
                            :source="bucket_path+value.path_url"
                          />
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-card>
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

            <!-- Info modal -->
            <b-modal id="modalInfo" size="lg" @hide="resetModal" :title="modalInfo.title" ok-only>
              <div class="col">
                <table id="table-xls" class="table-bordered table-responsive-sm">
                  <tr>
                    <td>id</td>
                    <td>{{modalInfo.content.id}}</td>
                  </tr>
                  <tr>
                    <th>Nama</th>
                    <td>{{modalInfo.content.nama}}</td>
                  </tr>
                  <tr>
                    <th>No hp:</th>
                    <td>{{modalInfo.content.no_hp}}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{modalInfo.content.email}}</td>
                  </tr>
                  <tr>
                    <th>Nama Brand</th>
                    <td>{{modalInfo.content.nama_brand}}</td>
                  </tr>
                  <tr>
                    <th>Tanggal daftar</th>
                    <td>{{modalInfo.content.tanggal}}</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>{{modalInfo.content.status}}</td>
                  </tr>
                  <tr>
                    <th>Kategori</th>
                    <td>{{modalInfo.content.kategori}}</td>
                  </tr>
                  <tr>
                    <th>Marketplace</th>
                    <td>{{modalInfo.content.marketplace}}</td>
                  </tr>
                  <tr>
                    <td>Facebook</td>
                    <td>{{modalInfo.content.facebook}}</td>
                  </tr>
                  <tr>
                    <th>Instagram</th>
                    <td>{{modalInfo.content.instagram}}</td>
                  </tr>
                  <tr>
                    <th>Website</th>
                    <td>{{modalInfo.content.website}}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>{{modalInfo.content.alamat}}</td>
                  </tr>
                  <tr>
                    <th>Kodepos</th>
                    <td>{{modalInfo.content.kodepos}}</td>
                  </tr>
                  <tr>
                    <th>Kota</th>
                    <td>{{modalInfo.content.kota}}</td>
                  </tr>
                  <tr>
                    <td>Provinsi</td>
                    <td>{{modalInfo.content.provinsi}}</td>
                  </tr>
                </table>

                <!-- <b-table id="table-xls" show-empty
                                      stacked="md"
                                      :items="itemsDetails"
                                      :fields="fieldsDetails"

                             >
                </b-table>-->
              </div>
              <div class="col">
                <div class="form-group">
                  <div v-if="modalInfo.content.status === 'waiting'"></div>
                  <label>Change Status :</label>
                  <!--<p>Peringatan, setelah diterima ataupun ditolak, status ini tidak dapat diubah lagi.</p>-->
                  <select
                    name="status"
                    class="form-control"
                    v-model="statusEdit"
                    @change="editStatus(modalInfo.content)"
                  >
                    <option value="waiting">waiting</option>
                    <option value="rejected">rejected</option>
                    <option value="accepted">accepted</option>
                  </select>
                </div>
              </div>
              <div slot="modal-footer" class="w-100">
                <div class="d-flex justify-content-between">
                  <b-button
                    variant="primary"
                    v-b-popover.hover="'to Excel'"
                    @click.stop="exportExcelJav(modalInfo)"
                    class="mr-1"
                  >
                    <i class="fa fa-file-excel"></i>
                  </b-button>
                  <b-btn variant="primary" @click="handleOk">OK</b-btn>
                </div>
              </div>
            </b-modal>
          </b-container>
        </div>
      </div>
      <!-- br-section-wrapper -->
    </div>
    <!-- br-pagebody -->
  </div>
</template>

<script>
//const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
const waitFor = function convert(url) {
  return new Promise(resolve => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);

      let test = canvas.toDataURL();
      resolve(test);
    };
    img.src = url;
  });
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

import ImageItem from "~/components/ImageComponent/ImageItem.vue";
//    import format from 'date-fns/format'

export default {
  name: "waitinglistvendor",
  components: {
    ImageItem
  },
  layout: "Auth",
  data() {
    return {
      visibility: "hidden",
      /*                
      bucket_path: "https://storage.googleapis.com/bandros-vendor-storage/bandros-vendor-wl/",
      s1_path: "https://s1.tss.my.id/bandros-vendor-storage/bandros-vendor-wl:::",*/
      //todo change / simply this code
      bucket_path: "belumkeset/",
      //s1_path: "https://s1.tss.my.id/bandros-vendor-storage/bandros-vendor-wl:::",
      items: [],
      fields: [
        { idx: 1, key: "email", label: "Email", sortable: true },
        {
          idx: 2,
          key: "nama",
          label: "Nama",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 3, key: "nama_brand", label: "Brand", sortable: true },
        { idx: 4, key: "status", label: "Status", sortable: true },
        { idx: 5, key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      recordFiltered: 0,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      sortBy: null,
      idx: 0,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      modalInfo: { title: "", content: "" },
      status: "all",
      statusEdit: "",
      pictureVendorList: [],
      itemsDetails: [],
      fieldsDetails: [
        { idx: 1, key: "id", label: "ID", sortable: true },
        {
          idx: 2,
          key: "nama",
          label: "Nama",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 3, key: "no_hp", label: "No hp", sortable: true },
        { idx: 4, key: "email", label: "Email", sortable: true },
        { idx: 1, key: "nama_brand", label: "Nama Brand", sortable: true },
        {
          idx: 2,
          key: "tanggal",
          label: "Tanggal",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 3, key: "status", label: "Status", sortable: true },
        { idx: 4, key: "kategori", label: "Kategori", sortable: true },
        {
          idx: 2,
          key: "marketplace",
          label: "Marketplace",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 3, key: "facebook", label: "Facebook", sortable: true },
        { idx: 4, key: "instagram", label: "Instagram", sortable: true },
        { idx: 1, key: "website", label: "Website", sortable: true },
        {
          idx: 2,
          key: "alamat",
          label: "Alamat",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 3, key: "kodepos", label: "KodePos", sortable: true },
        { idx: 4, key: "kota", label: "Kota", sortable: true },
        {
          idx: 2,
          key: "provinsi",
          label: "Provinsi",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 5, key: "actions", label: "Actions" }
      ],

      /*                trigger: false,
                dateFormat: 'DD/MM/YYYY',
                timeRange: '',
                startDate: '',
                endDate: '',
                lang: {
                    days: ['Min', 'Sen', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                    placeholder: {
                        date: 'Select Date',
                        dateRange: 'Select Date Range'
                    }
                },
                shortcuts: [
                    {
                        text: 'Today',
                        onClick: () => {
                            this.timeRange = [ new Date(), new Date() ];
                            //this.getData();
                            this.dateChange(this.timeRange);
                        }
                    },
                ],*/

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
      }
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
  created: function() {
    this.bucket_path = this.$store.state.picBaseUrl;
    console.log("change bucket path? ", this.bucket_path);
    console.log("store bucket path ", this.$store.state.picBaseUrl);

    /*
          let startdate = new Date();
          startdate.setMonth(startdate.getMonth() - 1);
          let endDate = new Date();

          this.timeRange = [ startdate, endDate ];
          this.startDate = startdate;
          this.endDate = endDate;getVendorWaitingList
          */

    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 1);
    let endDate = new Date();

    this.selectedDate.start = startdate;
    this.selectedDate.end = endDate;
    console.log("this ", this);

    // this.getData();
  },
  mounted() {
    console.log("mounted ", this);
    this.getData();
  },
  methods: {
    openCalendar() {
      this.visibility = this.visibility == "hidden" ? "visible" : "hidden";
      // console.log("open callender ", this.visibility);
    },
    exportPdfServer: function() {
      console.log("server side export to pdf ");
      let that = this;
      that.$store
        .dispatch("exportPdf")
        .then(r => {
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "namefile.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();

          that.$notify.info({
            title: "Info",
            message: "Download success "
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
    exportPdf: function(row, pic) {
      let that = this;

      let arr = [];

      //todo change / simplycity this code
      //let tss_path ="https://s1.tss.my.id/";
      //let bucketname = "bandros-vendor-storage/bandros-vendor-wl:::";
      pic.forEach(function(x) {
        let i = that.bucket_path + x.path_url;
        //let i = tss_path+bucketname+x.path_url+"?size=200&type=h";
        arr.push(i);
      });
      let viewData = {
        content: [],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
            margin: [0, 10, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableLeft: {
            margin: [0, 5, 0, 15]
          },
          gambar: {
            margin: [100, 1, 0, 1]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black"
          }
        }
      };
      viewData.content.push(
        { text: "Waiting List Vendor", style: "header" },
        { text: "Data Vendor", style: "subheader" },
        {
          style: "tableLeft",
          table: {
            widths: [100, "auto"],
            body: [
              ["id", row.item.id],
              ["nama", row.item.nama],
              ["no hp", row.item.no_hp],
              ["email", row.item.email],
              ["nama brand", row.item.nama_brand],
              ["kategori", row.item.kategori],
              ["status", row.item.status],
              ["tanggal daftar", row.item.tanggal],
              ["alamat", row.item.alamat],
              ["kodepos", row.item.kodepos],
              ["kota", row.item.kota],
              ["provinsi", row.item.provinsi],
              ["facebook", row.item.facebook],
              ["instagram", row.item.instagram],
              ["website", row.item.website],
              ["marketplace", row.item.marketplace]
            ]
          }
        },
        {
          text: "Gambar",
          style: "subheader"
        }
      );

      /*
               viewData.content.push({
                    image: "data:image/png;base64,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",
                });
                */

      function gen(rs) {
        rs.forEach(function(column) {
          let jsonData = {};
          jsonData["image"] = column;
          jsonData["width"] = 300;
          jsonData["style"] = "gambar";
          viewData.content.push(jsonData);
        });
        // download the PDF
        that.$pdfmake
          .createPdf(viewData)
          .download(row.item.nama_brand + ".pdf");
      }
      const start = async () => {
        let data = [];
        await asyncForEach(arr, async url => {
          await waitFor(url).then(x => {
            data.push(x);
          });
        });
        gen(data);
        //pdfMake.createPdf(docDefinition).download('optionalName.pdf');
        console.log("Done");
      };
      start();
    },
    exportExcel: function() {
      let that = this;
      let randomNumber = Math.floor(Math.random() * 6) + 5;
      let start = 0;
      let sd = "",
        ed = "";
      console.log("that ", that);

      if (that.selectedDate !== null) {
        sd = that.$formatDate(that.selectedDate.start);
        ed = that.$formatDate(that.selectedDate.end);
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

      let nameFile = "laporanwaitinglistvendor" + Date.now() + ".xlsx";

      that.$store
        .dispatch("exportExcelPost", dataTablesS)
        .then(r => {
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", nameFile); //or any other extension
          document.body.appendChild(link);
          link.click();

          that.$notify.info({
            title: "Info",
            message: "Download success "
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
    exportExcelJav: function(data) {
      console.log("data ", data.content.nama_brand);
      let that = this;
      console.log(this.$XLSX);
      function doit(type, fn) {
        var elt = document.getElementById("table-xls");
        var wb = that.$XLSX.utils.table_to_book(elt, { sheet: "Sheet1" });
        return that.$XLSX.writeFile(wb, fn || "test." + (type || "xlsx"));
      }
      doit("xlsx", data.content.nama_brand + ".xlsx");
    },
    handleOk() {
      this.$root.$emit("bv::hide::modal", "modalInfo");
    },
    editStatus: function(data) {
      let formData = new FormData();
      formData.append("id", data.id);
      formData.append("status", this.statusEdit);

      let that = this;

      that.$store
        .dispatch("changeVendorStatus", formData)
        .then(r => {
          that.getData();
          that.$notify.info({
            title: "Info",
            message: "success change to " + r.data.result.status
          });
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Logout error " + e
          });
        });
    },
    zoomImage: function(url) {
      console.log("zoom image url ", url);
      this.$zoom(url, {
        allowZoom: true, // When false, zooming is not available. Image will be shown on 100% size.
        autoScale: true, // When true, if the image is larger than the screen, it will be automatically scaled down until suitable. Along with 'allowZoom'
        closeOnClickModal: false // When false, clicking modal layer will close the viewer.
      });
    },
    getDataVendor: function(row) {
      let that = this;
      if (!row.detailsShowing) {
        //that.$loading.show();
        row.tipe = "vendorpic";
        that.$store
          .dispatch("getLogoBrand", row)
          .then(r => {
            that.pictureVendorList[row.item.id] = r.data.data;
            that.statusEdit = row.item.status;
          })
          .catch(e => {
            console.log("error ", e);
            that.$notify.error({
              title: "Info",
              message: "Logout error " + e
            });
          })
          .then(() => {
            row.toggleDetails();
          });
      } else {
        row.toggleDetails();
      }
    },
    statusChange: function() {
      this.getData();
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
    clearMe: function() {
      let that = this;
      that.filter = "";
      that.getData();
    },
    searchMe: function() {
      let that = this;
      that.getData();
    },
    pageClicked: function() {
      let that = this;
      that.getData();
    },
    toPage(e) {
      let that = this;
      that.getData(e);
    },
    limitPage: function(e) {
      this.perPage = e;
      this.getData();
    },

    clearDate: function() {
      console.log("clear date");
      this.selectedDate = null;
      this.getData();
    },
    onDatePick: function(dates) {
      console.log("dates", dates);
      /*                let that = this;
                let sd = "", ed = "";

                if (that.selectedDate.start !== "" || that.selectedDate.end !== ""){
                    sd = that.$formatDate(that.selectedDate.start);
                    ed = that.$formatDate(that.selectedDate.end);
                }

                console.log("sd, ed ", sd, ed);*/
      this.getData();
    },
    /*
            dateChange: function (e) {
                this.startDate = e[0];
                this.endDate = e[1];
                this.getData();
            },
            dateChange1: function (e) {
                this.startDate = e;
                this.getData();
            },
            dateChange2: function (e) {
                this.endDate = e;
                this.getData();
            },
            */
    getData: function(page) {
      let that = this;
      let randomNumber = Math.floor(Math.random() * 6) + 5;
      let start;
      if (page) {
        start = (page - 1) * that.perPage;
      } else {
        start = 0;
      }

      let sd = "",
        ed = "";

      //heere
      if (that.selectedDate !== null) {
        sd = that.$formatDate(that.selectedDate.start);
        ed = that.$formatDate(that.selectedDate.end);
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

      // let dataTablesS = "";

      this.$store
        .dispatch("getVendorWaitingList", dataTablesS)
        .then(r => {
          if (r.status === 200) {
            that.items = r.data.data;
            //that.totalRows = r.data.recordsTotal;
            that.totalRows = r.data.recordsFiltered;
          } else {
            that.$notify.error({
              title: "Info",
              message: "Logout error " + e
            });
          }
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Logout error " + e
          });
        });
    },
    info(item, index, button) {
      this.modalInfo.title = `brand: ${item.nama_brand}`;
      //this.modalInfo.content = JSON.stringify(item, null, 2);
      this.modalInfo.content = item;

      /*
                    this.itemsDetails = [];
                    this.itemsDetails.push(item);
                */

      console.log("modal info content ", item);
      this.$root.$emit("bv::show::modal", "modalInfo", button);
    },
    del(item, index, btn) {
      console.log("delete ", item, "  ", index, " btn ", btn);
    },
    resetModal() {
      this.modalInfo.title = "";
      this.modalInfo.content = "";
    }
  }
};
</script>

<style type="text/css" scoped>
.center {
  margin: 0 auto;
}

.mx-input-wrapper {
  bottom: 0.5em;
}

.totaldata {
  position: absolute;
  top: 1em;
  right: 2em;
}
</style>
