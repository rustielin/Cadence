/**
 * Potentially dangerous 
 */

var ref;

export const overrideInst = (inst) => {
    ref = inst;
}

// XXX: a bit ugly, but avoids putting this in the same file as MD editor
export const getToolbar = (setState) => {
    return makeToolbar(setState)
}

var makeToolbar = (setState) => {
    return [
        {
            name: "bold",
            action: () => ref ? ref.toggleBold() : "",
            className: "fa fa-bold",
            title: "Bold",
            default: true
        },
        {
            name: "italic",
            action: () => ref ? ref.toggleItalic() : "",
            className: "fa fa-italic",
            title: "Italic",
            default: true
        },
        {
            name: "strikethrough",
            action: () => ref ? ref.toggleStrikethrough() : "",
            className: "fa fa-strikethrough",
            title: "Strikethrough"
        },
        {
            name: "heading",
            action: () => ref ? ref.toggleHeadingSmaller() : "",
            className: "fa fa-header",
            title: "Heading",
            default: true
        },
        "|",
        {
            name: "code",
            action: () => ref ? ref.toggleCodeBlock() : "",
            className: "fa fa-code",
            title: "Code"
        },
        {
            name: "quote",
            action: () => ref ? ref.toggleBlockquote() : "",
            className: "fa fa-quote-left",
            title: "Quote",
            default: true
        },
        {
            name: "unordered-list",
            action: () => ref ? ref.toggleUnorderedList() : "",
            className: "fa fa-list-ul",
            title: "Generic List",
            default: true
        },
        {
            name: "ordered-list",
            action: () => ref ? ref.toggleOrderedList() : "",
            className: "fa fa-list-ol",
            title: "Numbered List",
            default: true
        },
        "|",
        {
            name: "link",
            action: () => ref ? ref.drawLink() : "",
            className: "fa fa-link",
            title: "Create Link",
            default: true
        },
        {
            name: "image",
            action: () => ref ? ref.drawImage() : "",
            className: "fa fa-picture-o",
            title: "Insert Image",
            default: true
        },
        {
            name: "table",
            action: () => ref ? ref.drawTable() : "",
            className: "fa fa-table",
            title: "Insert Table"
        },
        {
            name: "horizontal-rule",
            action: () => ref ? ref.drawHorizontalRule() : "",
            className: "fa fa-minus",
            title: "Insert Horizontal Line"
        },
        "|",
        {
            name: "preview",
            action: () => {
                if (ref) {
                    // sidebyside disables anyways
                    setState({ previewEnabled: !ref.isPreviewActive(), sideBySideEnabled: false })
                    ref.togglePreview(); 
                    console.log("Setting preview to", ref.isPreviewActive());
                }
            },
            className: "fa fa-eye no-disable",
            title: "Toggle Preview",
            default: true
        },
        {
            name: "side-by-side",
            action: () => {
                if (ref) {
                    // fullscreen changes anyways, but depends on whether sidebyside is working
                    setState({ sideBySideEnabled: !ref.isSideBySideActive(), fullMarkdownEditor: !ref.isSideBySideActive(), previewEnabled: false })
                    ref.toggleSideBySide();
                    console.log("SET SIDE BY SIDE", ref.isSideBySideActive())
                }
            },
            className: "fa fa-columns no-disable no-mobile",
            title: "Toggle Side by Side",
            default: true
        },
        {
            name: "fullscreen",
            action: () => {
                if (ref) {
                    // sidebyside disables anyways
                    setState({ fullMarkdownEditor: !ref.isFullscreenActive(), sideBySideEnabled: false })
                    ref.toggleFullScreen();
                    console.log("SET FULLSCREEN", ref.isFullscreenActive())
                }
            },
            className: "fa fa-arrows-alt no-disable no-mobile",
            title: "Toggle Fullscreen",
            default: true
        },
        "|",
        {
            name: "guide",
            action: "https://simplemde.com/markdown-guide",
            className: "fa fa-question-circle",
            title: "Markdown Guide",
            default: true
        },
    ]
}