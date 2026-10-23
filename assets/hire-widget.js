// "Hyr mig"-widget (#hire-widget i PAGE-skabelonen i gen.py). Bevidst UDEN
// persisteret dismiss-tilstand — luk-knappen skjuler den kun for den
// aktuelle visning, den popper op igen ved næste indlæsning/reload.
(function () {
  var el = document.getElementById("hire-widget");
  if (!el) return;
  var closeBtn = el.querySelector(".hw-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      el.style.display = "none";
    });
  }
})();
