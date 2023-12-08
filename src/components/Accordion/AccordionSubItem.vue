<template>
  <div class="accordion-subItem">
    <p class="accordion-subItem-title" v-html="addHighlightSearchWord(subIntent.name, searchValue)"></p>
    <div class="radio-input">
      <label>
        <input class="radio-custom" :disabled="disabled" :checked="subIntent.read" type="radio" :id="subIntent.name + 'read-radio-button'" value="option1">
        <span @click="select(intent.permissionName, subIntent.name, 'read')" :class="`radio-button ${disabled && !subIntent.read && 'radio-button-disabled'} `"></span>
      </label>
    </div>
    <div class="radio-input">
      <label class="radio-input">
        <input class="radio-custom" :disabled="disabled" :checked="subIntent.write" type="radio" :id="subIntent.name + 'write-radio-button'" value="option2">
        <span @click="select(intent.permissionName, subIntent.name, 'write')" :class="`radio-button ${disabled && !subIntent.write && 'radio-button-disabled'} `"></span>
      </label>
    </div>
  </div>
</template>

<script>
import addHighlightSearchWord from "@/utils/addHighlightSearchWordUtils";
import RoleUtilities from "@/store/utilities/RoleUtilities";

export default {
  props: {
    subIntent: Object,
    intent: Object,
    disabled: Boolean,

  },
  computed: {
    searchValue() {
      return this.$store.getters.search
    },
  },
  methods: {
    addHighlightSearchWord,
    select(skillName, intentName, key) {
      if (!this.disabled) {
        RoleUtilities.selectOnePermissionInGroup(this.$store, skillName, intentName, key)
      }
    },
  },
};
</script>

