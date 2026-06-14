const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");
const rejectCookies = document.getElementById("rejectCookies");
const saveCookies = document.getElementById("saveCookies");
const openCookies = document.getElementById("openCookies");

const analyticsConsent = document.getElementById("analyticsConsent");
const clarityConsent = document.getElementById("clarityConsent");

const loadBooking = document.getElementById("loadBooking");
const bookingConsent = document.getElementById("bookingConsent");
const bookingFrame = document.getElementById("bookingFrame");

function getConsent(){
  return JSON.parse(localStorage.getItem("cookieConsent") || "null");
}

function setConsent(data){
  localStorage.setItem("cookieConsent", JSON.stringify(data));
}

function loadGoogleAnalytics(){
  if(window.gaLoaded) return;
  window.gaLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-71BRGPGRK7";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-71BRGPGRK7", { anonymize_ip: true });
}

function loadMicrosoftClarity(){
  if(window.clarityLoaded) return;
  window.clarityLoaded = true;

  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);
    t.async=1;
    t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "vfs6tle3tf");
}

function applyConsent(){
  const consent = getConsent();

  if(!consent){
    cookieBanner.classList.add("active");
    return;
  }

  cookieBanner.classList.remove("active");

  if(consent.analytics){
    loadGoogleAnalytics();
  }

  if(consent.clarity){
    loadMicrosoftClarity();
  }
}

acceptCookies.addEventListener("click", function(){
  setConsent({
    necessary:true,
    analytics:true,
    clarity:true
  });

  applyConsent();
});

rejectCookies.addEventListener("click", function(){
  setConsent({
    necessary:true,
    analytics:false,
    clarity:false
  });

  applyConsent();
});

saveCookies.addEventListener("click", function(){
  setConsent({
    necessary:true,
    analytics:analyticsConsent.checked,
    clarity:clarityConsent.checked
  });

  applyConsent();
});

openCookies.addEventListener("click", function(){
  const consent = getConsent();

  if(consent){
    analyticsConsent.checked = Boolean(consent.analytics);
    clarityConsent.checked = Boolean(consent.clarity);
  }

  cookieBanner.classList.add("active");
});

loadBooking.addEventListener("click", function(){
  bookingFrame.innerHTML = `
    <iframe
      src="https://app.acuityscheduling.com/schedule/bd391257"
      title="Online-Terminbuchung Fußpflege Ana">
    </iframe>
  `;

  bookingConsent.style.display = "none";
});

applyConsent();
