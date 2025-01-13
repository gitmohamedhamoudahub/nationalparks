
import * as States from './states.js';
import * as Parks from "./nationalparks.js";
import * as HomePage from "./home.js";
import * as ContactUsPage from "./contactus.js";

export const navigationLinks = [
    {text: 'Home', href: '#'},
    {text: 'Parks', href: '#'} ,
    {text: 'Contact us', href: './contactus.html'}

    ]

    export function getMenuLinks(){
        
        const navBarMenu = document.createElement('div');
        navBarMenu.setAttribute('id','navBarMenu');
        
        navigationLinks.forEach((lnk) =>
            {
                const link1 = document.createElement('button');
                link1.setAttribute('id','btnMenu');
                
                link1.href = lnk.href;
                link1.textContent = lnk.text;

                link1.addEventListener('click', function() {
                    handleLinkNavClick(link1.textContent );
                    console.log(link1.textContent );
                });
    
                navBarMenu.appendChild(link1);
                
            })
            
            navBarMenu.appendChild(States.getStateSelectElement());
    
        return navBarMenu;
    }

    

    export async function handleLinkNavClick(text)
    {
        if(text == 'Parks'){
            let stateSelector = document.querySelector(".stateSelector");
            stateSelector.value = 'NC';
            const changeEvent = new Event("change", { bubbles: true });
            stateSelector.dispatchEvent(changeEvent);
           }
            else if(text == 'Contact us'){
               ;
                // console.log(ContactUsPage.contactUsData);
                getPageContents(ContactUsPage.getContactUsPage());   
                  console.log('Contact us form');
                let btnSubmit = document.querySelector(".btnSubmit");
                console.log('btnSubmit => ' + btnSubmit);



btnSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Submiting');
    // event.preventDefault();
    const nameInput   = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput   = document.getElementById('message');
    // console.log(nameInput.value + emailInput.value + messageInput.value); 
    const name = nameInput.value;
    const email = await emailInput.value;
    const message = await messageInput.value;
console.log(name, email, message);
try {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', 
  {
    title: 'Name: ' +name + ' - Email: ' + email,
    body: message,
  });
  console.log('response => ' + response.status);
  if(response.status === 201 ){
        console.log(response);
        const submittedData = document.createElement('div');
        submittedData.className = 'submitted-data';
        submittedData.innerHTML = `
            <p><strong>Name - Email:</strong> ${response.data.title}</p>
            <p><strong>Message: </strong> ${response.data.body}</p>
            
            <hr>
        `;
        const submittedDataContainer = document.querySelector('.submittedDataContainer');
        submittedDataContainer.appendChild(submittedData);
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    }
  } catch (error) {
  console.error('Error submitting the form:', error);
}

});


            }
            else{

                getPageContents(HomePage.getHomePage());
                console.log('Home page');
            }
    }


    export function appendElementToParent(parent,child)
    {
        parent.appendChild(child);
    }

    export function getBannerContainer(){              
        const imageBannerContainer = document.createElement("div");
        imageBannerContainer.setAttribute('id','imageBannerContainer');
        return imageBannerContainer;
    }

    export function getPageContents(text){
        // console.log(text);
        let PageContainer = document.querySelector(".PageContainer");
        // console.log('=> ' + PageContainer); 
        // console.log(text);
        let parksListDiv = document.getElementById("parks-list");  
        // console.log( parksListDiv);
        
        if(!parksListDiv){
            parksListDiv = document.createElement("div");
            parksListDiv.setAttribute('id',"parks-list");
            parksListDiv.innerHTML = '';
            PageContainer.appendChild(parksListDiv);
        }
          
    //    let PageContainer =  document.getElementById("parks-list");
        parksListDiv.innerHTML = `${text}`;
    }