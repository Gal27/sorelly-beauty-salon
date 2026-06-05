const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'links.json');

function readLinks(){
  try{ return JSON.parse(fs.readFileSync(DATA_FILE,'utf8')); }
  catch(e){ return []; }
}
function writeLinks(data){
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/r/:id', (req, res) => {
  const id = req.params.id;
  const links = readLinks();
  const idx = links.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).send('Link não encontrado');
  links[idx].count = (links[idx].count || 0) + 1;
  writeLinks(links);
  res.redirect(302, links[idx].url);
});

app.get('/api/links', (req, res) => {
  res.json(readLinks());
});

app.get('/admin', (req, res) => {
  const links = readLinks();
  let html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin - Links</title><link rel="stylesheet" href="/styles.css"></head><body><div class="container"><h1>Admin — Links</h1><table><thead><tr><th>ID</th><th>Título</th><th>URL</th><th>Cliques</th></tr></thead><tbody>`;
  links.forEach(l => {
    html += `<tr><td>${l.id}</td><td>${l.title}</td><td><a href="${l.url}" target="_blank">${l.url}</a></td><td>${l.count}</td></tr>`;
  });
  html += `</tbody></table><h2>Adicionar link</h2><form method="post" action="/admin/add"><label>ID</label><input name="id" required><label>Título</label><input name="title" required><label>URL</label><input name="url" required><button class="btn" type="submit">Adicionar</button></form><p><a href="/">Voltar</a></p></div></body></html>`;
  res.send(html);
});

app.post('/admin/add', (req, res) => {
  const { id, title, url } = req.body;
  if (!id || !title || !url) return res.status(400).send('Dados incompletos');
  const links = readLinks();
  if (links.find(l => l.id === id)) return res.status(400).send('ID já existe');
  links.push({ id, title, url, count: 0 });
  writeLinks(links);
  res.redirect('/admin');
});

app.listen(PORT, () => console.log(`Redirect server listening on http://localhost:${PORT}`));
