const PossibleTags = {
    GENERATE: "<div w3-include-html=\"/regex_generation/regex.html\"></div>",
    CONTACT: "<div w3-include-html=\"/home/home.html\"></div>",
    DOC: "<div>TODO</div>"
};

const GenerateTag = "GENERATE";
const ContactTag = "CONTACT";
const DocTag = "DOC";

let currentTag;

export const initialiaseHeaderMenu = function (generateTagElement, contactTagElement, docTagElement, pagesContainer, initialTag) {

    const setPage = function (tagName) {
        pagesContainer.innerHTML = PossibleTags[tagName];
        includeHTML()
    };

    currentTag = initialTag;
    generateTagElement.addEventListener("click", () => {
        if (currentTag !== GenerateTag) {
            setPage(GenerateTag);
            currentTag = GenerateTag;
        }
    });

    contactTagElement.addEventListener("click", () => {
        if (currentTag !== ContactTag) {
            setPage(ContactTag);
            currentTag = ContactTag;
        }
    });

    docTagElement.addEventListener("click", () => {
        if (currentTag !== ContactTag) {
            setPage(DocTag);
            currentTag = DocTag;
        }
    })
};