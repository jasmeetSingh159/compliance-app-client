# Frontend Application

This frontend application is built using React, TypeScript, and Material-UI. The app provides a user interface for managing drivers, jobs, trucks, trailers, and invoices.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [API Integration](#api-integration)
- [Styles and Theming](#styles-and-theming)

## Requirements

- Node.js 14.x or later
- npm 6.x or later

## Installation

To set up the frontend application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To run the frontend application in development mode:

1. Start the development server:

   ```bash
   npm run start
   ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

The main project structure is as follows:

```
src/
  ├── components/
  │   ├── CompanySelect/
  │   ├── DriverCard/
  │   ├── DriverDetails/
  │   ├── EmployeeSelect/
  │   ├── JobCard/
  │   ├── JobModal/
  │   ├── NewJobModal/
  │   ├── Sidebar/
  │   ├── TrailerSelect/
  │   ├── TruckSelect/
  │   └── VehicleCard/
  ├── pages/
  │   ├── ClosedJobs/
  │   ├── CreatedJobs/
  │   ├── Drivers/
  │   ├── InvoicePage/
  │   ├── UnpaidJobs/
  │   └── Vehicles/
  ├── services/
  │   ├── apiService.ts
  │   ├── emailService.ts
  │   └── imageService.ts
  ├── types/
  │   └── index.ts
  ├── App.css
  ├── App.tsx
  ├── credentials.json
  ├── index.css
  ├── index.tsx
  └── typings.d.ts
```

- `src/components/`: Contains reusable UI components.
- `src/pages/`: Contains the main views of the application.
- `src/services/`: Contains the services for handling API communication and other tasks.
- `src/types/`: Contains TypeScript types and interfaces.

## Components

The application contains the following main components:

- `CompanySelect`: Dropdown menu for selecting a company.
- `DriverCard`: Displays a driver's information in a compact format.
- `DriverDetails`: Displays detailed information about a driver.
- `EmployeeSelect`: Dropdown menu for selecting an employee.
- `JobCard`: Displays job information in a compact format.
- `JobModal`: Modal for displaying job details.
- `NewJobModal`: Modal for creating a new job.
- `Sidebar`: Contains the navigation menu for the app.
- `TrailerSelect`: Dropdown menu for selecting a trailer.
- `TruckSelect`: Dropdown menu for selecting a truck.
- `VehicleCard`: Displays a vehicle's information in a compact format.

## Pages

The application contains the following pages:

- `ClosedJobs`: Displays a list of closed jobs.
- `CreatedJobs`: Displays a list of created jobs.
- `Drivers`: Displays a list of drivers and their information.
- `InvoicePage`: Generates and displays invoices for jobs.
- `UnpaidJobs`: Displays a list of unpaid jobs.
- `Vehicles`: Displays a list of vehicles, including trucks and trailers.

## API Integration

The frontend interacts with the backend using the following services:

- `apiService.ts`: Handles communication with the backend API.
- `emailService.ts`: Handles sending emails.
- `imageService.ts`: Handles uploading and retrieving images.

## Styles and Theming

The application uses Material-UI for styling and theming. Global styles can be found in `src/App.css` and `src/index.css`. Component-specific styles are located within each component's folder.
