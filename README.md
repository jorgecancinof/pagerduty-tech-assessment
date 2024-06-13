<div align="center">
  <img src="public/favicon.svg" width="200" height="200" alt="Recipe App icon" />
  <h1 align="center">Recipe App</h1>
  <h3 align="center">Discover recipes quickly with a responsive autocomplete app</h3>
</div>

Initially developed as part of a take-home assessment for a job application, this project has been refined and made
available as a demonstration of my skills. It features a custom autocomplete component with text highlighting and
keyboard navigation. Fully responsive, it works seamlessly on both mobile and desktop devices.

## Screenshots

<div align="center">
  <img src="docs/screenshot-desktop.jpg" width="800" alt="Screenshot desktop" />
</div>

<div align="center">
  <img src="docs/screenshot-mobile.png" width="800" alt="Screenshot mobile" />
</div>

## Features

- **⌨️ Keyboard navigation:** Users can navigate through the autocomplete suggestions using the arrow keys and clear the
  search input with the escape key.
- **✨ Text highlighting:** Autocomplete suggestions highlight the part of the text that matches the user's input.
- **📱 Responsive design:** Fully responsive, ensuring a great user experience on both desktop and mobile devices.
- **🛠️ No third-party libraries:** Built-in logic for autocomplete functionality without external dependencies.

## Tech stack

- React 18
- TypeScript
- CSS with BEM methodology
- Vite

## Data source

This app uses the [TheMealDB API](https://www.themealdb.com/api.php) to fetch cooking recipes.

## Setup and running the project

### Prerequisites

This project uses Node.js LTS version 20.14.0. The [`.nvmrc`](.nvmrc) file in the project root ensures compatibility with Node.js version managers like [NVM](https://github.com/nvm-sh/nvm), [FNM](https://github.com/Schniz/fnm), and [Volta](https://volta.sh/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jorgecancinof/recipe-app.git
   ```

2. (Optional) If you are using NVM or FNM, ensure you are using the correct Node.js version.

   For NVM users:
   ```bash
   nvm use
   ```

   For FNM users:
   ```bash
   fnm use
   ```

3. Install the dependencies:
   ```bash
   npm ci
   ```

### Running the project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the localhost URL shown in the terminal to view the app.

## License

This project is licensed under the [MIT License](LICENSE).
