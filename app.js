import * as navBar from "./menu.js";
import * as Parks from "./nationalparks.js";
// import * as states from "./states.js";
export let PageContainer = document.querySelector(".PageContainer");
let MenuContainer = navBar.getMenuLinks();
 PageContainer.appendChild(MenuContainer);
let BannerContainer = navBar.getBannerContainer();
PageContainer.appendChild(BannerContainer);
let stateSelector = document.querySelector(".stateSelector");
let returnData = document.createElement("div");
// const parksList = document.createElement("div");
//PageContainer.appendChild(parksList);



    stateSelector.addEventListener("change", async () => {
        const selectedValue = stateSelector.value;
        console.log("Selected state code:", selectedValue);
        // console.log("the list" + parksList);
        const parksList =  await  getParksElements();
        // console.log(parksList);
        const parks = document.createElement("div");
        parks.innerHTML = parksList;
        PageContainer.appendChild(parks);
        
        
    });

 async  function getParksElements(){
   
    returnData = await  Parks.fetchAndRenderFishingParks();   
    return returnData;
    
}



