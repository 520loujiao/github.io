/* 718吃瓜群众官网 · 交互脚本 v2 */
(function () {
  "use strict";

  /* 移动端菜单 */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* 页眉滚动阴影 + 返回顶部按钮 */
  var header = document.getElementById("siteHeader");
  var backTop = document.getElementById("backTop");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backTop) backTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* FAQ 手风琴 */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* 作品集筛选 */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var workCards = document.querySelectorAll(".work-card");
  var emptyTip = document.getElementById("worksEmpty");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      var visible = 0;
      workCards.forEach(function (card) {
        var match = f === "all" || card.getAttribute("data-cat") === f;
        card.classList.toggle("hidden", !match);
        if (match) visible++;
      });
      if (emptyTip) emptyTip.style.display = visible ? "none" : "block";
    });
  });

  /* 联系表单（前端演示提交） */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var email = form.querySelector("#email").value.trim();
      if (!name || !phone) {
        alert("请填写您的姓名和联系电话，方便我们尽快与您联系。");
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("邮箱格式不正确，请检查后重新填写。");
        return;
      }
      var msg = document.getElementById("formMsg");
      form.reset();
      if (msg) {
        msg.classList.add("show");
        msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setTimeout(function () { msg.classList.remove("show"); }, 6000);
      }
    });
  }

  /* 进场动画 */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  /* 页脚年份 */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
