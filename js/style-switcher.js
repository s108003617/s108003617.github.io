/* nav colors */
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", function () {
    // 移除所有連結的 active 類
    document
      .querySelectorAll(".nav a")
      .forEach((a) => a.classList.remove("active"));

    // 將當前點擊的連結設置為 active
    this.classList.add("active");
  });
});
/* toggle style switcher */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});
// hide style - switcher on scroll
window.addEventListener("scroll", () => {
  if (document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
});
/* theme colors */
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "ture");
    }
  });
}
/* theme light and dark mode */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
});
window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    dayNight.querySelector("i").classList.add("fa-moon");
  }
});
/* change language */
// 定義一個通用的重定向函數
const changeLanguage = (url) => {
  window.location.href = url;
};

// 獲取語言選項
const languages = document.querySelectorAll("[data-lang]");

// 為每個語言選項添加事件監聽器
languages.forEach((lang) => {
  lang.addEventListener("click", () => {
    const url = lang.getAttribute("data-lang");
    changeLanguage(url);
  });
});
