<template>
  <div class="imageTextLinkBox">
    <a :href="link" target="_blank">
      <el-row>
        <el-col :span="6">
          <img :src="image" />
        </el-col>
        <el-col :span="18" class="linkText" v-html="text" />
      </el-row>
    </a>
  </div>
</template>

<script>
export default {
  name: "ImageTextLinkBox",
  props: {
    link: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.imageTextLinkBox {
  background-color: $hsag-lightgrey;
  border-radius: 4px;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    padding: 20px;
    display: block;
  }

  .el-row {
    display: flex;
    justify-content: center;
    align-items: center;

    .linkText {
      font-weight: bold;
      padding-left: 15px;
    }

    img {
      width: 70px;
      height: 70px;
      max-width: 100%;
    }
  }
}
</style>
