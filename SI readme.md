# Space Invaders

## 

## Description

Relive your childhood with this vintage classic. Created by Tomohiro Nishikado in 1978, Space Invaders remains a timeless game suitable for kids and adults. Destroy all of the aliens ships before they reach you and make sure to dodge their projectiles.

## 

## MVP (DOM - CANVAS)

On the top of the screen there are three rows of enemy aliens that move from side to side. Every once in a while they move one space down.  They also shoot at the player randomly. The player can get hit 3 times by enemy projectiles. 

The player is a space ship on the bottom of the screen.  The game allows the player to move side to side and to shoot at the enemies.  The player gets 1 point for each enemy destroyed. The objective of the game is to destroy all of the enemies before they reach the player.

## Data structure

1. index.html
2. main.js
3. game.js
4. player.js
5. enemy.js

### 

### 1. index.html file

### 

### 2. Main file

- buildDom
- createStartScreen / removeStartScreen
- createGameScreen / removeGameScreen
- createGameOverScreen / removeGameOverScreen
- createWinScreen / removeWinScreen
- startGame / endGame

### 

### 3. Game Constructor

**Properties**

- canvas
- ctx
- player
- name
- gameIsOver
- gameIsWon
- loopCount
- timeScore
- pause

**Methods**

- start
- startLoop
- checkCollision
- win
- gameWon / gameOver
- printLives
- printScore

### 

### 4. Player Constructor

**Properties**

- canvas
- ctx
- x position
- y position
- width
- height
- lives
- image
- direction

**Methods**

- shoot

- move

- collidedWithObstacle

- collidedWithEnemy

- collidedWithScreen

- removeLife

  

### 

### 5. Enemy Constructor

**Properties**

- canvas
- ctx
- x position
- y position
- width
- height
- row
- speed
- direction
- image

**Methods**

- shoot
- move x
- move y

### 

## 

## States and States Transitions

- startScreen
  - Start the game
  - Goes to gameScreen when Start button is clicked
- gameScreen
  - Game running while lives > 0
  - Goes to gameoverScreen if lives < 0 or if enemies.y === player.y
  - Goes to winScreen if enemies.length===0    //enemies is an array?
- gameoverScreen
  - Shows Game Over message and Restart button
  - Goes back to Game Screen when Restart button is clicked
- winScreen
  - Shows Win message and Restart button
  - Goes back to Game Screen when Restart button is clicked

## 

## Tasks

- Setup git & GitHub
- Create and connect files: main.js, player.js, obstacle.js,
- BuildDom in main.js
- Create 4 screens in main.js
- Create screen transitions in main.js
- Create Game constructor
- Create loop in game.js
- Create Player constructor
- Create Enemy constructor
- Move player in game.js
- Check Collisions  in game.js
- Check game result in game.js
- 

## Backlog

  

- Bonus life (extra life if eats a randomly generated corn)
- Username registration 
- Sounds when shots are fired and when shots hit enemies or player
- have difficulty levels 