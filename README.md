🧩 Chess Game

A real-time multiplayer chess game built using Node.js, Express, and Socket.io, featuring live gameplay, move synchronization, and role-based participation (player or spectator).

🚀 Features

♟️ Two-player live gameplay (Player 1 vs Player 2)

👀 Spectator mode for observers

🔁 Real-time updates using WebSockets

💾 FEN-based board state management

🎨 Interactive UI built with HTML, CSS, and JS

🧠 Chess.js integration for move validation

🧱 Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Realtime	Socket.io
Game Logic	Chess.js
Frontend	HTML, CSS, JavaScript
Templating	EJS
Version Control	Git & GitHub
⚙️ Installation & Setup

Clone the repository

git clone https://github.com/shreyansh2005a/chess-game.git
cd chess-game


Install dependencies

npm install


Run the server

node app.js


or (if using nodemon)

npm run dev


Visit in browser

http://localhost:3000

🕹️ How to Play

Open the app in two different browser windows/tabs.

The first two connections become Player 1 and Player 2.

Any further connections join as Spectators.

Moves are reflected instantly for all connected users.

📁 Project Structure
chess-game/
├── public/
│   ├── Css/
│   └── Js/
│       └── chessgame.js
├── views/
│   └── index.ejs
├── app.js
├── package.json
├── .gitignore
└── README.md
