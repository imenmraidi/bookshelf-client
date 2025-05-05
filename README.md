# Bookshelf - Client
This is the frontend for Bookshelf, a virtual library web application built with the **MERN** stack. Bookshelf helps you manage your ebook collection with an intuitive interface for organizing books you've read, are currently reading, or plan to read.

## Demo
Check out the live app: [Bookshelf App](https://lnkd.in/dHW2RN_6)

## Tech Stack
- React.js
- Context API for state management
- dnd-kit for drag-and-drop functionality
- TipTap for rich text editing
- JWT for authentication
- CSS for styling

## Key Features
- Drag-and-drop interface for organizing books across different shelves and libraries
- Rich text notes for each book with TipTap text editor
- Library sharing via exportable links
- Secure JWT-based authentication
- Responsive design for mobile and desktop

## Getting Started
1. Clone the repo
git clone https://github.com/imenmraidi/bookshelf-client.git
cd bookshelf/client

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the client directory and add:
REACT_APP_API_URL=http://localhost:5000/api

4. Start the development server
npm start
The app will run on http://localhost:3000

## Usage
- Create an account or log in
- Add books to your library
- Organize books by dragging and dropping between shelves
- Add notes to books using the rich text editor
- Share your library with others by generating a shareable link

## State Management
The app uses React's Context API for global state management, making it easy to access user data, books, and libraries across components.

## Deployment
The app is deployed on Render.com

## [Go to the server README](https://github.com/imenmraidi/bookshelf-server/edit/main/README.md)
