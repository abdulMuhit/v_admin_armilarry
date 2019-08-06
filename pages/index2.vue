<template>
  <div class="br-pagebody">
    <div class="br-section-wrapper">
      <div class="card mb-2">
        <div class="m-1 p-2">
          <div>
            <div>
              <div class="card bg-info">
                <div class="m-1 p-1">
                  <img src="/img/bandroslogowhite.png" width="100" />
                </div>

                <!--<img class="logo-size" :src="`${baseUrl}img/bandroslogowhite.png`" alt="">-->
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h3>PENDAFTARAN VENDOR BANDROS</h3>
                <p>Status pendaftaran : Waiting list</p>
                <div class="page-links m-2 p-2">
                  
                  <nuxt-link to="/login" exact>Masuk</nuxt-link>
                  <nuxt-link to="/" exact>Daftar</nuxt-link>
                </div>

                <b-form v-if="show">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="nama_lengkap"
                          required
                          placeholder="Nama Lengkap"
                          title="Nama Lengkap (wajib)"
                          v-model="form.nama_lengkap"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="tel"
                          name="no_hp"
                          required
                          placeholder="No Hp"
                          title="No Hp (wajib)"
                          v-model="form.no_hp"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="email"
                          name="email"
                          required
                          placeholder="Email"
                          title="Email (wajib)"
                          v-model="form.email"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="nama_brand"
                          required
                          placeholder="Nama Brand"
                          title="Nama Brand (wajib)"
                          v-model="form.nama_brand"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <b-form-group title="Alamat Pembeli (wajib)">
                        <b-form-textarea
                          placeholder="Alamat Pembeli"
                          v-model="form.alamat_pembeli"
                          :rows="3"
                          :max-rows="6"
                        ></b-form-textarea>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="kota"
                          required
                          placeholder="Kota"
                          title="Kota (wajib)"
                          v-model="form.kota"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="provinsi"
                          required
                          placeholder="Provinsi"
                          title="Provinsi (wajib)"
                          v-model="form.provinsi"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
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
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <!--:preserve-search="false"
                                            :close-on-select="false"
                                            :clear-on-select="false"
                                            :preselect-first="false"
                        -->
                        <no-ssr>
                          <multiselect
                            v-model="selected"
                            :options="options"
                            :hide-selected="true"
                            placeholder="Pilih Kategori"
                            label="Kategori"
                            id="example"
                            @select="onSelect"
                            :multiple="true"
                            :taggable="true"
                            tag-placeholder="Tambah kategori"
                            @tag="addTag"
                          ></multiselect>
                        </no-ssr>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="facebook"
                          placeholder="akun fb"
                          title="akun fb"
                          v-model="form.facebook"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="instagram"
                          placeholder="akun instagram"
                          title="akun instagram"
                          v-model="form.instagram"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="link_ol_shop"
                          placeholder="Link toko di marketplace"
                          title="Link toko di marketplace"
                          v-model="form.market_place"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          name="link website"
                          placeholder="link website"
                          title="link website"
                          v-model="form.website"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                  </div>

                  <no-ssr>
                    <!--                     
                    <vue2-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue2-dropzone>-->

                    <vue2-dropzone
                      id="foo"
                      ref="el-dropzone"
                      :options="dropzoneOptions"
                      :destroyDropzone="true"
                    ></vue2-dropzone>
                  </no-ssr>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vue2Dropzone from "vue2-dropzone";
// import "vue2-dropzone/dist/vue2Dropzone.min.css";
// import Multiselect from "vue-multiselect/src/Multiselect";

import vue2Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";

import Multiselect from "vue-multiselect";

export default {
  name: "DaftarWaitingListVendor",
  components: {
    Multiselect,
    vue2Dropzone
  },
  data() {
    return {
      errorMsg: null,
      errors: [],
      show: true,
      form: {},
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      selected: [],
      options: ["Snack", "Minuman", "Fashion", "Buku", "Aksesoris"]
    };
  },
  mounted() {
    const instance = this.$refs;
    console.log("instance dropzone ", instance);
  },
  methods: {
    addTag: function(newTag) {
      console.log("new tag ", newTag);
      this.selected.push(newTag);
      this.options.push(newTag);
    },
    onSelect(option, id) {
      console.log(option, id);
    }
  }
};
</script>

<style scoped>
</style>