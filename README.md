# OAuth API Server Exercise

This project is an OAuth-based authentication system using GitHub login. The backend handles authentication, profile fetching, and repository listing.

## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/kiranwankhade/OAuth_API_Server_Exercise.git
   cd OAuth_API_Server_Exercise
   npm install
   ```

2. **Set Up Environment Variables:**
   Create a `.env` file and add:
   ```env
   GITHUB_CLIENT_ID=YOUR_CLIENT_ID
   GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
   FRONTEND_URL=https://msplan3-frontend.vercel.app
   PORT=4000
   NODE_ENV=production
   ```

3. **Start the Server:**
   ```bash
   node app.js
   ```
   The server should now run on `http://localhost:4000`

## Key Endpoints
- `GET /` - Home Route
- `GET /auth/github` - Redirects to GitHub OAuth
- `GET /user/profile/github` - Fetches authenticated user profile
- `GET /github/repos` - Fetches user repositories
- `GET /github/starred` - Fetches starred repositories
- `GET /logout` - Logs out the user

## Exercise Tasks
- Implement missing functions for fetching starred repositories.
- Fix existing bugs in the project.
- Integrate the backend with the provided frontend.

For detailed steps and explanations, visit the full project [here](https://github.com/kiranwankhade/OAuth_API_Server_Exercise).
