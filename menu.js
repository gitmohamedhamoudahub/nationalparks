
import * as States from './states.js';

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

    export function handleLinkNavClick(text)
    {
       const PageContainer = document.querySelector(".PageContainer");
       document.body.style.backgroundColor = 'lightblue';
       PageContainer.innerHTML += `<h1>${text}</h1>`;
    }

    export function appendElementToParent(parent,child)
    {
        parent.appendChild(child);
    }

    export function getBannerContainer(){              
        const imageBannerContainer = document.createElement("div");
        imageBannerContainer.setAttribute('id','imageBannerContainer');

        // const bannerImage = document.createElement("img");
        // bannerImage.setAttribute('id','bannerImage');
        // imageBannerContainer.appendChild(bannerImage);
        return imageBannerContainer;
    }