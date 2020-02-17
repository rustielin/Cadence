// BROKEN FOR NOW

import $ from "jquery";

const injectLinksHandler = (e) => {
    var el = $(e.target);
    if (el.hasClass('cm-link')) {    
        console.log("Redirecting to", el.text())        
        window.location.href = el.text()
    }
}
        
export const injectLinks = () => {
    console.log("Adding inject links handler")
    $('div.CodeMirror pre').on('click', injectLinksHandler)
}

export const removeLinks = () => {
    console.log("Removing inject links handler")
    $('div.CodeMirror pre').off('click', injectLinksHandler)
}

// ReactDOM.findDOMNode(this).getElementsByClassName("CodeMirror-code")[0];
/**
 * A parser reparser, or something like that. Parses DOM and injects custom styling
 * @param {*} rendered rendered code as DOM elements
 * @param {*} mde instance of markdown editor
 */
export const parser = (rendered, mde) => {
    // injectLinks();
    // console.log(rendered.children)
    // const numLines = rendered.children.length;
    // const children = rendered.children;
    // var child = null;
    // var links = null;
    // for (var i = 0; i < numLines; i++) {
    //     var child = children[i];

    //     // render clickable links
    //     var links = $(child).find(".cm-link:not(.parsed)");
    //     for (var j = 0; j < links.length; j++) {
    //         var txt = links[j].innerHTML;
    //         var txtNode = document.createTextNode(txt);
    //         var a = document.createElement('a');
    //         a.appendChild(txtNode);
    //         a.href = txt;
    //         links[j].innerHTML = "";
    //         links[j].appendChild(a)
    //         links[j].classList.add("parsed")
    //         links[j].classList.remove("cm-link")
    //     }

    //     console.log(child.innerHTML)
    // }

    return rendered;

}