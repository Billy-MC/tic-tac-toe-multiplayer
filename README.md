# Real-Time Multiplayer Tic Tac Toe

A real-time multiplayer Tic Tac Toe game built with React, TypeScript, and Firebase. Play with friends in real-time with instant synchronization and live updates.

![Status](https://img.shields.io/badge/status-ready-success)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)

## Features

### Authentication

- ✅ Simple email/password authentication
- ✅ User registration with display name
- ✅ Persistent login sessions
- ✅ Current user displayed in UI

### Game Lobby

- ✅ View list of available games
- ✅ Create new games
- ✅ Join existing games waiting for players
- ✅ Real-time game list updates
- ✅ Filter out your own games (can't play against yourself)

### Real-Time Game Board

- ✅ Standard 3x3 Tic Tac Toe grid
- ✅ Players alternate turns (X and O)
- ✅ Real-time move synchronization
- ✅ Visual turn indicator
- ✅ Disabled moves when not your turn
- ✅ Winning combination highlighting (color change)
- ✅ Game state updates instantly for both players

### Game Logic

- ✅ Win detection (horizontal, vertical, diagonal)
- ✅ Draw detection (board full, no winner)
- ✅ Occupied square prevention
- ✅ Winner/draw message display
- ✅ Complete game validation

### Real-Time Synchronization

- ✅ Instant move updates for both players
- ✅ Live game state synchronization
- ✅ Real-time lobby updates
- ✅ Firebase Realtime Database integration

### Frontend

- **React 19.1** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool and dev server
- **Zustand** - State management
- **Styled-Components** - CSS-in-JS styling

### Backend

- **Firebase Authentication** - User authentication
- **Firebase Realtime Database** - Real-time data storage and synchronization

### Testing

- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing

## 📁 Project Structure

```zsh
src/
├── assets/                         # Application assets
├── components/                     # React shared components
├── domain/
│   └── ticTacToeLogic.ts           # Pure game logic
├── infrastructure/
│   ├── firebase.ts                 # Firebase configuration
│   ├── FirebaseAuthService.ts      # Auth Service
│   ├── FirebaseGameService.ts      # Game Service
│   └── FirebasePresenceService.ts  # Presence Service
├── interfaces/                     # Service interfaces
├── pages/                          # Page component
│   └── TicTacToePage               # Main Page
│── stores/                         # State management
│── styles/                         # Styling
├── types/
│   ├── styled.d.ts                 # Styling types
│   └── ticTacToe.d.ts              # TypeScript types
├── utils/                          # utilities tools
└── App.tsx                         # Main component
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Firebase account
- Git

### Installation

1. **Clone the repository**

```zsh
git clone https://github.com/Billy-MC/tic-tac-toe-multiplayer.git
cd tic-tac-toe-multiplayer
```

2. **Install dependencies**

Choose your preferred package manager:

```zsh
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

3. **Set up Firebase**

    a. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

    b. Enable Authentication:
    - Go to Authentication → Sign-in method
    - Enable Email/Password

    c. Create Realtime Database:
    - Go to Realtime Database → Create Database
    - Choose location (e.g., Asia Southeast)
    - Start in test mode

    d. Get Firebase configuration:
    - Project Settings → General → Your apps
    - Click Web (</>) to register app
    - Copy the configuration

4. **Configure environment variables**

- Create a `.env` file:

```zsh
cp .env.example .env
```

Fill in the Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.your_region.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

5. **Start development server**

```zsh
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev
```

## How to Play

1. **Sign Up / Sign In**
    - Create account or log in
    - Your display name appears in UI

2. **Create or Join Game**
    - Click "Create Game" to start
    - OR click "Join Game" on available game

3. **Play**
    - Player X (creator) goes first
    - Click empty cell to move
    - Wait for opponent's turn
    - Real-time updates for both players

4. **Win or Draw**
    - 3 in a row wins (horizontal/vertical/diagonal)
    - Full board with no winner = draw
    - Winning cells highlighted yellow

5. **Leave Game**
    - Click "Leave Game" to exit
    - Click "Exit Game" after finish

## Running Tests

```zsh
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# UI mode
npm run test:ui
```

## Build for Production

```zsh
npm run build
npm run preview
```

Built files in `dist/` directory.

## Troubleshooting

### Common Issues

**"Firebase configuration not found"**

- Ensure `.env` exists with all variables
- Variables must start with `VITE_`
- Restart dev server after changes

**"Permission denied"**

- Check Firebase database rules
- Ensure user is authenticated
- Verify rules allow writes

**Game list not updating**

- Check `VITE_FIREBASE_DATABASE_URL` in `.env`
- Verify database exists in Firebase Console
- Check browser console for errors

**Can't join game**

- Clear Firebase data and restart
- Don't join your own game
- Ensure game status is "waiting"

## License

Created as a coding challenge demonstration.

## Author

Coding challenge project demonstrating:

- React development
- Real-time applications
- Firebase integration

## Acknowledgments

- Firebase for real-time database
- React team
- Vitest and React Testing Library
- Styled-components
