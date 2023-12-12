class Scene1 extends Phaser.Scene {
    constructor() {
        super("MASSADORA")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('villager', './assets/villager.png')
        this.load.image('background1', './assets/background.png')
        this.load.audio('levelUp', './assets/levelUp.wav')
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    create() {
        // boolean to check if game has to be restarted from a player loss
        this.gameEnded = false;

        // // display score
        // this.scoreDisplay = this.add.text(50, 50, 'CARDS COLLECTED: ' + score)
        // this.scoreDisplay.setDepth(999)

        // deactivate & reset space key capture from menu
        this.input.keyboard.removeCapture('SPACE')
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // load background image
        this.add.image(320, 240, 'background1')

        // load player sprite
        this.add.image(150, 400, 'player')

        // Dialogue
        if (!quests['MASSADORA']) {
            this.dialogue1 = this.add.text(20, 300, "Welcome to Massadora, starting point of")
            this.dialogue2 = this.add.text(20, 325, "Greed Island where all players begin!")
            if (firstSpawn) {
                this.dialogue3 = this.add.text(20, 350, "There's many different cards in Greed Island but for now,")
                this.dialogue4 = this.add.text(20, 375, "all players just begin with the card Accompany.")
                this.dialogue5 = this.add.text(20, 400, "Here's 5 copies of Accompany. Use Accompany to travel to")
                this.dialogue6 = this.add.text(20, 425, "any location on the island!")
                firstSpawn = false
            }
            else {
                this.dialogue3 = this.add.text(20, 450, "(Press SPACE to view the game options menu.)")
            }
        }
        else {
            this.dialogue1 = this.add.text(10, 300, "Please help us, a horrible pandemic has plagued our village!")
            this.dialogue2 = this.add.text(10, 325, "Many of our very young & old people are in desperate need of help!")
            this.dialogue3 = this.add.text(10, 350, "Do you have any warm clothes you could give us? (Use arrow keys)")
            this.dialogue4 = this.add.text(10, 375, "YES  <-  |  ->NO")
        }
    }

    toggleDialogue() {
        this.dialogue1.setVisible(false)
        this.dialogue2.setVisible(false)
        this.dialogue3.setVisible(false)
        this.dialogue4.setVisible(false)
    }

    update() {
        if (quests['MASSADORA']) {
            const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
            const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)
            this.add.image(400, 430, 'villager')
            if (leftJustPressed) {
                this.toggleDialogue()
                if (playerHasClothes) {
                    playerHasClothes = false
                    this.levelUp = this.sound.play('levelUp')
                    this.dialogue5 = this.add.text(10, 300, "(You gave the clothes off your back)")
                    this.dialogue6 = this.add.text(10, 325, "Thank you sir!!! You saved us!!!")
                    this.dialogue7 = this.add.text(10, 350, "We are eterally grateful for this deed you've done for us.")
                    this.giftItem = Object.keys(gameCards)[this.getRandomInt(Object.keys(gameCards).length)]
                    while (!(gameCards[this.giftItem] > 0)) {
                        this.giftItem = Object.keys(gameCards)[this.getRandomInt(Object.keys(gameCards).length)]
                    }
                    this.itemQuantity = this.getRandomInt(gameCards[this.giftItem]) + 1
                    this.cashReward = this.getRandomInt(6) * 100
                    playerCash += this.cashReward
                    gameCards[this.giftItem] -= this.itemQuantity
                    inventories['player'][this.giftItem] += this.itemQuantity
                    this.dialogue8 = this.add.text(10, 375, "You obtained " +this.itemQuantity+" copies of "+this.giftItem+"")
                    this.dialogue8 = this.add.text(10, 400, "and " +this.cashReward+ " credits.")

                }
                else {
                    this.dialogue5 = this.add.text(10, 300, "You have no more clothes to give.")
                    this.dialogue6 = this.add.text(10, 325, "(Press SPACE to view the game options menu.)")
                }
            }
            else if (rightJustPressed) {
                this.toggleDialogue()
                this.dialogue5 = this.add.text(10, 300, "Please pray for our families...we don't have much longer!")
                this.dialogue6 = this.add.text(10, 325, "(Press SPACE to view the game options menu.)")
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('selectScene')
        }
    }
}
