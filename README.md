🎬 Cageflix Backend
This is the backend API for the Cageflix app, built with Node.js, Express, and MongoDB.

🔗 API Base URL
Deployed backend URL:
https://cageflix-backend-y4rr.onrender.com

⚙️ Setup Instructions
Backend Setup (Local)
-Clone this repository using:
git clone https://github.com/rijashaheed/cageflix-backend.git

-Navigate into the backend folder:
cd cageflix-backend

-Install dependencies:
npm install

-Create a .env file in the root directory with the following:

PORT=<your preferred port>
MONGO_URI=<your MongoDB connection string>

-🗃️ MongoDB Collection Setup
Import the provided movies_shows.json file to populate your database.

-Create a collection named:
movies_shows

-Start the backend server:
node server.js

🧠 Tech Stack & Rationale
Backend: Node.js + Express — for building fast, lightweight REST APIs

Database: MongoDB Atlas — cloud-hosted, schema-flexible, and scalable for movie data

🚧 Notes
The scripts/ folder contains helper files used to convert IMDb .tsv data to .json.
These are not needed to run the project.

📬 Contact
For questions or issues, contact:
shaheedrija@gmail.com

