{\rtf1\ansi\ansicpg1254\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const contactButtons = document.querySelectorAll(".contact-button");\
const form = document.getElementById("contactForm");\
const formMessage = document.getElementById("formMessage");\
\
contactButtons.forEach((button) => \{\
  button.addEventListener("click", () => \{\
    const productName = button.dataset.product;\
    const messageField = form.querySelector("textarea[name='message']");\
    messageField.value = `$\{productName\} i\'e7in teklif almak istiyorum.`;\
    form.scrollIntoView(\{ behavior: "smooth", block: "center" \});\
    messageField.focus();\
  \});\
\});\
\
form.addEventListener("submit", (event) => \{\
  event.preventDefault();\
  formMessage.textContent = "Te\uc0\u351 ekk\'fcrler! Talebiniz al\u305 nd\u305 , en k\u305 sa s\'fcrede d\'f6n\'fc\u351  yapaca\u287 \u305 z.";\
  formMessage.style.color = "#3a5b2a";\
  form.reset();\
\});}