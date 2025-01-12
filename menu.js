
import * as States from './states.js';
import * as Parks from "./nationalparks.js";
import * as HomePage from "./home.js";
export const navigationLinks = [
    {text: 'Home', href: '#'},
    {text: 'Parks', href: '#'} ,
    {text: 'Contact us', href: '#'}

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
                 getPageContents('Contact us form');   
                  console.log('Contact us form');
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
        let PageContainer = document.querySelector(".PageContainer");
        console.log('=> ' + PageContainer); 
        console.log(text);
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