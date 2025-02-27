![Memory Game Screenshot](https://github.com/mbankhar/Memory_Game/raw/main/memory.png)

# 🎮 Memory Game  

📸 **All preset images in this game were taken by me in the Black Forest.**  
As a hobby photographer, I wanted to add a personal touch to this project.  

A fun and interactive memory card game with a **Go backend** and a **React frontend**.  
Upload your own images, flip cards, and test your memory by matching pairs—all while tracking your flip count.  
Perfect for a quick brain teaser or a custom game with personal photos!  

## 🚀 Features  

🎨 **Custom Image Upload** – Use your own images to personalize the game.  
🎲 **Dynamic Card Grid** – Supports up to **16 cards** (adjusts based on images).  
🔢 **Flip Counter** – Track how many flips it takes to win.  
📱 **Responsive Design** – Smooth gameplay on both **desktop & mobile**.  
⚡ **Backend Processing** – Go-powered server for image resizing & game logic.  
🎭 **Interactive UI** – React-based frontend with smooth animations.  

## 🛠️ Tech Stack  

**Backend**: Go (Gin framework, imaging library)  
**Frontend**: React (TypeScript)  
**Styling**: Custom CSS  
**Build Tools**: Makefile for streamlined setup & deployment  

## 📌 Prerequisites  

Before installation, ensure you have:  

- [Go](https://golang.org/dl/) (**1.16+ recommended**)  
- [Node.js](https://nodejs.org/) (**14+ recommended**)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- A modern web browser  

## 📥 Installation  

1️⃣ **Clone the Repository**  
git clone https://github.com/mbankhar/Memory_Game.git  
cd Memory_Game  

2️⃣ **Install Dependencies (for both backend & frontend)**  
make install  

3️⃣ **Build the Frontend**  
make build  

4️⃣ **Run the Application**  
make run  

🔗 The game will be available at **[http://localhost:5001](http://localhost:5001)**  

## 🎮 How to Play  

### 🖼️ Upload Images  
On the homepage, **select up to 8 images** (they will be duplicated to create pairs).  
Click **"Upload"** to process and save them.  

### 🎲 Start the Game  
Once images are uploaded, click **"Start Game"**.  
The game will create a **shuffled grid of cards** (each image appears twice).  

### 🔄 Play  
Click cards to **flip them** and find matches.  
Track your progress using the **flip counter**.  
**Win** by matching all pairs!  

### ❌ Delete Images (Optional)  
Before starting, **remove unwanted images** by clicking the "X" button on each thumbnail.  

### 🔁 Play Again  
After winning, click **"Play Again"** to **restart** and return to the upload screen.  

✨ **Enjoy the game!** 🚀  
