class Scene4 extends Phaser.Scene {
    constructor() {
        super("AIAI")
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('background1', './assets/background.png')
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
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keySpace)) {
          this.scene.start('selectScene')
      }
    }
}