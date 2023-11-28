<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggleAccordion">
      <p class="accordion-title" v-html="addHighlightSearchWord(title, searchValue)"></p>
      <div class="radio-input">
        <label>
          <input class="radio-custom" :checked="read" type="radio" :id="title + '2'" :name="title + '1'"
                 value="option1">
          <span @click="selectedAll(title, 'read',)"
                :class="`radio-button ${disabled && !read && 'radio-button-disabled'}`"></span>
        </label>
      </div>
      <div class="radio-input">
        <label>
          <input class="radio-custom" :checked="write" type="radio" :id="title + '1'" :name="title + '1'"
                 value="option2">
          <span @click="selectedAll(title, 'write',)"
                :class="`radio-button ${disabled && !write && 'radio-button-disabled'}`"></span>
        </label>
      </div>
      <svg-icon
          :style="isOpen ? 'transform: translateY(-50%) rotate(180deg); transition: 0.4s; top: 50%;' : 'transition: 0.4s;'"
          class="arrow" :svg-icon-html="icons.arrowAccordion"/>
    </div>

    <div v-show="isOpen" class="accordion-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import RoleUtilities from "@/store/utilities/RoleUtilities";
import icons from "@/icons/index";
import addHighlightSearchWord from "@/utils/addHighlightSearchWordUtils";


export default {
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    title: String,
    read: Boolean,
    write: Boolean,
    disabled: Boolean,
  },
  computed: {
    icons() {
      return icons
    },
    searchValue() {
      return this.$store.getters.search
    },
  },
  methods: {
    addHighlightSearchWord,
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
    selectedAll(title, key) {
      if (!this.disabled) {
        RoleUtilities.selectAllPermissionInGroup(this.$store, title, key)
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.module.scss";

.accordion-item {
  margin-top: 20px;
  background: $hsag-lightgrey;
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  position: relative;

  .arrow {
    width: 14px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%)
  }
}

.accordion-content {
  background-color: $hsag-lightgrey;
}

.accordion-title {
  margin: 0;
  width: 100%;
}
</style>
