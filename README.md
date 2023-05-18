## Frontend TypeScript Test Project :busstop:

Welcome to my TypeScript Project's Frontend! This TypeScript-based app brings the dynamic world of bike journeys and stations in cities of Finland to life. With powerful features like data visualization, search capabilities, and the ability to add new journeys and stations, this frontend project is designed to provide an immersive and enjoyable user experience.

## Getting Started :mountain_bicyclist:

For your adventure to start,

1. Clone this repository by running `https://github.com/ruskollin/cwf.git`.
2. Go to folder pdf by running `cd cwf`.
3. Install the necessary dependencies by running `npm install`.
4. Run the program by running `npm start`.

## Features :mountain_bicyclist:

### Journeys
* **List:** Explore a list of bike journeys in Finland. Pagination is implemented to prevent overwhelming the browser with excessive data. Each journey displays details such as departure and return stations, covered distance in kilometers, and duration in minutes.
* **Sorting:** Easily organize the journey list by various columns, allowing you to view journeys based on your preferred sorting criteria.
* **Searching:** Seamlessly search for specific journeys by utilizing the search functionality. Quickly find journeys based on departure or return station names, distance, or duration.
* **Filtering:** Filter journeys based on specific criteria. This allows you to narrow down the journey list.

### Stations
* **List:** Explore a list of bike stations in Finland. Get essential information about each station.
* **Single Station View:** Get more specific data including the count of total departures from the station, count of total returns to the station, average distance from the station, average distance ending at the station, top 5 popular return stations and popular departure stations. The page can be filtered by month.
* **Map:** Visualize the location of a station on the map, providing a more immersive and interactive experience.
* **Sorting:** Easily organize the list by various columns, allowing you to view stations based on your preferred sorting criteria.
* **Searching:** Quickly find the stations and get data easily.
* **Filtering:** Filter journeys based on specific criteria. This allows you to narrow down the journey list.

### Adding New Data
* **New Journey:** Please contribute to the page by adding your own bike journey data. Validation implented like there should be no empty field, not adding a new journey if end time is before start time, not adding if distances and duration are short, not a number or negative.
* **New Station:** Expand the list by adding new bike stations. The fields match the input required and a missing field will require to user to check it.

## Additional Information :mountain_bicyclist:
* Please use your own google maps api_key for the map function to work. Paste the key here: src -> components -> Map.tsx 

* It already uses a backend project deployed on Heroku at **https://stations-backend.herokuapp.com/**. However, if you want to deploy it to your own environment, please follow: [backend project](https://github.com/ruskollin/cw)

## Testing :mountain_bicyclist:

* This utilizes Cypress for end-to-end testing.
* In the codes, the file can be found in the cypress folder -> e2e -> spec.cy.ts
* Make sure the url where your project is running matches the variable link inside the cypress file.
* The cypress file uses the default url `http://localhost:3000`.
* To run the tests, make sure the app is running and execute the command `npm run cypress:open`. 
* The Cypress test runner will open, choose a browser. 
* Then it will lead you to a page called Specs where choosing the cypress file will start the testing. 

### The tests includes 
* Navigation to pages work.
* Stations page works including searching, info page gives more specific data, filtering by months and map with marker of station.
* Journeys page works including searching.
* Adding a new station works. It should not add when a field is empty.
* Adding a new journey works. It should not add when a field is empty, if end time is before start time, and if distances and duration are short, not a number or negative.

