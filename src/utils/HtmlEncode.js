
/**
 * encodes a String with html - chars
 * @see https://stackoverflow.com/a/784698/6458608
 */
export default function HtmlEncode(string) {
    var el = document.createElement("div");
    el.innerText = el.textContent = string;
    string = el.innerHTML;
    return string;
}
