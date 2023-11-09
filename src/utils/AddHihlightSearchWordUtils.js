export default function addHighlightSearchWord(text, searchWord) {
    const regex = new RegExp(`(${searchWord})`, 'gi');
    return text.replace(regex, '<span class="search-word">$1</span>');
}
