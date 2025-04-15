// === script.js ===
// Lógica para el CV Interactivo de Jhon Alexander Cordova Martinez

document.addEventListener('DOMContentLoaded', () => {

    console.log("CV Script Loaded Successfully!");

    // --- 1. Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
      const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
          // else { entry.target.classList.remove('is-visible'); } // Opcional: quitar si no intersecta
        });
      };
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      revealElements.forEach(el => observer.observe(el));
    } else {
      console.warn("No elements found with class 'reveal-on-scroll'.");
    }

    // --- 2. Easter Egg: Location Click (#7) ---
    const locationTrigger = document.getElementById('location-trigger');
    const locationEggElement = document.getElementById('location-easter-egg');
    if (locationTrigger && locationEggElement) {
      locationTrigger.addEventListener('click', () => {
        console.log("¡Saludos desde las famosas Grutas de Mira de Aire!");
        locationEggElement.classList.remove('hidden');
        setTimeout(() => { locationEggElement.classList.add('hidden'); }, 4000);
      });
    } else { console.warn("Location trigger or easter egg element not found."); }


    // --- 3. Easter Egg: Inactivity Overlay (#5) ---
    const inactivityOverlay = document.getElementById('inactivity-overlay');
    let inactivityTimer = null;
    const inactivityTimeoutDuration = 60000; // 60 seconds
    function showInactivityMessage() { if (inactivityOverlay) { inactivityOverlay.classList.remove('hidden'); console.log("Inactivity message shown."); } }
    function hideInactivityMessage() { if (inactivityOverlay && !inactivityOverlay.classList.contains('hidden')) { inactivityOverlay.classList.add('hidden'); console.log("Inactivity message hidden."); } }
    function resetInactivityTimer() {
      hideInactivityMessage();
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(showInactivityMessage, inactivityTimeoutDuration);
    }
    if (inactivityOverlay) {
       const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
       activityEvents.forEach(eventType => { window.addEventListener(eventType, resetInactivityTimer, { capture: false, passive: ['scroll', 'touchstart', 'mousemove'].includes(eventType) }); });
       resetInactivityTimer();
       console.log("Inactivity timer started.");
    } else { console.warn("Inactivity overlay element not found."); }

    // --- 4. Easter Egg: Name Click (Toggle Realidad Alternativa) ---
    const nameElement = document.getElementById('main-name');
    if (nameElement) {
        nameElement.style.cursor = 'pointer';
        nameElement.title = 'Haz clic para un efecto... peculiar';

        nameElement.addEventListener('click', () => {
            document.body.classList.toggle('alternate-reality-active');
            if (document.body.classList.contains('alternate-reality-active')) {
                console.log("Alternate reality ACTIVATED!");
            } else {
                console.log("Alternate reality DEACTIVATED!");
            }
        });
    } else {
        console.warn("Main name element with ID 'main-name' not found.");
    }


    // --- 5. Easter Egg: Konami Code (#1) ---
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    window.addEventListener('keydown', (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const keyPressed = event.key.toLowerCase();
      const requiredKey = konamiSequence[konamiIndex].toLowerCase();
      if (keyPressed === requiredKey) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) { triggerKonamiEffect(); konamiIndex = 0; }
      } else { konamiIndex = (keyPressed === konamiSequence[0].toLowerCase()) ? 1 : 0; }
    });
    function triggerKonamiEffect() {
      console.log('%cKONAMI CODE ACCEPTED!', 'color: #e67e22; font-size: 1.5em; font-weight: bold;');
      console.log('+30 Vidas (para los bugs 🐛)');
      document.body.classList.add('konami-active');
      const profilePic = document.querySelector('.profile-picture');
      if(profilePic) { profilePic.classList.add('easter-egg-wiggle'); setTimeout(() => profilePic.classList.remove('easter-egg-wiggle'), 500); }
      setTimeout(() => { document.body.classList.remove('konami-active'); }, 800);
    }

    // --- 6. Background Mouse Interaction ---
    const updateMouseCoords = (event) => {
      const mouseXPercent = (event.clientX / window.innerWidth) * 100;
      const mouseYPercent = (event.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', mouseXPercent.toFixed(2));
      document.documentElement.style.setProperty('--mouse-y', mouseYPercent.toFixed(2));
    };
    window.addEventListener('mousemove', updateMouseCoords, { passive: true });
    document.documentElement.style.setProperty('--mouse-x', '50');
    document.documentElement.style.setProperty('--mouse-y', '50');

    // --- 7. Intersection Observer for Dynamic Layout ---
    const sidebarEndTrigger = document.getElementById('sidebar-end-trigger'); // Trigger es el final del sidebar
    const sidebarElement = document.querySelector('.sidebar');
    const cvBodyElement = document.querySelector('.cv-body');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');

    if (sidebarEndTrigger && sidebarElement && cvBodyElement && toggleSidebarBtn) {
        const layoutObserverOptions = {
            root: null,
            rootMargin: '0px 0px -100% 0px', // Trigger cuando el trigger sale 100% por arriba
            threshold: 0
        };

        const layoutObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Si NO intersecta Y está ARRIBA del viewport -> Ocultar sidebar y MOSTRAR botón
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    if (!cvBodyElement.classList.contains('full-width-mode')) {
                        sidebarElement.classList.add('sidebar-hidden');
                        cvBodyElement.classList.add('full-width-mode');
                        console.log('Layout: Full width activated by scroll');
                    }
                    document.body.classList.add('sidebar-hidden-by-scroll'); // Muestra botón
                    // Actualiza icono por si se quedó en 'x' por el botón
                    toggleSidebarBtn.querySelector('i').className = sidebarElement.classList.contains('sidebar-hidden') ? 'fas fa-bars' : 'fas fa-times';

                }
                // Si intersecta (visible o entrando desde arriba) -> Mostrar sidebar y OCULTAR botón
                else if (entry.isIntersecting) {
                     // Siempre restaurar layout y ocultar botón al subir
                     sidebarElement.classList.remove('sidebar-hidden');
                     cvBodyElement.classList.remove('full-width-mode');
                     document.body.classList.remove('sidebar-hidden-by-scroll'); // Oculta botón
                     console.log('Layout: Two columns restored by scroll');
                }
            });
        };

        const layoutObserver = new IntersectionObserver(layoutObserverCallback, layoutObserverOptions);
        layoutObserver.observe(sidebarEndTrigger); // Observamos el final del sidebar

        // --- 8. Toggle Button Click Listener (Versión donde gestiona también sidebar-hidden-by-scroll) ---
        // Esta es la lógica de la versión "Con Botón Toggle Sidebar"
        toggleSidebarBtn.addEventListener('click', () => {
            sidebarElement.classList.toggle('sidebar-hidden');
            cvBodyElement.classList.toggle('full-width-mode');

            // Cambiar icono del botón
            const icon = toggleSidebarBtn.querySelector('i');
            if (sidebarElement.classList.contains('sidebar-hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                console.log('Sidebar hidden by button');
                // Aseguramos que el body tenga la clase para mostrar el botón
                document.body.classList.add('sidebar-hidden-by-scroll');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                console.log('Sidebar shown by button');
                // Quitamos la clase del body si mostramos con botón
                document.body.classList.remove('sidebar-hidden-by-scroll');
            }
        });

    } else {
         console.warn("Could not find elements needed for dynamic layout observer or toggle button.");
    }


}); // End DOMContentLoaded wrapper