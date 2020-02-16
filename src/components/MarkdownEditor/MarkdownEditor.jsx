import React from "react";
import ReactDOM from "react-dom";
import SimpleMDE from "react-simplemde-editor";
import classNames from "classnames";
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
const placeholderContent = "# Hi stranger \nWelcome to Cadence! Cadence supports Markdown, meaning you can take notes and change pages quickly - at a productive cadence. \n\n## Todo list \n\n* install Chrome \n* install Cadence \n* take notes \n\n## Steps to world domination\n\n1. Make up a plan \n2. Follow the plan\n\nNOTE: Make sure to angery react all pictures of corn\n\n```\n# you can also write code\na = 3\nb = 3\nc = a + b # evaluates to 6\n```"

class MarkdownEditor extends React.Component {

    constructor() {
        super();
        const content = localStorage.getItem("content");
        this.state = {
            mdeValue: content || placeholderContent,
            showPreview: true
        }
        this.mdeRef = React.createRef();
    }


    componentDidMount() {
        this.togglePreview();
        document.addEventListener('click', this.handleClickOutside, true);
    }
    

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    
    handleChange = value => {
        this.setState({ mdeValue: value });
        const content = value;
		localStorage.setItem("content", content);
    };


    togglePreview = () => {
        const mde = this.mdeRef.current.simpleMde;
        mde.togglePreview();
        // this.toggleToolbar();
    }

    toggleToolbar = () => {
        console.log("TOOLBAR TOGGLED")
        // also toggle the toolbar
        var tool = ReactDOM.findDOMNode(this).getElementsByClassName("editor-toolbar")
        if (tool.length > 0) {
            if (this.state.showPreview) {
                tool[0].style.display = "block"
            } else {
                tool[0].style.display = "none"
            }
        }
    }


    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            if (!this.state.showPreview) {
                this.togglePreview();
            }
            this.setState({
                showPreview: true
            });
        } else if (domNode.contains(event.target)) {
            if (this.state.showPreview) {
                this.togglePreview();
            }
            this.setState({
                showPreview: false
            });
        }
    }


    corn = () => {
        console.log("ANGERY")
        const mde = this.mdeRef.current.simpleMde;
        console.log(mde)
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
                        hideIcons: "preview"
                    }}
                />
            </div>
		);
	};
}

export default MarkdownEditor;
