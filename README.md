# Conway's game of life

Project journal: [part1](https://zdflower.github.io/posts/2018/02/16/Game-of-life-Part-1.html).

## Description

There is a "board", kind of a set or a matrix of cells. Each cell is either empty (dead) or full (alive), and has neighbours (adyacent cells: up, down, left, right, corners).

The board starts with an initial configuration of cells (seed) and the following states will derive from applying some simple rules to each cell.

The rules are:

- If the cell is empty and
  - has less than 3 neighbours full, then in the next state of the board remains empty.
  - has exactly 3 neighbours full, then there will be a full cell.
  - has more than 3 full neighbours, it will remain empty.
- If the cell is full and
  - has less than 2 full neighbours, it will become empty.
  - has 2 or 3 full neighbours, it will remain full (survives).
  - has more than 3 full neighbours, then it will be empty next time.

## Free Code Camp challenge - User stories:

From [https://www.freecodecamp.org/challenges/build-the-game-of-life](https://www.freecodecamp.org/challenges/build-the-game-of-life)

* [ ] When I first arrive at the game, it will randomly generate a board and start playing.
* [ ] I can start and stop the board.
* [ ] I can set up the board.
* [ ] I can clear the board.
* [ ] When I press start, the game will play out.
* [ ] Each time the board changes, I can see how many generations have gone by.

## State of this project

### 2018-02-19

At the time, there is a predefined seed set in src/index.js, and a button in the page that you can click to see the next state of the board.

### 2018-02-23

In the "boardRepresentation" branch the board is represented by an array of arrays. Be careful with making copies of those beasts! ()

The app shows the actual and the previous boards, when you advance a stage.

## References

* [Conway's game of life by himself](https://www.youtube.com/watch?v=E8kUJL04ELA) youtube video
* Wikipedia on [Conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
* I have used [Create React App](https://github.com/facebookincubator/create-react-app) to get started.