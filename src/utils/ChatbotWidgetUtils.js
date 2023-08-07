import store from '@/store/index';

export default class ChatbotWidgetUtils {
  /**
   * @private
   * @type {HTMLScriptElement}
   */
  static chatbotScript

  /**
   * @private
   * @returns {string}
   */
  static getScriptSrc() {
    const { customer } = store.getters.metainfo
    return `https://cdn.stadtwerk.bot/chatbotdev/${customer}/scripts/main.js`
  }

  /**
   * activates the dev - mode for the shatbot widget.
   * @private
   */
  static activateDevMode() {
    window.hsag_chatbot_variables = { dev: true }
  }

  /**
   * @private
   * @returns {HTMLScriptElement}
   */
  static createChatbotScript() {
    const script = document.createElement('script')
    script.src = this.getScriptSrc()
    this.chatbotScript = script
    return this.chatbotScript
  }

  /**
   * inserts the chatbot, if...
   * - it's not inserted, yet.
   * - and the admin_ui_test_page_link was not set in the database
   *
   * The insert will take place after 1 second to
   * prevent the chatbot from being visible in loading
   * screens.
   * @param {string} customer
   */
  static insertChatbotWidget() {
    if (
      this.chatbotScript == null &&
      store.getters.metainfo.admin_ui_test_page_link == null
    ) {
      this.activateDevMode()
      const script = this.createChatbotScript()
      setTimeout(function () {
        document.head.append(script)
      }, 1000)
    }
  }
  static hideChatbotWidget() {
    const chatbot = document.getElementById('hsagChatbot');
    if (chatbot) {
      chatbot.style.display = 'none';
    }
  }
  static showChatbotWidget() {
    const chatbot = document.getElementById('hsagChatbot');
    if (chatbot) {
      chatbot.style.display = 'block';
    }
  }
}
