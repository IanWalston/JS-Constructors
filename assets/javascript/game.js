const images = {
    box: "assets/images/box.png",
    bob: "assets/images/bob.png",
    book: "assets/images/book.png",
    dogo: "assets/images/dogo.png"
}

//Character constructor
function Character(title, health, attack, specialattack, counterattack) {
    this.title = title
    this.health = health
    this.attack = attack
    this.specialattack = specialattack
    this.counterattack = counterattack
    this.hit = (target) => {
        target.health -= this.attack
        this.attack += (attack/3)
        this.health -= target.attack
        // if (this.health <= 0) { this.destroy() }
        console.log(this)
        console.log("hits")
        console.log(target.title)
        document.getElementById(`${target.title}info`).innerHTML = `HP:${target.health}`
        document.getElementById(`${this.title}info`).innerHTML = `Your HP:${this.health}<br/>
        Your Attack:${this.attack}
        `
    }
}

//an object where each property has a character object for it's value
var characters = {}

characters.box = new Character("box", 199, 3, 20, 5)
characters.bob = new Character("bob", 100, 9, 20, 11)
characters.book = new Character("book", 133, 6, 20, 8)
characters.dogo = new Character("dogo", 90, 12, 20, 14)

//a character object that the player has chosen
var playerCharacter = {}

//an array of character objects that are now enemies for the player character to fight
var enemyCharacters = {}

//chooser character when you click the image. this also builds html elements for the battle screen.
var chooseCharacter = (character) => {
    playerCharacter = character
    console.log(`Selected ${playerCharacter.title} as playerCharacter`)
    document.getElementById("characterSelectionScreen").innerHTML = ""
    document.getElementById("playerCharacter").src = `${images[playerCharacter.title]}`
    document.getElementById("playerDiv").innerHTML += `
        <p id="${playerCharacter.title}info">
               Your HP:${playerCharacter.health} <br>
                Your Attack:${playerCharacter.attack}
           
        </p>
        `

    //puts enemy characters into the enemyChracters object
    Object.keys(characters).forEach((character) => {
        if (!(character == playerCharacter.title)) {
            enemyCharacters[character] = characters[character]
        }
    })

    //puts images of enemies and enemy info into the enemydiv html
    Object.keys(enemyCharacters).forEach((enemy) => {
        console.log(images[enemy])
        document.getElementById("enemyDiv").innerHTML += (
            `<img id=${enemy} src=${images[enemy]} height=10% onclick="playerCharacter.hit(enemyCharacters.${enemy})">
            <div id=${enemy}info>HP:${enemyCharacters[enemy].health}</div>`
        )
    })
}