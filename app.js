import * as navBar from "./menu.js";
import * as Parks from "./nationalparks.js";
// import * as states from "./states.js";
export let PageContainer = document.querySelector(".PageContainer");
let MenuContainer = navBar.getMenuLinks();
 PageContainer.appendChild(MenuContainer);
let BannerContainer = navBar.getBannerContainer();
PageContainer.appendChild(BannerContainer);
let stateSelector = document.querySelector(".stateSelector");
// const parksList = document.createElement("div");
//PageContainer.appendChild(parksList);



    stateSelector.addEventListener("change", () => {
        const selectedValue = stateSelector.value;
        console.log("Selected state code:", selectedValue);
        // console.log("the list" + parksList);
        const parksList = getParksElements();
        PageContainer.appendChild(parksList);
        
        
        
    });

async function getParksElements(){
    const returnData = document.createElement("div");
    returnData = await Parks.fetchAndRenderFishingParks(); 
    console.log(returnData);
    return returnData;
    
}



