<template>
  <aside>
    <div>Hier müssen wir noch eine schöne Erklärung einfügen wie man das Chatbot-Snippet einbaut.</div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Chatbot-Snippet für Ihre Webseite</span>
      </div>
      <span v-html="snippetCode1" /><br>
      <span v-html="snippetCode2" />
    </el-card>
    <!--{{{&lt;script&gt;window.hsag_chatbot_variables={dev:!0}&lt;/script&gt;\n&lt;script src=\"https://cdn.h-s-a-g.de/chatbot/dev/demo-sie/scripts/main.js\"&gt;&lt;/script&gt;}}}-->
  </aside>
</template>

<script>

// TODO: IF we have a session object that contains the customer of the current user use it here
var customer = 'demo'

/**
   * vue js is relatively strict regarding html, especially script tags. so we have to do it using html entities. quite cumbersome argh
   * @returns {string}
   */
var getSnippetCode = function() {
  var snippetCodeText = '&lt;script src="https://cdn.h-s-a-g.de/chatbot/dev/' + customer + '/scripts/main.js"&gt;&lt;/script&gt;\''
  return snippetCodeText
}

export default {
  name: 'Snippet',
  components: {},
  props: {},
  data() {
    return {
      snippetCode1: '&lt;script&gt;window.hsag_chatbot_variables={dev:!0}&lt;/script&gt;',
      snippetCode2: getSnippetCode()// '&lt;script src=\\\\"https://cdn.h-s-a-g.de/chatbot/dev/demo-sie/scripts/main.js\\\\"&gt;&lt;/script&gt;\''
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style  scoped ></style>
