document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const resultsDiv = document.getElementById('results');

    searchButton.addEventListener('click', function () {
        const city = cityInput.value;
        if (city) {
            searchCity(city);
        }
    });

    
    async function searchCity(city) {
        const apiKey = '';
        const searchUrl = `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${city}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(searchUrl, options);
            const searchData = await response.json();
            const latitude = searchData.lat;
            const longitude = searchData.lon;
            console.log('longitude', longitude);
            // Call a function to fetch attractions using the latitude and longitude
            fetchAttractions(latitude, longitude);
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function fetchAttractions(lat, lon) {
        const apiKey = '';
        const attractionsUrl = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500000&lon=${lon}&lat=${lat}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(attractionsUrl, options);
            const attractionsData = await response.json();
            
              // Log the retrieved API response data
            console.log('API Response Data:', attractionsData);

            // Process and display attractions data
            displayAttractions(attractionsData);
        } catch (error) {
            console.error('Error fetching attractions:', error);
        }
    }

    function displayAttractions(data) {
        const resultsDiv = document.getElementById('results');
        
        // Clear previous results
        resultsDiv.innerHTML = '';
        
        if (data && data.features && data.features.length > 0) {
            // Extract attraction names from the API data
            const attractionNames = data.features.map(feature => feature.properties.name);
        
            // Define restaurant names (replace these with actual restaurant names)
            const restaurantNames = [
                'Restaurant 1',
                'Restaurant 2',
                'Restaurant 3'
            ];
        
            // Shuffle the list of attractions (randomize order)
            shuffleArray(attractionNames);
        
            // Create a schedule array
            const schedule = [];
        
            // Initialize the hour (starting from 10 AM)
            let hour = 10;
            let realTime = 0;
        
            // Add breakfast, lunch, and dinner
            schedule.push({ time: `${hour} AM`, activity: 'Breakfast' });
            hour++;
           
            
            // Add attractions
            for (let i = 0; i < 12; i++) {
                const attraction = attractionNames[i];
                if (attraction) {
                    if (hour === 12) {
                        schedule.push({ time: `${hour} PM`, activity: attraction });
                    } else if (hour > 12) {
                        let realTime = hour -12;
                        if(realTime == 2)
                        {
                            schedule.push({ time: `${realTime} PM`, activity: 'Lunch' });
                        }
                        else if(realTime == 6)
                        {
                            schedule.push({ time: `${realTime} PM`, activity: 'Dinner' });
                        }
                        else{
                            schedule.push({ time: `${realTime} PM`, activity: attraction });
                        }
                        
                    } else {
                        schedule.push({ time: `${hour} AM`, activity: attraction });
                    }
                    hour++;
                }
            }
        
            // Add "Rest" at the end
            schedule.push({ time: `${hour-12} PM`, activity: 'Rest' });
        
            // Display the schedule
            const scheduleList = document.createElement('ul');
            schedule.forEach(item => {
                const scheduleItem = document.createElement('li');
                scheduleItem.textContent = `${item.time}: ${item.activity}${item.location ? ' - ' + item.location : ''}`;
                scheduleList.appendChild(scheduleItem);
            });
            resultsDiv.appendChild(scheduleList);
        } else {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No attractions found near this city.';
            resultsDiv.appendChild(noResultsMessage);
        }
    }
    // Function to shuffle an array in place
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    
    
});
