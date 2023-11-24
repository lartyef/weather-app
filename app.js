

const form = document.querySelector('#userForm');
const resultContainer = document.querySelector('#resultContainer');
const weatherDescriptionContainer = document.querySelector('#weatherDescription');
const temperatureContainer = document.querySelector('#temperature');
const countryNameContainer = document.querySelector('#countryName');
const capitalContainer = document.querySelector('#capital');
const userName = document.querySelector('#username');


function getWeatherAndLocationInfo() {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const inputLocation = document.getElementById('location').value;
        userName.innerHTML = name;

        // Checking if name and location are not empty
        if (name && inputLocation) {
            // Constructing the API URL for weather with my OpenWeatherMap API key
            const weatherApiKey = '2484ec3747b1431ca9b3c83c3963822b';
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=${weatherApiKey}`;

            // Constructing the API URL for country details with the REST Countries API
            const countryApiUrl = `https://restcountries.com/v3.1/name/${inputLocation}`;

            // Returning a new Promise with the fetch inside
            return new Promise((resolve, reject) => {
                // Fetch weather information
                fetch(weatherApiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(weatherData => {
                        // Display weather information
                        weatherDescriptionContainer.textContent = weatherData.weather[0].description;
                        temperatureContainer.textContent = weatherData.main.temp + ' K';

                        // Fetch country information
                        fetch(countryApiUrl)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(countryData => {
                                // Display country information 
                                countryNameContainer.textContent = countryData[0].name.common;
                                capitalContainer.textContent = countryData[0].capital[0];

                                // Show the result container
                                resultContainer.classList.remove('hidden');
                                resolve({ weather: weatherData, country: countryData });
                            })
                            .catch(error => {
                                console.error('Error fetching country information:', error);
                                alert('Please enter the correct information for the country.');
                                reject(error);
                            });
                    })
                    .catch(error => {
                        console.error('Error fetching weather information:', error);
                        alert('Please enter the correct information for the weather.');
                        reject(error);
                    });
            });
        } else {
            // Rejecting the promise if name or location is empty
            alert('Please enter the correct information.');
            return Promise.reject(new Error('Please enter the correct information.'));
        }
    });
}

// Calling the function to set up the event listener
getWeatherAndLocationInfo();