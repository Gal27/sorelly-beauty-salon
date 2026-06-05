document.addEventListener('DOMContentLoaded', function(){
  const DEFAULT_WA = '5511999999999';
  let waNumber = DEFAULT_WA;

  function sanitizeNumber(n){
    return (n||'').replace(/[^0-9]/g, '');
  }

  // carrega config opcional
  fetch('/data/site.json').then(r => {
    if (!r.ok) throw new Error('no config');
    return r.json();
  }).then(cfg => {
    if (cfg.whatsappNumber) waNumber = sanitizeNumber(cfg.whatsappNumber);
    if (cfg.socials && Array.isArray(cfg.socials)) renderSocials(cfg.socials);
  }).catch(()=>{
    // sem config, usar padrão
    renderSocials([
      { name: 'instagram', url: 'https://instagram.com/' },
      { name: 'facebook', url: 'https://facebook.com/' }
    ]);
  });

  function renderSocials(list){
    const wrap = document.getElementById('socials');
    if(!wrap) return;
    wrap.innerHTML = '';
    list.forEach(s => {
      const a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'social-link';
      a.textContent = s.name.replace(/^(.)/, (m)=>m.toUpperCase());
      wrap.appendChild(a);
    });
  }

  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const contact = data.get('contact') || '';
      const message = data.get('message') || '';
      const text = `Olá, meu nome é ${name}. Contato: ${contact}. Mensagem: ${message}`;
      const encoded = encodeURIComponent(text);
      const number = sanitizeNumber(waNumber) || sanitizeNumber(DEFAULT_WA);
      const waUrl = `https://wa.me/${number}?text=${encoded}`;
      window.location.href = waUrl;
    });
  }

  console.log('Sorelly site carregado');
});
