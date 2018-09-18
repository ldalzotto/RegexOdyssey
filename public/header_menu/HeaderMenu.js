import {RegexGenerationPage} from "../regex_generation/RegexGeneration.js";

export class HeaderMenu {
    constructor(pagesElement, initialTag) {
        const containerElement = document.createElement("div");
        containerElement.innerHTML = html;
        this.html = containerElement;
        this.currentTag = undefined;

        //initialize home page
        pagesElement.appendChild(new RegexGenerationPage().html);

        setTimeout(() => {
            this.makeComponentInteractable(pagesElement, initialTag);
        });
    }

    makeComponentInteractable(pagesElement, initialTag) {
        const GenerateTag = "GENERATE";
        const ContactTag = "CONTACT";
        const DocTag = "DOC";

        const generateTag = this.html.querySelector("#generate-tag");
        const docTag = this.html.querySelector("#doc-tag");
        const contactTag = this.html.querySelector("#contact-tag");

        const setPage = function (tagName) {
            pagesElement.innerHTML = '';
            if (tagName === GenerateTag) {
                pagesElement.appendChild(new RegexGenerationPage().html);
            } else if (tagName === ContactTag) {
                pagesElement.innerHTML = "<div>CONTACT</div>"
            } else if (tagName === DocTag) {
                pagesElement.innerHTML = "<div>DOC</div>"
            }
        };

        this.currentTag = initialTag;
        generateTag.addEventListener("click", () => {
            if (this.currentTag !== GenerateTag) {
                setPage(GenerateTag);
                this.currentTag = GenerateTag;
            }
        });

        contactTag.addEventListener("click", () => {
            if (this.currentTag !== ContactTag) {
                setPage(ContactTag);
                this.currentTag = ContactTag;
            }
        });

        docTag.addEventListener("click", () => {
            if (this.currentTag !== DocTag) {
                setPage(DocTag);
                this.currentTag = DocTag;
            }
        })
    }

}

const html =
    `
<div class="header-menu">
    <link rel="stylesheet" href="/header_menu/HeaderMenu.css">
    <div id="generate-tag">Generate</div>
    <div id="doc-tag">Doc</div>
    <div id="contact-tag">Contact</div>
</div>

`;