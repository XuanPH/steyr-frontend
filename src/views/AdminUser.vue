<template>
  <div class="wrapper">
    <!-- cập nhật thông tin -->
    <el-dialog style="z-index: 100000;" title="Thay đổi thông tin tài khoản" :visible.sync="dialogEdit">
      <el-form :model="userSelect" v-loading="loadingEdit">
        <el-row>
            <el-col :span="6">
              &nbsp;
            </el-col>
             <el-col :span="12" style="text-align:center;">
               <img v-if="userSelect.urlImg" :src="userSelect.urlImg" style="width: 200px;height: 200px;" alt="Thumbnail Image" class="img-raised rounded-circle">
               <br><br>
               <input style="display:none" id="pic" name="pic" type="file" class="form-control" v-on:change="upload($event.target.files)" accept="image/*" />
               <el-button type="primary" @click="getFile">Chọn</el-button>
            </el-col>
             <el-col :span="6">
              &nbsp;
            </el-col>
        </el-row>
        <el-form-item label="Tên" :label-width="formLabelWidth">
          <el-input v-model="userSelect.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tag" :label-width="formLabelWidth">
          <el-input v-model="userSelect.role" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loadingEdit" @click="dialogEdit = false">Huỷ</el-button>
        <el-button :loading="loadingEdit" type="primary" @click="onSavedItem">Lưu</el-button>
      </span>
    </el-dialog>
    <!-- reset mật khẩu -->
    <el-dialog style="z-index: 100000;" title="Cập nhật mật khẩu" :visible.sync="dialogReset">
      <el-form :model="pwdUpdate" v-loading="loadingReset">
        <el-input type="hidden" v-model="pwdUpdate.uid" autocomplete="off"></el-input>
        <el-form-item label="Pass mới" :label-width="formLabelWidth">
          <el-input v-model="pwdUpdate.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nhập lại" :label-width="formLabelWidth">
          <el-input v-model="pwdUpdate.repwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loadingReset" @click="dialogReset = false">Huỷ</el-button>
        <el-button :loading="loadingReset" type="primary" @click="onReset">Lưu</el-button>
      </span>
    </el-dialog>
    <!-- phân quyền  -->
    <el-dialog style="z-index: 100000;" title="Phân quyền" :visible.sync="dialogPermisson">
      <el-form :model="permissonUpdate" v-loading="loadingPermisson">
        <el-input type="hidden" v-model="permissonUpdate.uid" autocomplete="off"></el-input>
        <el-checkbox-group v-model="permissonUpdate.listPage">
          <el-row>
            <el-col :span="12" v-for="item in listPage" :key="item.screen">
                <el-checkbox :label="item.screen" name="type">{{item.name}}</el-checkbox>
            </el-col>
           
          </el-row>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loadingPermisson" @click="dialogPermisson = false">Huỷ</el-button>
        <el-button :loading="loadingPermisson" type="primary" @click="onSetPermisson">Lưu</el-button>
      </span>
    </el-dialog>
    <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="name">
                  <h3 class="title">QUẢN LÝ USER</h3>
                 </div>
              </div>
            </div>
          </div>
          <div class="profile-tabs">
              <el-table
                :data="listUser"
                v-loading="loading"
                element-loading-text="Đang tải..."
                element-loading-spinner="el-icon-loading"
                style="width: 100%">
                <!-- <el-table-column
                  fixed
                  prop="id"
                  label="#"
                  width="150">
                </el-table-column> -->
                <el-table-column
                  prop="name"
                  label="Tên"
                  width="300">
                    <template slot-scope="scope">
                        <img :src="scope.row.urlImg" style="width: 35px;height: 35px;" alt="Thumbnail Image" class="img-raised rounded-circle">
                        <span style="margin-left: 10px;">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="point"
                  label="Điểm"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="role"
                  label="Quyền"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="usr"
                  label="Tên đăng nhập"
                  width="140">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="Operations"
                  width="190">
                  <template slot-scope="scope">                        
                        <el-button 
                        size="mini" 
                        type="primary" 
                        icon="el-icon-edit" 
                        @click="handleEdit(scope.$index, scope.row)" circle></el-button>
                        <el-button 
                        size="mini" 
                        type="primary" 
                        icon="el-icon-refresh" 
                        @click="handleReset(scope.$index, scope.row)" circle></el-button>
                        <el-button 
                        size="mini" 
                        type="primary" 
                        icon="el-icon-more"
                        @click="handlePermisson(scope.$index, scope.row)" circle></el-button> 
                    </template>
                </el-table-column>
              </el-table>
              <br>
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
      loadingEdit: false,
      loadingReset: false,
      loadingPermisson: false,
      show: true,
      listUser: [],
      userSelect: {
        id: "",
        name: "",
        point: 0,
        role: "",
        urlImg: "",
        usr: ""
      },
      pwdUpdate: {
        uid: "",
        pwd: "",
        repwd: ""
      },
      permissonUpdate: {
        uid: "",
        listPage: []
      },
      cloudinary: {
        uploadPreset: "f4w6spcm",
        apiKey: "551749158563396",
        cloudName: "dqibysfxu",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "brearer " + localStorage.token
        }
      },
      imageUrl: "",
      listPage: [],
      dialogEdit: false,
      dialogReset: false,
      dialogPermisson: false,
      formLabelWidth: "120px;"
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
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    },
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    getUser() {
      this.loading = true;
      var http = axios.create({
        baseURL: this.baseApi + "api/adminuser",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "brearer " + localStorage.token
        }
      });
      http
        .post()
        .then(res => {
          this.listUser = res.data.data;
          console.log("sucess", res.data);
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.loading = false;
        });
    },
    getFile() {
      document.getElementById("pic").click();
    },
    handleEdit(index, row) {
      this.userSelect = row;
      this.dialogEdit = true;
      // console.log(index,'=>',row);
    },
    handleReset(index, row) {
      this.pwdUpdate = {
        uid: row.id,
        pwd: "",
        repwd: ""
      };
      this.dialogReset = true;
    },
    handlePermisson(index, row) {
      this.dialogPermisson = true;
      this.listPage = [];
      this.permissonUpdate.listPage = [];
      this.getPermissons(row.id);
    },
    onSavedItem() {
      this.loadingEdit = true;
      axios
        .post(this.baseApi + "api/adminuser/edit", this.userSelect, {
          headers: {
            "content-type": "application/json",
            Authorization: "brearer " + localStorage.token
          }
        })
        .then(res => {
          this.dialogEdit = false;
          if (res.data.Result) {
            swal({
              title: "Lưu thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingEdit = false;
              this.getUser();
            });
          } else {
            swal({
              title: "Lỗi " + res.data.Code,
              text: res.data.Msg,
              type: "error",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingEdit = false;
              this.getUser();
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          this.loadingEdit = false;
        });
    },
    onReset() {
      this.loadingReset = true;
      axios
        .post(this.baseApi + "api/adminuser/resetPassword", this.pwdUpdate, {
          headers: {
            "content-type": "application/json",
            Authorization: "brearer " + localStorage.token
          }
        })
        .then(res => {
          this.dialogReset = false;
          if (res.data.Result) {
            swal({
              title: "Đổi thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingReset = false;
            });
          } else {
            swal({
              title: "Lỗi " + res.data.Code,
              text: res.data.Msg,
              type: "error",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingReset = false;
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          this.loadingReset = false;
        });
    },
    onSetPermisson() {
      this.loadingPermisson = true;
      var listPage = [];
      this.permissonUpdate.listPage.forEach(el => {
        var d = this.listPage.filter(v => v.screen == el)[0];
        listPage.push(d);
      });
      var submitModel = {
        userid: this.permissonUpdate.uid,
        listPage: listPage
      };
      axios
        .post(this.baseApi + "api/adminuser/setPermisson", submitModel, {
          headers: {
            "content-type": "application/json",
            Authorization: "brearer " + localStorage.token
          }
        })
        .then(res => {
          this.dialogPermisson = false;
          if (res.data.Result) {
            swal({
              title: "Lưu thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            });
          } else {
            swal({
              title: "Lỗi " + res.data.Code,
              text: res.data.Msg,
              type: "error",
              showConfirmButton: false,
              timer: 1000
            });
          }
          this.loadingPermisson = false;
        })
        .catch(err => {
          this.loadingPermisson = false;
        });
    },
    getPermissons(uid) {
      this.loadingPermisson = true;
      // var http = axios.create({
      //   baseURL: this.baseApi + "api/adminuser/getPage",
      //   headers: {
      //     "content-type": "application/x-www-form-urlencoded",
      //     Authorization: "brearer " + localStorage.token
      //   }
      // });
      axios
        .post(
          this.baseApi + "api/adminuser/getPage",
          { id: uid },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "brearer " + localStorage.token
            }
          }
        )
        .then(res => {
          this.listPage = res.data.data;
          this.permissonUpdate.uid = uid;
          this.permissonUpdate.listPage = [];
          res.data.data_user.forEach(el => {
            this.permissonUpdate.listPage.push(el.screen);
          });
          this.loadingPermisson = false;
        })
        .catch(err => {
          console.log("err", err);
          this.loadingPermisson = false;
        });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
    upload(file) {
      this.loadingEdit = true;
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", this.cloudinary.uploadPreset);
      formData.append("tags", "gs-vue,gs-vue-uploaded");
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios.post(this.clUrl, formData).then(res => {
        this.userSelect.urlImg = res.data.secure_url;
        this.loadingEdit = false;
      });
    }
  },
  mounted() {
    this.getUser();
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
