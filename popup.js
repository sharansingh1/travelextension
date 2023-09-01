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
        const attractionsUrl = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lon=${lon}&lat=${lat}`;
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
            const attractionsList = document.createElement('ul');
    
            data.features.forEach(feature => {
                const attractionName = feature.properties.name;
                const attractionElement = document.createElement('li');
                attractionElement.textContent = attractionName;
                attractionsList.appendChild(attractionElement);
            });
    
            resultsDiv.appendChild(attractionsList);
        } else {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No attractions found near this city.';
            resultsDiv.appendChild(noResultsMessage);
        }
    }
    
});
