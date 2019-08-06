<template>
  <div>
    <LoaderFull></LoaderFull>
    <div class="dashboard">
      <HeaderMenu
        v-bind:user="loggedUser"
        v-on:callModalVendor="callPickBrandVendor"
        v-on:callModalAdmin="callPickBrand"
      ></HeaderMenu>
      <SidebarLeft :user="loggedUser" :brand="brand" />
      <div id="brmain" class="br-mainpanel">
        <div class="br-pageheader pd-y-15 pd-l-20">
          <nav class="breadcrumb pd-0 mg-0 tx-12">
            <!-- <span class="breadcrumb-item active">Home</span> -->
          </nav>
        </div>
        <!-- br-pageheader -->
        <nuxt />
      </div>
    </div>

    <!-- Modal Component -->
    <b-modal
      hide-header-close
      id="modal_pick_vendor"
      size="lg"
      cancel-disabled
      no-close-on-backdrop
      no-close-on-esc
      title="Pilih Brand"
    >
      <multiselect
        v-model="selected"
        :options="options"
        label="brand"
        track-by="brand"
        placeholder="Pilih Brand"
        :searchable="true"
      ></multiselect>

      <div slot="modal-footer" class="w-100">
        <b-btn v-if="selected" variant="primary" @click="handleOk">OK</b-btn>
      </div>
    </b-modal>

    <!-- Modal Super Admin Component -->
    <b-modal id="modal_pick" size="lg" title="Pilih Brand">
      <p>Pilih modal admin vendor</p>

      <multiselect
        v-model="selected"
        :options="options"
        label="brand"
        track-by="brand"
        placeholder="Pilih Brand"
        :searchable="true"
      ></multiselect>
      <div slot="modal-footer" class="w-100">
        <b-btn v-if="selected" variant="primary" @click="handleOk">OK</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
let isInViewport = function(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

function mouseOver(e) {
  e.stopPropagation();
  let brsideleft = document.getElementById("brsideleftmenu");
  let inview = isInViewport(brsideleft);
  let insidemenu = e.target.closest(".br-sideleft");
  let menuText = document.getElementsByClassName("menu-item-label");
  let menuText2 = document.getElementsByClassName("menu-item-arrow");
  let navitem = document.getElementsByClassName("br-menu-sub");

  if (document.body.classList.contains("collapsed-menu") && inview) {
    if (insidemenu) {
      document.body.classList.add("expand-menu");
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
      document.body.classList.remove("expand-menu");
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
  } else if (!inview) {
    for (let i = 0; i < navitem.length; i++) {
      navitem[i].classList.remove("d-none");
    }
  }
}

function bodyClicked(e) {
  e.stopPropagation();
  if (document.body.classList.contains("show-left")) {
    let sh = e.target.closest(".br-sideleft");
    if (sh === null) {
      document.body.classList.remove("show-left");
    }
  }

  if (document.body.classList.contains("show-right")) {
    let sh = e.target.closest(".br-sideright");
    if (sh === null) {
      document.body.classList.remove("show-right");
    }
  }
}

function btnleftmobileClicked() {
  document.body.classList.add("show-left");
}

import { mapGetters } from "vuex";
import LoaderFull from "~/components/LoaderFull";
import HeaderMenu from "~/components/HeaderMenu";
import SidebarLeft from "~/components/SidebarLeft";
import Multiselect from "vue-multiselect";
export default {
  name: "Auth",
  components: { LoaderFull, HeaderMenu, SidebarLeft, Multiselect },
  middleware: "authenticated",
  data() {
    return {
      user: "HELO WORLD USER",
      brand: [
        {
          brand: "ASAL",
          id: "0",
          id_member: "0",
          logo: "https://admin.tss.my.id/public/brand/komplen_tokopedia.png"
        }
      ],
      modalInfo: { title: "", content: "" },
      selected: null,
      options: []
    };
  },
  computed: {
    ...mapGetters(["loggedUser", "fullMember", "isAuthenticated"])
  },
  methods: {
    callPickBrandVendor() {
      this.$root.$emit("bv::show::modal", "modal_pick_vendor");
    },
    callPickBrand() {
      let that = this;
      if (!this.options || this.options.length === 0) {
        this.cari(that.$store.getters.loggedUser);
        return;
      }
      this.$root.$emit("bv::show::modal", "modal_pick");
    },
    handleOk() {
      this.brand = this.selected;
      this.$root.$emit("bv::hide::modal", "modal_pick_vendor");
      this.$root.$emit("bv::hide::modal", "modal_pick");
    },
    /*  
    onSearch(search, loading) {
                loading(true);
                //this.search(loading, search, this);
                this.cari(loading)
            },
    */
    cari: function(data) {
      console.log("car data ", data);
      let formdata = new FormData();
      formdata.append("id", data.id);
      formdata.append("parent", "");

      let that = this;

      this.$store
        .dispatch("getAllBrandlist", formdata)
        .then(r => {
          let allbrandlist = r.data.all_brandlist;
          if (!allbrandlist || allbrandlist.length === 0) {
            that.$notify.error({
              title: "Info",
              message: "cannot get brandlist or server error "
            });
          } else {
            that.options = allbrandlist;
            that.callPickBrand();
          }
        })
        .catch(e => {
          console.log("error ", e);
          that.$notify.error({
            title: "Info",
            message: "Logout error " + e
          });
        });
    }
  },
  created: function() {
    this.user = this.$store.getters.loggedUser;
  },
  mounted() {
    console.log("this user ", this.loggedUser);
    if (this.user.brand_list.length > 1) {
      this.options = this.user.brand_list;
      this.callPickBrandVendor();
    } else if (this.user.brand_list.length === 1) {
      this.brand = this.user.brand_list[0];
      this.options = this.user.brand_list;
      this.selected = this.user.brand_list[0];
    }
    document.body.addEventListener("mouseover", mouseOver);
    document
      .getElementById("btnLeftMenuMobile")
      .addEventListener("click", btnleftmobileClicked);
    document.body.addEventListener("click", bodyClicked);
  },
  beforeDestroy() {
    document.body.removeEventListener("mouseover", mouseOver);
    document.body.removeEventListener("click", bodyClicked);
  }
};
</script>
<style>
</style>
