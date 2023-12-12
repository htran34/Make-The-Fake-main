// Hunter Tran
// External sources used:
// Menu Selection w/ Cursor in TypeScript: https://blog.ourcade.co/posts/2020/phaser-3-ui-menu-selection-cursor-selector/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
      default: 'arcade',
      arcade: {
          // gravity: { y: 300 },
          debug: false
      }
    },
    scene: [mainMenu, optionMenu, accompanyScene, Scene1, Scene2, Scene3, Scene4, Scene5]
};

let game = new Phaser.Game(config)

// track all players 
let players = ['player', 'Killua', 'Biscuit', 'Genthru', 'Bara', 'Nickes', 'Phinks', 'Machi', 'Feitan', 'Nobunaga', 'Hisoka']
//let accompanies = {'player': 5, 'Killua': 5, 'Biscuit': 5, 'Genthru': 5, 'Bara': 5, 'Nickes': 5, 'Phinks': 5, 'Machi': 5, 'Feitan': 5, 'Nobunaga': 5, 'Hisoka': 5}
let inventories = { 'player':   {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0}, 
                    'Killua':   {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Biscuit':  {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Genthru':  {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Bara':     {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Nickes':   {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Phinks':   {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Machi':    {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Feitan':   {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0},
                    'Nobunaga': {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0}, 
                    'Hisoka':   {'Accompany': 5, 'Defensive Wall': 0, 'Reflect': 0, 'Pickpocket': 0, 'Mug': 0, 'Mimic': 0, 'Clone': 0, 'Fake': 0, 'Dispel': 0, 'Relegate': 0, 'Peek': 0, 'Bullet': 0}
                  }
let gameCards = {'Accompany': 10, 'Defensive Wall': 10, 'Reflect': 10, 'Pickpocket': 10, 'Mug': 10, 'Mimic': 10, 'Clone': 10, 'Fake': 10, 'Dispel': 10, 'Relegate': 10, 'Peek': 10, 'Bullet': 10}
let locations = ['MASSADORA', 'CARD SHOP']
let playerCash = 100
let playerHasClothes = true
let firstSpawn = true

// track ON/OFF states of quests for each city
let quests = {'MASSADORA': false, 'CARD SHOP': false, 'BUNZEN': false, 'AIAI': false, 'BADLANDS': false}

// reserve keyboard vars
let keySpace, keySpace2, keySpace3, keySpace4, keySpace5, score
let currentScene = 0
let currentTurn = 1
let difficultyLevels = [1, 2, 3]
// text configuration
let textConfig = {
  fontSize: '28px',
  align: 'center',
  strokeThickness: 3
}
// sound configuration
let soundConfig = {
  volume: 2,
  loop: true
}