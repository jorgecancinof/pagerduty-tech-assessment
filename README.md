# PagerDuty Tech Assessment

## React Autocomplete App

This autocomplete app lets users swiftly search for cooking recipes using a custom-built component, avoiding
third-party dependencies. It's designed to be responsive and user-friendly across mobile or desktop.

<p align="center">
  <img src="docs/screenshot-desktop.jpg" width="800" alt="Screenshot desktop" />
</p>

<p align="center">
  <img src="docs/screenshot-mobile.png" width="800" alt="Screenshot mobile" />
</p>

## Features

- **⌨️ Keyboard navigation:** Users can navigate through the autocomplete suggestions using the arrow keys and clear the
  search input with the escape key.
- **✨ Text highlighting:** Autocomplete suggestions highlight the part of the text that matches the user's input.
- **📱 Responsive design:** Fully responsive, ensuring a great user experience on both desktop and mobile devices.
- **🛠️ No third-party libraries:** Built-in logic for autocomplete functionality without external dependencies.

## Tech stack

- React 18
- TypeScript
- Vite
- CSS with BEM methodology

## Data source

This app uses the [TheMealDB API](https://www.themealdb.com/api.php) to fetch cooking recipes.

## Setup and running the project

### Prerequisites

Ensure you have the latest LTS version of Node.js installed.

### Installation

1. Clone the repository.

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the project

1. To start the development server:
   ```bash
   npm run dev
   ```

2. Open the localhost URL shown in the terminal to view the app.

## License

This project is licensed under the [MIT License](LICENSE).
