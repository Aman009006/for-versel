
export default class WebchatApi {
    /**
     * @param {string} intent
     */
    startDialog(intent) {
        window.hsag_chatbot.api.startDialog(intent);
    }
}
