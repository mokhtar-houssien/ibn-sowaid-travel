"use strict";
const nav = document.getElementById("main-nav");
const menu = document.querySelector(".menu-btn");
menu.addEventListener("click", () => {
  const opened = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!opened));
  menu.setAttribute("aria-label", opened ? "فتح القائمة" : "إغلاق القائمة");
  menu.textContent = opened ? "☰" : "✕";
  nav.classList.toggle("open", !opened);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menu.textContent = "☰"; menu.setAttribute("aria-expanded","false");
}));
const form = document.getElementById("bookingForm");
const service = document.getElementById("serviceType");
const shipmentFields = document.getElementById("shippingFields");
const route = document.getElementById("shippingRoute");
const error = document.getElementById("formError");
function refreshShipping(){
  const isShipping = service.value === "shipping";
  shipmentFields.hidden = !isShipping;
  route.required = isShipping;
  if(!isShipping) route.value = "";
}
service.addEventListener("change", refreshShipping);
function chooseService(code, routeValue = "") {
  service.value = code;
  refreshShipping();
  if(routeValue) route.value = routeValue;
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
  service.focus({preventScroll:true});
}
document.querySelectorAll("[data-service]").forEach(el => el.addEventListener("click", ev => {
  ev.preventDefault(); chooseService(el.dataset.service);
}));
document.querySelectorAll("[data-route]").forEach(el => el.addEventListener("click", () => chooseService("shipping",el.dataset.route)));
form.addEventListener("submit", ev => {
  ev.preventDefault(); error.textContent = "";
  const nameEl = document.getElementById("fullName");
  const phoneEl = document.getElementById("phone");
  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim().replace(/[\s()\-]/g, "");
  if(name.length < 3){error.textContent="يرجى إدخال الاسم الكامل (3 أحرف على الأقل).";nameEl.focus();return;}
  if(!/^\+?\d{9,15}$/.test(phone)){error.textContent="يرجى إدخال رقم هاتف صحيح (9 إلى 15 رقمًا).";phoneEl.focus();return;}
  if(!service.value){error.textContent="يرجى اختيار الخدمة المطلوبة.";service.focus();return;}
  if(service.value === "shipping" && !route.value){error.textContent="يرجى اختيار مسار الإرسالية.";route.focus();return;}
  const sendTo = document.getElementById("recipient").value;
  const allowedNumbers = ["967774642465","967771402519"];
  if(!allowedNumbers.includes(sendTo)){error.textContent="يرجى اختيار رقم تواصل صحيح.";return;}
  const lines = ["السلام عليكم ورحمة الله وبركاته", "أرغب في تقديم طلب لدى ابن سويد للسفريات والسياحة:", "",`الاسم: ${name}`, `رقم التواصل: ${phone}`, `الخدمة: ${service.selectedOptions[0].textContent}`];
  if(service.value === "shipping"){
    lines.push(`مسار الإرسالية: ${route.value}`);
    const details = document.getElementById("shipmentDetails").value.trim();
    if(details) lines.push(`وصف الإرسالية: ${details}`);
  }
  const message = document.getElementById("message").value.trim();
  if(message) lines.push(`تفاصيل أخرى: ${message}`);
  lines.push("", "أرجو التواصل معي وتوضيح التفاصيل والتكلفة والتوفر.");
  window.location.assign(`https://wa.me/${sendTo}?text=${encodeURIComponent(lines.join("\n"))}`);
});
document.getElementById("year").textContent = new Date().getFullYear();
refreshShipping();
