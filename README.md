# Sorelly Beauty Salon — Site inicial

Pequena página inicial para o salão Sorelly.

Como executar localmente:

```bash
python3 -m http.server 8000
# então abra http://localhost:8000 no navegador
```

Arquivos:
- `index.html` — página principal
- `styles.css` — estilos
- `scripts.js` — JS simples

Redirecionador com contagem

```bash
# instalar dependências
npm install

# iniciar backend em http://localhost:3000
npm start
```

Visite `http://localhost:3000` para ver a lista de links e `http://localhost:3000/r/<id>` para redirecionar e incrementar o contador.

WhatsApp e redes sociais

Edite o arquivo `data/site.json` para colocar o número de WhatsApp (formato internacional, sem `+`, ex: `5592995323897`) e seus links sociais. O formulário de contato irá redirecionar para `https://wa.me/<numero>?text=...` com a mensagem preenchida.

O site é estático e pode ser hospedado gratuitamente no GitHub Pages ou outro serviço de arquivos estáticos. Depois, se quiser, dá para lançar com domínio e hospedagem pagos para um visual ainda mais profissional.
