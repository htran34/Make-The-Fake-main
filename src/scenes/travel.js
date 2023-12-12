const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)
const oneJustPressed = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

// Removes previous text
if (((this.adjacentCities.length == 1) && (leftJustPressed || rightJustPressed)) 
|| ((this.adjacentCities.length == 2) && (upJustPressed))) {
    this.currentCityText.setVisible(false)
    this.travelDirectionsText.setVisible(false)
    this.arrowOptionsText.setVisible(false)
}

// LEFT arrow option
if (leftJustPressed) {
    this.adjacentCityText = this.add.text(100, 350, "Going to adjacent city "+this.adjacentCities[0])
    currentScene = this.cities.indexOf(this.adjacentCities[0])
    currentTurn += 1
    this.scene.start(this.adjacentCities[0])
}

// RIGHT arrow option
else if (rightJustPressed) {
    // Go to ANY city with accompany if adjacent cities = 1
    if (this.adjacentCities.length == 2) {
        this.adjacentCityText = this.add.text(100, 350, "Going to adjacent city "+this.adjacentCities[1])
        currentScene = this.cities.indexOf(this.adjacentCities[1])
        currentTurn += 1
        this.scene.start(this.adjacentCities[1])
    }
    else {
        this.useAccompanyText = this.add.text(100, 350, "Use a copy of Accompany to travel to any city?")
        this.accompanyOptionText = this.add.text(100, 375, "YES  <-  |  ->NO")
        // Consume a copy of accompany if player has any remaining
        if (leftJustPressed) {
            if (inventories[player]['Accompany'] >= 1) {
                inventories[player]['Accompany'] -= 1
                currentTurn += 1
                this.useAccompanyText.setVisible(false)
                this.accompanyOptionText.setVisible(false)
                this.consumeAccompanyText = this.add.text(100, 325, "Using a copy of accompany, you have "+accompanies[player]+" copies remaining.")
                this.destinationText = this.add.text(100, 350, "Where would you like to go?")
                if (oneJustPressed) {
                    this.scene.start(cities[1])
                }
            }
            // Go back if player has no accompanies remaining
            else {
                this.useAccompanyText.setVisible(false)
                this.accompanyOptionText.setVisible(false)
                this.noAccompaniesText = this.add.text(100, 350, "You have no copies of accompany remaining.")
                this.scene.start(cities[currentScene])
            }
        }
        else if (rightJustPressed) {
            this.scene.start(cities[currentScene])
        }
    }
}

// UP arrow option
else if (upJustPressed && (this.adjacentCities.length == 2)) {
    this.useAccompanyText = this.add.text(100, 350, "Use a copy of Accompany to travel to any city?")
    this.accompanyOptionText = this.add.text(100, 375, "YES  <-  |  ->NO")
    // Consume a copy of accompany if player has any remaining
    if (leftJustPressed) {
        if (inventories[player]['Accompany'] >= 1) {
            inventories[player]['Accompany'] -= 1
            currentTurn += 1
            this.useAccompanyText.setVisible(false)
            this.accompanyOptionText.setVisible(false)
            this.consumeAccompanyText = this.add.text(100, 350, "Using a copy of accompany, you have "+accompanies[player]+" copies remaining.")
            this.destinationText = this.add.text(100, 375, "Where would you like to go?")
            if (oneJustPressed) {
                this.scene.start(cities[1])
            }
        }
        else {
            this.useAccompanyText.setVisible(false)
            this.accompanyOptionText.setVisible(false)
            this.noAccompaniesText = this.add.text(100, 350, "You have no copies of accompany remaining.")
            this.scene.start(cities[currentScene])
        }
    }
    // Go back if player has no accompanies remaining
    else if (rightJustPressed) {
        this.scene.start(cities[currentScene])
    }
}
