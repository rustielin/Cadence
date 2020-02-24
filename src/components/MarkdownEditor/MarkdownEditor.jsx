import React from "react";
import ReactDOM from "react-dom";
import SimpleMDE from "react-simplemde-editor";
import classNames from "classnames";
import "./MarkdownEditor.css";
import "easymde/dist/easymde.min.css";
import { parser } from "../../utils/parser.js"
// import { getToolbar } from "../../utils/settings"
import { overrideInst, getToolbar } from "../../utils/toolbarOverrider"
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
            loadedSettings: false,
            toolbarEnabled: !!localStorage.getItem("toolbarEnabled"),
            previewEnabled: !!localStorage.getItem("previewEnabled"),
            fullMarkdownEditor: !!localStorage.getItem("fullMarkdownEditor"),
            sideBySideEnabled: !!localStorage.getItem("sideBySideEnabled")
        }

        console.log("INIT STATE: ", this.state)

        this.mdeRef = React.createRef();
        this.inst = null;

        // XXX: UGLY!!
        document.styleSheets[0].insertRule(".editor-toolbar {  }", 0)
    }


    componentDidMount() {
        document.addEventListener('click', this.handleClickLink, true);
    }

    componentDidUpdate() {
        console.log("UPDATING STORAGE");
        console.log("Saving state:", this.state);
        this.saveSettings();

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickLink, true);
    }

    setBool = (key, val) => {
        if (val) {
            localStorage.setItem(key, val)
        } else {
            localStorage.removeItem(key)
        }
    }

    // can't save booleans sad...
    saveSettings = () => {
        this.setBool("previewEnabled", this.state.previewEnabled)
        this.setBool("sideBySideEnabled", this.state.sideBySideEnabled)
        this.setBool("fullMarkdownEditor", this.state.fullMarkdownEditor)
        this.setBool("toolbarEnabled", this.state.toolbarEnabled)
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

    // render the proper way the first time
    handleInst = inst => {
        this.inst = inst;
        overrideInst(inst); // for generating the toolbar
        console.log("HandleInst state:", this.state)
        if (this.state.previewEnabled) {
            inst.togglePreview();
        }
        if (this.state.fullMarkdownEditor) {
            inst.toggleFullScreen();
        }
        if (this.state.sideBySideEnabled) {
            inst.toggleSideBySide();
        }
        if (!this.state.toolbarEnabled) { // it's on by default, so check if we need to turn it off
            // this.toggleToolbar();
            document.styleSheets[0].removeRule(0)
            document.styleSheets[0].insertRule(".editor-toolbar { display: none }", 0)
            console.log("Toolbar DISABLED")
        }
    }

    toggleToolbar = () => {
        document.styleSheets[0].removeRule(0)
        if (this.state.toolbarEnabled) { 
            document.styleSheets[0].insertRule(".editor-toolbar { display: none }", 0)
            console.log("Toolbar DISABLED")
        } else {
            document.styleSheets[0].insertRule(".editor-toolbar { display: block }", 0)
            console.log("Toolbar ENABLED")
        }
    }


    corn = () => {
        console.log("ANGERY")
        console.log(this.mdeRef.current.simpleMde)
        this.setState({ loadedSettings: true })
        this.saveSettings();
    }


	render = () => {
        var outerClass = classNames("editorContainer", {
			previewContainer: this.state.showPreview
        });
        console.log("RENDERED")
		return (
            <div className={outerClass}>
                {/* <button onClick={this.corn}>I HATE CORN</button> */}
                <SimpleMDE
                    className="editor"
                    id="editor"
                    onChange={this.handleChange}
                    value={this.state.mdeValue}
                    ref={this.mdeRef}
                    getMdeInstance={this.handleInst}
                    options={{
                        spellChecker: false,
                        indentWithTabs: true,
                        forceSync: true,
                        toolbar: getToolbar(this.setState.bind(this)),
                        status: [{
                            className: "toggleToolbar",
                            defaultValue: el => {
                                var button = document.createElement("button");
                                button.innerHTML = "toggle toolbar";
                                button.className = "tool-button";
                                // button.appendChild(document.createTextNode("Toggle Toolbar"));
                                button.onclick = () => {
                                    this.toggleToolbar();
                                    this.setState({ toolbarEnabled: !this.state.toolbarEnabled });
                                };
                                el.appendChild(button);
                            }
                        }, "lines", "words", "cursor"]
                    }}
                />
            </div>
		);
	};
}

export default MarkdownEditor;
