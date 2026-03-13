# Waitbee: Waitlist Builder

## Project Overview
**Waitbee** is a modern, developer-friendly web application for managing waitlists.  
It provides an **admin dashboard**, a **public join flow**, and **exportable data** so teams can efficiently collect, manage, and analyze waitlist entries.

---

## Features
- **Admin dashboard** for managing entries, users, and settings  
- **Public waitlist interface** for users to join  
- **CRUD operations**: add, search, update, and export entries (CSV)  
- **Authentication**: secure login and password reset flows  
- **Responsive UI** for desktop and mobile  
- **Integration-ready**: API, webhooks, and third-party tool support  

---

## Installation

### Prerequisites
- Node.js (latest LTS recommended)  
- npm (bundled with Node.js) or yarn  

### Quick Start
```bash
# Clone the repository
git clone www.github.com/Sevenplx/waitbee.git

# Navigate to the project directory
cd waitbee

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local and set required keys (e.g., GEMINI_API_KEY, database, auth settings)

# Start the development server
npm run dev
```

Open the app in your browser at: `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

---

## Usage

- **Admin:** Log in to the dashboard to view and manage waitlist entries, users, and settings
- **Public Waitlist:** Share the public join page for users to add themselves
- **Export:** Download waitlist data as CSV for analysis or import into other tools
- **Authentication:** Use built-in login and password reset flows to manage access

---

## Contribution Guidelines

We welcome contributions of all sizes.

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Commit your changes with clear messages:

```bash
git commit -m "Describe your change"
```

4. Push your branch and open a pull request
5. Ensure your code follows the existing style, includes tests where appropriate, and that the app builds and runs locally

If you find a bug or want to propose a feature, open an issue with steps to reproduce and the expected behavior.

---

## License

This project is licensed under the **MIT License**. See `LICENSE` for details.

---

## Support

For questions or issues, please open an issue in the repository.
