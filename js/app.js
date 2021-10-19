





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
// If status bars have >= 50 points at end of 3 minutes
// 	You win! Display win condition alert


/*----------------- Constants -----------------*/


/*------------- Variables (state) -------------*/

let timeLeft = 60
let min, sec = 0
let points = 0
let lovePower = 0
let counter = 0
let gamePrompt
let randomPrompt
let gamePrompts = ['Can I please have a snack?', 'Hungry....', 'Will you read to me?', 'Bored...', 'Can I have a hug?', 'Do you wanna be friends?']

/*--------- Cached Element References ---------*/

const gamePlayIcons = document.querySelector('.img')
const bgImg = document.querySelector('#game-img')
const acceptBtn = document.querySelector('#accept')
const startBtn = document.querySelector('#start-btn')
const timerEl = document.querySelector('#time')
const scoreBar = document.querySelector('#score-bar')
const food = document.querySelector('#food')
const book = document.querySelector('#book')
const heart = document.querySelector('#heart')
const adamSays = document.querySelector('#random-prompt')
const currentScore = document.querySelector('#score')
const instructions = document.querySelector('#instructions')


/*-------------- Event Listeners --------------*/

acceptBtn.addEventListener('click', switchImg)
startBtn.addEventListener('click', start)
food.addEventListener('click', rightChoice)
book.addEventListener('click', rightChoice)
heart.addEventListener('click', rightChoice)

/*----------------- Functions -----------------*/


function switchImg () {
  acceptBtn.hidden = true
  document.querySelector('#game-img').src = 'https://picsum.photos/400/400'
  bgImg.className = 'animate__animated animate__fadeOut'
  bgImg.className = 'animate__animated animate__fadeIn'
  startBtn.removeAttribute('hidden')
  showIcons()
}

function showIcons() {
  food.removeAttribute('hidden')
  book.removeAttribute('hidden')
  heart.removeAttribute('hidden')
}


function start() {
  if (startBtn.style.display === 'none') {
    startBtn.style.display = 'flex'
  } else {
    startBtn.style.display = 'none'
  } console.log('click')
  timerEl.removeAttribute('hidden')
  instructions.removeAttribute('hidden')
  render()
  generatePrompts()
  mood()
}

function generatePrompts() {
  gamePrompt = setInterval(userPrompt, 2000)
}

function userPrompt() {
  randomPrompt = gamePrompts[Math.floor(Math.random() * gamePrompts.length)]
  adamSays.innerHTML = randomPrompt
}

function rightChoice(evt) {
  if ((randomPrompt === gamePrompts[0] || randomPrompt === gamePrompts[1]) && evt.target.id === 'food') {
    points += 5
  } else if
    ((randomPrompt === gamePrompts[2] || randomPrompt === gamePrompts[3]) && evt.target.id === 'book') {
    points += 5
  } else if 
    ((randomPrompt === gamePrompts[4] || randomPrompt === gamePrompts[5]) && evt.target.id === 'heart') {
    points += 5
  } else {
    points -= 5
  }

  console.log(evt.target.id, points)
}

function mood() {
  if (points <=49) {
    currentScore.innerHTML = 'unhappy...'
  } else if ((points >= 50) && (points <= 99)) {
    currentScore.innerHTML = 'feeling better...'
  } else if (points >= 100) {
    currentScore.innerHTML = 'Happy!'
  }
}
console.log(mood())

function render(){
  let timerId = setInterval(() => {
    min = Math.floor(timeLeft/60)
    sec = timeLeft % 60
    timeLeft -= 1
    if (sec < 10) {
      timerEl.textContent = `${min}:0${sec}`
    } else {
      timerEl.textContent = `${min}:${sec}`
    }
    if ((timeLeft <= 0) && (points >= 100)) {
      clearInterval(timerId)
      timerEl.textContent = 'What a great job, looks like Adam will be able to fit in with the villagers thanks to your help!'
      clearInterval(gamePrompt)
      adamSays.innerHTML = 'That was so fun, thanks for playing with me!'
    } else if ((timeLeft <= 0) && (points < 100)) {
      clearInterval(timerId)
      timerEl.textContent = 'Way to go, he ran away. Looks like he might not be the only monster here...'
      clearInterval(gamePrompt)
      adamSays.innerHTML = 'If I cannot inspire love, I will cause fear!'
    }
  }, 1000)
}
