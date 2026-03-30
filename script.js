/* ═══════════════════════════════════════════════════
   GEOSTORM ELITE — CORE SYSTEM (script.js)
═══════════════════════════════════════════════════ */

// 1. CONTROL DE ACCESO
function checkAccess() {
    const input = document.getElementById('passInput').value;
    const error = document.getElementById('errorMsg');
    
    if(input === "GEO2026") {
        document.getElementById('gatekeeper').style.display = 'none';
        console.log("ACCESS GRANTED - Initializing Systems...");
        initApp(); 
    } else {
        error.style.display = 'block';
        // Efecto visual de error
        document.getElementById('passInput').style.borderColor = 'var(--red)';
    }
}

// Permitir entrar pulsando "Enter"
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && document.getElementById('gatekeeper').style.display !== 'none') {
        checkAccess();
    }
});

// 2. INICIALIZACIÓN DE LA APP
function initApp() {
    // Aquí activamos los contadores y widgets una vez entramos
    animCount('count-analysts', 124);
    animCount('count-nodes', 42);
    // Si tienes ticker o gráficos, se cargan aquí
}

// 3. ANIMACIÓN DE CONTADORES
function animCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let v = 0;
    const step = target / 60;
    const t = setInterval(() => {
        v = Math.min(v + step, target);
        el.textContent = Math.floor(v);
        if (v >= target) clearInterval(t);
    }, 16);
}

// 4. CAMBIO DE ACTIVOS (TradingView)
function setAsset(symbol, titleText, btn) {
    // Quitar clase activa de otros botones
    document.querySelectorAll('.asset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const container = document.getElementById('tv-chart-container');
    if (container) {
        container.innerHTML = `<iframe 
            src="https://www.tradingview.com/widgetembed/?symbol=${encodeURIComponent(symbol)}&interval=D&theme=dark&style=1&locale=es" 
            width="100%" height="100%" frameborder="0"></iframe>`;
    }
    document.getElementById('tv-asset-title').textContent = titleText;
}
