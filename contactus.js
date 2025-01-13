// export let  contactUsData = '';

export function getContactUsPage() {

  console.log('get contact us page');
  const headerTxt = document.createElement('H1');
  headerTxt.textContent = 'Contact Us';
  contactUsContainer.className = 'contactUsContainer';
  const formContainer = document.createElement('div');
  formContainer.className = 'contactUsContainer';
  const nameInput = createInputField('Name', 'name');
  const emailInput = createInputField('Email', 'email', 'email');
  const messageInput = createInputField('Message', 'message', 'textarea');
  const submitFieldContainer = document.createElement('div');
  submitFieldContainer.className = 'submitFieldContainer';
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.className = 'btnSubmit';

  submitFieldContainer.appendChild(submitButton);
  formContainer.appendChild(headerTxt);
  formContainer.appendChild(nameInput);
  formContainer.appendChild(emailInput);
  formContainer.appendChild(messageInput);
  formContainer.appendChild(submitFieldContainer);
  
    
    const submittedDataContainer = document.createElement('div');
    submittedDataContainer.className = 'submittedDataContainer';
    submittedDataContainer.innerHTML = '<h3>Submitted Data:</h3>';
    formContainer.appendChild(submittedDataContainer);
    // contactUsContainer.appendChild(formContainer);
    // console.log(contactUsContainer.innerHTML);
    return formContainer.innerHTML;
}





function createInputField(labelText, name, type = 'text') {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'fieldContainer' + name;
  
    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', name);
  
    let input;
    if (type === 'textarea') {
      input = document.createElement('textarea');
      input.placeholder = labelText;
    } else {
      input = document.createElement('input');
      input.type = type;
      input.placeholder = labelText;
    }
    input.name = name;
    input.id = name;
    input.required = true;
  
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
  
    return fieldContainer;
  }
  