document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // Internationalization (i18n) Translations
  // ==========================================================================
  const translations = {
    es: {
      particulares: "Particulares",
      empresas: "Empresas",
      autonomos: "Autónomos",
      bancaPrivada: "Banca Privada",
      seguridad: "Seguridad",
      volverHome: "Volver a Portal Principal",
      bienvenidoTitle: "Acceso a BS Online",
      bienvenidoSub: "Introduce tus datos para acceder a tu Banca a Distancia de forma 100% segura.",
      tabParticulares: "Particulares",
      tabEmpresas: "Empresas",
      lblUsuario: "NIF / NIE / Usuario",
      lblClave: "Clave de acceso",
      btnTeclado: "Teclado Virtual",
      tecladoTitulo: "Teclado seguro en pantalla",
      tecladoBorrar: "Borrar",
      chkRecordar: "Recordar mi usuario en este navegador",
      btnEntrar: "Entrar a BS Online",
      linkOlvidado: "¿Has olvidado tu clave?",
      linkSolicitar: "Obtener claves",
      linkDemo: "Demostración",
      lblEmpCodigo: "Código de Empresa / NIF",
      lblEmpUsuario: "Usuario Secundario / DNI",
      btnEntrarEmpresas: "Entrar a BS Online Empresas",
      secBannerTitle: "Aviso importante de seguridad",
      secBannerBody: "Banco Sabadell nunca te solicitará tus claves de acceso, firma digital o códigos SMS por email o teléfono.",
      sideHazteTitle: "¿Aún no eres cliente?",
      sideHazteSub: "Abre tu Cuenta Online Sabadell en menos de 10 minutos sin comisiones y con rentabilidad garantizada.",
      btnHazteCliente: "Abrir cuenta online",
      sideAppTitle: "App BS Mobile",
      sideAppSub: "Lleva tu banco siempre contigo. Autoriza tus operaciones al instante con Firma Digital móvil.",
      qrScan: "Escanea el QR",
      sideHelpTitle: "¿Necesitas ayuda?",
      sideHelpSub: "Servicio de atención al cliente disponible 24 horas al día, 7 días a la semana.",
      title2FA: "Autorización de Acceso Seguro",
      sub2FA: "Hemos enviado un código de verificación SMS a tu móvil finalizado en ",
      timerText: "El código expira en:",
      btnConfirmar2FA: "Verificar y Entrar",
      linkReenviar: "¿No has recibido el código? Reenviar SMS",
      dashPosicion: "Posición Global - BS Online"
    },
    ca: {
      particulares: "Particulars",
      empresas: "Empreses",
      autonomos: "Autònoms",
      bancaPrivada: "Banca Privada",
      seguridad: "Seguretat",
      volverHome: "Tornar al Portal Principal",
      bienvenidoTitle: "Accés a BS Online",
      bienvenidoSub: "Introdueix les teves dades per accedir a la teva Banca a Distància de manera 100% segura.",
      tabParticulares: "Particulars",
      tabEmpresas: "Empreses",
      lblUsuario: "NIF / NIE / Usuari",
      lblClave: "Clau d'accés",
      btnTeclado: "Teclat Virtual",
      tecladoTitulo: "Teclat segur en pantalla",
      tecladoBorrar: "Esborrar",
      chkRecordar: "Recordar el meu usuari en aquest navegador",
      btnEntrar: "Entrar a BS Online",
      linkOlvidado: "Has oblidat la teva clau?",
      linkSolicitar: "Obtenir claus",
      linkDemo: "Demostració",
      lblEmpCodigo: "Codi d'Empresa / NIF",
      lblEmpUsuario: "Usuari Secundari / DNI",
      btnEntrarEmpresas: "Entrar a BS Online Empreses",
      secBannerTitle: "Avís important de seguretat",
      secBannerBody: "Banc Sabadell mai et sol·licitarà les teves claus d'accés o codis SMS per email o telèfon.",
      sideHazteTitle: "Encara no ets client?",
      sideHazteSub: "Obre el teu Compte Online Sabadell en menys de 10 minuts sense comissions.",
      btnHazteCliente: "Obrir compte online",
      sideAppTitle: "App BS Mobile",
      sideAppSub: "Porta el teu banc sempre amb tu. Autoritza les teves operacions a l'instant.",
      qrScan: "Escaneja el QR",
      sideHelpTitle: "Necessites ajuda?",
      sideHelpSub: "Servei d'atenció al client disponible les 24 hores del dia, els 7 dies de la setmana.",
      title2FA: "Autorització d'Accés Segur",
      sub2FA: "Hem enviat un codi de verificació SMS al teu mòbil finalitzat en ",
      timerText: "El codi expira en:",
      btnConfirmar2FA: "Verificar i Entrar",
      linkReenviar: "No has rebut el codi? Reenviar SMS",
      dashPosicion: "Posició Global - BS Online"
    },
    en: {
      particulares: "Individuals",
      empresas: "Businesses",
      autonomos: "Self-employed",
      bancaPrivada: "Private Banking",
      seguridad: "Security",
      volverHome: "Back to Main Portal",
      bienvenidoTitle: "BS Online Access",
      bienvenidoSub: "Enter your credentials to securely access your Online Banking.",
      tabParticulares: "Individuals",
      tabEmpresas: "Businesses",
      lblUsuario: "NIF / NIE / Username",
      lblClave: "Access Password",
      btnTeclado: "Virtual Keypad",
      tecladoTitulo: "Secure On-screen Keypad",
      tecladoBorrar: "Clear",
      chkRecordar: "Remember my username on this browser",
      btnEntrar: "Log in to BS Online",
      linkOlvidado: "Forgot password?",
      linkSolicitar: "Request keys",
      linkDemo: "Demo",
      lblEmpCodigo: "Company Code / NIF",
      lblEmpUsuario: "Secondary User / DNI",
      btnEntrarEmpresas: "Log in to BS Online Business",
      secBannerTitle: "Important Security Notice",
      secBannerBody: "Banco Sabadell will never request your access passwords or SMS codes via email or phone.",
      sideHazteTitle: "Not a customer yet?",
      sideHazteSub: "Open your Sabadell Online Account in under 10 minutes with zero fees.",
      btnHazteCliente: "Open online account",
      sideAppTitle: "BS Mobile App",
      sideAppSub: "Take your bank anywhere. Authorize operations instantly with Mobile Digital Signature.",
      qrScan: "Scan QR",
      sideHelpTitle: "Need help?",
      sideHelpSub: "Customer support available 24 hours a day, 7 days a week.",
      title2FA: "Secure Access Authorization",
      sub2FA: "We sent an SMS verification code to your mobile ending in ",
      timerText: "Code expires in:",
      btnConfirmar2FA: "Verify & Enter",
      linkReenviar: "Didn't receive the code? Resend SMS",
      dashPosicion: "Global Position - BS Online"
    }
  };

  // Language Selector
  const langSelect = document.querySelector("#sb-lang-select");
  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    const dict = translations[lang] || translations.es;
    document.querySelectorAll("[data-lang-key]").forEach((elem) => {
      const key = elem.dataset.langKey;
      if (dict[key]) {
        elem.textContent = dict[key];
      }
    });
  });

  // ==========================================================================
  // Tabs Navigation (Particulares / Empresas)
  // ==========================================================================
  const tabParticulars = document.querySelector("#tab-particulars");
  const tabEmpresas = document.querySelector("#tab-empresas");
  const formParticulars = document.querySelector("#form-particulars");
  const formEmpresas = document.querySelector("#form-empresas");

  tabParticulars.addEventListener("click", () => {
    tabParticulars.classList.add("is-active");
    tabParticulars.setAttribute("aria-selected", "true");
    tabEmpresas.classList.remove("is-active");
    tabEmpresas.setAttribute("aria-selected", "false");
    formParticulars.hidden = false;
    formParticulars.classList.add("is-active");
    formEmpresas.hidden = true;
    formEmpresas.classList.remove("is-active");
  });

  tabEmpresas.addEventListener("click", () => {
    tabEmpresas.classList.add("is-active");
    tabEmpresas.setAttribute("aria-selected", "true");
    tabParticulars.classList.remove("is-active");
    tabParticulars.setAttribute("aria-selected", "false");
    formEmpresas.hidden = false;
    formEmpresas.classList.add("is-active");
    formParticulars.hidden = true;
    formParticulars.classList.remove("is-active");
  });

  // ==========================================================================
  // Password Visibility Toggle
  // ==========================================================================
  const btnTogglePass = document.querySelector("#btn-toggle-pass");
  const partClaveInput = document.querySelector("#part-clave");

  btnTogglePass.addEventListener("click", () => {
    const isPass = partClaveInput.type === "password";
    partClaveInput.type = isPass ? "text" : "password";
    btnTogglePass.innerHTML = isPass
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  });

  // ==========================================================================
  // Virtual Keypad Implementation
  // ==========================================================================
  const btnToggleKeypad = document.querySelector("#btn-toggle-keypad");
  const btnCloseKeypad = document.querySelector("#btn-close-keypad");
  const keypadPanel = document.querySelector("#keypad-panel");
  const keypadButtons = document.querySelector("#keypad-buttons");
  const keypadClear = document.querySelector("#keypad-clear");

  function generateShuffledKeypad() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Fisher-Yates shuffle
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    keypadButtons.innerHTML = "";
    digits.forEach((num) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sb-keypad-num";
      btn.textContent = num;
      btn.addEventListener("click", () => {
        if (partClaveInput.value.length < 12) {
          partClaveInput.value += num;
        }
      });
      keypadButtons.append(btn);
    });
  }

  btnToggleKeypad.addEventListener("click", () => {
    const isOpen = !keypadPanel.hidden;
    if (isOpen) {
      keypadPanel.hidden = true;
    } else {
      generateShuffledKeypad();
      keypadPanel.hidden = false;
    }
  });

  btnCloseKeypad.addEventListener("click", () => {
    keypadPanel.hidden = true;
  });

  keypadClear.addEventListener("click", () => {
    partClaveInput.value = "";
  });

  // ==========================================================================
  // LocalStorage Username Persistence
  // ==========================================================================
  const userInput = document.querySelector("#part-usuario");
  const recordarCheck = document.querySelector("#part-recordar");

  const savedUser = localStorage.getItem("sb_saved_user");
  if (savedUser) {
    userInput.value = savedUser;
    recordarCheck.checked = true;
  }

  // ==========================================================================
  // 2FA Verification Modal & Countdown Timer
  // ==========================================================================
  const modal2FA = document.querySelector("#modal-2fa");
  const btnClose2FA = document.querySelector("#btn-close-2fa");
  const otpTimerElem = document.querySelector("#otp-timer");
  const otpInputs = [...document.querySelectorAll(".sb-otp-input")];
  const btnConfirm2FA = document.querySelector("#btn-confirm-2fa");
  const modalDashboard = document.querySelector("#modal-dashboard");
  const btnCloseDashboard = document.querySelector("#btn-close-dashboard");
  const btnLogoutDemo = document.querySelector("#btn-logout-demo");

  let timerInterval = null;

  function start2FATimer() {
    clearInterval(timerInterval);
    let duration = 120; // 2 minutes
    otpTimerElem.textContent = "02:00";
    timerInterval = setInterval(() => {
      duration--;
      const mins = String(Math.floor(duration / 60)).padStart(2, "0");
      const secs = String(duration % 60).padStart(2, "0");
      otpTimerElem.textContent = `${mins}:${secs}`;
      if (duration <= 0) {
        clearInterval(timerInterval);
        otpTimerElem.textContent = "Expirado";
      }
    }, 1000);
  }

  // OTP inputs auto focus transition
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const val = e.target.value;
      if (val.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  function open2FAModal(username) {
    if (recordarCheck.checked) {
      localStorage.setItem("sb_saved_user", username);
    } else {
      localStorage.removeItem("sb_saved_user");
    }
    modal2FA.hidden = false;
    otpInputs.forEach((inp) => (inp.value = ""));
    otpInputs[0].focus();
    start2FATimer();
  }

  function close2FAModal() {
    modal2FA.hidden = true;
    clearInterval(timerInterval);
  }

  btnClose2FA.addEventListener("click", close2FAModal);

  document.querySelector("#btn-resend-otp").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Se ha reenviado un nuevo código SMS de 6 dígitos.");
    start2FATimer();
  });

  // ==========================================================================
  // Form Submission Handlers
  // ==========================================================================
  formParticulars.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = userInput.value.trim();
    const pass = partClaveInput.value;

    if (!user || !pass) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const btnSubmit = document.querySelector("#btn-submit-login");
    const originalText = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<span>Verificando...</span>`;

    setTimeout(() => {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalText;
      open2FAModal(user);
    }, 800);
  });

  formEmpresas.addEventListener("submit", (e) => {
    e.preventDefault();
    const empCod = document.querySelector("#emp-codigo").value.trim();
    const empUser = document.querySelector("#emp-usuario").value.trim();
    const empPass = document.querySelector("#emp-clave").value;

    if (!empCod || !empUser || !empPass) {
      alert("Por favor, rellena los datos de la empresa.");
      return;
    }
    open2FAModal(empUser);
  });

  // Confirm 2FA Access
  btnConfirm2FA.addEventListener("click", () => {
    const code = otpInputs.map((i) => i.value).join("");
    if (code.length < 6) {
      alert("Introduce el código de 6 dígitos que te enviamos por SMS.");
      return;
    }
    close2FAModal();
    
    // Open Dashboard modal simulation
    const nameToDisplay = userInput.value.trim() || "Cliente Sabadell";
    document.querySelector("#dashboard-username").textContent = `Hola, ${nameToDisplay}`;
    modalDashboard.hidden = false;
  });

  btnCloseDashboard.addEventListener("click", () => {
    modalDashboard.hidden = true;
  });

  btnLogoutDemo.addEventListener("click", () => {
    modalDashboard.hidden = true;
    partClaveInput.value = "";
    alert("Has cerrado la sesión de prueba.");
  });
});
