<template>
  <div>
    <!-- br-pageheader -->
    <div class="pd-x-20 pd-sm-x-30 pd-t-20 pd-sm-t-30">
      <h4 class="tx-gray-800 mg-b-5">Manajemen Pengguna</h4>
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
                  <label>Cari</label>
                  <b-input-group>
                    <b-form-input
                      v-model="filter"
                      v-on:keyup.enter.native="searchMe"
                      placeholder="Type to Search"
                      title="Cari pengguna"
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
            </div>
            <div class="row d-flex justify-content-between">
              <div class="col">
                <div class="form-group">
                  <label>Page Limit</label>
                  <b-form-select
                    class="form-control"
                    :options="pageOptions"
                    v-model="perPage"
                    @change="limitPage"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>.</label>

                  <div v-if="currentUser">
                    <template v-if="currentUser.role === '0'">
                      <button
                        @click="addPenggunaModal"
                        class="tx-gray-800 btn btn-info form-control"
                        data-toggle="tooltip"
                        title="Tambah Pengguna."
                      >
                        <i class="fa fa-plus"></i> Vendor Pengguna
                      </button>
                    </template>
                    <template v-else>
                      <button
                        v-if="jumlahUser"
                        @click="addPenggunaModal"
                        class="tx-gray-800 btn btn-info form-control"
                        data-toggle="tooltip"
                        title="Tambah maksimal 4 user dan user tidak dapat dihapus."
                        disabled
                      >
                        <i class="fa fa-plus"></i> Vendor Pengguna
                      </button>
                      <button
                        v-else
                        @click="addPenggunaModal"
                        class="tx-gray-800 btn btn-info form-control"
                        data-toggle="tooltip"
                        title="Tambah maksimal 4 user dan user tidak dapat dihapus."
                      >
                        <i class="fa fa-plus"></i> Vendor Pengguna
                      </button>
                    </template>
                  </div>

                  <!--<button id="btn_tambah" @click="addPenggunaModal" class="tx-gray-800 btn btn-info form-control" data-toggle="tooltip" title="Tambah Pengguna."><i class="fa fa-plus"></i> Vendor Pengguna</button>-->
                </div>
              </div>
            </div>
          </div>
          <b-container>
            <!-- Main table element -->
            <b-table
              show-empty
              no-local-sorting
              no-provider-paging
              no-provider-sorting
              no-provider-filtering
              stacked="md"
              small
              @sort-changed="sortingChanged"
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
            >
              <template slot="status" slot-scope="row">{{row.value == "1" ? "Aktif": "Non Aktif"}}</template>
              <template slot="actions" slot-scope="row">
                <b-button
                  v-if="row.item.role !== '0'"
                  v-b-popover.hover="'Edit Pengguna'"
                  size="sm"
                  @click.stop="editPenggunaModal(row)"
                >
                  <i v-if="row.detailsShowing" class="fa fa-eye-slash"></i>
                  <i v-else class="fa fa-eye"></i>
                </b-button>
              </template>

              <!--
                            <template slot="row-details" slot-scope="row">
                                <b-card>
                                    <b-card-header class="d-flex justify-content-between">
                                        <div>ID : {{row.item}}</div>

                                    </b-card-header>
                                    <b-card-body>
                                        <form id="edit_pengguna" action="/dashboard/sign_list" method="post" enctype="multipart/form-data">
                                            <input type="text" name="iemail" class="d-none" placeholder="parent vendor" :value="row.item.email" readonly>
                                            <input type="text" name="iid" class="d-none" :value="row.item.id" readonly>
                                            <div class="row">
                                                <div class="col-sm-12 mg-t-10 mg-sm-t-0 mg-sm-b-1">
                                                    <input type="text" name="nama" class="form-control" placeholder="nama anda" :value="row.item.nama" required>
                                                </div>
                                            </div>&lt;!&ndash; row &ndash;&gt;

                                            <div class="row mg-t-10">
                                                <div class="col-sm-12 mg-t-10 mg-sm-t-0">
                                                    <label>Brand List</label>
                                                    <v-select multiple v-model="row.myBrandlist" :options="row.allBrandlist" name="brandlist" label="brand"></v-select>
                                                </div>
                                            </div>

                                            <div class="row mg-t-10">
                                                <div class="col-sm-12 mg-t-10 mg-sm-t-0">
                                                    <div class="d-flex justify-content-between status">
                                                        <div> Status </div>
                                                        <toggle-button
                                                                v-model="row.item.status"
                                                                @change="toggleStatusChange(row.item.status)"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-layout-footer mg-t-20">
                                                <button class="btn btn-info btn-block" type="submit">Edit</button>
                                            </div>&lt;!&ndash; form-layout-footer &ndash;&gt;


                                        </form>

                                    </b-card-body>
                                </b-card>
                            </template>

              -->
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

      <b-modal id="addPengguna" size="lg" title="Tambah Pengguna?">
        <form
          class="col-xl-12"
          action="/"
          method="post"
          id="frm_tambah_pengguna"
          @submit="tambahPengguna"
        >
          <input
            type="text"
            name="parent"
            class="d-none"
            placeholder="parent vendor"
            :value="userParent"
            readonly
          />
          <input type="text" name="role" class="d-none" :value="userRole" readonly />
          <!--<input type="number" name="status" class="d-none" value="0" readonly>-->
          <div class="row">
            <div class="col-sm-12 mg-t-10 mg-sm-t-0 mg-sm-b-10">
              <input type="email" name="email" class="form-control" placeholder="email" required />
            </div>
          </div>
          <!-- row -->
          <div class="row">
            <div class="col-sm-12 mg-t-10 mg-sm-t-0 mg-sm-b-1">
              <input type="text" name="nama" class="form-control" placeholder="nama anda" required />
            </div>
          </div>
          <!-- row -->

          <div class="row mg-t-10">
            <div class="col-sm-12 mg-t-10 mg-sm-t-0">
              <label>Brand List</label>
              <multiselect
                v-model="myBrandlist"
                :options="allBrandlist"
                label="brand"
                track-by="brand"
                placeholder="Pilih Brand"
                :multiple="true"
                :searchable="true"
              ></multiselect>
            </div>
          </div>

          <div class="row mg-t-10">
            <div class="col-sm-12 mg-t-10 mg-sm-t-0">
              <div class="d-flex justify-content-between status">
                <div>Status</div>
                <toggle-button v-model="statusVar" @change="toggleStatusChange(statusVar)" />
              </div>
            </div>
          </div>
          <div class="row mg-t-10">
            <div class="col-sm-12 mg-t-10 mg-sm-t-0">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <a
                      class="input-group-text bg-primary text-white btn-password"
                      @click="hidePassword = !hidePassword"
                    >
                      <i class="fas" :class="[passwordIcon]"></i>
                    </a>
                  </div>
                  <input
                    :type="passwordType"
                    id="password"
                    class="form-control"
                    v-model="password"
                    name="password"
                    placeholder="Masukan password anda"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-layout-footer mg-t-20">
            <button class="btn btn-info btn-block" type="submit">Tambah Pengguna Vendor</button>
          </div>
          <!-- form-layout-footer -->
        </form>

        <div slot="modal-footer" class="w-100"></div>
      </b-modal>
      <b-modal id="editPengguna" size="lg" title="Edit Pengguna">
        <template v-if="pickedUserBySU.item">
          <!--   <h3>parent: {{pickedUserBySU.item.parent}}</h3>-->

          <form
            class="col-xl-12"
            action="/"
            method="post"
            id="frm_edit_pengguna"
            @submit="editPengguna"
          >
            <input
              type="text"
              name="parent"
              class="d-none"
              placeholder="parent vendor"
              :value="pickedUserBySU.item.parent"
              readonly
            />
            <input
              type="text"
              name="id"
              class="d-none"
              placeholder="parent vendor"
              :value="pickedUserBySU.item.id"
              readonly
            />
            <div class="row">
              <div class="col-sm-12 mg-t-10 mg-sm-t-0 mg-sm-b-10">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="email"
                  :value="pickedUserBySU.item.email"
                  readonly
                />
              </div>
            </div>
            <!-- row -->

            <div class="row">
              <div class="col-sm-12 mg-t-10 mg-sm-t-0 mg-sm-b-1">
                <input
                  type="text"
                  name="nama"
                  class="form-control"
                  :value="pickedUserBySU.item.nama"
                  placeholder="nama anda"
                  required
                />
              </div>
            </div>
            <!-- row -->

            <div class="row mg-t-10">
              <div class="col-sm-12 mg-t-10 mg-sm-t-0">
                <label>Brand List</label>
                <multiselect
                  v-model="myBrandlist"
                  :options="allBrandlist"
                  label="brand"
                  track-by="brand"
                  placeholder="Pilih Brand"
                  :multiple="true"
                  :searchable="true"
                ></multiselect>
              </div>
            </div>

            <div class="row mg-t-10">
              <div class="col-sm-12 mg-t-10 mg-sm-t-0">
                <div class="d-flex justify-content-between status">
                  <div>Status</div>
                  <toggle-button v-model="statusVar" @change="toggleStatusChange(statusVar)" />
                </div>
              </div>
            </div>

            <div class="form-layout-footer mg-t-20">
              <button class="btn btn-info btn-block" type="submit">Edit Vendor</button>
            </div>
            <!-- form-layout-footer -->
          </form>
        </template>

        <div slot="modal-footer" class="w-100"></div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import ImageItem from "@/components/ImageComponent/ImageItem.vue";
