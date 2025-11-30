async function fetchCategorias() {
  const res = await fetch('/api/categorias');
  return res.ok ? await res.json() : [];
}

async function listarProdutos() {
  const res = await fetch('/api/produtos');
  const data = await res.json();
  const tbody = document.querySelector('#produtosTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.id}</td><td>${p.name}</td><td>${p.category_name||''}</td><td>${p.price}</td>
      <td>
        <a href="/produtos/editar.html?id=${p.id}">Editar</a> |
        <a href="#" data-id="${p.id}" class="del">Deletar</a>
      </td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!confirm('Confirma exclusão?')) return;
      const id = btn.dataset.id;
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/produtos/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
      if (res.ok) listarProdutos(); else alert('Erro ao deletar');
    });
  });
}

async function preencherCategorias(selectId) {
  const categorias = await fetchCategorias();
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">--Selecione--</option>';
  categorias.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.text = c.name;
    sel.appendChild(opt);
  });
}

async function criarProdutoHandler(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const body = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    category_id: document.getElementById('category_id').value || null
  };
  const res = await fetch('/api/produtos', { method: 'POST', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) document.getElementById('msg').innerText = data.error || 'Erro';
  else location.href = '/produtos/listar.html';
}

async function carregarEditar() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) return;
  const res = await fetch(`/api/produtos/${id}`);
  const p = await res.json();
  document.getElementById('id').value = p.id;
  document.getElementById('name').value = p.name;
  document.getElementById('description').value = p.description;
  document.getElementById('price').value = p.price;
  await preencherCategorias('category_id');
  if (p.category_id) document.getElementById('category_id').value = p.category_id;
}

async function atualizarProdutoHandler(e) {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const token = localStorage.getItem('token');
  const body = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    category_id: document.getElementById('category_id').value || null
  };
  const res = await fetch(`/api/produtos/${id}`, { method: 'PUT', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(body) });
  if (res.ok) location.href = '/produtos/listar.html'; else alert('Erro ao salvar');
}

// init hooks
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('produtosTable')) listarProdutos();
  if (document.getElementById('criarForm')) {
    preencherCategorias('category_id');
    document.getElementById('criarForm').addEventListener('submit', criarProdutoHandler);
  }
  if (document.getElementById('editarForm')) {
    preencherCategorias('category_id').then(() => carregarEditar());
    document.getElementById('editarForm').addEventListener('submit', atualizarProdutoHandler);
  }
});
