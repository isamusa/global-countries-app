# Global Countries App

A responsive web app that allows users to search for and view detailed information about countries using the [REST Countries API](https://restcountries.com/). The app also includes the functionality to mark countries as favorites, which are persisted in `localStorage`.

## Features

- **Home Page**: A searchable and filterable list of countries.
- **Country Details Page**: Detailed information about a selected country, including population, capital, area, and timezones.
- **Favorite Countries**: Users can mark countries as favorites, and the favorites are saved in `localStorage` so that they persist across sessions.
- **Responsive Design**: The app is fully responsive and works on both desktop and mobile devices.

## Tech Stack

- **Frontend**: Angular
- **API**: REST Countries API
- **Storage**: localStorage for persisting favorite countries

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/global-countries-app.git
    ```
2. Navigate into the project directory:
    ```bash
    cd global-countries-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    ng serve
    ```

The app will be available at `http://localhost:4200/`.

## Live Demo (Optional)

A live demo of the app can be viewed here: [Live Demo](https://global-country-details-1kneanzuj-isa-usman-musas-projects.vercel.app)

## Contributing

Feel free to fork the repository and create a pull request for any improvements. Please make sure to follow the standard Git workflow.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