import Multiselect from "vue-multiselect";

export default {
  name: "ListPengguna",
  layout: "Auth",
  components: {
    ImageItem,
    Multiselect
  },
  data: function() {
    return {
      items: [],
      fields: [
        {
          idx: 1,
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          idx: 2,
          key: "nama",
          label: "Nama",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 1, key: "email", label: "Email", sortable: true },
        { idx: 3, key: "parent", label: "Parent", sortable: true },
        { idx: 3, key: "role", label: "Role", sortable: true },
        { idx: 4, key: "status", label: "Status", sortable: true },
        { idx: 5, key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      filter: "",
      password: "",
      hidePassword: true,
      idx: 0,
      sortDirection: "asc",
      sortDesc: false,
      sortBy: null,
      myBrandlist: [],
      allBrandlist: [],
      statusVar: false,
      pickedUserBySU: {}
    };
  },
  computed: {
    passwordType() {
      return this.hidePassword ? "password" : "text";
    },
    passwordIcon() {
      return this.hidePassword ? "fa-eye" : "fa-eye-slash";
    },
    currentUser() {
      return this.$store.getters.loggedUser;
    },
    userRole() {
      let role = this.currentUser.role;
      console.log("role ", role);
      let u;
      if (role === "0") {
        u = 1;
      } else {
        u = 2;
      }
      return u;
    },
    userParent() {
      let parent = "";
      if (this.currentUser) {
        parent = this.currentUser.parent;
      }

      let par;
      if (parent === "SU") {
        par = "";
      } else {
        par = this.currentUser.id;
      }
      return par;
    },
    jumlahUser() {
      let jml = this.items.length;
      if (jml >= 4) {
        return true;
      }
      return false;
    }
  },
  methods: {
    toggleStatusChange: function(e) {
      if (e) {
        console.log("e = ", e);
        this.status = 1;
      } else {
        console.log("not e ", e);
        this.status = 0;
      }
    },
    toPage: function(e) {
      console.log("topage ", e);
      this.getData(e);
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
    limitPage: function(e) {
      this.perPage = e;
      this.getData();
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
    getData: function(page) {
      console.log("getData ", page);
      let that = this;
      let randomNumber = Math.floor(Math.random() * 6) + 5;
      let start;
      if (page) {
        start = (page - 1) * that.perPage;
      } else {
        start = 0;
      }

      let user = this.currentUser;
      console.log("user ", user);

      let dataTablesS = new FormData();
      dataTablesS.append("draw", randomNumber);
      dataTablesS.append("order[0][column]", [that.idx]);
      dataTablesS.append("order[0][dir]", [that.sortDirection]);
      dataTablesS.append("start", start);
      dataTablesS.append("length", that.perPage);
      dataTablesS.append("search[value]", [that.filter]);
      dataTablesS.append("status", that.status);

      if (user.role !== "0") {
        dataTablesS.append("parent", user.id);
      }

      this.$store
        .dispatch("getListPengguna", dataTablesS)
        .then(r => {
          console.log("succes ", r);
          if (r.status === 200) {
            if (r.data.code) {
              that.$notify.error({
                title: "Info",
                message: "Error " + r.data.code
              });
              return;
            }
            that.items = r.data.data;
            //that.totalRows = r.data.recordsTotal;
            that.totalRows = r.data.recordsFiltered;
          } else {
            that.$notify.error({
              title: "Info",
              message: "Error. " + r.data.data
            });
          }
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Error. " + e
          });
        });
    },
    addPenggunaModal: function() {
      let that = this;
      let user = this.currentUser;
      console.log("user ", user);

      let formdata = new FormData();

      if (user.role === 0) {
        formdata.append("id", user.id);
        formdata.append("parent", "");
      } else {
        formdata.append("id", user.id);
        formdata.append("parent", user.id);
      }

      that.$store
        .dispatch("getAllBrandlist", formdata)
        .then(r => {
          console.log("r get all brandlist ", r);
          let arr1 = r.data.all_brandlist;
          let fil = r.data.my_brandlist;

          let filtered = [];

          for (let arr in arr1) {
            for (let filter in fil) {
              if (arr1[arr].id == fil[filter].id_brand) {
                filtered.push(arr1[arr]);
              }
            }
          }
          console.log(filtered);

          that.myBrandlist = filtered;
          that.allBrandlist = r.data.all_brandlist;
          that.$root.$emit("bv::show::modal", "addPengguna");
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Error. " + e
          });
        });
    },
    editPenggunaModal: function(row) {
      console.log("edit pengguna modal ", row);
      this.pickedUserBySU = row;
      let that = this;
      let user = this.currentUser;
      console.log("user ", user);
      console.log("row ", row);
      if (row.item.status === "1") {
        this.statusVar = true;
      } else {
        this.statusVar = false;
      }

      let formData = new FormData();
      if (user.role === 0) {
        formData.append("id", user.id);
        formData.append("parent", "");
      } else {
        formData.append("id", row.item.id);
        formData.append("parent", row.item.parent);
      }

      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      that.$store
        .dispatch("getAllBrandlist", formData)
        .then(r => {
          console.log("r get all brandlist ", r);
          let arr1 = r.data.all_brandlist;
          let fil = r.data.my_brandlist;

          let filtered = [];

          for (let arr in arr1) {
            for (let filter in fil) {
              if (arr1[arr].id == fil[filter].id_brand) {
                filtered.push(arr1[arr]);
              }
            }
          }
          console.log(filtered);

          that.myBrandlist = filtered;
          that.allBrandlist = r.data.all_brandlist;
          that.$root.$emit("bv::show::modal", "editPengguna");
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Error " + e
          });
        });
    },
    editPengguna: function(e) {
      e.preventDefault();
      let that = this;
      console.log("edit pengguna ", e);
      let frm = document.getElementById("frm_edit_pengguna");
      let formData = new FormData(frm);
      let status;
      if (this.statusVar) {
        status = 1;
      } else {
        status = 0;
      }
      formData.append("status", status);
      let br = [];
      this.myBrandlist.forEach(function(x) {
        br.push(x.id);
      });

      formData.append("brand_list", br.join());

      // Display the key/value pairs
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      this.$store
        .dispatch("editPengguna", formData)
        .then(r => {
          console.log("succes ", r);
          if (r.data.code === 200) {
            console.log("success 200 ", r.data.result);
            that.getData();
            that.$root.$emit("bv::hide::modal", "editPengguna");
          } else {
            that.$notify.error({
              title: "Info",
              message: "Error " + r.data.result
            });
          }
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Token error " + e
          });
        });
    },
    tambahPengguna(e) {
      e.preventDefault();
      let that = this;
      let frm = document.getElementById("frm_tambah_pengguna");
      //document.getElementById("myForm").reset();
      let formData = new FormData(frm);
      let status;
      if (this.statusVar) {
        status = 1;
      } else {
        status = 0;
      }
      formData.append("status", status);

      let br = [];
      this.myBrandlist.forEach(function(x) {
        br.push(x.id);
      });

      formData.append("brand_list", br.join());

      // Display the key/value pairs
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      this.$store
        .dispatch("tambahPengguna", formData)
        .then(r => {
          console.log("succes ", r);
          if (r.data.code === 200) {
            console.log("success 200 ", r.data.result);

            that.getData();
            that.$root.$emit("bv::hide::modal", "addPengguna");
            that.statusVar = false;
            that.allBrandlist = [];
            that.password = "";
            frm.reset();
          } else {
            that.$notify.error({
              title: "Info",
              message: "Error " + r.data.result
            });
          }
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Token error " + e
          });
        });
    }
  },
  mounted: function() {
    // todo
    this.getData();
  }
};
</script>

<style >
.btn-margin {
  margin: 0.1em;
}

@media (max-width: 767.99px) {
  table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before {
    text-align: left !important;
  }
}
</style>
