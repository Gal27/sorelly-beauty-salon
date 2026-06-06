document.addEventListener('DOMContentLoaded', function(){
  const DEFAULT_WA = '5511999999999';
  let waNumber = DEFAULT_WA;

  function sanitizeNumber(n){
    return (n||'').replace(/[^0-9]/g, '');
  }

  // carrega config opcional
  fetch('data/site.json').then(r => {
    if (!r.ok) throw new Error('no config');
    return r.json();
  }).then(cfg => {
    if (cfg.whatsappNumber) waNumber = sanitizeNumber(cfg.whatsappNumber);
    if (cfg.socials && Array.isArray(cfg.socials)) renderSocials(cfg.socials);
  }).catch((error)=>{
    console.warn('Não foi possível carregar data/site.json, usando número padrão', error);
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
      const name = (data.get('name') || '').trim();
      const contact = (data.get('contact') || '').trim();
      const message = (data.get('message') || '').trim();
      const nameParts = name.split(/\s+/).filter(Boolean);
      const phone = sanitizeNumber(contact);

      if(nameParts.length !== 2){
        alert('Por favor informe exatamente nome e sobrenome (duas palavras).');
        return;
      }

      if(phone.length < 10 || phone.length > 11){
        alert('Por favor informe um telefone válido apenas com números.');
        return;
      }

      const text = `Olá, meu nome é ${name}. Telefone: ${contact}. Mensagem: ${message}`;
      const encoded = encodeURIComponent(text);
      const number = sanitizeNumber(waNumber) || sanitizeNumber(DEFAULT_WA);
      const waUrl = `https://wa.me/${number}?text=${encoded}`;
      window.location.href = waUrl;
    });
  }

  console.log('Sorelly site carregado');
});
