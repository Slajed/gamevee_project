document.getElementById('billing-switch').addEventListener('change', function() {
  const price = document.querySelector('.plan-box:last-child .price');
  const perMonth = document.querySelector('.plan-box:last-child .per-month');
  const yearly = document.getElementById('yearly-label');
  const monthly = document.getElementById('monthly-label');

  if(this.checked) {
    price.textContent = 'EGP 3,249.99';
    perMonth.textContent = '/year';
    yearly.classList.add('active');
    monthly.classList.remove('active');
  } else {
    price.textContent = 'EGP 499.99';
    perMonth.textContent = '/month';
    yearly.classList.remove('active');
    monthly.classList.add('active');
  }
});