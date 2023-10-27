<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggleAccordion">
        <p class="accordion-title">{{ title }}</p>
      <div class="radio-input">
        <label>
          <input class="radio-custom" type="radio" :id="title" :name="title" value="option1">
          <span class="radio-button radio-button-disabled"></span>
        </label>
      </div>
      <div class="radio-input">
        <label>
          <input class="radio-custom" type="radio" :id="title + '1'" :name="title" value="option2">
          <span class="radio-button"></span>
        </label>
      </div>
    </div>

    <div v-show="isOpen" class="accordion-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    title: String,
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
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
}

.accordion-content {
  background-color: $hsag-lightgrey;
}

.accordion-title {
  margin: 0;
  width: 100%;
}
</style>
