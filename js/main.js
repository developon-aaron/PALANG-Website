import { CountUp } from "../vendor/countUp.min.js";
window.history.scrollRestoration = "manual";
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("load", () => window.scrollTo(0, 0));
(function () {
  // ====== DOM 준비 후 실행 ======
  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  onReady(() => {
    // ====== 네비 토글 ======
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
      nav.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", () => nav.classList.remove("open"));
      });
    }

    // ====== 푸터 연도 ======
    const y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    // ====== CountUp.js ======
    const CountUpClass = CountUp;
    const ids = ["count1", "count2", "count3", "count4"];
    const missing = ids.filter((id) => !document.getElementById(id));
    if (missing.length) {
      console.error("다음 ID 요소를 찾지 못했습니다:", missing);
      return;
    }

    const counters = [
      new CountUpClass("count1", 10, {
        prefix: "$",
        duration: 2,
        useGrouping: true,
        separator: ",",
      }),
      new CountUpClass("count2", 30, { suffix: " s", duration: 2 }),
      new CountUpClass("count3", 0.1, {
        decimalPlaces: 1,
        suffix: "%",
        duration: 2,
      }),
      new CountUpClass("count4", 1100, {
        suffix: " m²",
        duration: 2,
        useGrouping: true,
        separator: ",",
      }),
    ];

    const grid = document.querySelector(".stats-grid");
    if (grid) {
      let started = false;
      const run = () => {
        if (started) return;
        counters.forEach((c) => c.start());
        started = true;
      };

      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              run();
              io.disconnect();
            }
          },
          { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
        );
        io.observe(grid);
      } else {
        run();
      }
    }

    // ====== 맨 위로 가기 버튼 (Back to Top) ======
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        const isVisible = window.scrollY > 300;
        backToTopBtn.style.opacity = isVisible ? "1" : "0";
        backToTopBtn.style.pointerEvents = isVisible ? "auto" : "none";
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  });
})();
