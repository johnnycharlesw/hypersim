import { RNG } from '../common/randomness/RNG.js';
import * as marked from 'marked';
import {feather} from 'feather-icons';

let splash = document.getElementById('splash');
let marked_ = new marked.Marked();
let username = "FocusPup824";
let splashes: string[] = [];
// Use fetch to load the splashes.md file
fetch('splashes.md')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load splashes.md: ${response.status} ${response.statusText}`);
    }
    return response.text();
  })
  .then((splashesMd) => {
    console.log("File content:", splashesMd);
    // Parse the Markdown content
    let splashesHtml = marked_.parse(splashesMd);
    console.log("Parsed HTML:", splashesHtml.toString());

    // Parse the HTML string into a DOM
    let splashesParser = new DOMParser();
    let splashesDoc = splashesParser.parseFromString(splashesHtml.toString(), 'text/html');
    console.log("Parsed DOM:", splashesDoc.body.children);

    // Extract all top-level elements (e.g., <p>, <li>)
    let splashesElements = Array.from(splashesDoc.body.children.item(0)!.children);
    console.log("Splashes elements:", splashesElements);

    // Extract the innerHTML of each element
    splashesElements.forEach(element => {
      splashes.push(element.innerHTML.replace('{{{username}}}', username));
    });
    console.log("Splashes array:", splashes);

    // Select a random splash
    let dice = new RNG(null);
    let splashIndex = dice.randomIntBetween(0, splashes.length - 1);
    console.log("Random index:", splashIndex);

    // Display the random splash
    if (splashes[splashIndex]) {
      splash!.innerHTML = splashes[splashIndex]!;
      console.log("Displayed splash:", splashes[splashIndex]);
      feather.replace();
    } else {
      console.error("Failed to display splash: splashIndex or splash element is invalid.");
    }
  })
  .catch((error) => {
    console.error("Error loading splashes.md:", error);
  });

