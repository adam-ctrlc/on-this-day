# Today, Years Ago

"Today, Years Ago" is a dynamic web application that allows users to explore historical events, births, and deaths that occurred on a specific date. Leveraging the "On This Day" API, it provides a fascinating glimpse into the past, offering a rich historical context for any given day of the year.

## Features

- **Date Selection:** Easily select any month and day to view historical data for that specific date.
- **Today's Events:** Displays a curated list of significant events, births, and deaths for the current date upon initial load.
- **Search Functionality:** Filter events, births, and deaths by keywords to quickly find information of interest.
- **Sort by Year:** Sort historical entries by year in ascending or descending order for better chronological understanding.
- **Expandable Lists:** View a summarized list of entries with an option to expand and see all entries for a category.
- **Wikipedia Links:** Descriptions include clickable links to Wikipedia for detailed information on specific topics or individuals.
- **Responsive Design:** Optimized for various screen sizes, providing a seamless experience on both desktop and mobile devices.
- **Dark Mode Support:** Aesthetically pleasing dark mode for improved readability and user comfort.

## Technologies Used

- **Next.js:** React framework for building server-side rendered and static web applications.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **@tanstack/react-query:** Powerful data-fetching and state management library for React applications.
- **react-icons:** Popular icon library for React, specifically using Font Awesome icons.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/adam-ctrlc/on-this-day.git
    cd on-this-day
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

1.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  **Open in your browser:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application will hot-reload as you make changes.

## API Reference

This project utilizes the [On This Day API by byabbe](https://byabbe.se/on-this-day).

- **GET `/api/v1/landing`**: Fetches today's historical data (events, births, deaths).
- **POST `/api/v1/landing`**: Fetches historical data for a specific month and day.
  - **Request Body:**
    ```json
    {
      "month": 7,
      "day": 30
    }
    ```

## Project Structure

```
on-this-day/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/                # API routes
│   │   │   └── v1/
│   │   │       └── landing/
│   │   │           └── route.js  # API endpoint for historical data
│   │   ├── favicon.ico         # Favicon
│   │   ├── globals.css         # Global styles
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Main application page
│   │   └── QueryProvider.jsx   # React Query provider
│   └── components/             # Reusable UI components
├── .eslintrc.json              # ESLint configuration
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project README
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.
