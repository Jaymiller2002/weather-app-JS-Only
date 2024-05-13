// Function to initialize the weather app
function initializeWeatherApp() {
    console.log("Initializing Weather App...");

    const root = createRootElement();
    console.log("Root element created:", root);

    createTitle(root);
    console.log("Title created");

    const form = createForm(root);
    console.log("Form created:", form);

    createWeatherInfoSection(root);
    console.log("Weather info section created");

    document.body.appendChild(root);
    console.log("Root element appended to the document body");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const zipCode = form.querySelector('#inputNumber').value;
        console.log("Zip code submitted:", zipCode);
        validateZipCode(zipCode);
    });
}

// Function to create the root element
function createRootElement() {
    console.log("Creating root element...");
    const root = document.createElement('div');
    root.id = 'app';
    root.classList.add('card', 'mb-6', 'container');
    console.log("Root element created:", root);
    return root;
}

// Function to create the title
function createTitle(root) {
    console.log("Creating title...");
    const title = document.createElement('h1');
    title.textContent = 'Weather App';
    root.appendChild(title);
    console.log("Title created");
}

// Function to create the form for zip code input
function createForm(root) {
    console.log("Creating form...");
    const form = document.createElement('form');
    form.id = 'revealWeather';
    const input = document.createElement('input');
    input.id = 'inputNumber';
    input.type = 'number';
    input.pattern = '[0-9]{5}';
    input.title = 'Please enter a valid US ZIP code (5 digits)';
    input.placeholder = 'Enter a valid zipcode';
    const button = document.createElement('button');
    button.textContent = 'Reveal Weather';
    form.appendChild(input);
    form.appendChild(button);
    root.appendChild(form);
    console.log("Form created:", form);
    return form;
}

// Function to create the weather info section
function createWeatherInfoSection(root) {
    console.log("Creating weather info section...");
    const weatherInfo = document.createElement('div');
    weatherInfo.id = 'weatherInfo'; // Add an id to this div
    root.appendChild(weatherInfo);
    console.log("Weather info section created");
}

// Function to update weather information
function updateWeatherInfo(data) {
    console.log("Updating weather information with data:", data);
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = ''; // Clear previous content

    const labels = ['City', 'Temperature', 'Condition', 'Image'];
    labels.forEach(label => {
        const info = document.createElement('div');
        info.classList.add('weatherDetail'); // Add weather detail class

        const labelElement = document.createElement('span');
        labelElement.textContent = label + ': ';
        labelElement.classList.add('weatherLabel'); // Add weather label class

        const valueElement = document.createElement('span');
        valueElement.classList.add('weatherValue'); // Add weather value class

        switch (label) {
            case 'City':
                valueElement.textContent = data.name;
                break;
            case 'Temperature':
                const temperature = Math.round(data.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
                valueElement.textContent = temperature + "°C";
                // Set background color based on temperature
                if (temperature < 10) {
                    weatherInfoDiv.style.backgroundColor = '#56E3EB'; // Cold temperature
                } else if (temperature > 20) {
                    weatherInfoDiv.style.backgroundColor = '#EA2200'; // Hot temperature
                } else {
                    weatherInfoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Default background color
                }
                break;
            case 'Condition':
                valueElement.textContent = data.weather[0].description;
                break;
            case 'Image':
                const img = document.createElement('img');
                img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                img.alt = 'Weather Icon';
                valueElement.appendChild(img);
                break;
        }

        info.appendChild(labelElement);
        info.appendChild(valueElement);
        weatherInfoDiv.appendChild(info);
    });
    console.log("Weather information updated");
}

// Function to validate ZIP code using OpenWeatherMap API
function validateZipCode(zipCode) {
    console.log("Validating ZIP code:", zipCode);
    const apiKey = '9fd938103ec5b5fb92be500ba2c85323';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch ZIP code data');
            }
        })
        .then(data => {
            console.log("Received weather data:", data);
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Initialize the weather app
initializeWeatherApp();