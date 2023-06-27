// ==UserScript==
// @name         Bing Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script for search in BING
// @author       Galina Pankratova
// @match        https://www.bing.com/*
// @match        https://www.auto.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

let links = document.links
let search_button = document.getElementsByName("search")[0];
let keywords = ["Продать автомобиль", "купить машину", "Срочно продать машину"];
let keyword = keywords[getRandom(0, keywords.length)];

if (search_button != undefined) {
  document.getElementsByName("q")[0].value = keyword;
  search_button.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("auto.ru")) {
      let link = links[i];
      console.log("Нашел строку " + links[i]);
      link.click();
      break;
    }
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
