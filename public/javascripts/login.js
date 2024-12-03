 
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

//-------------------------Creat form dinamic--------------------------//
class DynamicForm {
  constructor(formAct, textBtn, formFileds) {
    this.textBtn = textBtn;
    this.formFileds = formFileds;
    this.formAct = formAct;
    this.form = document.createElement('form');
    this.form.setAttribute('method', 'post');
    this.form.setAttribute('action', formAct);
  }

  createFieled(field) {
    const label = document.createElement('label');
    label.innerText = field.label || `Enter ${field.name}:`;

    const input = document.createElement('input');
    input.setAttribute('name', field.name);
    input.setAttribute('type', field.type || 'text');
    if (field.value) {
      input.setAttribute('value', field.value);
    }
    if (field.required) {
      input.setAttribute('required', true);
    }
    label.appendChild(input);
    return label;
  }

  createSubmitButton() {
    const button = document.createElement('button');
    button.setAttribute('class', 'btn');
    button.setAttribute('type', 'submit');
    button.innerText = this.textBtn;
    return button;
  }

  generateForm() {
    this.formFileds.forEach((field) => {
      const fieldElement = this.createFieled(field);
      this.form.appendChild(fieldElement);
    });
    const submitButton = this.createSubmitButton();
    this.form.appendChild(submitButton);
  }
}

const registrFields = [
  {
    name: 'user',
    label: 'Enter your Name',
    type: 'text',
    value: '',
    required: true,
  },
  {
    name: 'userName',
    label: 'Enter your E-mail',
    type: 'email',
    value: '',
    required: true,
  },
  {
    name: 'password',
    label: 'Enter your Password',
    type: 'password',
    value: '',
    required: true,
  },
];

const loginFields = [
  {
    name: 'userName',
    label: 'Enter your E-mail',
    type: 'email',
    value: '',
    required: true,
  },
  {
    name: 'password',
    label: 'Enter your Password',
    type: 'password',
    value: '',
    required: true,
  },
];


window.onload = () => {
    document.querySelectorAll('.btn__a').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const choice = e.target.dataset.choice;
        const wrapper = document.querySelector('.wrapper')
        const boxBtn = document.querySelector('.box-btn');
        boxBtn.classList.add('disable');
        if (choice === 'Registr') {          
          const form = new DynamicForm('/user/registr', 'Registretion', registrFields);
          form.generateForm()
          wrapper.appendChild(form.form);          
        } else if (choice === 'login') {
          const form = new DynamicForm('/user/login', 'Login', loginFields);
          form.generateForm()
          wrapper.appendChild(form.form);
        }
      });
    });
}