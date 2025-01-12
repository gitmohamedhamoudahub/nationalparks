const API_KEY = "I0mOBawKidI3m4cPtp5CZaEU4Z13jfM2bS1PRE2K";
const API_BASE_URL = 'https://developer.nps.gov/api/v1';

export async function axiosInit(){
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
              }
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
export async function fetchAndRenderFishingParks() {
    axiosInit();
    const parksListDiv =  document.createElement("div");
    parksListDiv.setAttribute('id',"parks-list");

    console.log(parksListDiv);
    const allParks = [];
    const limit = 50; // Maximum results per request
    let start = 0;    // Initial starting point
    let total = 0;    // Total parks counter

    try {
      do {
        // Fetch parks with fishing activity
        const response = await axios.get('/parks', {
          params: {
            api_key: API_KEY,
            // activities: 'fishing',
            limit: limit,
            stateCode: 'NY',
            start: start
          }
        });

        const parks = response.data.data;
        total = response.data.total; // Total parks available
        console.log('Total Parks => ' + total);
        allParks.push(...parks);     // Append parks to the list
        // console.log(allParks);
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

        
        if (park.addresses && park.addresses.length > 0) {
          const address = park.addresses[0]; // first address
          const addressText = document.createElement('p');
          addressText.textContent = `Address: ${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}`;
          parkDataTxt.appendChild(addressText);
        }
            parkData.appendChild(parkDataTxt);


        
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
            parkDiv.style.backgroundColor = 'lightcyan';
            const noFeeItem = document.createElement('li');
            noFeeItem.style.color = 'red';
            noFeeItem.style.backgroundColor = 'lemonchiffon';
            noFeeItem.textContent = 'No entrance fees.';
            feesList.appendChild(noFeeItem);
          }

          feesSection.appendChild(feesList);
          parkDiv.appendChild(feesSection);
          console.log(parkDiv);

        // Append the park div to the main container
        parksListDiv.appendChild(parkDiv);
      });
    } catch (error) {
      console.error('Error fetching parks:', error);

      // Display an error message
      parksListDiv.innerHTML = '<p>Unable to load parks. Please try again later.</p>';
    }
    finally{
        return parksListDiv;
    };
  }

  
//   fetchAndRenderFishingParks();