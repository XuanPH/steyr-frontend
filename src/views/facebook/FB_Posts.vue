<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="name">
                  <h3 class="title">Quản lý bài viết</h3>
                 </div>
              </div>
            </div>
          </div>
          <div class="profile-tabs">
            <el-row>
              <el-col span="18">
                <md-field class="md-form-group"><i class="fas fa-code"></i>
                  <md-input v-model="fbToken" placeholder="Link bài viết" v-bind:disabled="loading"></md-input>
                </md-field>
              </el-col>
              
              <el-col span="2">
                <md-button v-loading="loading" class="md-primary" @click="getUIDfromUsername"> <i class="fas fa-check"></i></md-button>
              </el-col>
              <el-col span="2">
                <md-button v-loading="loading" class="md-info" @click="onSave"> <i class="fas fa-save"></i></md-button>
              </el-col>
               <el-col span="2">
                <md-button v-loading="loading" class="md-info" @click="onRemove">
                  <i class="fas fa-trash-alt"></i>
                </md-button>
              </el-col>
            </el-row>

               <el-alert
                :title="getName"
                type="success"
                show-icon>
              </el-alert>
              <br>
              <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.title {
  color: white;
  text-decoration: underline;
}
.v-model {
  z-index: 0 !important;
}
.el-alert__title {
  font-size: 20px !important;
}
</style>

<script>
import { Modal } from "@/components";
// import Loading from "../layout/Loading.vue";
import axios from "axios";
import swal from "sweetalert2";
export default {
  components: {
    Modal
  },
  bodyClass: "profile-page",
  data() {
    return {
      loading: false,
      fbToken: this.accessToken,
      fbUser : {
        uid: "",
        username: "",
        name: ""
      }
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    getName(){
      return this.fbUser.name + "(" + (this.fbUser.uid) + ")";
    },
    getDes(){
      return this.fbUser.uid;
    }
  },
  methods: {
    onGet() {
      this.loading = true;
      this.fbId(() => {
        this.loading = false;
      });
    },
    onChangeData: function(data) {
      console.log(JSON.stringify(data));
    },
    getUIDfromUsername() {
      var url =
        `https://graph.facebook.com/fql?q=SELECT+uid,name,username,pic+FROM+user+WHERE+uid+=+me()+&access_token=` +
        this.fbToken;
      axios
        .get(url)
        .then(ok => {
          if (ok.data.data.length != 0) {
            this.fbUser = ok.data.data[0];
            localStorage.tokenFb = this.fbToken;
          } else {
            var m = {
              uid: "",
              name: "",
              username: ""
            };
            this.fbUser = m;
          }
        })
        .catch(e => {
          console.log(e);
          var m = {
            uid: "",
            name: "",
            username: ""
          };
          this.fbUser = m;
        });
    },
    onSave(){
      localStorage.tokenFb = this.fbToken;
       swal({
              title: "Lưu thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            })
    },
    onRemove(){
      localStorage.removeItem('tokenFb');
      swal({
              title: "Xoá thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            })
    }
    //facebook regular expression
  },
  mounted() {
    this.loading = false;
    if (localStorage.tokenFb){
      this.fbToken = localStorage.tokenFb;
      this.getUIDfromUsername();
    }
  },
  watch: {
  }
};
</script>

<style lang="scss">
.section {
  padding: 0;
}
.circular {
  width: 30px !important;
}
.el-alert__title {
  width: 30px !important;
  font-weight: bold !important;
}
.profile-tabs /deep/ {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
