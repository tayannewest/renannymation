

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
  document.querySelector('#game-img').src = 'images/sad.png'
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
  currentScore.removeAttribute('hidden')
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
    document.querySelector('#game-img').src = 'images/better.png'
  } else if (points >= 100) {
    currentScore.innerHTML = 'Happy!'
    document.querySelector('#game-img').src = 'images/happy.png'
  }
}

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
