<template>
<!-- EAACW5Fg5N2IBAHsefFfuxkiMVOm6aKMjlHTaGVCkJRTKXxVQZCoZBNc9wP4nzmU1aeOqcfDVeLie9GwDaEZA1Twaji34CNMv7ZB0YL9KNEzjzXSgFgL2HDHFu19ZCdNjRSb2dXETAbUCHpgW47cZA7zCug1qvpyKCTsZBeJoKitb6qqEOMkHAjvHJdaQza3hsqQiAphfxofQgZDZD -->
  <md-toolbar id="toolbar" md-elevation="0" class="md-transparent md-absolute" :class="extraNavClasses" :color-on-scroll="10">
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <!-- <h3 class="md-title">Steyr</h3> -->
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: toggledClass}" @click="toggleNavbarMobile()">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>             
              <md-list-item href="#/login" v-if="!isLogined">
                <i class="material-icons">person</i>
                <p>Login</p>
              </md-list-item>  
              <li class="md-list-item" v-if="isAdmin">
                <a href="javascript:void(0)" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple dropdown-toggle" data-toggle="dropdown">
                        <i class="material-icons">view_carousel</i>
                        <p>Develop document</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/landing">
                            <i class="material-icons">view_day</i>
                            <p>Landing Page</p>
                          </a>
                        </li>
                         <li>
                          <a href="javascript:void(0)" @click="scrollToElement()" v-if="showDownload">
                            <i class="material-icons">cloud_download</i>
                            <p>Download</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/login">
                            <i class="material-icons">fingerprint</i>
                            <p>Login Page</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/profile">
                            <i class="material-icons">account_circle</i>
                            <p>Profile Page</p>
                          </a>
                        </li>
                        <li>
                           <a href="https://demos.creative-tim.com/vue-material-kit/documentation/"  target="_blank" v-if="showDownload">
                            <i class="material-icons">content_paste</i>
                            <p>Documentation</p>
                          </a>
                        </li>
                         <li>
                          <a href="#/">
                            <i class="material-icons">layers</i>
                            <p>All Components</p>
                          </a>
                        </li>
                        <li>
                          <a href="https://demos.creative-tim.com/vue-material-kit/documentation/" >
                            <i class="material-icons">content_paste</i>
                            <p>Documentation</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <li class="md-list-item" v-if="isLogined">
                <a href="javascript:void(0)" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple dropdown-toggle" data-toggle="dropdown">
                        <img style="max-width: none; width: 30px;padding-right: 5px;" :src="currentUser.urlImg" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                         <p>{{currentUser.name}}</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="javascript:void(0)" @click ="onLogout()" >
                            <i class="material-icons">exit_to_app</i>
                            <p>Đăng xuất</p>
                          </a>
                           <a href="#/donate" >
                            <i class="material-icons">credit_card</i>
                            <p>Nạp điểm</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
              <li class="md-list-item"  v-if="isLogined">
                <a :class="{ 'disable' : loading}" v-loading="loading" href="javascript:void(0)" class="listmenu md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple dropdown-toggle" data-toggle="dropdown">
                        <i  class="material-icons">view_carousel</i>
                        <p>Chức năng</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li v-for="item in menuPermisson" :key="item.name">
                          <a v-bind:href="'#'+item.route">
                            <i class="material-icons">{{item.icon}}</i>
                            <p>{{item.name}}</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
              <li class="md-list-item">
                <a href="javascript:void(0)" class="listmenu md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple dropdown-toggle" data-toggle="dropdown">
                        <i style="font-size: 15px !important;" class="fas fa-terminal"></i>
                        <p>Tools</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/fbleechlink">
                            <i class="fab fa-facebook-square"></i>
                            <p>Leech link post facebook</p>
                          </a>
                        </li>
                          <li>
                          <a href="#/privacypolicygenerator">
                            <i class="fas fa-rocket"></i>
                            <p>Tạo policy</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>
<style>
.listmenu > div.el-loading-mask {
  background-color: rgba(70, 69, 69, 0) !important;
}
div.el-loading-spinner {
  z-index: 20001 !important;
}
.disable {
  opacity: 0.4 !important;
}
.fas {
  font-size: 15px !important;
}
.fab {
  font-size: 15px !important;
}
</style>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import axios from "axios";
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 10 
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      dialogDonate: false,
      loadingDonate: false,
      donateCode: "",
      formLabelWidth: "120px;",
      loading: true,
      currentUser: JSON.parse(localStorage.user || "{}"),
      menuPermisson: []
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile", "homepage"];
      return excludedRoutes.every(r => r !== this.$route.name);
    },
    isLogined() {
      return localStorage.token ? true : false;
    },
    isAdmin() {
      if (this.localUser) {
        return this.localUser.id != this.adminId ? false : true;
      }
      return false;
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > 10) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    onLogout() {
      this.logout();
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
    getMenu() {
      this.loading = true;
      var http = axios.create({
        baseURL: this.baseApi + "api/getPermissonPage",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "brearer " + localStorage.token
        }
      });
      http
        .post()
        .then(res => {
          if (res.data.result === false) {
            this.logout();
          }
          this.menuPermisson = res.data.data;
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.loading = false;
        });
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
    if(this.isLogined) this.getMenu();
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
