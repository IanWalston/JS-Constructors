const images = {
    box: "assets/images/box.png",
    bob: "assets/images/bob.png",
    book: "assets/images/book.png",
    dogo: "assets/images/dogo.png",
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
        this.attack += attack
        // if (this.health <= 0) { this.destroy() }
        console.log(this)
        console.log("hits")
        console.log(target.title)
        document.getElementById(`${target.title}info`).innerHTML = `balls`
    }
}

//an object where each property has a character object for it's value
var characters = {}



characters.box = new Character("box", 155, 7, 20, 9)
characters.bob = new Character("bob", 100, 7, 20, 9)
characters.book = new Character("book", 115, 7, 20, 9)
characters.dogo = new Character("dogo", 90, 7, 20, 9)

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

    //puts enemy characters into the enemyChracters object
    Object.keys(characters).forEach((character) => {
        if (!(character == playerCharacter.title)) {
            enemyCharacters[character] = characters[character]
        }
    })

    Object.keys(enemyCharacters).forEach((enemy) => {
        console.log(images[enemy])
        document.getElementById("enemyDiv").innerHTML += (
            `<img id=${enemy} src=${images[enemy]} onclick="playerCharacter.hit(enemyCharacters.${enemy})">
            <div id=${enemy}info>HP:${enemyCharacters[enemy].health}</div>`
        )
    })

    console.log(`Enemies are:`)
    console.log(enemyCharacters)

    Object.keys(enemyCharacters).forEach((ele) => console.log(ele))
    Object.keys(enemyCharacters).forEach((ele) => console.log(enemyCharacters[ele]))
    Object.keys(enemyCharacters).forEach((ele) => console.log(images[ele]))


}


