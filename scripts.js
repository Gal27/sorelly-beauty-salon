document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Mensagem enviada — este é um exemplo local.');
      form.reset();
    });
  }
  console.log('Sorelly site carregado');
});
