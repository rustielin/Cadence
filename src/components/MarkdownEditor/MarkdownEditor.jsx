import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "./MarkdownEditor.css";
import "easymde/dist/easymde.min.css";

class MarkdownEditor extends React.Component {

    state = { mdeValue: "" };
    
    handleChange = value => {
        this.setState({ mdeValue: value });
    };

	render = () => {
		return (
            <div className="editorContainer">
                <SimpleMDE
                    id="your-custom-id"
                    onChange={this.handleChange}
                    value={this.state.mdeValue}
                    options={{
                        toolbar: false,
                        spellChecker: false,
                        indentWithTabs: true,
                        forceSync: true
                    }}
                />
            </div>
		);
	};
}

export default MarkdownEditor;
