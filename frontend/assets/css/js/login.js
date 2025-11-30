const apiBase = '';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) {
    document.getElementById('msg').innerText = data.error || 'Erro';
    return;
  }
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  window.location.href = '/welcome.html';
});
