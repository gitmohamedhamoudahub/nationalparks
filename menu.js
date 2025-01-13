
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
    const nameInput   = document.querySelector("#name")
    const emailInput   = document.querySelector("#email")
    const messageInput   = document.querySelector("#message")
    // console.log(nameInput);
    const name = await nameInput.contentText;
    const email = await emailInput.contentText;
    const message = await messageInput.contentText;

try {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: name + '-' + email,
    body: message,
  });
  console.log(response);
  const submittedData = document.createElement('div');
  submittedData.className = 'submitted-data';
  submittedData.innerHTML = `
    <p><strong>Name:</strong> ${response.data.name}</p>
    <p><strong>Email:</strong> ${response.data.email}</p>
    <p><strong>Message:</strong> ${response.data.message}</p>
    <hr>
  `;

  submittedDataContainer.appendChild(submittedData);
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