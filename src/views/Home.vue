<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow">
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow">
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow">
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow">
            <img :src="leaf1" alt="leaf1" class="leaf1 leaf6" v-show="leafShow">
           <div class="brand"><h1>19 - February</h1><h3>Design by Steyr+</h3></div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <!-- <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
              <h2 class="title text-center">Let's talk product</h2>
              <h5 class="description">This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more.</h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>chat</md-icon>
                  </div>
                  <h4 class="info-title">Free Chat</h4>
                  <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                  <div class="info">
                    <div class="icon icon-success">
                      <md-icon>verified_user</md-icon>
                    </div>
                    <h4 class="info-title">Verified Users</h4>
                    <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                  </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                  <div class="info">
                    <div class="icon icon-danger">
                      <md-icon>fingerprint</md-icon>
                    </div>
                    <h4 class="info-title">Fingerprint</h4>
                    <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="section text-center">
        <div class="container">
          <!-- <h2 class="title">Here is our team</h2> -->
          <div class="team">
              <div class="md-layout">
                  <div class="md-layout-item md-medium-size-33 md-small-size-100">
                   <!-- <el-row>
                     <el-col>
                       <el-card>
                       </el-card>
                     </el-col>
                   </el-row> -->
                  </div>
                  <div class="md-layout-item md-medium-size-33 md-small-size-100">
                    <div class="team-player">
                      <md-card class="md-card-plain">
                        <div class="md-layout-item md-size-50 mx-auto">
                          <img src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/24059210_957599971031829_354741728366965751_n.jpg?_nc_cat=111&oh=f92a16979082c5fd23167dc7afaac8ac&oe=5C1CDFF6" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                        </div>
                        <h4 class="card-title">Xuân Phạm
                          <br>
                          <small @click="tang" class="card-description text-muted">Creator</small>
                          
                        </h4>
                          <md-button href="https://www.instagram.com/xuan.ph94/" target="_blank" class="md-just-icon md-simple">
                            <i class="fab fa-instagram"></i>
                          </md-button>
                          <md-button href="https://www.facebook.com/only.you.381" target="_blank" class="md-just-icon md-simple">
                            <i class="fab fa-facebook-square"></i>
                          </md-button>
                        <md-card-content>
                          <p class="card-description">Trang này là của tao - vô mà đéo nghe tao lock ip nhé ahihi.</p>
                        </md-card-content>
                      </md-card>
                    </div>
                  </div>
                  <div class="md-layout-item md-medium-size-33 md-small-size-100">
                   
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/NavigationSection";
import SmallNavigation from "./components/SmallNavigationSection";
import Tabs from "./components/TabsSection";
import NavPills from "./components/NavPillsSection";
import Notifications from "./components/NotificationsSection";
import TypographyImages from "./components/TypographyImagesSection";
import JavascriptComponents from "./components/JavascriptComponentsSection";
import { LoginCard } from "@/components";

export default {
  components: {
    BasicElements,
    Navigation,
    SmallNavigation,
    Tabs,
    NavPills,
    Notifications,
    TypographyImages,
    JavascriptComponents,
    LoginCard
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg")
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png")
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png")
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png")
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg")
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
    tang() {
      // store.commit('increment');
      
      // console.log(store.state.count); // -> 1
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    }
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
