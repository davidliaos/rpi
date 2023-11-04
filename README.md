# Medverse

Medverse is a platform designed for licensed medical professionals to share their diagnoses and receive opinions from their peers. It's like StackOverflow, but specifically for doctors. The platform is semi-anonymous, ensuring the privacy of its users while maintaining the integrity and professionalism of the discussions by verifying that all users are licensed doctors or medical professionals.

## Features

- **Case Sharing:** Doctors can share complex cases and their diagnoses, fostering a collaborative environment for learning and problem-solving.
- **Peer Opinions:** Doctors can provide their opinions on shared cases, contributing to a collective understanding and potentially better patient outcomes.
- **Semi-anonymous System:** To maintain privacy, doctors can interact semi-anonymously. Their identities are verified during sign-up but are not publicly disclosed.
- **Verified Users:** To ensure the quality of the discussions, all users are verified as licensed doctors or medical professionals.

## Tech Stack

Medverse is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Next.js for the frontend. The project is divided into two main parts:

- **Frontend:** The frontend is built using Next.js, a popular React framework. It uses the Clerk library for user authentication and Radix UI for the dropdown menu. The frontend also uses Tailwind CSS for styling. You can find the frontend code in the `frontend` directory.

- **Backend:** The backend is built using Express.js and MongoDB for the database. It uses several libraries such as bcrypt for password hashing, jsonwebtoken for generating JWT tokens, and mongoose for object modeling. You can find the backend code in the `backend` directory.

## Getting Started

To get started with the project, you need to run both the frontend and backend servers.

### Frontend

Navigate to the `frontend` directory and run the development server:

```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

### Backend

Navigate to the backend directory and run the development server:

```
npm run dev
# or
yarn dev
```
The backend server will start on http://localhost:5000.


