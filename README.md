
# Typing Speed Test App

A Typing Speed Test App built with React + Vite, allowing users to select a paragraph from a card, type directly in the interface, and measure their typing speed (WPM), errors, and backspace usage. 

## Features

- **Paragraph Selection**: Choose a paragraph to type from cards.
- **Real-time WPM Tracking**: Displays Words Per Minute.
- **Error Count**: Tracks and displays the number of typing errors.
- **Backspace Count**: Tracks the number of backspace key presses.
- **Results Display**: Shows final WPM, errors, and backspaces after the test is completed.

## Installation Below

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/your-username/typing-speed-test-app.git
cd typing-speed-test-app
```

### Install Dependencies

```bash
npm install
```

### Run the App

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Select a Paragraph**: Choose a paragraph from the displayed cards.
2. **Start Typing**: The typing test will begin as soon as you start typing.
3. **View Results**: After completing the test, your results will be shown, including WPM, errors, and backspace usage.

## Components

- **App.jsx**: Manages state and renders the main app components.
- **ParagraphCard.jsx**: Displays paragraph options for the user to select.
- **TypingArea.jsx**: Captures user input and calculates WPM, errors, and backspaces.
- **Timer.jsx**: Manages the time.

## Future Improvements

- **Difficulty Levels**: Add different difficulty levels based on paragraph complexity.
- **Show which words are consecutively typed wrong** : So user can improve himself. 
- **Leaderboard**: Implement a leaderboard to track the highest typing speeds.
- **Time-Based Tests**: Introduce time-based challenges for users to test their speed within a set time limit.

