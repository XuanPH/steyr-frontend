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
                  <h3 class="title">NẠP THẺ</h3>
                 </div>
              </div>
            </div>
          </div>
          <div class="profile-tabs"
          v-loading="loading"
                element-loading-text="Đang tải..."
                element-loading-spinner="el-icon-loading">
              <md-field class="md-form-group">
                <i class="fas fa-credit-card"></i>
                <md-input v-model="code" placeholder="Nhập mã thẻ"></md-input>
              </md-field>
              
              <md-button class="md-info" @click="onPay"> <i class="material-icons">thumb_up_alt</i> Nạp</md-button>
              <br>
              <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  color: white;
  text-decoration: underline;
}
.v-model {
  z-index: 0 !important;
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
      code: ""
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
    onPay() {
      this.loading = true;
      axios
        .post(
          this.baseApi + "api/redeemcode/redeem",
          {
            redeem: this.code
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "brearer " + localStorage.token
            }
          }
        )
        .then(ok => {
          if (ok.data.Result === true) {
            swal({
              title: "Nạp thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loading = false;
            });
          }else {
             swal({
              title: ok.data.Msg,
              type: "error",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loading = false;
            });
          }
        }).catch(e => {
          swal({
              title: "Có lỗi từ server vui lòng thử lại sau",
              type: "error",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loading = false;
              console.log(e);
            });
        });
    }
  },
  mounted() {
    this.loading = false;
    console.log(this.localUser);
    
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
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
