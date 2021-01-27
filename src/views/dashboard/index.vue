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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCustomerMetaData } from "@/api/customer";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      avatar_link: null,
    };
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  async created() {
    this.avatar_link = (await getCustomerMetaData()).avatar_link;
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
}
</style>
