Users List Web App

📌 Project Overview

This is a React-based web application that fetches and displays a list of users from an API. It features pagination, dynamic data fetching, and CRUD operations (edit & delete users). The app uses React Context API for state management and axios for API requests.

🛠️ Technologies Used
	•	React.js (Frontend Framework)
	•	React Router (Navigation)
	•	Axios (API calls)
	•	Tailwind CSS (Styling)
	•	React Hot Toast (Notifications)
	•	ReqRes API (Mock User Data API)

⸻

🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

1️⃣ Clone the Repository

git clone https://github.com/mkohal/UsersList.git
cd UsersList

2️⃣ Install Dependencies

npm install  # or yarn install

3️⃣ Start the Development Server

npm start  # or yarn start

This will start the React app at http://localhost:3000/.

⸻

📡 API & Data Fetching

The app fetches 6 users from ReqRes API (https://reqres.in/api/users) with pagination support.

⸻

🖥️ Features

✅ Fetch users dynamically from API
✅ Display users in both table and mobile-friendly card view
✅ Edit & Delete user functionality
✅ Pagination to navigate through users
✅ Toast notifications for feedback

⸻

📌 Assumptions & Considerations
	•	The API provides limited mock users (reqres.in has only 6 users across 2 pages).
	•	Deleting users only removes them locally (not on the server).
	•	Editing allows modifying user details on the UI, but changes are not saved persistently (e.g., no API call to update the backend).
	•	State is managed using React Context API.

⸻

📄 Future Improvements

🔹 Implement real backend to persist changes (CRUD operations).
🔹 Improve search & filtering of users.
🔹 Optimize pagination for larger datasets.

⸻

📞 Support

For any issues, feel free to reach out or raise a GitHub issue! 🚀
