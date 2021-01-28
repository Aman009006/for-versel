<template>
  <div class="dashboard-container">
    <div class="description">
      <el-row>
        <el-col :span="24" :sm="2" :lg="1">
          <img :src="avatar_link" />
        </el-col>
        <el-col :span="24" :sm="20">
          <h1>Willkommen zurück auf Ihrer Admin UI!</h1>
          Es handelt sich hierbei eine <strong>Beta-Version</strong> unserer
          Admin UI. Die wesentlichen Funktionen sind bereits implementiert, die
          vollumfängliche Entwicklung der einzelnen Funktionen ist jedoch noch
          nicht abgeschlossen. Daher ist uns für die Weiterentwicklung und
          Optimierung unserer Admin UI Ihr Feedback besonders wichtig!
          <p>Ihr Chatbot Team :)</p>
        </el-col>
      </el-row>
    </div>
    <div class="linkbox-container">
      <el-row :gutter="20">
        <el-col :span="12" :lg="6" :xs="24">
          <image-text-link-box
            link="https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/57803205/Bedienungsanleitung+Admin+UI"
            text="Bedienungs&shy;anleitung lesen"
            :image="pics.manualPic"
          />
        </el-col>
        <el-col :span="12" :lg="6" :xs="24">
          <image-text-link-box
            text="Antworttexte und Buttons bearbeiten"
            :image="pics.editAnswersPic"
          />
        </el-col>
        <el-col :span="12" :lg="6" :xs="24">
          <image-text-link-box
            text="Chatbot ansehen und überprüfen"
            :image="pics.chatbotTestPic"
            :link="chatbotLink"
          />
        </el-col>
        <el-col :span="12" :lg="6" :xs="24">
          <image-text-link-box
            text="Kontakt aufnehmen / Feedback geben"
            :image="pics.feedbackPic"
            link="https://hsagbpo.atlassian.net/servicedesk/customer/portal/8/user/login?destination=portal%2F8"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCustomerMetaData } from "@/api/customer";
import ImageTextLinkBox from "@/components/ImageTextLinkBox";
import manualPic from "@/assets/images/Bedienungsanleitung.svg";
import editAnswersPic from "@/assets/images/DialogBearbeiten.svg";
import chatbotTestPic from "@/assets/images/ChatbotTest.svg";
import feedbackPic from "@/assets/images/Feedback.svg";

export default {
  name: "Dashboard",
  components: { ImageTextLinkBox },
  data() {
    return {
      avatar_link: null,
      pics: {
        manualPic,
        editAnswersPic,
        chatbotTestPic,
        feedbackPic
      },
      chatbotLink: null
    };
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  async created() {
    const { avatar_link, customer } = await getCustomerMetaData()
    this.avatar_link = avatar_link;
    this.chatbotLink = `https://cdn.stadtwerk.bot/chatbotdev/${customer}/`;
  },
};
</script>

<style lang="scss">
@import "~@/styles/element-variables.scss";
.dashboard-container {
  * {
    color: $--color-text-regular;
  }

  padding: 30px 50px;
  @media (max-width: $--sm) {
    padding: 10px 20px;
  }

  .description {
    background-color: white;
    padding: 15px 25px;
    margin-bottom: 20px;
    @media (max-width: $--sm) {
      padding: 5px 15px;
    }
    border-radius: 20px;

    @media (max-width: $--sm - 1) {
      > * {
        text-align: center;
      }
    }
    .el-row {
      .el-col:first-child {
        img {
          max-width: 100%;
          width: 50px;
        }
      }
      .el-col:last-child {
        padding-left: 10px;
      }
    }

    h1 {
      margin-top: 0px;
      font-size: 20px;
    }
  }

  .linkbox-container {
    > .el-row > .el-col {
      margin-bottom: 15px;
    }
  }
}
</style>
