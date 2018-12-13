* Gem Match
* Overview
	Gem Match is a simple and easy game to pick up quickly. The extent of the gameplay is clicking on the gems to move them to find 3 matching gems in a row or column to eliminate that row/column.

	Game will have limited moves.You have to reach  a particular score with in the limited number of moves to win.

  This game is inspired by classic arcade games, particularly Bejewel Match and Candy Crush Saga. I am envisioning a colorful design and simple gameplay to keep the player engaged.


* Functionality and MVP Features
    * Users can use mouse clicks to select the gem they want to flip first, then select the adjacent gem they want to swap with.
    * More gems will be generated as the old ones get eliminated.
    * The game ends if the time is up and the user is not able to gather required points or there are no available moves.


* WireFrames
    * The app will consist of a single page with a play button, a scoreboard button, links to the Github repository and developer LinkedIn.
    * Upon pressing start game single line of text being instructions appear on the screen and fade out as the user is given a chance to get accustomed to controlling the avatar.
    * You can restart the game at any point in time.




  * Technologies employed
    *  Vanilla JavaScript for game logic.
    *  HTML5 Canvas for rendering.
    *  Howler.js (or HTML audio player) for game background music.
    *  Webpack to bundle various scripts into a single source.
    *  React.js for basic page structure and functionality.
      Main files
    *  gem_match.js main structure of the canvas and center of game logic.
    *  board.js responsible for rendering the board.
    *  player.js receives input and outputs reaction and position.



  * MVPs
     * Basic visuals and an interactive interface.
     * Player can swap gems.
     * If matching gems appear 3 on row/column that row/column get eliminated.
     * If required score is reached with in the limited number of moves you win.
     * Window styling scoreboard modal.
