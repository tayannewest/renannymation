





// Renannymation: It’s Alive! (let’s keep it that way) pseudo code

// Open on intro page
// Fade in intro text (little blurb about game story)
// Create ‘Interested?’ button to click to see instructions
// Open on play screen with Adam, his status bar, and play icons
// Guide player through icons (feed, teach, love) << (maybe add more options if I’m ahead)
// 	create click events that generate alerts on feed, teach, and love to let player know 			how to use them
// Create ‘I’ll do it’ button to click to initialize game
// On ‘I’ll do it’ click, alert ‘Great, be back soon!’ and set timer for 3 min
// Let player click icons to affect Adam
// 	feed: 3 times every 30 seconds, more and he gets sick, less and he gets hungry
// 	teach: 3 time every 30 seconds, more and he gets confused, less and he gets bored
// 	love: unlimited times allowed, but < 3 every 30 seconds he feels neglected
// Status bar starts half full
// Feed: Start 30 second timer on game start
// 		click feed icon to trigger feed event
// 		if clicked 3 times, status bar increase by 5
// 		if clicked < or > 3 times, status bar decrease by 5
// 		if clicked more than 3 times before timer runs out alert ‘I’m full!’
// 			if clicked > 5 times, he throws up, you lose 
// 			if click < 1, he is hungry, you lose
// 			fade to feed lose condition and ask if they want to try again
// 				(replay button)
// Teach: Start 30 second timer on game start
// 		click teach icon to trigger teach event
// 		if clicked 3 times, status bar increase by 5
// 		if clicked < or > 3 times, status bar decrease by 5
// 		if clicked more than 3 times before timer runs out, alert ‘Slow down, I can’t read that fast!’
// 			if clicked > 5 times, he gets angry and tears up the book, you lose
// 			if clicked < 1, he gets bored and tears up the book, you lose
// 			fade to teach lose condition and ask if you want to try again
// 				(replay button)
// Love: Start 30 second timer on game start
// 		click icon to trigger love event
// 		if clicked >= 3 times, status bar increase by 5
// 		if clicked < 3 times, status bar decrease by 5		
// 		if clicked < 2 times every 30 seconds, alert  ‘I need a hug’ << (maybe add a list of pleas for affection to randomly sort through)
// 			if clicked < 1 time, he runs away feeling unloved, congrats, you’ve unleashed a monster upon the town, fade to love lose condition and ask if you want to try again
// 				(replay button)
// 			If click is spammed and we hit more than 20 clicks in a minute, you can speed run the game and Adam feels validated and you win
// If status bars have >= 15 points at end of 3 minutes
// 	You win! Display win condition alert


/*----------------- Constants -----------------*/

const gameplayIcons = document.querySelectorAll('.img')

/*------------- Variables (state) -------------*/



/*--------- Cached Element References ---------*/



/*-------------- Event Listeners --------------*/

gameplayIcons.forEach(img => img.addEventListener('click', select))

/*----------------- Functions -----------------*/


function select(evt) {
  console.log(evt.target.id)
}