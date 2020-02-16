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

// some ugly placeholder text
const placeholderContent = "# Hi stranger \nWelcome to Cadence! Cadence supports Markdown, meaning you can take notes and change pages quickly - at a productive cadence. \n\n## Todo list \n\n* install Chrome \n* install Cadence \n* take notes \n\n ## Steps to world domination\n\n1. Make up a plan \n2. Follow the plan\n\n> NOTE: Make sure to angery react all pictures of corn"

class MarkdownEditor extends React.Component {

    constructor() {
        super();
        const content = localStorage.getItem("content");
        this.state = {
            mdeValue: content || placeholderContent,
        }
        this.mdeRef = React.createRef();
    }
    
    handleChange = value => {
        this.setState({ mdeValue: value });
        const content = value;
		localStorage.setItem("content", content);
    };

    corn = () => {
        console.log("ANGERY")
    }

	render = () => {
		return (
            <div className="editorContainer">
                {/* <button onClick={this.corn}>I HATE CORN</button> */}
                <SimpleMDE
                    className="editor"
                    id="editor"
                    onChange={this.handleChange}
                    value={this.state.mdeValue}
                    ref={this.mdeRef}
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
