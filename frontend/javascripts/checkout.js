const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "order_successfull_page.html";
});