const track = document.querySelector("#hero-track");
const slides = [...track.children];
const dotsWrap = document.querySelector("#dots");
const prev = document.querySelector(".hero-arrow.prev");
const next = document.querySelector(".hero-arrow.next");
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
function stop() {
  clearInterval(timer);
}

prev.addEventListener("click", () => { go(index - 1); start(); });
next.addEventListener("click", () => { go(index + 1); start(); });
track.parentElement.addEventListener("mouseenter", stop);
track.parentElement.addEventListener("mouseleave", start);
go(0);
start();

const nav = document.querySelector("#nav");
const menuToggle = document.querySelector("#menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-item > button").forEach((button) => {
  button.addEventListener("click", () => {
    if (window.innerWidth > 760 && !button.dataset.jump) return;
    const item = button.parentElement;
    if (button.dataset.jump) {
      document.getElementById(button.dataset.jump)?.scrollIntoView({ behavior: "smooth" });
      nav.classList.remove("is-open");
      return;
    }
    item.classList.toggle("is-open");
  });
});

const catalog = [
  { title: "Tarjeta CMR", hint: "100% digital", id: "productos" },
  { title: "Cuenta Sueldo", hint: "5% TREA", id: "productos" },
  { title: "Préstamo Efectivo", hint: "Simula cuotas", id: "productos" },
  { title: "Rapicash", hint: "Desembolso desde la CMR", id: "promos" },
  { title: "CMR Puntos", hint: "Canjes y promociones", id: "promos" },
  { title: "Educación financiera", hint: "Antes de contratar", id: "educacion" },
  { title: "Ayuda", hint: "Preguntas del prototipo", id: "ayuda" }
];

const search = document.querySelector("#buscar");
const pop = document.querySelector("#search-pop");

function renderSearch(query) {
  const q = query.trim().toLowerCase();
  const items = catalog.filter((item) => !q || `${item.title} ${item.hint}`.toLowerCase().includes(q));
  pop.innerHTML = "";
  items.forEach((item) => {
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
  pop.classList.toggle("is-open", document.activeElement === search || q.length > 0);
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
  hazte: {
    title: "Hazte cliente",
    text: "Cuéntanos qué producto quieres revisar. Nada de esto se envía a un banco.",
    form: true
  },
  banca: {
    title: "Banca Internet",
    text: "El acceso real no está en este prototipo. No pedimos clave, DNI ni número de tarjeta.",
    form: false
  },
  "cookies-info": {
    title: "Cookies",
    text: "En el sitio público, el aviso informa el uso de cookies. Aquí el botón Entendido solo lo oculta en este navegador.",
    form: false
  }
};

function openModal(name, product) {
  const mode = modes[name] || modes.hazte;
  modalTitle.textContent = mode.title;
  modalText.textContent = mode.text;
  modalForm.classList.toggle("is-off", !mode.form);
  document.querySelector("#modal-info-actions").hidden = mode.form;
  modalSuccess.classList.remove("is-on");
  if (product && [...producto.options].some((option) => option.value === product)) {
    producto.value = product;
  }
  overlay.hidden = false;
  overlay.classList.add("is-open");
  (mode.form ? document.querySelector("#nombre") : overlay.querySelector("[data-close]")).focus();
}

function closeModal() {
  overlay.classList.remove("is-open");
  overlay.hidden = true;
  modalText.hidden = false;
}

document.querySelectorAll("[data-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const name = trigger.dataset.open;
    if (name === "contacto") {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add("is-open"));
      return;
    }
    openModal(name, trigger.dataset.producto);
  });
});

overlay.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    drawer.classList.remove("is-open");
  }
});

document.querySelector("#enviar").addEventListener("click", () => {
  const nombre = document.querySelector("#nombre").value.trim();
  const correo = document.querySelector("#correo").value.trim();
  if (!nombre || !correo.includes("@")) {
    modalText.textContent = "Escribe tu nombre y un correo válido. Sigue sin enviarse a ningún servidor.";
    return;
  }
  document.querySelector("#success-text").textContent =
    `${nombre}, anotamos tu interés en ${producto.value}. Es una simulación local: no hay solicitud real.`;
  modalText.hidden = true;
  modalForm.classList.add("is-off");
  modalSuccess.classList.add("is-on");
});

document.querySelector("[data-close-drawer]").addEventListener("click", () => {
  drawer.classList.remove("is-open");
});
drawer.addEventListener("transitionend", () => {
  if (!drawer.classList.contains("is-open")) drawer.hidden = true;
});

document.querySelector("#enviar-mensaje").addEventListener("click", () => {
  const mensaje = document.querySelector("#mensaje").value.trim();
  const ok = document.querySelector("#mensaje-ok");
  if (!mensaje) return;
  ok.hidden = false;
  document.querySelector("#mensaje").value = "";
});

const cookie = document.querySelector("#cookie");
if (localStorage.getItem("falpe-cookie") === "1") cookie.classList.add("is-hidden");
document.querySelector("#cookie-ok").addEventListener("click", () => {
  localStorage.setItem("falpe-cookie", "1");
  cookie.classList.add("is-hidden");
});
