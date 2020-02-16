import React from "react";
import ReactDOM from "react-dom";
import SimpleMDE from "react-simplemde-editor";
import classNames from "classnames";
import "./MarkdownEditor.css";
import "easymde/dist/easymde.min.css";
import $ from "jquery";

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
        this.togglePreview(); // start it in preview mode
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentDidUpdate() {
        $('.cm-link').each((i, el) => {
            var line = el.innerHTML;
            if (!line.includes("href")) {
                el.innerHTML = `<a href="${line}">${line}</a>`
            }
            console.log(el.innerHTML)
        })
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
        if (this.state.showPreview) {
            mde.codemirror.focus()
        }
        this.toggleToolbar(); // XXX: ideally, toolbar showing iff preview showing
    }

    toggleToolbar = () => {
        var tool = ReactDOM.findDOMNode(this).querySelectorAll("#editor-wrapper > div.editor-toolbar");
        if (tool.length > 0) {
            if (this.state.showPreview) {
                tool[0].style.visibility = "visible"
            } else {
                tool[0].style.visibility = "hidden"
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

    }


    validURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    /**
     * Get the text we've shown on screen and just show it again
     * Lmao this is like code injecting ourselves
     */
    renderer = text => {
        const mde = this.mdeRef.current.simpleMde;
        const doc = mde.codemirror.doc;
        var rendered = ReactDOM.findDOMNode(this).getElementsByClassName("CodeMirror-code")[0];
        console.log("RENDERED", rendered.children[0].children[0])
        var numLines = mde.codemirror.doc.children[0].lines.length;
        for (var i = 0; i < numLines; i++) {
            var line = doc.getLine(i);
            if (this.validURL(line)) {
                console.log("URL FOUND AT", line);
                rendered.children[i].innerHTML = `<a href="${line}">${line}</a>`
            }
        }
        
        return rendered.innerHTML
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
                        hideIcons: "preview",
                        // previewRender: this.renderer
                    }}
                />
            </div>
		);
	};
}

export default MarkdownEditor;
