class HorizontalBar {
    constructor() {
        const containerElement = document.createElement("div");

        this.html = html;
        this.style = style;
    }
}

const html = `
    <div class="bar"
         style="display: grid; grid-template-columns: [beginspace] 10px [begin] auto [title] 8fr [bar] auto">
        <div class="trigger"></div>
        <div class="title trigger">Options</div>
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
`;

const style = `
<link rel="stylesheet" href="HorizontalBar.css"/>
`;