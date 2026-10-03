let cur = 0;
const sc = document.getElementById('screens');

function goTo(n) {
  cur = n;
  sc.style.transform = 'translateX(-' + (n * 33.333) + '%)';
}

function togglePw(id, icId) {
  const p = document.getElementById(id);
  const ic = document.getElementById(icId);
  if (p.type === 'password') {
    p.type = 'text';
    ic.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    p.type = 'password';
    ic.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/>';
  }
}