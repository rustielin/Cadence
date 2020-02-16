import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "./MarkdownEditor.css";
import "easymde/dist/easymde.min.css";

// XXX: hack to disable shortcuts in simplemde
const disabledShortcuts = {
    toggleBold: "",
    toggleItalic: "",
    toggleStrikethrough: "",
    toggleHeadingSmaller: "",
    toggleHeadingBigger: "",
    toggleHeading1: "",
    toggleHeading2: "",
    toggleHeading3: "",
    toggleCodeBlock: "",
    toggleBlockquote: "",
    toggleUnorderedList: "",
    toggleOrderedList: "",
    cleanBlock: "",
    drawLink: "",
    drawImage: "",
    drawTable: "",
    drawHorizontalRule: "",
    togglePreview: "",
    toggleSideBySide: "",
    toggleFullScreen: ""
}

class MarkdownEditor extends React.Component {

    constructor() {
        super();
        const content = localStorage.getItem("content");
        this.state = {
            mdeValue: content? content : ""
        }
    }
    
    handleChange = value => {
        this.setState({ mdeValue: value });
        const content = value;
		localStorage.setItem("content", content);
    };

	render = () => {
		return (
            <div className="editorContainer">
                <SimpleMDE
                    className="editor"
                    id="editor"
                    onChange={this.handleChange}
                    value={this.state.mdeValue}
                    options={{
                        toolbar: false,
                        spellChecker: false,
                        indentWithTabs: true,
                        forceSync: true,
                        shortcuts: disabledShortcuts
                    }}
                />
            </div>
		);
	};
}

export default MarkdownEditor;
