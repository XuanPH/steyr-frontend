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
                  <h3 class="title">LEECH BÀI VIẾT CỦA FACEBOOK</h3>
                 </div>
              </div>
            </div>
          </div>
          <div class="profile-tabs">
              <md-field class="md-form-group">
                <i class="fas fa-credit-card"></i>
                <md-input :disable="loading" v-model="code" placeholder="Link bài viết" v-bind:disabled="loading"></md-input>
              </md-field>
              <md-button v-loading="loading" 
                class="md-info" @click="getPostFromID" style="width: 100%;"> <i class="material-icons">thumb_up_alt</i> Lấy
                </md-button>
                <el-alert
                  :title="postId"
                  type="success"
                  show-icon>
                </el-alert>
              <br>
              <br>
              <tree-view :data="jsonData" :options="{maxDepth: 4}" @change-data="onChangeData"></tree-view>
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
      code: "",
      postId: "",
      fbUser: {
        uid: "",
        username: "",
        name: "",
        postId: "",
        type: ""
      },
      jsonData: {}
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
    async getUIDfromUsername(username) {
      var url =
        `https://graph.facebook.com/fql?q=SELECT+uid,name,username+FROM+user+WHERE+username+=+'${username}'+&access_token=` +
        this.accessToken;

      await axios
        .get(url)
        .then(ok => {
          // console.log(ok.data.data[0]);
          if (ok.data.data.length != 0) {
            this.fbUser = ok.data.data[0];
          } else {
            axios
              .get(
                `https://graph.facebook.com/v2.7/${name}?fields=id,name%20&access_token=` +
                  this.accessToken
              )
              .then(ok => {
                (this.fbUser.username = name),
                  (this.fbUser.uid = ok.data.data.id);
                this.fbUser.name = ok.data.data.name;
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
    async fbId(callback) {
      var s = this.code.split("fbid=");
      if (s && s.length > 1) {
        this.fbUser.type = "nousername";
        var uId = s[1].split("&")[0].toString();
        var pId = "";
        var d = s[1].split("&set=a.");
        var d2 = s[1].split("&id=")[1];
        if (d && d.length > 1) {
          pId = d[1].split("&")[0];
        } else {
          pId = d2;
        }
        console.log(`https://fb.com/${uId}`);
      } else {
        this.code[this.code.length - 1] == "/" &&
          (this.code = this.code.substr(0, this.code.length - 2));
        var uId = this.code.split("https://")[1].split("/")[1];
        var pId = this.code.split("/")[this.code.split("/").length - 1];
        var url = `https://graph.facebook.com/fql?q=SELECT+uid,name,username+FROM+user+WHERE+username+=+'${uId}'+&access_token=${
          this.accessToken
        }`;
        await this.getUIDfromUsername(uId);
        this.fbUser.postId = pId;
        this.fbUser.type = "username";
        console.log(`https://fb.com/${this.fbUser.uid}_${pId}`);
      }
      callback && callback();
    },
    getPostID() {
      var postid = "";
      var link = this.code;
      if (link.split("fbid=").length > 1 && link.split("&id=").length > 1) {
        postid = link.split("fbid=")[1] + "_" + link.split("&id")[1];
      }
      else {
        var kiemtra = link.match(/[^](fbid=[0-9]{9})\d+/);
        if (kiemtra !== null) {
          var a = kiemtra[0].replace("?fbid=", "");
          var postid = a.replace("_fbid=", "");
        } else {
          var n = link.match(/[^\/|\.!=][0-9]{7,}(?!.*[0-9]{7,})\d+/);
          console.log(n);
          if (n !== null) postid = n[0];
        }
      }
      this.postId = postid;
    },
    getPostFromID() {
      var url = `https://graph.facebook.com/v3.1/${
        this.postId
      }?fields=message%2Ccreated_time%2Cstory%2Cid%2Cicon%2Cpicture%2Callowed_advertising_objectives%2Cadmin_creator%2Cattachments%7Burl%2Ctype%7D&access_token=${
        this.accessToken
      }`;
      axios
        .get(url)
        .then(ok => {
          this.jsonData = ok.data;
        })
        .catch(e => {
          this.jsonData = {};
        });
    }
  },
  mounted() {
    this.loading = false;
    this.getPostID();
    this.code = "";
  },
  watch: {
    code: function(newv, oldv) {
      var postid = "";
      var link = newv;
      var kiemtra = link.match(/[^](fbid=[0-9]{9})\d+/);
      if (kiemtra !== null) {
        var a = kiemtra[0].replace("?fbid=", "");
        var postid = a.replace("_fbid=", "");
      } else {
        var n = link.match(/[^\/|\.!=][0-9]{7,}(?!.*[0-9]{7,})\d+/);
        if (n !== null) postid = n[0];
      }
      console.log(newv);
      if (!newv || newv.trim() == "") {
        this.postId = "";
      } else {
        this.postId = postid == "" ? "Không tìm thấy" : postid;
      }
    }
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
