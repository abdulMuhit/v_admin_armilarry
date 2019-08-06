<template>
  <div>
    <div class="container register">
      <div class="row">
        <div class="col-md-3 register-left">
          <img src="/img/bandroslogowhite.png" />
          <h3>Selamat Datang!</h3>
          <p>Pendaftaran vendor bandros.</p>
          <!--   <input type="submit" name value="Login" /> 
          <nuxt-link to="/login" class="login-button">Login</nuxt-link>-->

          <b-button to="/login" class="btn login-button">Login</b-button>
          <br />
        </div>
        <div class="col-md-9 register-right">
          <!--       <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >Employee</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >Hirer</a>
            </li>
          </ul>-->
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <h3 class="register-heading">Daftar sebagai Vendor</h3>
              <!--   <div class="row register-form">
               
                <div class="col-md-6">
               
                  <input type="submit" class="btnRegister" value="Register" />
                </div>
              </div>-->

              <b-form v-if="show" class="myform">
                <div class="row register-form">
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

                <div class="mb-2">
                  <!-- <input type="submit" class="btnRegister" value="Register" /> -->
                  <button class="btn btnRegister" disabled>Daftar</button>
                </div>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";

import Multiselect from "vue-multiselect";

export default {
  name: "pendaftaran",
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

<style lang="scss" scoped>
.register {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  margin-top: 3%;
  padding: 3%;
}
.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}
.login-button {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}
.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}
.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 25%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}
.register .register-form {
  padding: 10%;
  margin-top: 10%;
}
.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}
.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}
.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover {
  border: none;
}
.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}

.myform {
  padding-left: 2em;
  padding-bottom: 2em;
  margin-bottom: 2em;
}
</style>
