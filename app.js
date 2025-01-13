import * as navBar from "./menu.js";
import * as Parks from "./nationalparks.js";
import * as HomePage from "./home.js";
// import * as ContactUsPage from "./contactus.js";

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

let submittedDataContainer = document.querySelector(".submittedDataContainer");
console.log("contact Us => " + navBar.contactUsData );
navBar.getPageContents(HomePage.getHomePage());





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


let btnSubmit = document.querySelector(".btnSubmit");

console.log('btnSubmit => ' + btnSubmit);


// btnSubmit.addEventListener('click', async (event) => {
//     event.preventDefault();
//     console.log('Submiting');
// // event.preventDefault();  
// const name = nameInput.value;
// const email = emailInput.value;
// const message = messageInput.value;

// try {
//   const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
//     title: name + '-' + email,
//     body: message,
//   });
//   console.log(response);
//   const submittedData = document.createElement('div');
//   submittedData.className = 'submitted-data';
//   submittedData.innerHTML = `
//     <p><strong>Name:</strong> ${response.data.name}</p>
//     <p><strong>Email:</strong> ${response.data.email}</p>
//     <p><strong>Message:</strong> ${response.data.message}</p>
//     <hr>
//   `;

//   submittedDataContainer.appendChild(submittedData);
//   } catch (error) {
//   console.error('Error submitting the form:', error);
// }

// });


