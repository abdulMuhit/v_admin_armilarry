<template>
  <div class="header_menu">
    <div class="br-header">
      <div class="br-header-left" @click="btnLeftMenuClicked">
        <div class="navicon-left hidden-md-down">
          <a id="btnLeftMenu" class="pointer">
            <i class="icon ion-navicon-round"></i>
          </a>
        </div>
        <div class="navicon-left hidden-lg-up">
          <a id="btnLeftMenuMobile" class="pointer">
            <i class="icon ion-navicon-round"></i>
          </a>
        </div>
      </div>
      <!-- br-header-left -->

      <b-navbar-nav class="ml-auto" style="position: relative; right: 1em">
        <b-nav-item-dropdown right no-caret>
          <!-- Using button-content slot -->
          <template slot="button-content" v-if="user">
            <span class="logged-name">
              <i class="icon ion-ios-person"></i>
              Helo {{ user.nama }}
            </span>
            <img src="../assets/img/icon-bdrs.png" class="wd-32 rounded-circle" alt="image here" />
            <!--<span class="square-10 bg-success"></span>-->
          </template>

          <b-dropdown-item>
            <router-link to="/dashboard/profile" exac>
              <div class="br-menu-item">
                <i class="menu-item-icon icon ion-ios-person tx-24"></i>
                <span class="menu-item-label">Profile</span>
              </div>
            </router-link>
          </b-dropdown-item>

          <div v-if="user">
            <template v-if="user.role === '0' || user.brand_list.length >1">
              <b-dropdown-item @click="btnRightMenuClicked">
                <div class="br-menu-item">
                  <i class="menu-item-icon icon ion-arrow-swap tx-24"></i>
                  <span class="menu-item-label">Pilih Brand</span>
                </div>
              </b-dropdown-item>
            </template>
          </div>

          <b-dropdown-item @click="logout">
            <div class="br-menu-item">
              <i class="menu-item-icon icon ion-android-exit tx-24"></i>
              <span class="menu-item-label">Logout</span>
            </div>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
    <!-- br-header -->
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  props: ["user"],
  data: function() {
    return {
      /*  users: this.user,*/
    };
  },
  methods: {
    logout: function(e) {
      // localStorage.clear();
      // this.$router.push("/");

      const that = this;
      let msg = "Berhasil logout";
      if (that.isAuthenticated === false) {
        msg = "Token anda expired, harap login ulang.";
      }
      that.$store
        .dispatch("logoutMethod")
        .then(x => {
          that.$notify.success({
            title: "Info",
            message: msg
          });
          that.$router.push("/");
        })
        .catch(e => {
          that.$notify.error({
            title: "Info",
            message: "Logout error " + e
          });
        });
    },
    btnRightMenuClicked: function(e) {
      e.stopPropagation();
      console.log("user ", this.$props.user);
      if (this.$props.user.role == 0) {
        console.log("this is super admin bandros");
        this.$emit("callModalAdmin");
      } else {
        //this.$parent.callPickBrandVendor();
        this.$emit("callModalVendor");
      }

      //todo if you want right menu activaed
      //document.body.classList.add('show-right');
    },
    btnLeftMenuClicked: function(e) {
      e.stopPropagation();
      let menuText = document.getElementsByClassName("menu-item-label");
      let menuText2 = document.getElementsByClassName("menu-item-arrow");
      let navitem = document.getElementsByClassName("br-menu-sub");

      if (document.body.classList.contains("collapsed-menu")) {
        document.body.classList.remove("collapsed-menu");

        for (let i = 0; i < menuText.length; i++) {
          menuText.item(i).classList.remove("op-lg-0-force");
          menuText.item(i).classList.remove("d-lg-none");
        }
        for (let i = 0; i < menuText2.length; i++) {
          menuText2.item(i).classList.remove("op-lg-0-force");
          menuText2.item(i).classList.remove("d-lg-none");
        }

        for (let i = 0; i < navitem.length; i++) {
          navitem[i].classList.remove("d-none");
        }
      } else {
        document.body.classList.add("collapsed-menu");

        for (let i = 0; i < menuText.length; i++) {
          menuText.item(i).classList.add("op-lg-0-force");
          menuText.item(i).classList.add("d-lg-none");
        }

        for (let i = 0; i < menuText2.length; i++) {
          menuText2.item(i).classList.add("op-lg-0-force");
          menuText2.item(i).classList.add("d-lg-none");
        }

        for (let i = 0; i < navitem.length; i++) {
          navitem[i].classList.add("d-none");
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
