

/*----------------- Constants -----------------*/

const bgTrack = new Audio('/audio/2019-08-25_-_8bit-Smooth_Presentation_-_David_Fesliyan.mp3')
const clickSound = new Audio('/audio/mixkit-player-jumping-in-a-video-game-2043.wav')

/*------------- Variables (state) -------------*/

let timeLeft = 60
let min, sec = 0
let points = 0
let lovePower = 0
let counter = 0
let gamePrompt
let randomPrompt
let gamePrompts = ["Can I please have a snack?", "I'm hungry....", "Will you read to me?", "I'm Bored...", "Can I have a hug?", "Do you wanna be friends?"]

/*--------- Cached Element References ---------*/

const gamePlayIcons = document.querySelector('.img')
const text = document.querySelector('#intro-text')
const bgImg = document.querySelector('#game-img')
const acceptBtn = document.querySelector('#accept')
const startBtn = document.querySelector('#start-btn')
const timerEl = document.querySelector('#time')
const scoreBar = document.querySelector('#score-bar')
const food = document.querySelector('#food')
const book = document.querySelector('#book')
const heart = document.querySelector('#heart')
const adamSays = document.querySelector('#random-prompt')
const currentScore = document.querySelector('#mood')
const instructions = document.querySelector('#instructions')
const bar = document.querySelector('.progress-bar');
const lightDarkBtn = document.querySelector('#light-dark-btn')
const body = document.querySelector('body')
const reset = document.querySelector('#reset-btn')


/*-------------- Event Listeners --------------*/

acceptBtn.addEventListener('click', showImg)
startBtn.addEventListener('click', init)
food.addEventListener('click', rightChoice)
book.addEventListener('click', rightChoice)
heart.addEventListener('click', rightChoice)
lightDarkBtn.addEventListener('click', toggleLightDark)

/*----------------- Functions -----------------*/

text.className = 'animate__animated animate__fadeIn'

function showImg () {
  text.hidden = true
  acceptBtn.hidden = true
  bgImg.className = 'animate__animated animate__fadeIn'
  bgImg.removeAttribute('hidden')
  startBtn.removeAttribute('hidden')
  adamSays.textContent = 'Nice to meet you...'
  showIcons()
  bgTrack.play()
}

function showIcons() {
  food.removeAttribute('hidden')
  book.removeAttribute('hidden')
  heart.removeAttribute('hidden')
}

function init() {
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
}

function generatePrompts() {
  gamePrompt = setInterval(userPrompt, 2000)
}

function userPrompt() {
  randomPrompt = gamePrompts[Math.floor(Math.random() * gamePrompts.length)]
  adamSays.className = 'animate__animated animate__fadeIn'
  adamSays.innerHTML = randomPrompt
}

function mood(){
  if (points <=49) {
    currentScore.innerHTML = 'unhappy...'
  } else if ((points >= 50) && (points <= 99)) {
    currentScore.innerHTML = 'feeling better...'
    document.querySelector('#game-img').src = 'images/better.png'
  } else if (points >= 100) {
    currentScore.innerHTML = 'Happy!'
    document.querySelector('#game-img').src = 'images/happy-adam-gif.gif'
  }
}

function rightChoice(evt) {
  if ((randomPrompt === gamePrompts[0] || randomPrompt === gamePrompts[1]) && evt.target.id === 'food') {
    points += 5
    clickSound.play()
  } else if
  ((randomPrompt === gamePrompts[2] || randomPrompt === gamePrompts[3]) && evt.target.id === 'book') {
    points += 5
    clickSound.play()
  } else if 
  ((randomPrompt === gamePrompts[4] || randomPrompt === gamePrompts[5]) && evt.target.id === 'heart') {
    points += 5
    clickSound.play()
  } else {
    points -= 5
    clickSound.play()
  }
  bar.style.width = points + "%";
  mood()
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
    if ((timeLeft <= -1) && (points >= 100)) {
      clearInterval(timerId)
      timerEl.textContent = 'What a great job, looks like Adam will be able to fit in with the villagers thanks to your help!'
      clearInterval(gamePrompt)
      adamSays.innerHTML = 'That was so fun, thanks for playing with me!'
      instructions.hidden = true
      currentScore.hidden = true
      reset.hidden = false
      bgTrack.pause()
    } else if ((timeLeft <= -1) && (points < 100)) {
      clearInterval(timerId)
      timerEl.textContent = 'Way to go, he ran away. Looks like he might not be the only monster here...'
      clearInterval(gamePrompt)
      adamSays.innerHTML = 'If I cannot inspire love, I will cause fear!'
      instructions.hidden = true
      currentScore.hidden = true
      reset.hidden = false
      bgTrack.pause()
    }
  }, 1000)
  rightChoice()
}

function toggleLightDark() {
  body.className = body.className === 'dark' ? '' : 'dark'
}

function checkDarkPref() {
  if (window.matchMedia('(prefers-color-scheme:dark)').matches && body.className !== 'dark') {
    toggleLightDark()
  }
}

checkDarkPref()