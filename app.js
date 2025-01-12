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
        const parksList =  await  getParksElements(selectedValue);
        // console.log(parksList);
        const parks = document.createElement("div");
        parks.setAttribute('id',"parks-list");
        parks.innerHTML = parksList;
        PageContainer.appendChild(parks);
        
        
    });

 async  function getParksElements(selectedValue){
   
    returnData = await  Parks.fetchAndRenderFishingParks(selectedValue);   
    return returnData;
    
}



