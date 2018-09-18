import {HorizontalBar} from "../../horizontal_bar/HorizontalBar.js";

export class OptionMenu extends HorizontalBar {
    constructor() {
        const optionElement = document.createElement("div");
        optionElement.innerHTML = html;
        super("Options", optionElement);
    }

    getOptionValues() {
        const numberInput = parseInt(this.html.querySelector("input").value);
        return {
            number: numberInput
        }
    }

}

const html = `
      <link rel="stylesheet" href="/regex_generation/option/OptionMenu.css">
      <div class="option-menu-container">
            <div class="number-choice">
                <div>Number of generated string : </div>
                <input type="text"/>  
            </div>
      </div>
`;