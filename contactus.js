export function getContactUsPage() {
    const formContainer = document.createElement('div');
  formContainer.className = 'contactUsContainer';
  const form = document.createElement('form');
  form.className = 'contactUsForm';
  const nameInput = createInputField('Name', 'name');
  const emailInput = createInputField('Email', 'email', 'email');
  const messageInput = createInputField('Message', 'message', 'textarea');
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.className = 'btnSubmit';
  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(messageInput);
  form.appendChild(submitButton);


    return form.innerHTML;
}

function createInputField(labelText, name, type = 'text') {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'fieldContainer';
  
    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', name);
  
    let input;
    if (type === 'textarea') {
      input = document.createElement('textarea');
    } else {
      input = document.createElement('input');
      input.type = type;
    }
    input.name = name;
    input.id = name;
    input.required = true;
  
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
  
    return fieldContainer;
  }
  