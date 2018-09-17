import {RegexGenerationPage} from './regex_generation/RegexGeneration.js';
import {HeaderMenu} from "./header_menu/HeaderMenu.js";

//loading header menu
const headerMenu = new HeaderMenu(document.getElementById("pages"), "GENERATE");
document.getElementsByClassName("header-menu")[0].appendChild(headerMenu.html);