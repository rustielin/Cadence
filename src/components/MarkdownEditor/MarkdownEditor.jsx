import React from "react";
import ReactDOM from "react-dom";
import SimpleMDE from "react-simplemde-editor";
import classNames from "classnames";
import "./MarkdownEditor.css";
import "easymde/dist/easymde.min.css";
import { parser } from "../../utils/parser.js"
import $ from "jquery"

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
const placeholderContent = "# Hi stranger \nWelcome to Cadence! Cadence supports Markdown, meaning you can take notes and change pages quickly - at a productive cadence. \n\n## Todo list \n\n* install Chrome \n* install Cadence \n* take notes \n\n## Steps to world domination\n\n1. Make up a plan \n2. Follow the plan\n\nNOTE: Make sure to angery react all pictures of corn\n\n```\n# you can also write code\na = 3\nb = 3\nc = a + b # evaluates to 6\n```"

class MarkdownEditor extends React.Component {

    constructor() {
        super();
        const content = localStorage.getItem("content");
        this.state = {
            mdeValue: content || placeholderContent,
        }
        this.mdeRef = React.createRef();
    }


    componentDidMount() {
        document.addEventListener('click', this.handleClickLink, true);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickLink, true);
    }

    
    handleChange = value => {
        this.setState({ mdeValue: value });
        const content = value;
		localStorage.setItem("content", content);
    };


    handleClickLink = event => {
        if (event.target.classList.contains("cm-link")) {
            console.log("Redirecting to", event.target.innerHTML);        
            window.location.href = event.target.innerHTML
        }
    }


    corn = () => {
        console.log("ANGERY")
    }


	render = () => {
        var outerClass = classNames("editorContainer", {
			previewContainer: this.state.showPreview
		});
		return (
            <div className={outerClass}>
                {/* <button onClick={this.corn}>I HATE CORN</button> */}
                <SimpleMDE
                    className="editor"
                    id="editor"
                    onChange={this.handleChange}
                    value={this.state.mdeValue}
                    ref={this.mdeRef}
                    options={{
                        spellChecker: false,
                        indentWithTabs: true,
                        forceSync: true,
                        toolbar: false,
                    }}
                />
            </div>
		);
	};
}

export default MarkdownEditor;
