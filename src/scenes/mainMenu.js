class mainMenu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.audio('start', './assets/gameStart.wav')
        this.load.audio('music', './assets/backgroundMusic.wav')
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    create() {
        // display various menu elements
        this.add.rectangle(200, 0, 1000, 1000, 0x63a0fd)   // sets menu background color              
        this.add.text(150, 300, 'PRESS SPACE TO START', textConfig)

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // initialize score
        score = 0

        // initialize all NPC player locations at random cities
        for (let i = 1; i < players.length; i++) {
            locations[players[i]] = this.getRandomInt(5) + 1
        }
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            game.settings = {}
            currentScene  = 1
            this.sound.play('start')
            this.music = this.sound.play('music', soundConfig)
            this.scene.start('MASSADORA')
          }
    }
}