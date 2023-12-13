# WebChads Programming Chat Application

### How to run

### Prerequisite: npm must already be installed

The following commands need to be executed

1. `cd webchads`
2. `npm install`
3. `npm start`

If everything is working correctly, the page should be accessible at [http://localhost:3000](http://localhost:3000/). If not, something is wrong

### Team:

- Tim Kieninger
- Sebastian Torrejon

### Basic Functionality and Our Implementation

- Task:
  - [x] Implementation of a client-server chat application (similar to Slack)
  - [x] A simple chat application should be implemented in which it is possible for multiple clients to access a common backend, with the input of different participants being synchronized on other clients.
- Client:
  - [x] The client should have two areas, one for displaying the chat where your own messages and messages from other connected participants are displayed, and one for text input to send messages to participants.
  - [x] Each client should be uniquely identifiable by a name.
    - Registered users/contacts are displayed in the contact window on the left. In the group, the sender's name is displayed with the message.
- Backend:
  - [x] The backend should manage the individual connected clients and distribute the messages sent by individual clients to other connected clients.
  - [x] In the basic task, there is no need for persistence or user management.

### What Extras Have We Implemented?

- [x] Display of all connected clients/users
  - Online status is displayed under each contact.
- [x] Persistence of the chat history: When a new client connects, the previous chat history is transferred.
  - Storage of messages, and users is done in Firestore Cloud.
- [x] Users can transmit not only plain text but also HTML/Markdown/BBCode text.
  - Made possible by using the Marked library.
- [x] Users are assigned avatars as profile pictures.
- [x] Registration + Login
  - If the user enters their name during login, and this name has not been registered, they will need to register an account. They will be assigned a randomly generated avatar. The username can contain a maximum of 16 characters, a valid email and a password with a minimum length of 6 must be entered.
- [x] Private chat rooms (1:1 chats)
  - Private chat: Every user can chat privately with any other user. The chat displays the message and the time it was sent. If your chat partner is currently writing to you, it is indicated.

# Technologies

### [Socket.io](http://socket.io/)

The heart of our chat: Enables bidirectional event-based real-time communication between clients and the server.
It also offers the following features:

- Automatic reconnection
- Rooms

## Backend Technologies

### Node.js

Node.js allows JavaScript to be executed on the server side. It is highly scalable and processes data very quickly.

## Important Frontend Libraries

### Why React?

- Faster development process
- Flexibility
- Virtual DOM

### Marked

- Is a low-level Markdown compiler
- Implements all Markdown features
- Well-maintained library

### Styled Components

- SCSS in JS

## Firebase

- Firebase Authentication
- Firestore Database
- Firebase Storage
- Firebase hosting

### Database Tables

| Table    | Description                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| users    | Stores all user information: <br/>ID, username, password, profilePic                                                                                          |
| groups   | Stores all groups: <br/>ID, name                                                                                                                              |
| messages | Stores all messages (from 1:1 chats and group chats):<br/>id, message, users (IDs of the users involved), sender (sender's ID and name), createdAt, updatedAt |

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
