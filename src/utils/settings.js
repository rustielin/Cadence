const QUERY_ITEM_NAME = "unsplashQueryText";

// Saves options to chrome.storage
export const saveOptions = (ref) => {
    console.log("Saving options...");
    var queryText = ref.value;
    localStorage.setItem(QUERY_ITEM_NAME, queryText);
    localStorage.setItem("photos", "[]"); // clear the cache
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
export const restoreOptions = (ref) => {
    console.log("Restoring options...");
    var queryText = localStorage.getItem(QUERY_ITEM_NAME);
    if (!queryText) {
        queryText = "";
    }
    ref.value = queryText;
    console.log("Restored to", ref.value);
}

export const getToolbar = (ref) => {
    console.log("GET TOOLBAR")
    return [
        {
            name: "bold",
            action: ref.toggleBold,
            className: "fa fa-bold",
            title: "Bold",
            default: true
        },
        {
            name: "italic",
            action: ref.toggleItalic,
            className: "fa fa-italic",
            title: "Italic",
            default: true
        },
        {
            name: "strikethrough",
            action: ref.toggleStrikethrough,
            className: "fa fa-strikethrough",
            title: "Strikethrough"
        },
        {
            name: "heading",
            action: ref.toggleHeadingSmaller,
            className: "fa fa-header",
            title: "Heading",
            default: true
        },
        {
            name: "heading-smaller",
            action: ref.toggleHeadingSmaller,
            className: "fa fa-header fa-header-x fa-header-smaller",
            title: "Smaller Heading"
        },
        {
            name: "heading-bigger",
            action: ref.toggleHeadingBigger,
            className: "fa fa-header fa-header-x fa-header-bigger",
            title: "Bigger Heading"
        },
        {
            name: "heading-1",
            action: ref.toggleHeading1,
            className: "fa fa-header fa-header-x fa-header-1",
            title: "Big Heading"
        },
        {
            name: "heading-2",
            action: ref.toggleHeading2,
            className: "fa fa-header fa-header-x fa-header-2",
            title: "Medium Heading"
        },
        {
            name: "heading-3",
            action: ref.toggleHeading3,
            className: "fa fa-header fa-header-x fa-header-3",
            title: "Small Heading"
        },
        "|",
        {
            name: "code",
            action: ref.toggleCodeBlock,
            className: "fa fa-code",
            title: "Code"
        },
        {
            name: "quote",
            action: ref.toggleBlockquote,
            className: "fa fa-quote-left",
            title: "Quote",
            default: true
        },
        {
            name: "unordered-list",
            action: ref.toggleUnorderedList,
            className: "fa fa-list-ul",
            title: "Generic List",
            default: true
        },
        {
            name: "ordered-list",
            action: ref.toggleOrderedList,
            className: "fa fa-list-ol",
            title: "Numbered List",
            default: true
        },
        {
            name: "clean-block",
            action: ref.cleanBlock,
            className: "fa fa-eraser fa-clean-block",
            title: "Clean block"
        },
        "|",
        {
            name: "link",
            action: ref.drawLink,
            className: "fa fa-link",
            title: "Create Link",
            default: true
        },
        {
            name: "image",
            action: ref.drawImage,
            className: "fa fa-picture-o",
            title: "Insert Image",
            default: true
        },
        {
            name: "table",
            action: ref.drawTable,
            className: "fa fa-table",
            title: "Insert Table"
        },
        {
            name: "horizontal-rule",
            action: ref.drawHorizontalRule,
            className: "fa fa-minus",
            title: "Insert Horizontal Line"
        },
        "|",
        {
            name: "preview",
            action: ref.togglePreview,
            className: "fa fa-eye no-disable",
            title: "Toggle Preview",
            default: true
        },
        {
            name: "side-by-side",
            action: ref.toggleSideBySide,
            className: "fa fa-columns no-disable no-mobile",
            title: "Toggle Side by Side",
            default: true
        },
        {
            name: "fullscreen",
            action: () => {ref.toggleFullScreen()},
            className: "fa fa-arrows-alt no-disable no-mobile",
            title: "Toggle Fullscreen",
            default: true
        },
        "|",
        {
            name: "guide",
            action: "https://ref.com/markdown-guide",
            className: "fa fa-question-circle",
            title: "Markdown Guide",
            default: true
        },
        "|",
        {
            name: "undo",
            action: ref.undo,
            className: "fa fa-undo no-disable",
            title: "Undo"
        },
        {
            name: "redo",
            action: ref.redo,
            className: "fa fa-repeat no-disable",
            title: "Redo"
        }
    ]
}