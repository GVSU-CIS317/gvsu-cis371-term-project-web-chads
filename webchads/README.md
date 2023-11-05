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
  - [ ] Implementation of a client-server chat application (similar to Slack)
  - [ ] A simple chat application should be implemented in which it is possible for multiple clients to access a common backend, with the input of different participants being synchronized on other clients.
- Client:
  - [ ] The client should have two areas, one for displaying the chat where your own messages and messages from other connected participants are displayed, and one for text input to send messages to all participants.
  - [ ] Each client should be uniquely identifiable by a name.
    - Registered users/contacts are displayed in the contact window on the left. In the group, the sender's name is displayed with the message.
- Backend:
  - [ ] The backend should manage the individual connected clients and distribute the messages sent by individual clients to other connected clients.
  - [ ] In the basic task, there is no need for persistence or user management.

### What Extras Have We Implemented?

- [ ] Display of all connected clients/users
  - Online status is displayed under each contact.
- [ ] Persistence of the chat history: When a new client connects, the previous chat history is transferred.
  - Storage of messages, users, and groups is done in Firestore Cloud.
- [ ] Users can transmit not only plain text but also HTML/Markdown/BBCode text.
  - Made possible by using the Marked library.
- [ ] Users are assigned avatars as profile pictures.
- [ ] Users can use emojis.
  - Made possible by the Emoji Picker React library.
- [ ] Registration + Login
  - If the user enters their name during login, and this name has not been registered, they will be automatically redirected to registration, with their name already filled in. They will be assigned a randomly generated avatar that they can regenerate by clicking on the image. The username can contain a maximum of 16 characters, a valid email and a password with a minimum length of 6 must be entered. The image is encoded as a base64 string. The password is hashed using the bcrypt hash method, and the information is stored in the database.
- [ ] Private chat rooms (1:1 chats) and group chats
  - Private chat: Every user can chat privately with any other user. The chat displays the message and the time it was sent. If your chat partner is currently writing to you, it is indicated.
  - Group chat: Every user has the option to create their own groups. To do this, they need to click on the writing icon next to the chat name in the contact area on the left, which opens a window. Additionally, every user can join any group. There, they can send and read messages. The chat displays who the message is from and when it was sent. Your own messages are displayed on the right and the messages from other group members on the left. It also shows who is currently typing in the chat window.

# Technologies

### [Socket.io](http://socket.io/)

The heart of our chat: Enables bidirectional event-based real-time communication between clients and the server. It is based on the WebSocket protocol and also provides a fallback to HTTP long polling.
It also offers the following features:

- Automatic reconnection
- Rooms
- Subscription service

## Backend Technologies

### Node.js

Node.js allows JavaScript to be executed on the server side. It is highly scalable and processes data very quickly.

### Express

Express is a fast Node.js backend framework that offers, among other things, a routing system. API endpoints and frameworks can be developed using it.

## Important Frontend Libraries

### Why React?

- Faster development process
- Flexibility
- Virtual DOM

### Marked

- Is a low-level Markdown compiler
- Implements all Markdown features
- Well-maintained library

### Emoji Picker React

- Displays beautiful emojis and is constantly updated
- Popular

### Styled Components

- CSS in JS

### Axios

- Can execute HTTP requests from Node.js
- Supports the Promise API
- Automatically converts data to JSON format

### Database Tables

| Table    | Description                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| users    | Stores all user information: <br/>ID, username, password, profilePic                                                                                          |
| groups   | Stores all groups: <br/>ID, name                                                                                                                              |
| messages | Stores all messages (from 1:1 chats and group chats):<br/>id, message, users (IDs of the users involved), sender (sender's ID and name), createdAt, updatedAt |

### Socket Events

| Events     | Description                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| typing     | Notifies the recipient (group or private contact) that someone is typing and who is typing                                                 |
| join       | Allows a socket to join a room. If it's a group, it joins the group's ID; otherwise, a special room ID is created for the two individuals. |
| leave      | Allows a socket to leave all rooms.                                                                                                        |
| disconnect | Removes the user from the online list.                                                                                                     |

send-msg | Sends a message with the sender's name, sender's ID, and creation date to the respective room.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
