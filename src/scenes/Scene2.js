class Scene2 extends Phaser.Scene {
    constructor() {
        super("CARD SHOP")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload() {
        // load images/tile sprites
        this.load.image('player2', './assets/playerBig.png')
        this.load.image('background2', './assets/background2.png')
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
        keySpace2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // load background image
        this.add.image(320, 240, 'background2')

        // load player sprite
        this.add.image(300, 350, 'player2')

        // Dialogue
        this.dialogue1 = this.add.text(100, 50, "Welcome to the card shop.").setColor('#000000')
        this.dialogue2 = this.add.text(100, 75, "Would you like to purchase any cards? (Use arrow keys)").setColor('#000000')
        this.dialogue3 = this.add.text(100, 100, "YES<-  |  ->NO").setColor('#000000')

        // Randomly select a card from the game w/copies remaining to put up in the store
        // & withdraw random # of copies from the game
        this.itemPrice = 100
        this.storeItem = Object.keys(gameCards)[this.getRandomInt(Object.keys(gameCards).length)]
        while (!(gameCards[this.storeItem] > 0)) {
            this.storeItem = Object.keys(gameCards)[this.getRandomInt(Object.keys(gameCards).length)]
        }
        this.itemQuantity = this.getRandomInt(gameCards[this.storeItem]) + 1
        gameCards[this.storeItem] -= this.itemQuantity
    }

    toggleDialogue() {
        this.dialogue1.setVisible(false)
        this.dialogue2.setVisible(false)
        this.dialogue3.setVisible(false)
    }

    update() {
        const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
        const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)

        if (leftJustPressed) {
            this.toggleDialogue()
            if (playerCash <= 0) {
                this.noCashText = this.add.text(100, 50, "I'm sorry, but you currently have no money.").setColor('#000000')
                this.optionsText = this.add.text(100, 75, "(Press SPACE to view the game options menu.)").setColor('#000000')
            }
            else {
                this.currentBalanceText = this.add.text(100, 25, "You currently have "+playerCash+" credits.").setColor('#000000')
                this.storeItemText = this.add.text(100, 50, "You can purchase "+this.storeItem+" for 100").setColor('#000000')
                this.storeItemText2 = this.add.text(100, 75, "credits per copy in the store today.").setColor('#000000')
                this.itemAvailableText = this.add.text(100, 100, "We currently have "+this.itemQuantity+" copies in stock today.").setColor('#000000')
                
                // Player purchases the maximum # of copies of store item they can buy w/their balance
                // However remaining copies left in stock after player purchases is returned to the game
                let numberToBuy = playerCash / this.itemPrice
                if (numberToBuy > this.itemQuantity) {
                    inventories['player'][this.storeItem] = this.itemQuantity
                    playerCash -= (this.itemQuantity * this.itemPrice)
                    numberToBuy = this.itemQuantity
                }
                else {
                    inventories['player'][this.storeItem] = numberToBuy
                    playerCash -= (numberToBuy * this.itemPrice)
                }
                gameCards[this.storeItem] += numberToBuy

                this.transactionText = this.add.text(100, 125, "You purchased "+numberToBuy+" copies of "+this.storeItem+".").setColor('#000000')
            }
        }
        else if (rightJustPressed) {
            this.toggleDialogue()
            this.noCashText = this.add.text(100, 50, "Okay, have a nice day.").setColor('#000000')
            this.optionsText = this.add.text(100, 75, "(Press SPACE to view the game options menu.)").setColor('#000000')
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace2)) {
            this.toggleDialogue()
            this.scene.start('selectScene')
        }
    }
}