class accompanyScene extends Phaser.Scene {
    constructor() {
        super("ACCOMPANY")
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
    }

    create() {
        // Grab & display current scene background image & player sprite
        this.scenes = [NaN, 'background1', 'background2']
        this.sprites = [NaN, 'player1', 'player2']
        this.add.image(320, 240, this.scenes[currentScene])
        if (currentScene == 1) {
            this.add.image(150, 400, this.sprites[currentScene])
        }
        else if (currentScene == 2) {
            this.add.image(300, 350, this.sprites[currentScene])
        }

        // Add keys for player input to travel to each city
        this.keys = this.input.keyboard.addKeys('Q,W,E,R,T');
        this.letters = ['Q', 'W', 'E', 'R', 'T']

        // Display different cities player can travel to with accompany & which keys to use 
        this.add.text(20, 100, "You can travel to any of the below cities").setColor('#000000')
        this.add.text(20, 125, "(Press the letter keys left of the colon sign)").setColor('#000000')
        for (let i=0; i<locations.length; i++) {
            this.add.text(20, 125 + ((i + 1) * 25), this.letters[i] + ": " + locations[i]).setColor('#000000')
        }
    }

    update() {
        if (this.keys.Q.isDown) {
            this.scene.start('MASSADORA')
        }
        if (this.keys.W.isDown) {
            this.scene.start('CARD SHOP')
        }
        if (this.keys.E.isDown) {
            this.scene.start('BUNZEN')
        }
        if (this.keys.R.isDown) {
            this.scene.start('AIAI')
        }
        if (this.keys.T.isDown) {
            this.scene.start('BADLANDS')
        }
    }
}