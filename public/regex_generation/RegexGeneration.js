import {regexGenerationApiCall} from './RegexGenerationApiCall.js';
import {Rocket} from "../rocket/Rocket.js";
import {RocketAnimationTriggerService} from '../rocket/RocketAnimationTriggerService.js';
import {HorizontalBar} from '../horizontal_bar/HorizontalBar.js';

export class RegexGenerationPage {
    constructor() {
        const regexGenerationPageContaier = document.createElement("div");
        regexGenerationPageContaier.innerHTML = html;

        const optionCollapsibleMenu = new HorizontalBar("Options");
        regexGenerationPageContaier.querySelector("#option-bar").appendChild(optionCollapsibleMenu.html);

        this.html = regexGenerationPageContaier;
        this.makeComponentInteractable();
    }

    makeComponentInteractable() {
        setTimeout(() => {

            const regexGenerationContainer = this.html.querySelector("#regex-generation-container");
            const input = regexGenerationContainer.querySelector('input');
            const button = regexGenerationContainer.querySelector('.compute-button');
            const rocketSvgContainer = button.querySelector('.button-rocket');
            const value = regexGenerationContainer.querySelector('.output div');
            const cloudContainer = this.html.querySelector("#cloud-container");

            const rocketElement = new Rocket();
            rocketSvgContainer.appendChild(rocketElement.html);

            function executeRegexGeneration() {
                new RocketAnimationTriggerService(cloudContainer).triggerAnimation(rocketElement);
                return regexGenerationApiCall(input.value, axios).then((response) => {
                    if (value.innerText !== response.data) {
                        value.innerText = response.data;
                    }
                }).catch((err) => {
                    console.error(err)
                })
            }

            button.addEventListener('click', () => {
                return executeRegexGeneration();
            });

            input.addEventListener('keyup', (keyEvent) => {
                if (keyEvent.key === "Enter") {
                    return executeRegexGeneration();
                }
            });
        })
    }
}

const html = `
    <!-- Introduction paragraph -->
    <div class="center">
        <div class="first-line">Regex Odyssey embark you on a journey where</div>
        <div class="second-line"> Strings are generated from Regex in a highly customizable way.</div>
    </div>
    
    <!-- Regex Generation Module -->
    <div id="regex-generation-container" class="regex-generation-container">
        <link rel="stylesheet" href="/regex_generation/regex.css">
        <input type="text" placeholder="Write and send Regex to the rocket."/>
        <button class="compute-button">
            <div class="button-rocket" style="display: grid"></div>
        </button>
        <div id="option-bar">
        </div>
        <div class="output">
            <div>results...</div>
        </div>
    </div>
    <div id="cloud-container"></div>
    <!-- End Regex Generation Module -->
`;