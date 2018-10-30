* Gem Match
* Overview
	Gem Match is a simple and easy game to pick up quickly. The extent of the gameplay is pressing left or right to move the 
	gems to find 3 matching gems in a row or column to eliminate that row/column.

	Game will have a timer going on.You have to reach  a particular score to in a level with inn that time to progress to the next 		level.

  This game is inspired by classic arcade games, particularly Bejewel Match and Candy Crush Saga. I am envisioning a colorful design and simple gameplay to keep the player engaged.


* Functionality and MVP Features
    * Users can use mouse clicks to select the gem they want to flip first, then select the adjacent gem they want to swap with.
    * More gems will be generated as the old ones get eliminated.
    * The game ends if the time is up and the user is not able to gather required points or there are no available moves.


* WireFrames
    * The app will consist of a single page with a play button, a scoreboard button, links to the Github repository and developer LinkedIn.
    * Upon pressing play the game starts and a single line of text being instructions appear on the screen and fade out as the user is given a chance to get accustomed to controlling the avatar.
    * Upon 'Game Over' a scoreboard model will slide down listing the player's previous score. A 'Play Again' button will be included on this modal.


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
     * If required score is reached with in the time limit player gets to next level.
     * Window styling scoreboard modal.


  *   Development timeline
     *  Day 1:
        * Finish brainstorming, concept, and proposal.
        *  Finish basic project skeleton and essentials.
     *  Day 2:
        * Briefly review games using canvas from the instructional curriculum.
        * Complete basic page skeleton and functionality.
        * Complete board design and rendering.
     * Day 3:
        * Complete player avatar rendering and functionality.
     * Day 4:
        * Implement color matching Functionality.
        * Finish game over condition.
        * Scoreboard rendering.
     * Day 5:
        * Add flair and flashy visuals.
        * Finish styling page.
        * Complete MVPs and iron out project.

     * Bonus features
        * Items that may help  the player:
        * A all time highscore rendering.
