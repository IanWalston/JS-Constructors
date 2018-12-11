//making pathways to the image files
const images = {
    box: "assets/images/box.png",
    bob: "assets/images/bob.png",
    tai: "assets/images/tai.png",
    dogo: "assets/images/dogo.png",
}



//function for the battle log
function battleLog(msg) {
    document.getElementById("battleLog").innerHTML = `<p>${msg}</p>` + document.getElementById("battleLog").innerHTML
}

//function for dying
function lose() {
    document.getElementById("battleScreen").innerHTML = ""
    document.getElementById("endScreen").innerHTML = `<h1>You have been destroyed</h1><img class="img-fluid" id="playerCharacter" src="assets/images/${playerCharacter.title}dead.png">`
}

//function for winning
function win() {
    document.getElementById("battleScreen").innerHTML = ""
    document.getElementById("endScreen").innerHTML = `<h1>You Win</h1><br><iframe id="snoop" src="https://giphy.com/embed/ScZzMlETdv9mg" width="480" height="233" frameBorder="0"class="giphy-embed img-float"></iframe><img class="img-fluid" id="playerCharacter" src="assets/images/${playerCharacter.title}.png">`
}

//Character constructor
function Character(title, health, attack, specialattack, counterattack, description) {
    this.title = title
    this.health = health
    this.attack = attack
    this.specialattack = specialattack
    this.counterattack = counterattack
    this.description = description
    this.enemiesDestroyed = 0
    this.hit = (target) => {

        ////HITTING A TARGET
        //deal damage
        target.health -= this.attack
        battleLog(`${target.title} took ${this.attack} damage.`)

        //gain attack 
        this.attack += (attack / 3)

        //get damaged
        this.health -= target.counterattack
        battleLog(`${this.title} took ${target.attack} damage.`)

        //if enemy is dead
        if (target.health <= 0) {
            battleLog(`${target.title} Has been destroyed.`)
            document.getElementById(target.title).onclick = ""
            document.getElementById(target.title).src = `assets/images/${target.title}dead.png`
            document.getElementById(`${target.title}info`).innerHTML = ""
            this.enemiesDestroyed++
            if (this.enemiesDestroyed >= 3) {
                ////win screen music
                myAudio.loop=false
                myAudio = new Audio('assets/sounds/win.wav')
                myAudio.play()
                setTimeout(() => win(), 2000)
            }
        }

        //if player is dead
        if (this.health <= 0) {
            document.getElementById("playerCharacter").src = `assets/images/${this.title}dead.png`
            battleLog(`${this.title} Has been destroyed.`)
            setTimeout(() => lose(), 2000)
        }

        //update health displays 
        document.getElementById(`${target.title}info`).innerHTML = `HP:${target.health}`
        document.getElementById(`${this.title}info`).innerHTML = `Your HP:${this.health}<br/>
        Your Attack:${this.attack}
        `

        //sound        
        if (this.health <= 0) {
            let audioElement = document.createElement("audio")
            audioElement.setAttribute("src", 'assets/sounds/die.wav')
            audioElement.play()
        }
        else if (target.health <= 0) {
            let audioElement = document.createElement("audio")
            audioElement.setAttribute("src", 'assets/sounds/kill.wav')
            audioElement.play()
        }
        else {
            let audioElement = document.createElement("audio")
            audioElement.setAttribute("src", 'assets/sounds/hit.wav')
            audioElement.play()
        }
    }
}

//an object where each property has a character object for it's value
var characters = {}

//creating characters        (title, hp, attack, special attack, counter attack, description)
characters.tai = new Character("tai", 187, 6, 200, 9, "The More You Learn, The More You Earn.")
characters.box = new Character("box", 333, 3, 200, 5, "In awe of this lad's armor.")
characters.dogo = new Character("dogo", 107, 15, 200, 18, "Much damage. So impress.")
characters.bob = new Character("bob", 143, 9, 200, 13, "i'M rEaDiNg ThE fLaVoUr TeXt!")

//a character object that the player has chosen
var playerCharacter = {}

//an array of character objects that are now enemies for the player character to fight
var enemyCharacters = {}

////CHOOSE CHARACTER SCREEN
//show character description and stats when you click on character image
var showDescription = (character) => {
    document.getElementById("characterDescription").innerHTML =
        `${character.title}<br/>
    HP:${character.health}<br/>
    Attack:${character.attack}<br/>
    Attack as Enemy:${character.counterattack}<br/>
    <br>
    ${character.description}<br/>
    <br>
    <button type="button" class="btn btn-primary" onclick="chooseCharacter(characters.${character.title})">Choose ${character.title}</button>`

    //sounds
    audioElement = document.createElement("audio")
    audioElement.setAttribute("src", 'assets/sounds/tick.wav')
    audioElement.play()
}

////BATTLE SCREEN
//choose character when you click the button after opening character description. this also erases the select character html and builds html elements for the battle screen.
var chooseCharacter = (character) => {
    playerCharacter = character

    //select sound
    audioElement = document.createElement("audio")
    audioElement.setAttribute("src", 'assets/sounds/select.wav')
    audioElement.play()

    //battle loop
    myAudio = new Audio('assets/sounds/fight.wav');
    myAudio.loop = true;
    myAudio.play();

    //puts player stats 
    document.getElementById("characterSelectionScreen").innerHTML = ""
    document.getElementById("playerCharacter").src = `${images[playerCharacter.title]}`
    document.getElementById("playerDiv").innerHTML += `
        <p id="${playerCharacter.title}info">
               Your HP:${playerCharacter.health} <br>
                Your Attack:${playerCharacter.attack}
        </p>`

    //puts enemy characters into the enemyChracters object
    Object.keys(characters).forEach((character) => {
        if (!(character == playerCharacter.title)) {
            enemyCharacters[character] = characters[character]
        }
    })

    //puts enemies and enemy info into the enemydiv html
    Object.keys(enemyCharacters).forEach((enemy) => {
        console.log(images[enemy])
        document.getElementById("enemyDiv").innerHTML += (
            `<div class="row">
                <img width="100%" class="img-fluid" id=${enemy} src=${images[enemy]} onclick="playerCharacter.hit(enemyCharacters.${enemy})">
                <div id=${enemy}info>HP:${enemyCharacters[enemy].health}</div>
             </div>
            `
        )
    })

    battleLog("click an enemy to attack it")
    document.getElementById("enemyCol").style.background = "rgba(0, 0, 0, 0.651)"
}