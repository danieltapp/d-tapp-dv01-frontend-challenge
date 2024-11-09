# DT x DV01 Frontend Challenge 💰

This project is my solution to the frontend challenge where I built a table and bar graph with filtering capabilities based on user-selected values. I’ve also focused on **performance** and **ease of use**, while ensuring the app is **accessible** and **production-ready**.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Performance](#performance)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Challenge Details](#challenge-details)
- [Concluding Remarks](#concluding-remarks)

---

## Introduction 🎯

The goal of this project was to create an app that provides an interactive table where users can view data with various filters. The table is enhanced by a bar graph that visualizes data based on loan grades and their corresponding balances.

---

## Features ✨

- **Dynamic Table**: A table that displays data with total aggregations by grade, and supports **filtering** by home ownership, quarter, term, and year using dropdowns.
- **Bar Graph**: A bar graph that dynamically updates based on the filters selected in the dropdowns, showing the total balance per grade.
- **Reset Functionality**: A reset button that clears all filters and returns the table and graph to their original state.
- **Accessibility**: The app has been designed with accessibility in mind, ensuring that it’s intuitive and usable for all. 🔑
- **Optimized Performance**: The app is built with performance in mind, focusing on smaller, faster loads and minimal code bloat.

---

## Performance 💪

As a results-oriented developer, I prioritized both **speed** and **functionality** to ensure the app runs efficiently. Here’s what I did to optimize the performance:

- **Chunking Optimization**: I configured the build tools (Vite + Rollup) to optimize chunking. This ensures that only necessary chunks are loaded, reducing the initial load time and improving the overall speed of the app. For example, I separated `recharts` into its own chunk to keep the core bundle smaller and more efficient. 🔥
  
- **Tree-shaking**: I ensured that unused code is removed during the build process. This minimizes the size of the final output and reduces the load time for the app.

- **Efficient Builds**: By adjusting the build settings and chunking strategies, I reduced the size of the final assets, making the app faster to load and more responsive. With **optimized chunk sizes**, the app is **production-ready** and performs smoothly. 💯

---

## Technologies Used 🚀

- **React**: For building the UI components.
- **Zustand**: For lightweight and efficient state management.
- **Recharts**: For visualizing the data with a bar graph.
- **Tailwind CSS**: For a clean and responsive design, ensuring the app looks good on all screen sizes.
- **ShadCN/UI**: For modern, lightweight UI components.
- **Vite**: For fast and optimized build process.
- **TypeScript**: For type safety and better development experience.

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
    ```bash
    pnpm install
    ```

4. **Start the development server**:
    ```bash
    pnpm dev
    ```

5. **Open the app in your browser**:
    Visit `http://localhost:5173` to view the app.

---

## Project Structure 📁


- **`/components`**: Contains all React components (table, chart, dropdowns, etc.).
- **`/store`**: Zustand store for managing global state.
- **`/request`**: The `getData` API and any external data fetching logic.
- **`/assets`**: Static assets like images and icons.
- **`/utils`**: Helper functions and utilities.

---

## Challenge Details 📝

### Task 1 - Create a Table

Create a table where each column corresponds to a unique grade value from the data. The first row shows the total current balance for each grade.

- You can view the wireframe for the table layout here:  
  ![Table Wireframe](./wireframe/Table.png)

### Task 2 - Build Dropdown Filters

Add dropdowns for **home ownership**, **quarter**, **term**, and **year** to filter data in the table. The dropdown options should be dynamically generated based on the data available.

### Task 3 - Implement Reset Functionality

Provide a **Reset** button that clears the filters and resets the data.

### Task 4 - Optional Bonus (Bar Graph)

Create a bar graph that visualizes the total balance for each loan grade. This should update dynamically based on the filters selected.

---

## Concluding Remarks 🎉

This project was a fun challenge and a great opportunity to apply my skills with React, Zustand, and Vite while focusing on performance and optimization. I used lightweight libraries and optimized build tools to ensure that the app runs smoothly and is production-ready. 

Thanks for checking out my solution! Feel free to dive into the code, explore, and provide feedback. Let’s chat! 💬

---

