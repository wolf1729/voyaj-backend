# Voyaj Backend

Node.js Express backend for the Voyaj application, structured for Vercel deployment.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
1. Start the development server:
   ```bash
   npm run dev
   ```
2. The server will be available at `http://localhost:3000`.

### Deployment to Vercel
This project is configured for seamless deployment to Vercel. 
1. Install the Vercel CLI: `npm i -g vercel`.
2. Run `vercel` in the root directory.

## Project Structure
- `src/`: Contains the main server entry point (`index.js`).
- `vercel.json`: Vercel configuration for routing.
- `.env.example`: Template for environment variables.