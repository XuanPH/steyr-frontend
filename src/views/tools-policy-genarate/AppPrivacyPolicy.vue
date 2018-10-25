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
                  <h3 class="title">TẠO PRIVACY POLICY VÀ TERMS & CONDITIONS TỰ ĐỘNG</h3>
                 </div>
              </div>
            </div>
          </div>
           <div id="nav-tabs">
            <div class="md-layout" v-loading="loadingEdit">
              <div class="md-layout-item md-size-100 md-small-size-100">
                <nav-tabs-card no-label>
                  <template slot="content">
                    <md-tabs md-sync-route class="md-primary" md-alignment="left">
                      <md-tab id="edit" md-label="Cấu hình thông số" md-icon="create">
                        <el-row>
                          <el-col :span="1">&nbsp;
                          </el-col>
                          <el-col :span="11">
                            <el-card class="box-card" style="height: 550px !important;">
                              <div slot="header" class="clearfix">
                                <span style="font-size: 20px;">Cấu hình ứng dụng</span>
                                <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
                              </div>
                              <div>
                                <el-row>
                                    <el-col :span="24" v-if="id!==''">
                                      <b>{{id}}</b>&nbsp;<a style="text-decoration:underline" href="javascript:void(0)" @click="onClear">Clear</a>
                                    <br>
                                    <br>  
                                    </el-col>
                                    <el-col :span="24">
                                      <el-input
                                        placeholder="App name"
                                        v-model="appName"
                                        clearable>
                                      </el-input>
                                    </el-col>
                                    <br/><br/>
                                    <el-col :span="24">
                                       <el-select style="width: 100%;" v-model="typeOfApp" placeholder="Select" clearable>
                                        <el-option :disabled="true" label="Chọn loại ứng dụng" value=""></el-option>
                                        <el-option label="Miễn phí" value="Free"></el-option>
                                        <el-option label="Mã nguồn mở" value="Open Source"></el-option>
                                        <el-option label="Miễn phí (Freemium)" value="Freemium"></el-option>
                                        <el-option label="Hỗ trợ quảng cáo" value="Ad Supported"></el-option>
                                        <el-option label="Thương mại" value="Commercial"></el-option>
                                      </el-select>
                                    </el-col><br/><br/>
                                    <el-col :span="24">
                                       <el-select style="width: 100%;" v-model="typeOfDev" placeholder="Select" clearable>
                                        <el-option :disabled="true" label="Chọn loại nhà phát triển" value=""></el-option>
                                        <el-option label="Cá nhân" value="Individual"></el-option>
                                        <el-option label="Công ty" value="Company"></el-option>
                                       </el-select>
                                    </el-col><br/><br/>
                                    <el-col :span="24">
                                      <el-input
                                        v-if="typeOfDev=='Company'"
                                        placeholder="Tên công ty"
                                        v-model="companyName"
                                        clearable>
                                      </el-input>
                                    </el-col>
                                    <el-col :span="24">
                                      <el-input
                                        v-if="typeOfDev=='Individual'"
                                        placeholder="Tên nhà phát triển"
                                        v-model="devName"
                                        clearable>
                                      </el-input>
                                    </el-col>
                                    <br v-if="typeOfDev!=''"/>
                                    <br v-if="typeOfDev!=''"/>
                                    <el-col :span="24">
                                      <el-input
                                        placeholder="Thông tin mà bạn thu thập trên ứng dụng (phân cách bằng dấu phẩu ',')"
                                        v-model="pidInfoIn"
                                        clearable>
                                      </el-input>
                                    </el-col>
                                    <br/><br/>
                                    <el-col :span="24">
                                       <el-select style="width: 100%;" v-model="osType" placeholder="Select" clearable>
                                        <el-option :disabled="true" label="Chọn loại ứng dụng" value=""></el-option>
                                        <el-option label="Android" value="Android"></el-option>
                                        <el-option label="iOS" value="iOS"></el-option>
                                        <el-option label="Android & iOS" value="Android & iOS"></el-option>
                                       </el-select>
                                    </el-col>
                                    <br/><br/>
                                    <el-button style="width: 100%;margin-bottom: 10px;" type="primary" @click="generate">Tiếp <i class="el-icon-d-arrow-right"></i></el-button>
                                    <!-- <el-button :disabled="!isLogined" style="width: 100%;margin-bottom: 10px;" type="primary" @click="onsave">Lưu cấu hình hiện tại</el-button> -->
                                    <br/>
                                    <el-row :gutter="20" style="margin-bottom: 10px;">  
                                      <el-col :span="6">
                                        <el-button :disabled="!isLogined"  style="width:100%;"
                                            v-loading="loading" type="primary" @click="onload">
                                          <i class="fas fa-sync-alt"></i>
                                        </el-button>
                                      </el-col>
                                      <el-col :span="6">
                                        <el-button :disabled="!isLogined"  style="width:100%;"
                                          v-loading="loading" type="primary" @click="onOpen">
                                          <i class="fas fa-folder-open"></i>
                                        </el-button>
                                      </el-col>
                                      <el-col :span="6">
                                       <el-button :disabled="!isLogined" style="width:100%;"
                                            v-loading="loading" type="primary" @click="onsave">
                                          <i class="fas fa-save"></i>
                                        </el-button>
                                      </el-col>
                                      <el-col :span="6">
                                       <el-button :disabled="!isLogined"  style="width:100%;"
                                            v-loading="loading" type="primary" @click="onDelete">
                                          <i class="fas fa-trash"></i>
                                        </el-button>
                                      </el-col>
                                    
                                    </el-row>       
                                    <el-select  v-loading="loading" v-model="savedModel" placeholder="Dữ liệu đã lưu" style="width: 100%;margin-bottom: 10px;">
                                          <el-option
                                            v-for="item in savedItem"
                                            :key="item.id"
                                            :label="item.appName"
                                            :value="item.id">
                                            <span style="float: left">{{ item.appName }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 9px">{{ item.createdMoment }}</span>
                                          </el-option>
                                        </el-select>                            
                                </el-row>
                              </div>
                            </el-card>
                          </el-col>
                          <el-col :span="1">&nbsp;
                          </el-col>
                          <el-col :span="9">
                            <el-card class="box-card">
                              <div slot="header" class="clearfix">
                                <span style="font-size: 20px;">Ứng dụng bên thứ 3</span>
                                <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
                              </div>
                              <div style="overflow: scroll;height: 450px;">
                                <div style="margin-bottom: 15px;" v-for="item in thirdPartyServices" :key="item.model" class="text item">
                                  <el-row>
                                    <el-col :span="6">
                                       <img style="width: 30px !important;" :src="item.logo" :alt="item.name" class="thirdparty-logo" />
                                    </el-col>
                                    <el-col :span="12" style="text-align: left;">
                                      {{ item.name }}
                                    </el-col>
                                    <el-col :span="6">
                                       <el-switch
                                        style="display: block"
                                        :id="'list-switch-' + item.model"
                                        v-model="item[item.model]"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                      </el-switch>
                                    </el-col>
                                  </el-row>
                                </div>
                              </div>
                            </el-card>
                          </el-col>
                        </el-row>
                      </md-tab>
                      <md-tab id="privacypolicy" md-label="Thông tin pháp lý" md-icon="text_format">
                        <el-button type="primary" plain @click="generateHTML('privacy_content', 'privacy_policy')">Tải HTML</el-button>
                        <el-button type="primary" plain @click="generateMD('privacy_content', 'privacy_policy')">Tải MARKDOWN</el-button>
                        <el-button type="primary" plain>Tạo link online</el-button>
                        
                        <div style="text-align: left;word-break: inherit;" id="privacy_content">
                          <h2>Privacy Policy</h2>
                            <p> {{devOrCompanyName}} built the {{appName}} app as {{typeOfAppTxt}} app. This SERVICE is provided by
                              {{devOrCompanyName }} {{atNoCost }} and is intended for use as is.
                            </p>
                            <p>This page is used to inform visitors regarding {{myOrOur}} policies with the collection, use, and disclosure
                              of Personal Information if anyone decided to use {{myOrOur}} Service.
                            </p>
                            <p>If you choose to use {{myOrOur }} Service, then you agree to the collection and use of information in
                              relation to this policy. The Personal Information that {{iOrWe}} collect is used for providing and improving
                              the Service. {{iOrWe | capitalize }} will not use or share your information with anyone except as described
                              in this Privacy Policy.
                            </p>
                            <p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is
                              accessible at {{appName }} unless otherwise defined in this Privacy Policy.
                            </p>
                            <p><strong>Information Collection and Use</strong></p>
                            <p>For a better experience, while using our Service, {{iOrWe }} may require you to provide us with certain
                              personally identifiable information{{pidInfo}} The information that {{iOrWe}} request will be {{retainedInfo}}.
                            </p>
                            <p>The app does use third party services that may collect information used to identify you.</p>

                            <div v-if="gps || admob || firebase_analytics || facebook || piwik || fabric || crashlytics">
                              <p>Link to privacy policy of third party service providers used by the app</p>
                              <ul>
                                <li v-if="item[item.model]" v-for="item in thirdPartyServices" :key="item.model">
                                  <a :href="item.link.privacy" target="_blank">{{item.name}}</a>
                                </li>
                              </ul>
                            </div>
                            <p><strong>Log Data</strong></p>
                            <p> {{iOrWe | capitalize }} want to inform you that whenever you use {{myOrOur}} Service, in a case of
                              an error in the app {{iOrWe}} collect data and information (through third party products) on your phone
                              called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address,
                              device name, operating system version, the configuration of the app when utilizing {{myOrOur }} Service,
                              the time and date of your use of the Service, and other statistics.
                            </p>
                            <p><strong>Cookies</strong></p>
                            <p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.
                              These are sent to your browser from the websites that you visit and are stored on your device's internal
                              memory.
                            </p>
                            <p>This Service does not use these “cookies” explicitly. However, the app may use third party code and
                              libraries that use “cookies” to collect information and improve their services. You have the option to
                              either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose
                              to refuse our cookies, you may not be able to use some portions of this Service.
                            </p>
                            <p><strong>Service Providers</strong></p>
                            <p> {{iOrWe | capitalize }} may employ third-party companies and individuals due to the following reasons:</p>
                            <ul>
                              <li>To facilitate our Service;</li>
                              <li>To provide the Service on our behalf;</li>
                              <li>To perform Service-related services; or</li>
                              <li>To assist us in analyzing how our Service is used.</li>
                            </ul>
                            <p> {{iOrWe | capitalize }} want to inform users of this Service that these third parties have access to
                              your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However,
                              they are obligated not to disclose or use the information for any other purpose.
                            </p>
                            <p><strong>Security</strong></p>
                            <p> {{iOrWe | capitalize }} value your trust in providing us your Personal Information, thus we are striving
                              to use commercially acceptable means of protecting it. But remember that no method of transmission over
                              the internet, or method of electronic storage is 100% secure and reliable, and {{iOrWe }} cannot guarantee
                              its absolute security.
                            </p>
                            <p><strong>Links to Other Sites</strong></p>
                            <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed
                              to that site. Note that these external sites are not operated by {{meOrUs }}. Therefore, {{iOrWe }} strongly
                              advise you to review the Privacy Policy of these websites. {{iOrWe | capitalize }} have no control over
                              and assume no responsibility for the content, privacy policies, or practices of any third-party sites
                              or services.
                            </p>
                            <p><strong>Children’s Privacy</strong></p>
                            <p>These Services do not address anyone under the age of 13. {{iOrWe | capitalize }} do not knowingly collect
                              personally identifiable information from children under 13. In the case {{iOrWe }} discover that a child
                              under 13 has provided {{meOrUs }} with personal information, {{iOrWe }} immediately delete this from
                              our servers. If you are a parent or guardian and you are aware that your child has provided us with personal
                              information, please contact {{meOrUs }} so that {{iOrWe }} will be able to do necessary actions.
                            </p>
                            <p><strong>Changes to This Privacy Policy</strong></p>
                            <p> {{iOrWe | capitalize }} may update our Privacy Policy from time to time. Thus, you are advised to review
                              this page periodically for any changes. {{iOrWe | capitalize }} will notify you of any changes by posting
                              the new Privacy Policy on this page. These changes are effective immediately after they are posted on
                              this page.
                            </p>
                            <p><strong>Contact Us</strong></p>
                            <p>If you have any questions or suggestions about {{myOrOur }} Privacy Policy, do not hesitate to contact
                              {{meOrUs }}.
                            </p>
                        </div>
                      </md-tab>

                      <md-tab id="tandc" md-label="Điều khoản điều kiện" md-icon="text_format">
                        <el-button type="primary" plain @click="generateHTML('tandc_content', 'terms_and_conditions')">Tải HTML</el-button>
                        <el-button type="primary" plain @click="generateMD('tandc_content', 'terms_and_conditions')">Tải MARKDOWN</el-button>
                        <div style="text-align: left;word-break: inherit;" id="tandc_content">
                          <h2>Terms &amp; Conditions</h2>
                          <p>By downloading or using the app, these terms will automatically apply to you – you should make sure
                            therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the
                            app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the
                            source code of the app, and you also shouldn’t try to translate the app into other languages, or make
                            derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual
                            property rights related to it, still belong to {{devOrCompanyName}}.</p>

                          <p>{{devOrCompanyName}} is committed to ensuring that the app is as useful and efficient as possible. For
                            that reason, we reserve the right to make changes to the app or to charge for its services, at any time
                            and for any reason. We will never charge you for the app or its services without making it very clear
                            to you exactly what you’re paying for.</p>

                          <p>The {{appName}} app stores and processes personal data that you have provided to us, in order to provide
                            {{myOrOur}} Service. It’s your responsibility to keep your phone and access to the app secure. We therefore
                            recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions
                            and limitations imposed by the official operating system of your device. It could make your phone vulnerable
                            to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that
                            the {{appName}} app won’t work properly or at all. </p>

                          <p>You should be aware that there are certain things that {{devOrCompanyName}} will not take responsibility
                            for. Certain functions of the app will require the app to have an active internet connection. The connection
                            can be Wi-Fi, or provided by your mobile network provider, but {{devOrCompanyName}} cannot take responsibility
                            for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any
                            of your data allowance left.
                            <p>

                              <p>If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the
                                agreement with your mobile network provider will still apply. As a result, you may be charged by
                                your mobile provider for the cost of data for the duration of the connection while accessing the
                                app, or other third party charges. In using the app, you’re accepting responsibility for any such
                                charges, including roaming data charges if you use the app outside of your home territory (i.e. region
                                or country) without turning off data roaming. If you are not the bill payer for the device on which
                                you’re using the app, please be aware that we assume that you have received permission from the bill
                                payer for using the app.</p>

                              <p>Along the same lines, {{devOrCompanyName}} cannot always take responsibility for the way you use
                                the app i.e. You need to make sure that your device stays charged – if it runs out of battery and
                                you can’t turn it on to avail the Service, {{devOrCompanyName}} cannot accept responsibility.</p>

                              <p>With respect to {{devOrCompanyName}}’s responsibility for your use of the app, when you’re using
                                the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and
                                correct at all times, we do rely on third parties to provide information to us so that we can make
                                it available to you. {{devOrCompanyName}} accepts no liability for any loss, direct or indirect,
                                you experience as a result of relying wholly on this functionality of the app.</p>

                              <p>At some point, we may wish to update the app. The app is currently available on {{osType}} – the
                                requirements for {{requirementOfSystem}}(and for any additional systems we decide to extend the availability
                                of the app to) may change, and you’ll need to download the updates if you want to keep using the
                                app. {{devOrCompanyName}} does not promise that it will always update the app so that it is relevant
                                to you and/or works with the {{osType}} version that you have installed on your device. However,
                                you promise to always accept updates to the application when offered to you, We may also wish to
                                stop providing the app, and may terminate use of it at any time without giving notice of termination
                                to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to
                                you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your
                                device.
                              </p>

                              <p><strong>Changes to This Terms and Conditions</strong></p>
                              <p> {{iOrWe | capitalize }} may update our Terms and Conditions from time to time. Thus, you are advised
                                to review this page periodically for any changes. {{iOrWe | capitalize }} will notify you of any
                                changes by posting the new Terms and Conditions on this page. These changes are effective immediately
                                after they are posted on this page.
                              </p>
                              <p><strong>Contact Us</strong></p>
                              <p>If you have any questions or suggestions about {{myOrOur }} Terms and Conditions, do not hesitate
                                to contact {{meOrUs }}.
                              </p>
                        </div>
                      </md-tab>
                    </md-tabs>
                  </template>
                </nav-tabs-card>
              </div>
            </div>
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
import { thirdPartyServicesJsonArray, untilFn } from "../../config.js";
import { NavTabsCard } from "@/components";
import axios from "axios";
import swal from "sweetalert2";
import _ from "lodash";

export default {
  components: {
    NavTabsCard
  },
  bodyClass: "profile-page",
  data() {
    return {
      id: "",
      loading: false,
      iOrWe: "[I/We]",
      typeOfApp: "",
      typeOfAppTxt: "[open source/free/freemium/ad-supported/commercial]",
      typeOfDev: "",
      appName: "[App Name]",
      myOrOur: "[my/our]",
      meOrUs: "[me/us]",
      atNoCost: "[at no cost]",
      retainedInfo:
        "[retained on your device and is not collected by [me/us] in any way]/[retained by us and used as described in this privacy policy]",
      devName: "",
      companyName: "",
      devOrCompanyName: "[Developer/Company name]",
      pidInfoIn: "",
      pidInfo:
        "[add whatever else you collect here, e.g. users name, address, location, pictures]",
      gps: true,
      admob: false,
      firebase_analytics: false,
      piwik: false,
      fabric: false,
      clicky: false,
      crashlytics: false,
      facebook: false,
      osType: "",
      requirementOfSystem: "system",
      thirdPartyServices: thirdPartyServicesJsonArray,
      loadingEdit: false,
      savedItem: [],
      savedModel: ""
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
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    isLogined() {
      return localStorage.token ? true : false;
    },
    isAdmin() {
      if (this.localUser) {
        return this.localUser.id != this.adminId ? false : true;
      }
      return false;
    },
    modelSelect() {
      return _.filter(this.savedItem, o => {
        return o.id === this.savedModel;
      })[0];
    }
  },
  methods: {
    selectAllText: function(id) {
      untilFn.selectText(id);
    },
    toggleState: function(item) {
      let state = item.model;
      console.log("Item:", item.name, item.model, item[state]);
      // For reactive update of the json
      // Toggle the state
      this.set(thirdPartyServicesJsonArray, item.model, !item[state]);
    },
    generateHTML: function(id, filename) {
      let content = untilFn.getContent(id);
      let title = untilFn.getTitle(id);
      let rawHTML = untilFn.getRawHTML(content, title);
      untilFn.downloadHTML(filename, rawHTML);
    },
    generateMD: function(id, filename) {
      let content = untilFn.getContent(id);
      let title = untilFn.getTitle(id);
      let rawHTML = untilFn.getRawHTML(content, title);
      let markdown = untilFn.convertHtmlToMd(rawHTML);
      untilFn.downloadMD(filename, markdown);
    },
    generate: function() {
      if (this.typeOfDev === "Individual") {
        this.devOrCompanyName = this.devName;
        this.iOrWe = "I";
        this.myOrOur = "my";
        this.meOrUs = "me";
        this.retainedInfo =
          "retained on your device and is not collected by " +
          this.meOrUs +
          " in any way";
      } else if (this.typeOfDev === "Company") {
        this.devOrCompanyName = this.companyName;
        this.iOrWe = "we";
        this.myOrOur = "our";
        this.meOrUs = "us";
        this.retainedInfo =
          "retained by us and used as described in this privacy policy";
      }

      if (this.typeOfApp === "Commercial") {
        this.atNoCost = "";
      } else {
        this.atNoCost = "at no cost";
      }

      if (this.pidInfoIn === "") {
        this.pidInfo = ".";
      } else {
        this.pidInfo = ", including but not limited to " + this.pidInfoIn + ".";
      }

      switch (this.typeOfApp) {
        case "Free":
        case "Freemium":
        case "Commercial":
          this.typeOfAppTxt = "a " + this.typeOfApp;
          break;
        case "Open Source":
        case "Ad Supported":
          this.typeOfAppTxt = "an " + this.typeOfApp;
          break;
      }

      switch (this.osType) {
        case "Android": {
          this.osType = "Android";
          this.requirementOfSystem = "system";
          break;
        }
        case "iOS": {
          this.osType = "iOS";
          this.requirementOfSystem = "system";
          break;
        }
        case "Android & iOS": {
          this.osType = "Android & iOS";
          this.requirementOfSystem = "both systems";
          break;
        }
      }
      document.querySelectorAll(".md-tabs-navigation > button")[1].click();
    },
    onsave: function() {
      this.loadingEdit = true;
      var listThirty = [];
      this.thirdPartyServices.forEach(element => {
        if (element[element.model]) {
          listThirty.push(element.model);
        }
      });
      let Modelpush = {
        id: this.id,
        appName: this.appName,
        typeOfApp: this.typeOfApp,
        typeOfDev: this.typeOfDev,
        companyName: this.companyName,
        devName: this.devName,
        pidInfoIn: this.pidInfoIn,
        osType: this.osType,
        listThirty: listThirty,
        type : (this.id.trim() !== '' && this.id !== null && this.id !== undefined) ? "update" : "insert"
      };
      axios
        .post(this.baseApi + "api/ppgenerator", Modelpush, {
          headers: {
            "content-type": "application/json",
            Authorization: "brearer " + localStorage.token
          }
        })
        .then(res => {
          if (res.data.result) {
            swal({
              title: "Lưu thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingEdit = false;
            });
          } else {
            swal({
              title: "Lỗi ",
              text: res.data.msg,
              type: "error",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingEdit = false;
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          this.loadingEdit = false;
        });
    },
    onload: function() {
      this.loading = true;
      axios
        .get(this.baseApi + "api/getppg", {
          headers: {
            "content-type": "application/json",
            Authorization: "brearer " + localStorage.token
          }
        })
        .then(res => {
          this.loading = false;
          this.savedItem = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    onOpen: function() {
      this.onSet(this.modelSelect);
    },
    onSet: function(obj) {
      this.id = obj.id;
      this.appName = obj.appName;
      this.companyName = obj.companyName;
      this.devName = obj.devName;
      this.listThirty = obj.listThirty;
      this.osType = obj.osType;
      this.thirdPartyServices = this.generateThird(
        thirdPartyServicesJsonArray,
        obj.listThirty
      );
      this.pidInfoIn = obj.pidInfoIn;
      this.typeOfApp = obj.typeOfApp;
      this.typeOfDev = obj.typeOfDev;
    },
    generateThird: function(baseArray, setArray) {
      // let list = [];
      debugger;
      var i = 0;
      baseArray.forEach(el => {
        let item = _.filter(setArray, o => {
          return o === el.model;
        })[0];
        console.log(item);
        if (item !== null && item !== undefined) {
          baseArray[i][el.model] = true;
        } else {
          baseArray[i][el.model] = false;
        }
        i++;
      });
      // setArray.forEach(el => {
      //   let item = _.filter(baseArray, o => {
      //     return o.model === el;
      //   })[0];
      // });
      // console.log("baseArray", baseArray);
      return baseArray;
    },
    onDelete: function() {
      this.loadingEdit = true;
      axios
        .post(this.baseApi + "api/deleteppg", this.savedItem, {
          headers: {
            "content-type": "application/json",
            Authorization: "brearer " + localStorage.token
          }
        })
        .then(res => {
          if (res.data.result) {
            swal({
              title: "Xoá thành công",
              type: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingEdit = false;
            });
          } else {
            swal({
              title: "Lỗi ",
              text: res.data.msg,
              type: "error",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.loadingEdit = false;
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          this.loadingEdit = false;
        });
    },
    onClear: function() {
      this.onSet({
        id: "",
        appName: "",
        companyName: "",
        devName: "",
        listThirty: [],
        osType: "",
        pidInfoIn: "",
        typeOfApp: "",
        typeOfDev: ""
      });
    }
  },
  mounted() {
    console.log(this.thirdPartyServicesJsonArray);
  },
  watch: {
    modelSelect(newv, oldv) {
      console.log(newv);
      this.onSet(newv);
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
