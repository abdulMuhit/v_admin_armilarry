<template>
  <div class="br-pagebody">
    <div class="card m-1 p-1">
      <form-wizard
        title="Self Order"
        subtitle="prosedur self order"
        @on-loading="setLoading"
        @on-validate="handleValidation"
        @on-error="handleErrorMessage"
        color="#3565b6"
      >
        <tab-content title="Tambah Produk" icon="fa fa-user" :before-change="validateProduct">
          <b-card header-tag="header" footer-tag="footer">
            <template slot="header" class="mb-0">
              <b-form v-if="show" id="form_selfOrderProduk">
                <input type="text" class="d-none" v-model="selfOrder.harga" value="2000" />

                <div class="row">
                  <div class="col">
                    <b-form-group label="Pilih Produk:">
                      <b-form-select :options="produk" required v-model="selfOrder.sku"></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col">
                    <b-form-group label="Pilih Warna:">
                      <b-form-select :options="warna" required v-model="selfOrder.warna"></b-form-select>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-form-group label="Pilih Ukuran:">
                      <b-form-select :options="ukuran" required v-model="selfOrder.ukuran"></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col">
                    <b-form-group label="Qty:">
                      <b-form-input
                        type="number"
                        required
                        title="Jumlah produk(wajib)"
                        v-model="selfOrder.qty"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
              </b-form>

              <button
                type="button"
                class="btn btn-primary btn-sm"
                style="float: right"
                @click.prevent="AddProduk"
              >
                <i class="fa fa-plus"></i> Tambah Produk
              </button>
            </template>
            <b-card-body>
              <b-table
                responsive
                bordered
                striped
                hover
                caption-top
                :fields="fieldsModal"
                :items="model.services"
              >
                <template slot="qty" slot-scope="data">{{data.value}}</template>
                <template slot="harga" slot-scope="data">{{data.value}}</template>
                <template slot="totalHarga" slot-scope="data">
                  {{(data.item.qty * data.item.harga) || 0}}
                  <!--<b-form-input size="sm" class="form-control" :value="(data.item.qty * data.item.harga) || 0" :name="`sum_${data.index}`" type="text" readonly/>-->
                </template>
                <template slot="action" slot-scope="data">
                  <button class="btn btn-primary btn-block" @click.prevent="delService(data)">Hapus</button>
                </template>
                <template slot="bottom-row" slot-scope="data">
                  <td colspan="3">Total</td>
                  <td colspan="2">{{totalQty}}</td>
                  <td colspan="2">{{totalHarga}}</td>
                </template>
              </b-table>
            </b-card-body>
          </b-card>
        </tab-content>
        <tab-content title="Data Pengiriman" icon="fa fa-truck" :before-change="validateShipping">
          <b-form v-if="true" id="form_selforder">
            <b-form-group>
              <b-form-input
                type="text"
                name="nama_pengirim"
                required
                placeholder="Nama Pengirim"
                title="Nama Pengirim (wajib)"
                v-model="form.nama_pengirim"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="tel"
                name="no_tlp"
                required
                placeholder="No Telepon Pengirim"
                title="No Telepon Pengirim (wajib)"
                v-model="form.no_tlp_pengirim"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                type="text"
                name="nama_pembeli"
                required
                placeholder="Nama Pembeli"
                title="Nama Pembeli (wajib)"
                v-model="form.nama_pembeli"
              ></b-form-input>
            </b-form-group>

            <b-form-group title="Alamat Pembeli (wajib)">
              <b-form-textarea
                placeholder="Alamat Pembeli"
                v-model="form.alamat_pembeli"
                :rows="3"
                :max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group>
              <b-form-input
                type="tel"
                name="no_tlp_pembeli"
                required
                placeholder="No. Telp. Pembeli"
                title="No. Tlpn. Pembeli (wajib)"
                v-model="form.no_tlp_pembeli"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="number"
                name="kodepos"
                required
                placeholder="Kodepos"
                title="Kodepos (wajib)"
                v-model="form.kodepos"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Provinsi:">
              <b-form-select :options="provinsi" required v-model="form.provinsi"></b-form-select>
            </b-form-group>
            <b-form-group label="Kab./Kota:">
              <b-form-select :options="kabkot" required v-model="form.kabkot"></b-form-select>
            </b-form-group>
            <b-form-group label="Kecamatan:">
              <b-form-select :options="kecamatan" required v-model="form.kecamatan"></b-form-select>
            </b-form-group>
            <b-form-group label="Kurir:">
              <b-form-select :options="kurir" required v-model="form.kurir"></b-form-select>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                name="catatan_uadmin"
                placeholder="Catatan untuk Admin"
                title="Catatan untuk Admin"
                v-model="form.catatan_uadmin"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                name="catatan_ukurir"
                placeholder="Catatan untuk Kurir"
                title="Catatan untuk Admin"
                v-model="form.catatan_ukurir"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                type="text"
                name="kode_kurir"
                placeholder="Kode JNE (JOB) / AWB J&T Shopee / Bukalapak"
                title="Kode JNE (JOB) / AWB J&T Shopee / Bukalapak"
                v-model="form.kode_kurir"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </tab-content>
        <tab-content title="Konfirmasi" icon="fa fa-check">
          <h5>Anda yakin untuk memesan produk ini?</h5>
        </tab-content>

        <template slot="footer" slot-scope="props">
          <div class="wizard-footer-left">
            <wizard-button
              v-if="props.activeTabIndex === 0"
              @click.native="batalTran"
              :style="props.fillButtonStyle"
            >Batal</wizard-button>
            <wizard-button
              v-if="props.activeTabIndex > 0"
              @click.native="props.prevTab()"
              :style="props.fillButtonStyle"
            >Kembali</wizard-button>
          </div>
          <div class="wizard-footer-right">
            <wizard-button
              v-if="!props.isLastStep"
              @click.native="props.nextTab()"
              class="wizard-footer-right"
              :style="props.fillButtonStyle"
            >Selanjutnya</wizard-button>
            <wizard-button
              v-else
              @click.native="onComplete"
              class="wizard-footer-right finish-button"
              :style="props.fillButtonStyle"
            >{{props.isLastStep ? 'Ya' : 'Selanjutnya'}}</wizard-button>
          </div>
        </template>

        <div class="loader" v-if="loadingWizard"></div>
        <div v-if="errorMsg">
          <span class="error">{{errorMsg}}</span>
          <div v-if="errors.length">
            <ul>
              <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
            </ul>
          </div>
        </div>
      </form-wizard>
    </div>
  </div>
