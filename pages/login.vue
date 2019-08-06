<template>
  <div class="d-flex align-items-center justify-content-center bg-br-primary ht-100v">
    <div class="login-wrapper wd-300 wd-xs-350 pd-25 pd-xs-40 bg-white rounded shadow-base">
      <div class="signin-logo tx-center tx-28 tx-bold tx-inverse">
        <span class="tx-normal">[</span> Vendor Admin
        <span class="tx-normal">]</span>
      </div>
      <div class="tx-center mg-b-60">Sistem Informasi Vendor Bandros</div>

      <form ref="frm-login">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Masukan nama pengguna"
            v-model="user.username"
          />
        </div>
        <!-- form-group -->
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Masukan Password"
            v-model="user.password"
          />
        </div>
        <!-- form-group -->
        <button type="submit" class="btn btn-primary btn-block" @click.prevent="LoginProses">Masuk</button>
      </form>
      <div class="m-2 text-right">
        <b-button to="/" class="btn btn-info" size="sm">Daftar</b-button>
        <!-- <nuxt-link to="/">Daftar</nuxt-link> -->
      </div>
    </div>
    <!-- login-wrapper -->
  </div>
  <!-- d-flex -->
</template>

<script>
export default {
  name: "Login",
  layout: "default",
  middleware: "authenticatedMasuk",
  data: function() {
    return {
      fullPage: false,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    LoginProses() {
      // e.preventDefault()
      const that = this;
      if (!that.user.username || !that.user.password) {
        that.$notify.error({
          title: "Info",
          message:
            "Silahkan lengkapi username dan password anda terlebih dahulu. "
        });
        return;
      }
      const data = new FormData();
      data.append("email", that.user.username);
      data.append("password", that.user.password);

      that.$store
        .dispatch("login", data)
        .then(r => {
          if (r.data.code === 200) {
            that.$notify.success({
              title: "Info",
              message: "Password dan user anda benar!"
            });

            that.$router.push("/dashboard");
          } else {
            that.$notify.error({
              title: "Info",
              message: "Username / password anda salah. "
            });
          }
        })
        .catch(e => {
          that.$notify.error({
            title: "Info",
            message: "Error " + e
          });
        });
    }
  }
};
</script>

<style>
.loginpage {
  height: 100vh;
}

@media (min-height: 700px) {
  .loginpage {
    height: 100vh;
  }
}

@media (max-width: 992px) {
  .loginpage {
    height: 100vh;
  }
}
</style>