export class HorizontalBar {
    constructor(titleName) {
        const containerElement = document.createElement("div");
        containerElement.innerHTML = html(titleName);
        this.html = containerElement;
        this.makeComponentInteractable();
    }

    makeComponentInteractable() {
        setTimeout(() => {
            const bar = this.html.querySelector(".bar");
            const arrow = bar.querySelector(".arrow");
            const optionBar = bar.querySelector(".option-bar");
            const elementContent = optionBar.querySelector(".content");
            const allTriggerElements = bar.querySelectorAll(".trigger");

            const hide = function () {
                arrow.classList.remove("arrow-down");
                arrow.classList.add("arrow-left");
                optionBar.classList.remove("all-border");
                optionBar.style.height = `1px`;
            };
            const display = function () {
                arrow.classList.remove("arrow-left");
                arrow.classList.add("arrow-down");
                optionBar.classList.add("all-border");
                optionBar.style.height = `${elementContent.getBoundingClientRect().height + parseInt(window.getComputedStyle(elementContent).marginTop)}px`;
            };

            allTriggerElements.forEach((element) => {
                element.addEventListener("click", () => {
                    if (arrow.classList.contains("arrow-left")) {
                        display()
                    } else {
                        hide()
                    }
                });
            });
        });
    }
}

const html = (titleName) => {
    return `
       <div class="bar"
         style="display: grid; grid-template-columns: [beginspace] 10px [begin] auto [title] 8fr [bar] auto">
        <link rel="stylesheet" href="/horizontal_bar/HorizontalBar.css"/>
        <div class="trigger"></div>
        <div class="title trigger">${titleName}</div>
        <div class="trigger"></div>
        <div class="arrow arrow-left trigger"><img src="/resources/left-arrow_simple.svg"></div>
        <div class="option-bar top-border" style="grid-column: 1 / -1">
            <div class="content">
                <div>Button
                    <button></button>
                </div>
                <div>zdzd</div>
            </div>
        </div>
    </div> 
    `
};