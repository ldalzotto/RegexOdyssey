const includeHTML = function () {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {

                        let responseText = this.responseText;

                        const elementChilds = elmnt.childNodes;
                        if (elementChilds.length > 0) {
                            if (this.responseText.includes("<slot>")) {
                                const insertStartIndex = this.responseText.indexOf("<slot>") + "<slot>".length;
                                responseText = responseText.substr(0, insertStartIndex) + elmnt.innerHTML + responseText.substr(insertStartIndex)
                            }
                        }

                        elmnt.innerHTML = responseText;
                        const scriptElement = elmnt.querySelector("script");
                        if (scriptElement) {
                            elmnt.removeChild(scriptElement);
                            const executionScriptElement = document.createElement("script");
                            executionScriptElement.type = "module";
                            executionScriptElement.textContent = scriptElement.innerText;
                            elmnt.appendChild(executionScriptElement);
                        }


                        const styleElement = elmnt.querySelector("style");
                        if (styleElement) {
                            elmnt.removeChild(styleElement);
                            const linkElement = document.createElement("link");
                            linkElement.setAttribute("rel", "stylesheet");
                            linkElement.setAttribute("href", styleElement.getAttribute("src"));
                            elmnt.appendChild(linkElement);
                        }
                    }
                    if (this.status === 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};