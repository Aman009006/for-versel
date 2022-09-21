<template>
  <div class="dashboard-container">
    <div class="description">
      <el-row>
        <el-col :span="24" :sm="2" :lg="1">
          <img :src="avatar_link" />
        </el-col>
        <el-col class="text" :span="24" :sm="20">
          <h1>Willkommen auf Ihrer Admin UI!</h1>
          <span style="font-size: 14px"
            >Mithilfe der ersten Version der Admin UI, ermöglichen wir Ihnen das
            Ändern von Textbausteinen und möchten Sie mit der Navigation der
            graphischen Oberfläche vertraut machen. Es handelt sich hierbei um
            eine Beta-Version. Die wesentlichen Funktionen sind bereits
            implementiert, die vollumfängliche Entwicklung der einzelnen
            Funktionen ist jedoch noch nicht abgeschlossen, daher ist uns Ihr
            Feedback für die Weiterentwicklung und Optimierung besonders
            wichtig!</span
          >
          <p style="font-size: 14px">
            <span
              style="
                color: #0da4f0;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 13px;
              "
              >Dialoge bearbeiten:
            </span>
            Bitte wählen Sie links in der Navigation im Drop-down Menü unter
            Dialoge die Chatbot Antwort aus die Sie bearbeiten möchten.
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="linkbox-container">
      <el-row :gutter="20">
        <el-col :span="12" :lg="6" :xs="24">
          <image-text-link-box
            class="manuelButton"
            link="https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/57803205/Bedienungsanleitung+Admin+UI"
            text="Bedienungs&shy;anleitung lesen"
            :image="pics.manualPic"
          />
        </el-col>
        <el-col class="editDialogButton" :span="12" :lg="6" :xs="24">
          <el-tooltip
            class="item"
            effect="dark"
            content="Dieser Button wird in Kürze aktiviert! Um Dialoge zu bearbeiten klicken Sie bitte in der linken Navigation auf den Bereich 'Dialoge' und wählen Sie im Drop-down Menü den zu bearbeitenden Dialog aus."
            placement="top"
          >
            <image-text-link-box
              text="Dialoge editieren"
              :image="pics.editAnswersPic"
            />
          </el-tooltip>
        </el-col>
        <el-col :span="12" :lg="6" :xs="24">
          <image-text-link-box
            class="giveFeedbackButton"
            text="Feedback geben"
            :image="pics.feedbackPic"
            :link="jiraHelpDesk"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ImageTextLinkBox from "@/components/ImageTextLinkBox/index.vue";
import manualPic from "@/assets/images/Bedienungsanleitung.svg";
import editAnswersPic from "@/assets/images/DialogBearbeiten.svg";
import feedbackPic from "@/assets/images/Feedback.svg";
import { links } from "@/constants";

export default {
  name: "Dashboard",
  components: { ImageTextLinkBox },
  data() {
    return {
      avatar_link: null,
      pics: {
        manualPic,
        editAnswersPic,
        feedbackPic,
      },
      jiraHelpDesk: links.jiraHelpDesk,
    };
  },
  async created() {
    const { avatar_link } = this.$store.getters.metainfo;
    this.avatar_link = avatar_link;
  },
};
</script>

<style lang="scss">
@import "@/styles/element-variables.module.scss";
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    @media (max-width: $--sm) {
      padding: 5px 15px;
    }
    border-radius: 4px;

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
      font-size: 18px;
      color: #303133;
    }
  }
  .editDialogButton {
    opacity: 0.6;
  }
  .item {
    border-radius: 4px;
  }

  .linkbox-container {
    font-size: 14px;
    > .el-row > .el-col {
      margin-bottom: 15px;
    }
  }

  .manuelButton:hover {
    border: solid 2px #40a0ff;
    .text {
      color: #40a0ff;
    }
  }

  .manuelButton {
    border: solid 2px #f2f6fc;
  }

  .giveFeedbackButton:hover {
    border: solid 2px #40a0ff;
    .text {
      color: #40a0ff;
    }
  }
  .giveFeedbackButton {
    border: solid 2px #f2f6fc;
  }
}

.text {
  margin-left: 15px;
}
</style>
