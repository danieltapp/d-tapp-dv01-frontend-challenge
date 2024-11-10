# DT x DV01 Frontend Challenge 💰

This project is my solution to the frontend challenge where I built a table and bar graph with filtering capabilities based on user-selected values. I’ve also focused on **performance** and **ease of use**, while ensuring the app is **accessible** and **production-ready**.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Performance](#performance)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Run 'setup' With Docker (Optional)](#run-setup-with-docker-optional)
- [Project Structure](#project-structure)
- [Challenge Details](#challenge-details)
- [Concluding Remarks](#concluding-remarks)

---

## Introduction 🎯

The goal of this project was to create an app that provides an interactive table where users can view data with various filters and a bar graph for visual representation. Given the time constraint of only being able to work on it a few hours per day, I aimed for a balance between visual appeal and practical functionality. While it may not be the "Dan Flashes" of data apps, it’s definitely more than just a plain old shirt. 👕📊

---

## Features ✨

- **Dynamic Table**: A table that displays data with total aggregations by grade, and supports **filtering** by home ownership, quarter, term, and year using dropdowns.
- **Bar Graph**: A bar graph that dynamically updates based on the filters selected in the dropdowns, showing the total balance per grade.
- **Reset Functionality**: A reset button that clears all filters and returns the table and graph to their original state.
- **Accessibility**: The app has been designed with accessibility in mind, ensuring that it’s intuitive and usable for all. It includes a theme toggle to switch between light and dark modes, enhancing readability and user comfort. 🔑
- **Optimized Performance**: The app is built with performance in mind, focusing on smaller, faster loads and minimal code bloat.

---

## Performance 💪

As a results-oriented engineer, I prioritized both **speed** and **functionality** to ensure the app runs efficiently. Here’s what I did to optimize the performance:

- **Chunking Optimization**: I configured the build tools (Vite + Rollup) to optimize chunking. This ensures that only necessary chunks are loaded, reducing the initial load time and improving the overall speed of the app. For example, I separated `recharts` into its own chunk to keep the core bundle smaller and more efficient. 🔥
- **Efficient Builds**: By adjusting the build settings and chunking strategies, I reduced the size of the final assets, making the app faster to load and more responsive. With **optimized chunk sizes**, the app is **production-ready** and performs smoothly. 💯

---

## Technologies Used 🚀

- **Zustand**: For lightweight and efficient state management.
- **Recharts**: For visualizing the data with a bar graph.
- **Tailwind CSS**: For a clean and responsive design, ensuring the app looks good on all screen sizes.
- **ShadCN/UI**: For modern, lightweight UI components.
- **Playwright**: For end-to-end tests of my app.
- **Vite**: For fast and optimized build process, including tree shaking to remove unused code.

---

## Getting Started 🏁

To get this project up and running locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/d-tapp-dv01-frontend-challenge.git
    ```

2. **Navigate into the project directory**:
    ```bash
    cd d-tapp-dv01-frontend-challenge
    ```

3. **Install dependencies**:
    - If you want to use **pnpm** (recommended):
        ```bash
        pnpm install
        ```
    - Or if you prefer **npm**:
        ```bash
        npm install
        ```

4. **Start the development server**:
    ```bash
    pnpm dev
    ```
    Or if using npm:
    ```bash
    npm run dev
    ```

5. **Open the app in your browser**:
    Visit `http://localhost:5173` to view the app.

---

## Run Setup With Docker (Optional) 🚀

If you'd like to spin up the app in a Docker container, follow these steps:

1. **Make sure you have `direnv` and `docker` installed.**
2. **Run `direnv allow .` to allow the environment to load.**
3. **Run the `setup` script to start the Docker container**:

    ```bash
    setup
    ```

This will:
- Build and start the Docker container.
- Opens the app in your default browser at `http://localhost:4173`.
- Let you see your app running in a production-like environment! 🎉

---

## Project Structure 📁

- **`/components`**: Contains all React components (table, chart, dropdowns, etc.).
- **`/store`**: Zustand stores for managing global state.
- **`/request`**: The `getData` API.
- **`/utils`**: Helper functions and utilities.
- **`/tests`**: This is where my Playwright test(s) are. 🧪

---

## Testing with Playwright 🧪

To ensure the app works as expected, I used Playwright for end-to-end testing. Currently there's just a basic render test on my loan data view. This is an area I'd expand upon, adding happy & sad path tests. Here’s how you can run the tests:


 **Run the tests**:
    ```bash
    pnpm test:e2e
    ```
    Or if using npm:
    ```bash
    npm run test:e2e
    ```

---

## Concluding Remarks 🎉

This project was a fun challenge and a great opportunity to apply my skills while focusing on performance and optimization. Despite working within the limitations of my time constraint, I delivered a solid MVP. My north stars were performance, accessibility, and clean, readable code. 

While this project is already in a good place, there are always areas for improvement. Here are a few things I’d focus on next:

- **End-to-End Testing**: Currently, I have a basic render test for the loan data view. I’d expand this to include more comprehensive tests, covering both happy and sad paths. Because who doesn’t love a good cry when their code breaks? 😢

- **Performance Optimization**: My Lighthouse scores are pretty stellar with accessibility and best practices both at 100. However, performance is at 97. So, there’s still room to tinker and squeeze out those last few points. Maybe I’ll find that elusive 3% hiding under the couch cushions. 🛋️🔍


In conclusion, while this project is already a solid MVP, there’s always room for improvement and iteration. 🚀


![Celebration](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTF5bGpicmdoMjl6NjVmNmdpMHU4MW95MWU1b3Fia2lkbnU5aGZ5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kERV7fZDr6CIMpV4ww/giphy.gif)
