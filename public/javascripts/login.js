 
class HandlerLogin {
  static async handlerSubmit(route, body) {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }
}

window.onload = () => {
    document.querySelectorAll('.btn__a').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const choice = e.target.dataset.choice;
        const form = document.querySelector('form');
        const userName = document.getElementById('user-name');
        let btn = document.getElementById('btn-rl')

        if (choice === 'Registr') {
          form.action = '/user/registr';
          form.classList.add('active');
          if (userName.closest('.disable-elem')) {
            userName.classList.remove('disable-elem');
            btn.textContent = 'Registretion';
          }
        } else if (choice === 'login') {
          form.action = '/auth/login';
          form.classList.add('active');
          userName.classList.add('disable-elem');
          btn.textContent = 'Login';
        }
      });
    });
}