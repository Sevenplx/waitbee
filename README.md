# Waitlist Builder

## Project Overview
Waitlist Builder is a modern web application designed to help businesses and organizations manage their waitlists efficiently. With a user-friendly interface and robust backend, this app simplifies the process of adding, managing, and exporting waitlist entries.

## Features
- **Admin Dashboard**: Manage users, settings, and analytics.
- **Waitlist Management**: Add, check, and export waitlist entries.
- **Authentication**: Secure login and password reset functionality.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Integration Support**: Easily connect with third-party tools.

## Installation

### Prerequisites
- Node.js (latest LTS version recommended)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/waitlist-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd waitlist-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your `GEMINI_API_KEY`:
     ```env
     GEMINI_API_KEY=your_api_key_here
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and visit `http://localhost:3000`.

## Usage
- **Admin Login**: Access the admin dashboard to manage waitlists and settings.
- **Public Waitlist**: Allow users to join waitlists via a public interface.
- **Export Data**: Export waitlist entries for further analysis.

## Contribution Guidelines
We welcome contributions to improve Waitlist Builder! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

For any questions or support, feel free to open an issue or contact the maintainers.
