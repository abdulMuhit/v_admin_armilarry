<template>
  <div>
    <div class="br-logo">
      <a href>
        <span>[</span>V Admin
        <span>]</span>
      </a>
    </div>
    <div class="br-sideleft overflow-y-auto" id="brsideleftmenu">
      <label class="sidebar-label pd-x-15 mg-t-25 mg-b-20 tx-info op-9">Administrator</label>

      <div class="info-list">
        <div class="d-flex align-items-center justify-content-between pd-x-15">
          <div class="media">
            <a class="card-profile-img" href="#">
              <!--<img style="background-color: whitesmoke" class="wd-75-force rounded-5" :src="brand.logo+'?size=100'" alt="">-->
              <img
                style="background-color: whitesmoke"
                class="wd-75-force rounded-5"
                :src="brand.logo"
                alt
              />
            </a>
            <div class="media-body profile_left">
              <h4 class="brandname">{{brand.brand}}</h4>
            </div>
          </div>
        </div>
      </div>

      <label class="sidebar-label pd-x-15 mg-t-20">Menu</label>
      <div id="leftsidemenu" class="br-sideleft-menu">
        <nuxt-link to="/dashboard" exact class="br-menu-link show-sub">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-ios-home tx-22"></i>
            <span class="menu-item-label">Dashboard</span>
          </div>
        </nuxt-link>

        <div v-if="user">
          <template v-if="user.role === '0'">
            <a role="tablist" class="br-menu-link">
              <div v-b-toggle.accordion1 role="tab" class="br-menu-item">
                <i class="menu-item-icon icon ion-ios-people tx-24"></i>
                <span class="menu-item-label">Super Admin</span>
                <i class="menu-item-arrow fa fa-angle-down"></i>
              </div>
            </a>
            <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
              <ul class="br-menu-sub nav flex-column show-sub">
                <li class="nav-item">
                  <nuxt-link
                    to="/dashboard/waitinglistvendor"
                    exact
                    class="nav-link"
                  >Waiting List Vendor</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/dashboard/list_pengguna" exact class="nav-link">List Pengguna</nuxt-link>
                </li>
                <!--   <li class="nav-item"><a href="/daftar" exact class="nav-link">Daftar Vendor</a></li>-->
              </ul>
            </b-collapse>
          </template>
        </div>
        <template v-if="devMode">
          <a class="br-menu-link" role="tablist">
            <div class="br-menu-item" v-b-toggle.page role="tab">
              <i class="menu-item-icon icon ion-ios-people tx-24"></i>
              <span class="menu-item-label">BETA PAGES</span>
              <i class="menu-item-arrow fa fa-angle-down"></i>
            </div>
          </a>
          <b-collapse id="page" accordion="page" role="tabpanel">
            <ul class="br-menu-sub nav flex-column">
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/dashboard/page2" exac>Page2</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/dashboard/secret" exac>Secret Area</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/dashboard/pic_migration" exac>Picture Migration</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/dashboard/tableWithSum" exac>tableWithSum</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  to="/dashboard/tableWithScopedData"
                  exac
                >tableWithScopedData</nuxt-link>
              </li>
            </ul>
          </b-collapse>
        </template>

        <div v-if="user">
          <template v-if="user.role === '1'">
            <a class="br-menu-link" role="tablist">
              <div class="br-menu-item" v-b-toggle.sua role="tab">
                <i class="menu-item-icon icon ion-ios-people tx-24"></i>
                <span class="menu-item-label">Super Admin Vendor</span>
                <i class="menu-item-arrow fa fa-angle-down"></i>
              </div>
            </a>
            <b-collapse id="sua" accordion="sua" role="tabpanel">
              <ul class="br-menu-sub nav flex-column">
                <li class="nav-item">
                  <nuxt-link to="/dashboard/list_pengguna" class="nav-link">List Pengguna</nuxt-link>
                </li>
              </ul>
            </b-collapse>
          </template>
        </div>

        <nuxt-link to="/dashboard/transaksi" exac class="br-menu-link">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-ios-briefcase tx-24"></i>
            <span class="menu-item-label">Transaksi</span>
          </div>
        </nuxt-link>

        <nuxt-link to="/dashboard/selfOrder" exac class="br-menu-link">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-cash tx-24"></i>
            <span class="menu-item-label">SelfOrder</span>
          </div>
        </nuxt-link>

        <!--  
        <nuxt-link to="/dashboard/tambahSelfOrder" exac class="br-menu-link">
            <div class="br-menu-item">
                <i class="menu-item-icon icon ion-social-bitcoin tx-24"></i>
                <span class="menu-item-label">Tambah SelfOrder</span>
            </div>
        </nuxt-link>-->

        <a role="tablist" class="br-menu-link">
          <div v-b-toggle.penjualan role="tab" class="br-menu-item">
            <i class="menu-item-icon icon ion-cash tx-24"></i>
            <span class="menu-item-label">Penjualan Produk</span>
            <i class="menu-item-arrow fa fa-angle-down"></i>
          </div>
        </a>
        <b-collapse id="penjualan" accordion="penjualan" role="tabpanel">
          <ul class="br-menu-sub nav flex-column show-sub">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/dashboard/penjualanProduk" exac>Penjualan Produk</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/dashboard/bestSeller" exac>Best Seller</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/dashboard/retur" exac>Retur</nuxt-link>
            </li>
          </ul>
        </b-collapse>
        <nuxt-link to="/dashboard/statistikProduk" exac class="br-menu-link">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-stats-bars tx-24"></i>
            <span class="menu-item-label">Statistik Produk</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/dashboard/leadboard" exac class="br-menu-link">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-trophy tx-24"></i>
            <span class="menu-item-label">Leadboard</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/dashboard/rekapTransaksi" exac class="br-menu-link">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-ios-briefcase tx-24"></i>
            <span class="menu-item-label">Rekap Transaksi</span>
          </div>
        </nuxt-link>

        <nuxt-link to="/dashboard/historyDeposit" exac class="br-menu-link">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-ios-book tx-24"></i>
            <span class="menu-item-label">History Deposit</span>
          </div>
        </nuxt-link>

        <!--  
        <nuxt-link to="/dashboard/profile" exac class="br-menu-link">
                <div class="br-menu-item">
                    <i class="menu-item-icon icon ion-ios-person tx-24"></i>
                    <span class="menu-item-label">Profile</span>
                </div>
        </nuxt-link>
        -->
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarLeft",
  props: ["user", "brand"],
  data: function() {
    return {
      devMode: false
    };
  }
  /*  created: function() {
    console.log("dev mode ", this.$store.state.devMode);
    this.devMode = this.$store.state.devMode;
    console.log("dev mode after", this.devMode);
  } */
};
</script>

<style scoped>
/* .br-menu-sub {
        display: block;
    }*/

.brandname {
  position: relative;
  left: 1em;
  text-align: center;
  font-family: initial;
  color: aliceblue;
}

#brsideleftmenu {
  overflow-x: hidden;
}

.br-menu-item:hover {
  cursor: pointer;
}
</style>
