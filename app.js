import * as navBar from "./menu.js";
import * as Parks from "./nationalparks.js";

// import * as states from "./states.js";
export let PageContainer = document.querySelector(".PageContainer");
let MenuContainer = navBar.getMenuLinks();
 PageContainer.appendChild(MenuContainer);
let BannerContainer = navBar.getBannerContainer();
PageContainer.appendChild(BannerContainer);
const progressbar = document.createElement("div");
progressbar.setAttribute("id","progressBar");
progressbar.setAttribute("class","progress-bar-top");
progressbar.style = "transition: width 1s ease";
PageContainer.appendChild(progressbar);

let stateSelector = document.querySelector(".stateSelector");




    stateSelector.addEventListener("change", async () => {

        const selectedValue = stateSelector.value;
        console.log("Selected state code:", selectedValue);
        // console.log("the list" + parksList);
        const parksList =  await  getParksElements(selectedValue);
        let ParksListDiv = document.getElementById("parks-list");
        if(!ParksListDiv){
            ParksListDiv = document.createElement("div");
            ParksListDiv.setAttribute('id',"parks-list");
        }
        ParksListDiv.innerHTML = '';
        ParksListDiv.innerHTML = parksList;
        PageContainer.appendChild(ParksListDiv);
        
        
    });
    

 async  function getParksElements(selectedValue){
    let returnData = document.createElement("div");
    returnData = await  Parks.fetchAndRenderFishingParks(selectedValue);   
    return returnData;
    
}



