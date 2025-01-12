// export let  contactUsData = '';

export function getContactUsPage() {

  console.log('get contact us page');
  const formContainer = document.createElement('div');
  formContainer.className = 'contactUsContainer';
//   const form = document.createElement('form');
//   form.className = 'contactUsForm';
  const nameInput = createInputField('Name', 'name');
  const emailInput = createInputField('Email', 'email', 'email');
  const messageInput = createInputField('Message', 'message', 'textarea');
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.className = 'btnSubmit';
  formContainer.appendChild(nameInput);
  formContainer.appendChild(emailInput);
  formContainer.appendChild(messageInput);
  formContainer.appendChild(submitButton);
    // Create a container to display submitted data
    const submittedDataContainer = document.createElement('div');
    submittedDataContainer.className = 'submittedDataContainer';
    submittedDataContainer.innerHTML = '<h3>Submitted Data:</h3>';
  

//   formContainer.appendChild(form);
  formContainer.appendChild(submittedDataContainer);

      console.log(formContainer.innerHTML);
    return formContainer.innerHTML;
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
  