</template>

<script>
export default {
  name: "TambahSelfOrder",
  layout: "Auth",
  data() {
    return {
      form: {},
      kurir: [
        { text: "Pilih Kurir", value: null },
        "JNE",
        "TIKI",
        "POS Indonesia",
        "JNT"
      ],
      provinsi: [
        { text: "Pilih Provinsi", value: null },
        "Banten",
        "Jabar",
        "Jateng",
        "Kalbar"
      ],
      kabkot: [
        { text: "Pilih Kab/Kota", value: null },
        "kab. Sukabumi",
        "kota Sukabumi",
        "kota Bandung",
        "kab. Bandung"
      ],
      kecamatan: [
        { text: "Pilih Kecamatan", value: null },
        "Cibeunying Kidul",
        "Cibeunying Kaler",
        "Padasuka"
      ],
      show: true,
      model: {
        /*services: [{ id: 1, tanggal: "19/01/2018", jumlah: "10000", grandTotal: "20000", id_order: 123, sku: "124aa1", ukuran: "43", warna: "hijau", qty: 1, harga: 2000, tanggalOrder: "11/01/2018"},]*/
        services: []
      },
      produk: [
        { text: "Pilih Produk", value: null },
        "SKU001",
        "SKU9292",
        "SKU334",
        "SKU342"
      ],
      warna: [
        { text: "Pilih Produk", value: null },
        "Merah",
        "Kuning",
        "Hijau",
        "Biru"
      ],
      ukuran: [{ text: "Pilih Ukuran", value: null }, "S", "M", "X", "XL"],
      selfOrder: {
        harga: 3000
      },
      fieldsModal: [
        { idx: 1, key: "sku", label: "SKU", sortable: true },
        { idx: 2, key: "ukuran", label: "Ukuran", sortable: true },
        {
          idx: 3,
          key: "warna",
          label: "Warna",
          sortable: true,
          sortDirection: "desc"
        },
        { idx: 4, key: "qty", label: "QTY", sortable: true },
        { idx: 5, key: "harga", label: "Harga", sortable: true },
        { idx: 6, key: "totalHarga", label: "Total Harga", sortable: true },
        { idx: 7, key: "action", label: "#" }
      ],
      loadingWizard: false,
      errorMsg: null,
      count: 0,
      errors: []
    };
  },
  methods: {
    onComplete: function() {
      const that = this;

      that.$notify.success({
        title: "Info",
        message: "Transaksi diproses "
      });
      console.log("data diproses alamat ", this.form);
      console.log("data diproses services ", this.model.services);
      this.$router.push("selfOrder");
    },
    batalTran: function() {
      console.log("batal");
      this.$router.push("selfOrder");
    },
    delService(ev) {
      console.log("ev ", ev);
      //myFish.splice(3, 1);
      this.model.services.splice(ev.index, 1);
    },
    AddProduk() {
      let order = this.selfOrder;

      this.model.services.push(order);
      this.selfOrder = {
        harga: 3000
      };
    },
    setLoading: function(value) {
      this.loadingWizard = value;
    },
    handleValidation: function(isValid, tabIndex) {
      console.log("Tab: " + tabIndex + " valid: " + isValid);
    },
    handleErrorMessage: function(errorMsg) {
      this.errorMsg = errorMsg;
    },
    validateProduct: function() {
      let that = this;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (that.model.services.length < 1) {
            that.$notify.info({
              title: "Info",
              message: "Silahkan pesan produk anda terlebih dahulu "
            });
            reject("Silahkan pesan produk anda terlebih dahulu");
          } else {
            resolve(true);
          }
        }, 1000);
      });
    },
    validateShipping: function() {
      let that = this;
      /*                if (this.form.alamat_pembeli && this.form.kabkot && this.form.provinsi
                    && this.form.kecamatan && this.form.kurir && this.form.nama_pembeli
                    && this.form.nama_pengirim && this.form.no_tlp_pembeli && this.form.no_tlp_pengirim) {
                    return true;
                }*/

      this.errors = [];

      if (!this.form.alamat_pembeli) {
        this.errors.push("form alamat pembeli dibutuhkan.");
      }
      if (!this.form.kabkot) {
        this.errors.push("form kabupaten/kota belum diisi.");
      }
      if (!this.form.provinsi) {
        this.errors.push("form provinsi belum di isi.");
      }
      if (!this.form.kecamatan) {
        this.errors.push("form kecamatan belum diisi.");
      }
      if (!this.form.kurir) {
        this.errors.push("form kurir belum di isi.");
      }
      if (!this.form.nama_pembeli) {
        this.errors.push("form nama pembeli belum diisi.");
      }
      if (!this.form.nama_pengirim) {
        this.errors.push("form nama pengirim belum diisi.");
      }
      if (!this.form.no_tlp_pembeli) {
        this.errors.push("form no telepon pembeli belum di isi.");
      }
      if (!this.form.no_tlp_pengirim) {
        this.errors.push("form no telepon pengirim belum diisi.");
      }
      console.log("form ", that.form);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (that.errors.length > 0) {
            that.$notify.info({
              title: "Info",
              message: "Silahkan isi data pengiriman anda terlebih dahulu "
            });
            reject("Silahkan isi data pengiriman ini terlebih dahulu");
          } else {
            resolve(true);
          }
        }, 1000);
      });
    }
  },
  computed: {
    totalQty: function() {
      console.log("this modele.services ", this.model.services);
      return this.model.services.reduce(function(a, c) {
        return a + Number(c.qty || 0);
      }, 0);
    },
    totalHarga: function() {
      return this.model.services.reduce(function(a, c) {
        console.log("a ", a, " c ", c);
        return a + Number(c.qty * c.harga || 0);
      }, 0);
    }
  }
};

//todo: ada get/endpoint ambil provinsi, kab kota , kecamatan, kurir, barang/produk
</script>



<style scoped>
</style>
