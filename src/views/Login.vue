<template>
  <div class="wrapper">
    <!-- <Loading :loading="isLoading" /> -->
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-button slot="buttons" href="javascript:void(0)" class="md-just-icon md-simple md-white">
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button slot="buttons" href="javascript:void(0)" class="md-just-icon md-simple md-white">
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button slot="buttons" href="javascript:void(0)" class="md-just-icon md-simple md-white">
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">Or Be Classical</p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>Tên đăng nhập...</label>
                <md-input v-model="username"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Mật khẩu...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button v-on:click="login" slot="footer" class="md-simple md-success md-lg">
                Đăng nhập
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicElements from "./components/BasicElementsSection";
import { LoginCard } from "@/components";
import JavascriptComponents from "./components/JavascriptComponentsSection";
// import Loading from "../layout/Loading.vue";
import swal from "sweetalert2";

export default {
  components: {
    LoginCard,
    BasicElements,
    JavascriptComponents  
  },
  bodyClass: "login-page",
  data() {
    return {
      username: null,
      password: null,
      status: "",
      isLoading: false
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  mounted() {
    if (localStorage.token) {
      this.$router.push("/");
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    testLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 30000);
    },
    login() {
      this.isLoading = true;
      // header: {'Content-Type': 'application/x-www-form-urlencoded'}
      this.$http
        .post(this.baseApi + "api/token", {
          usr: this.username,
          pwd: this.password
        })
        .then(
          function(req) {
            if (req.body.error) {
              swal({
                title: req.body.error,
                type: "error",
                confirmButtonText: "Xác nhận"
              });
              this.isLoading = false;
            } else {
              localStorage.token = req.body.token;
              localStorage.user = JSON.stringify(req.body.user);
              setTimeout(() => {
                this.isLoading = false;
                swal({
                  title: "Đăng nhập thành công",
                  type: "success",
                  showConfirmButton: false,
                  timer: 1000
                }).then(() => {
                  this.$router.push("/");
                });
              }, 500);
            }
          },
          function(error) {
            console.log(error);
            this.isLoading = false;
          }
        );
    }
  }
};
</script>

<style lang="css">
</style>
