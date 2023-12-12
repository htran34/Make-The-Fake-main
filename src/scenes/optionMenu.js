class optionMenu extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }
  
    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }
  
    preload() {
        // load images/tile sprites
        this.load.image('player1', './assets/player.png')
        this.load.image('player2', './assets/playerBig.png')
        this.load.image('background1', './assets/background.png')
        this.load.image('background2', './assets/background2.png')
        this.load.image("glass-panel", "assets/PNG/glassPanel.png")
        this.load.image("cursor-hand", "assets/PNG/cursor_hand.png")
        this.load.audio('boop', './assets/boop.wav')
    }
  
    toggleButtons(objects) {
        if (objects[0].visible) {
            for (let i=0; i<objects.length; i+=1) {
                objects[i].setVisible(false)
            }
            this.buttonsActive = false
        }
        else {
            for (let i=0; i<objects.length; i+=1) {
                objects[i].setVisible(true)
            }
            this.buttonsActive = true
        }
    }

    create() {
        this.insideAccompany = false
        this.buttonsActive = true
        this.travelActive = false, this.questActive = false, this.checkActive = false, this.useCardActive = false
        this.buttons = []
        this.selectedButtonIndex = 0

        // Grab & display current scene background image & player sprite
        this.scenes = [NaN, 'background1', 'background2']
        this.cities = [NaN, 'MASSADORA', 'CARD SHOP', 'BUNZEN', 'AIAI', 'BADLANDS']
        this.sprites = [NaN, 'player1', 'player2']
        this.add.image(320, 240, this.scenes[currentScene])
        if (currentScene == 1) {
            this.add.image(150, 400, this.sprites[currentScene])
        }
        else if (currentScene == 2) {
            this.add.image(300, 350, this.sprites[currentScene])
        }
        
        const { width, height } = this.scale
    
        //================================================================
        /* BUTTON DEFINITIONS */
        // Travel button
        this.travelButton = this.add
            .image(width * 0.5, height * 0.3, "glass-panel")
            .setDisplaySize(150, 50)
    
        this.travelButtonText = this.add.text(this.travelButton.x, this.travelButton.y, "Travel").setOrigin(0.5)
    
        // Quest button
        this.questButton = this.add
            .image(
              this.travelButton.x,
              this.travelButton.y + this.travelButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
    
        this.questButtonText = this.add.text(this.questButton.x, this.questButton.y, "Enter Quest").setOrigin(0.5)
    
        // Check Cards button
        this.checkCardsButton = this.add
            .image(
              this.questButton.x,
              this.questButton.y + this.questButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
    
        this.checkCardsButtonText = this.add.text(this.checkCardsButton.x, this.checkCardsButton.y, "Check Cards").setOrigin(0.5)

        // Use Card button
        this.useCardButton = this.add
            .image(
              this.checkCardsButton.x,
              this.checkCardsButton.y + this.checkCardsButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
    
        this.useCardButtonText = this.add.text(this.useCardButton.x, this.useCardButton.y, "Use Card").setOrigin(0.5)
    
        this.buttons.push(this.travelButton)
        this.buttons.push(this.questButton)
        this.buttons.push(this.checkCardsButton)
        this.buttons.push(this.useCardButton)
        this.buttonSelector = this.add.image(0, 0, "cursor-hand")
        this.selectButton(0)

        let objects = [
          this.travelButton, 
          this.travelButtonText,
          this.questButton,
          this.questButtonText,
          this.checkCardsButton,
          this.checkCardsButtonText,
          this.useCardButton, 
          this.useCardButtonText,
          this.buttonSelector
        ]
    
        this.travelButton.on("selected", () => {
            this.toggleButtons(objects)
            this.travelActive = true
            this.currentCityText = this.add.text(100, 350, "You are currently in the city of " +this.cities[currentScene])
            this.travelDirectionsText = this.add.text(100, 375, "Where would you like to travel? (Use arrow keys)")
            // Grab adjacent cities
            if (currentScene == 1) {
                this.adjacentCities = [this.cities[2]]
            }
            else if (currentScene == (this.cities.length - 1)) {
                this.adjacentCities = [this.cities[this.cities.length - 2]]
            }
            else {
                this.adjacentCities = [this.cities[currentScene - 1], this.cities[currentScene + 1]]
            }
            this.arrowOptionsText = this.add.text(100, 400, this.adjacentCities[0] + "<-  |  OTHER ^  |  ->" + this.adjacentCities[1])
        })
    
        this.questButton.on("selected", () => {
            this.toggleButtons(objects)
            this.questActive = true
            this.boop = this.sound.play('boop')
        })
    
        this.checkCardsButton.on("selected", () => {
            this.toggleButtons(objects)
            this.checkActive = true
            this.boop = this.sound.play('boop')
        })

        this.useCardButton.on("selected", () => {
            this.toggleButtons(objects)
            this.useCardActive = true
            this.boop = this.sound.play('boop')
        })
    }
  
    selectButton(index) {
        const currentButton = this.buttons[this.selectedButtonIndex]
        currentButton.setTint(0xffffff)
        const button = this.buttons[index]
        button.setTint(0x66ff7f)
        this.buttonSelector.x = button.x + button.displayWidth * 0.5
        this.buttonSelector.y = button.y + 10
        this.selectedButtonIndex = index
    }
  
    selectNextButton(change = 1) {
        let index = this.selectedButtonIndex + change
        if (index >= this.buttons.length) {
            index = 0
        } else if (index < 0) {
            index = this.buttons.length - 1
        }
  
        this.selectButton(index)
    }
  
    confirmSelection() {
        const button = this.buttons[this.selectedButtonIndex]
        button.emit("selected")
    }

    consumeTurn() {
        currentTurn += 1
    }

    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
  
    update() {
        // Activates button functionality
        if (this.buttonsActive) {
            const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
            const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
            const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
        
            if (upJustPressed) {
                this.selectNextButton(-1)
            } else if (downJustPressed) {
                this.selectNextButton(1)
            } else if (spaceJustPressed) {
                this.confirmSelection()
            }
        }
        // Travel button functionality
        if (this.travelActive) {
            const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
            const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
            const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)
            
            // Removes previous text
            if (leftJustPressed || upJustPressed || rightJustPressed) {
                this.currentCityText.setVisible(false)
                this.travelDirectionsText.setVisible(false)
                this.arrowOptionsText.setVisible(false)
            }
            
            // LEFT arrow option
            if (leftJustPressed) {
                currentScene = this.cities.indexOf(this.adjacentCities[0])
                this.consumeTurn()
                this.scene.start(this.adjacentCities[0])
            }

            // UP arrow option
            else if (upJustPressed) {
                if (inventories['player']['Accompany'] >= 1) {
                    inventories['player']['Accompany'] -= 1
                    currentTurn += 1
                    this.scene.start('ACCOMPANY')
                }
                else {
                    this.noAccompaniesText = this.add.text(100, 350, "You have no copies of accompany remaining.")
                    this.optionsMenuText = this.add.text(100, 375, "Staying in "+this.cities[currentScene])
                    this.wait(3000)
                    this.scene.start(this.cities[currentScene])
                }
            }
            
            // RIGHT arrow option
            else if (rightJustPressed) {
                if (this.adjacentCities.length == 1) {
                    currentScene = this.cities.indexOf(this.adjacentCities[0])
                    currentTurn += 1
                    this.scene.start(this.adjacentCities[0])
                }
                else if (this.adjacentCities.length == 2) {
                    currentScene = this.cities.indexOf(this.adjacentCities[1])
                    currentTurn += 1
                    this.scene.start(this.adjacentCities[1])
                }
            }
        }

        if (this.questActive) {
            quests[this.cities[currentScene]] = true
            this.scene.start(this.cities[currentScene])
        }
    }
}
