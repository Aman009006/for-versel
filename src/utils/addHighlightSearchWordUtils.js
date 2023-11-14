export default function addHighlightSearchWord(text, searchWord) {
    if (searchWord !== ''){
        const regex = new RegExp(`(${searchWord})`, 'gi');
        return text.replace(regex, '<span class="search-word">$1</span>');
    } else {
        return text
    }
}
