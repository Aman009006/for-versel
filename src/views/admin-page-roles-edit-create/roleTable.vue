<template>
  <div>
    <template v-if="intents.length">
      <div>
        <div class="header">
          <span class="header-title">Berechtigungs Name</span>
          <span class="header-title">Read</span>
          <span class="header-title">Write</span>
        </div>
        <div v-for="intent in intents">

          <Accordion>
            <AccordionItem :title="intent.SkillName">
              <div class="subItem" v-for="subIntent in intent.Intents">
                  <div class="accordion-subItem">
                      <p class="accordion-subItem-title">{{ subIntent.name }}</p>
                    <div class="radio-input">
                      <label>
                        <input class="radio-custom" type="radio" :id="subIntent.name" :name="subIntent.name" value="option1">
                        <span class="radio-button radio-button-disabled"></span>
                      </label>
                    </div>
                    <div class="radio-input">
                      <label class="radio-input">
                        <input class="radio-custom" type="radio" :id="subIntent.name + '1'" :name="subIntent.name" value="option2">
                        <span class="radio-button"></span>
                      </label>
                    </div>
                  </div>
              </div>
            </AccordionItem>
          </Accordion>

        </div>
      </div>

      <div class="role-table">
        <el-button
            class="add-btn"
            icon="icon-Check"
            @click="finishEdit()"
        >
          Speichern
        </el-button>
      </div>
    </template>
  </div>
</template>

<style lang="scss" >
@import "@/styles/variables.module.scss";

  .role-table {
    display: flex;
    justify-content: flex-end;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $hsag-bluegrey;
    color: $hsag-white;
    padding: 8px 8px;

    span {
      font-weight: 700;
    }
  }

  .accordion-subItem {
    padding: 10px 10px 10px 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .subItem:nth-child(odd) {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.02) 100%), var(--hsag-Lichtgrau, #F1F6F9);
  }

  .accordion-subItem-title {
    margin: 0;
    width: 100%;
  }

  .header-title {
    text-align: start;
    width: 100%;

    &:nth-child(2n) {
      width: 174px;
    }

    &:nth-child(3n) {
      width: 326px;
    }
  }

  .radio-input {
    &:nth-child(2n),
    &:nth-child(3n) {
      width: 174px;

      &:nth-child(3n) {
        width: 326px;
      }
    }
  }
</style>

<script>
import UsersUtilities from "@/store/utilities/UsersUtilities";
import icons from "@/icons";
import Accordion from "../../components/Accordion/index.vue";
import AccordionItem from "../../components/Accordion/AccordionItem.vue";
import {paths} from "@/constants";

export default {
  components: {
    Accordion,
    AccordionItem
  },
  props: {
      filteredArray: {
          type: Array,
          required: true,
      },
  },
  data() {
    return {
      intents: this.filteredArray,
    };
  },
  watch: {
      filteredArray: {
          handler(newArray) {
              this.intents = newArray;
          },
          immediate: true,
      },
  },
  computed: {
    icons() {
      return icons;
    },
  },
  methods: {
    finishEdit() {
      this.$router.push(paths.benutzerBerechtigungs);
    },
  },
};
</script>




