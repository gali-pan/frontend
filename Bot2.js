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
let bingInput = document.getElementsByName("q")[0];

if (search_button != undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      search_button.click();
    }
  }, 500);
} else if (location.hostname == "auto.ru") {
  console.log("Мы на сайте!");

  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.bing.com/";
    }
    if (links.length == 0) {
      location.href = "https://www.auto.ru";
    }
    else if (links[index].href.indexOf("auto.ru") != -1) {
      links[index].click();
    }
  }, getRandom(3500, 5500))

} else {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("auto.ru")) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(3500, 5500));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let element = document.querySelector(".b_pag");

    if (element != null) {
      if (element.innerText == "/n5") {
        nextBingPage = false;
        location.href = "https://www.bing.com/";
      }
      clearInterval(elementExist);
    }
  }, 150)
  if (document.querySelector(".b_pag").innerText == "/n5") {
    nextBingPage = false;
    location.href = "https://www.bing.com/";
  }
  if (nextBingPage) {
    setTimeout(() => {
      pnnext.click();
    }, getRandom(5000, 7000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
