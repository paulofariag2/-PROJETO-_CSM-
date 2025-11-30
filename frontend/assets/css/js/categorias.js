async function listarCategorias() {
  const res = await fetch('/api/categorias');
  const data = await res.json();
  const ul = document.getElementById('categoriasList');
  ul.innerHTML = '';
  data.forEach(c => {
    const li = document.createElement('li');
    li.innerText = `${c.id} - ${c.name}`;
    ul.appendChild(li);
  });
}

async function criarCategoriaHandler(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const name = document.getElementById('name').value;
  const res = await fetch('/api/categorias', { method: 'POST', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ name })});
  const data = await res.json();
  if (!res.ok) document.getElementById('msg').innerText = data.error || 'Erro';
  else location.href = '/categorias/listar.html';
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('categoriasList')) listarCategorias();
  if (document.getElementById('criarCategoriaForm')) {
    document.getElementById('criarCategoriaForm').addEventListener('submit', criarCategoriaHandler);
  }
});
