<template>
  <div class="br-pagebody">
    <div class="br-section-wrapper">
      <div class="row">
        <div class="col">
          <h3>Ganti Password</h3>
          <form
            id="gantipassword"
            action="/gantipassword"
            method="post"
            enctype="multipart/form-data"
            @submit="gantipass"
          >
            <div class="form-row pd-2">
              <input
                type="text"
                name="email"
                class="form-control"
                placeholder="email"
                :value="user.email"
                required
                readonly
                title="email"
              />
            </div>
            <div class="form-row pd-2">
              <input
                type="password"
                name="oldpass"
                class="form-control"
                placeholder="password lama"
                required
                title="old password"
              />
            </div>
            <div class="form-row pd-2">
              <input
                type="password"
                name="newpass"
                class="form-control"
                placeholder="password baru"
                required
                title="new password"
              />
            </div>
            <div class="form-row pd-2">
              <button type="submit" class="btn btn-primary btn-block">Ganti Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  layout: "Auth",
  data() {
    return {
      user: "hello"
    };
  },
  methods: {
    gantipass: function(e) {
      e.preventDefault();
      let that = this;
      let frm = document.getElementById("gantipassword");
      let formData = new FormData(frm);

      //gantiPassword
      that.$store
        .dispatch("gantiPassword", formData)
        .then(r => {
          console.log("r ", r);
          that.$notify.success({
            title: "ganti password success",
            message: r.data.result
          });
        })
        .catch(e => {
          console.log("error ", e);

          that.$notify.error({
            title: "ganti password error",
            message: e
          });
        });
    }
  },
  created: function() {
    console.log("created");
    this.user = this.$store.getters.loggedUser;
    console.log("this user ", this.loggedUser);
  }
};
</script>

<style scoped>
</style>
