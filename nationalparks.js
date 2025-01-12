const API_KEY = "I0mOBawKidI3m4cPtp5CZaEU4Z13jfM2bS1PRE2K";
const API_BASE_URL = 'https://developer.nps.gov/api/v1';

export async function axiosInit(){
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    
//Logging request Time
  axios.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    document.body.style.cursor = 'progress';
    progressBar.style.width = '100%';
    return request;
});

axios.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date().getTime();
        response.config.metadata.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;

        console.log(`Request start time ${response.config.metadata.startTime}`);
        console.log(`Request end time ${response.config.metadata.endTime}`);
        console.log(`Request took ${response.config.metadata.durationInMS} milliseconds.`);
        document.body.style.cursor = 'default';
        progressBar.style.width = '0%';
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.config.metadata.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;

        console.log(`Request took ${error.config.metadata.durationInMS} milliseconds.`)
        // progressBar.style.width = '100%'; 
        throw error;
});
}

async function getParks()
{
  try {
        const res = await axios.get(`/parks`,
            {
                params: {
                    // limit: 5
                    // city: 'Asheville',
                   stateCode: 'NY'
                }
              },
              {onDownloadProgress: updateProgress},
        );
        const data = res.data;
        console.log(data);
        return data;
      }
   catch (err) 
   {
        console.log('Error: ', err.message);
    return [];
   }
}
function updateProgress(event) {
    console.log(event); 
    if (event.lengthComputable) {
        const percentCompleted = (event.loaded / event.total) * 100;
        console.log(`Percent Completed: ${percentCompleted}`);
        progressBar.style.width = `${percentCompleted}%`;
    }
  }

async function getActivities()
{
  try {
        const res = await axios.get(`/activities`);
        const data = res.data;
        console.log(data);
        return data;
      }
   catch (err) 
   {
        console.log('Error: ', err.message);
    return [];
   }
}
    


axiosInit();
// getActivities();
//getParks();
//**************************************************** */
export async function fetchAndRenderFishingParks(stateCode = 'NC') {
    axiosInit();
    const parksListDiv =  document.createElement("div");
    parksListDiv.setAttribute('id',"parks-list");
    parksListDiv.innerHTML = '';
    console.log(parksListDiv);  
    const allParks = [];
    const limit = 3;    
    let start = 0;      
    let total = 0;    

    try {
        do {
          // Fetch parks with fishing activity
          const response = await axios.get('/parks', {
            params: {
              api_key: API_KEY,
               limit: limit,
              stateCode: stateCode,
            //   start: start
            }
          });
          
          const parks = await response.data.data;
          total = response.data.total; // Total parks available
          allParks.push(...parks);     // Append parks to the list
  
          start += limit; // Increment start for the next page
        } while (allParks.length < total);
        allParks.forEach(park => {
          const parkDiv = document.createElement('div');
          parkDiv.className = 'park';
  
          // Park Name
          const parkName = document.createElement('h2');
          parkName.textContent = park.fullName;
          parkDiv.appendChild(parkName);
  
          // Park Description
          const parkData = document.createElement('div');
          parkData.classList.add('parkData');
  
          const parkDataTxt = document.createElement('div');
          parkDataTxt.classList.add('parkDataTxt');
  
          const parkDescription = document.createElement('p');
          parkDescription.textContent = park.description || 'No description available.';
          parkDataTxt.appendChild(parkDescription);
  
          // Address (if available)
          if (park.addresses && park.addresses.length > 0) {
            const address = park.addresses[0]; // Use the first address
            const addressText = document.createElement('p');
            addressText.textContent = `Address: ${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}`;
            parkDataTxt.appendChild(addressText);
          }
              parkData.appendChild(parkDataTxt);
  
  
          // Add up to 3 images
          if (park.images && park.images.length > 0) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('imageContainer');
            park.images.slice(0, 2).forEach(image => {
              const img = document.createElement('img');
              img.src = image.url;
              img.alt = image.altText || 'Park image';
              imageContainer.appendChild(img);
            });
            parkData.appendChild(imageContainer);
          }
  
          parkDiv.appendChild(parkData);
          
  
  
            // List of activities
            if (park.activities && park.activities.length > 0) {
              const activitiesTitle = document.createElement('p');
              activitiesTitle.textContent = 'Activities:';
              parkDiv.appendChild(activitiesTitle);
  
              const activitiesList = document.createElement('ul');
              activitiesList.className = 'activities-list';
  
              park.activities.forEach(activity => {
                const activityItem = document.createElement('li');
                activityItem.textContent = activity.name;
                activitiesList.appendChild(activityItem);
              });
  
              parkDiv.appendChild(activitiesList);
            }
  
            // Fees Section
            const feesSection = document.createElement('div');
            feesSection.className = 'fees-section';
  
            const feesTitle = document.createElement('h3');
            feesTitle.textContent = 'Fees:';
            feesSection.appendChild(feesTitle);
  
            const feesList = document.createElement('ul');
            feesList.className = 'fees-list';
  
            // Entrance Fees
            if (park.entranceFees && park.entranceFees.length > 0) {
              park.entranceFees.forEach(fee => {
                const feeItem = document.createElement('li');
                feeItem.textContent = `${fee.title}: $${fee.cost} - ${fee.description}`;
                feesList.appendChild(feeItem);
              });
            } else {
            //   parkDiv.style.backgroundColor = 'lightcyan';
              const noFeeItem = document.createElement('li');
              noFeeItem.style.color = 'red';
            //   noFeeItem.style.backgroundColor = 'lemonchiffon';
              noFeeItem.textContent = 'No entrance fees.';
              feesList.appendChild(noFeeItem);
            }
  
            feesSection.appendChild(feesList);
            parkDiv.appendChild(feesSection);
  
  
            parksListDiv.innerHTML = '';
            parksListDiv.appendChild(parkDiv);
        });
      } catch (error) {
        console.error('Error fetching parks in NC:', error);
  
        // Display an error message
        parksListDiv.innerHTML = '<p>Unable to load parks. Please try again later.</p>';
      }
    console.log('*********************************************************');
        console.log(parksListDiv);
        // const x = parksListDiv;
        return parksListDiv.innerHTML;
  }

  
//   fetchAndRenderFishingParks();