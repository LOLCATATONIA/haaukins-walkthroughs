// Værktøjs-tooltip (se .gloss i style.css). Positioneres via JS i stedet for
// CSS ::after/position:absolute, fordi en <pre>'s overflow-x:auto reelt også
// klipper overflow-y (CSS-spec-kvirk), hvilket skar tooltippen af når et
// værktøjsnavn stod inde i et kode-blok. En fixed-positioneret, body-vedhæftet
// delt tooltip-boks undgår ALLE overflow-ancestors.
(function () {
  var tip = document.createElement("div");
  tip.id = "gloss-tip";
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);

  function show(el) {
    tip.textContent = el.getAttribute("data-tip");
    tip.style.display = "block";
    var r = el.getBoundingClientRect();
    var top = r.top - tip.offsetHeight - 8;
    if (top < 4) top = r.bottom + 8; // ikke plads ovenfor -> vis under i stedet
    var left = Math.min(
      Math.max(4, r.left),
      window.innerWidth - tip.offsetWidth - 4
    );
    tip.style.top = top + "px";
    tip.style.left = left + "px";
  }

  function hide() {
    tip.style.display = "none";
  }

  document.querySelectorAll(".gloss").forEach(function (el) {
    el.addEventListener("mouseenter", function () { show(el); });
    el.addEventListener("mouseleave", hide);
    el.addEventListener("focus", function () { show(el); });
    el.addEventListener("blur", hide);
  });
})();
