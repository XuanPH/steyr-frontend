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
                  <h3 class="title">QUẢN LÝ CODE REDEEM</h3>
                 </div>
              </div>
            </div>
          </div>
          <div class="profile-tabs"
          v-loading="loading"
                element-loading-text="Đang tải..."
                element-loading-spinner="el-icon-loading">
              <el-table
                :data="listRedeem"                
                style="width: 100%">
                <!-- <el-table-column
                  fixed
                  prop="id"
                  label="#"
                  width="150">
                </el-table-column> -->
                <el-table-column
                  fixed="left"
                  prop="id"
                  label="Mã nạp"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="isRedeem"
                  label="Trạng thái"
                  :filters="[{ text: 'Đã sử dụng', value: true }, { text: 'Chưa sử dụng', value: false }]"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
                  sortable
                  width="140">
                  <template slot-scope="scope">
                    <b :style="{ color : (scope.row.isRedeem ? '#F56C6C' : '#67C23A') }">{{scope.row.isRedeem ? "Đã sử dụng" : "Chưa sử dụng"}}</b>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="Điểm"
                  sortable
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="redeemBy"
                  label="Người nạp"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="created"
                  label="Người tạo"
                  width="200">
                </el-table-column>
              </el-table>
              <el-pagination
                style="width: 100%;text-align: center;"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"                
                :pager-count="11"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="totalItem">
              </el-pagination>
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
      currentPage: 1,
      pageSize: 10,
      totalItem: 10,
      show: true,
      listRedeem: [],
      userSelect: {
        id: "",
        isRedeem: "",
        value: 0,
        redeemBy: "",
        created: ""
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
    }
  },
  methods: {
    getPage() {
      this.loading = true;
      axios
        .post(
          this.baseApi + "api/redeemcode/getPage",
          { startAt: this.currentPage, pageLength: this.pageSize },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "brearer " + localStorage.token
            }
          }
        )
        .then(res => {
          this.listRedeem = res.data.data;
          this.totalItem = res.data.count;
          console.log("sucess", res.data);
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.loading = false;
        });
    },
    filterTag(value, row) {
      return row.isRedeem === value;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPage();
      console.log(`current page: ${val}`);
    }
  },
  mounted() {
    this.getPage();
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
