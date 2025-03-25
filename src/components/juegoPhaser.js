import Phaser, { Scale } from "phaser";
let possibilities = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,27]
let finalConbination = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,27]
const defauldBanckPosition = 27
var win= "" ;
var arrayBlocks = []
var canGameFinish = ""
var canGoLeft = ""
var canGoRight = ""
var canGoDown = ""
var canGoUp = ""
var level = 1
var prueba ="subir cambios"
var numberToShowOrHide = 0
function ArrayEquals(a, b){
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;

}
function getBlankPosition() {
    for( let j = 0; j < possibilities.length; j++){
        if(possibilities[j] === defauldBanckPosition){
            return j
        }

    }

}

function canSwipLeft(blanckPosition){
    if(blanckPosition === 7 || blanckPosition === 15 || blanckPosition === 23){
        return false
    }else{
        return true
    }
}
function canSwipRight(blanckPosition){
    if(blanckPosition === 0 || blanckPosition === 8 || blanckPosition === 16){
        return false
    }else{
        return true
    }
}
function canSwipUp(blanckPosition){
    if(blanckPosition > 15){
        return false
    }else{
        return true
    }
}
function canSwipDown(blanckPosition){
    if(blanckPosition < 8){
        return false
    }else{
        return true
    }
}
function moveLeft(blanckPosition){
    if(!win){
        var canLeft = canSwipLeft(blanckPosition)
        if(canLeft){
            arrayBlocks[blanckPosition].setTexture("23blocks", possibilities[blanckPosition+1])
            arrayBlocks[blanckPosition+1].setTexture("23blocks", possibilities[blanckPosition])
            possibilities[blanckPosition] = possibilities[blanckPosition+1]
            possibilities[blanckPosition+1] = defauldBanckPosition
        }
    }
}
function moveRight(blanckPosition){
    if(!win){
    var canRight = canSwipRight(blanckPosition)
        if(canRight){
            arrayBlocks[blanckPosition].setTexture("23blocks", possibilities[blanckPosition-1])
            arrayBlocks[blanckPosition-1].setTexture("23blocks", possibilities[blanckPosition])
            possibilities[blanckPosition] = possibilities[blanckPosition-1]
            possibilities[blanckPosition-1] = defauldBanckPosition
        }
    }

}
function moveUp(blanckPosition){
    if(!win){
    var canUp = canSwipUp(blanckPosition)
        if(canUp){
            arrayBlocks[blanckPosition].setTexture("23blocks", possibilities[blanckPosition+8])
            arrayBlocks[blanckPosition+8].setTexture("23blocks", possibilities[blanckPosition])
            possibilities[blanckPosition] = possibilities[blanckPosition+8]
            possibilities[blanckPosition+8] = defauldBanckPosition
        }
    }

}
function moveDown(blanckPosition){
    if(!win){
    var canDown = canSwipDown(blanckPosition)
        if(canDown){
            arrayBlocks[blanckPosition].setTexture("23blocks", possibilities[blanckPosition-8])
            arrayBlocks[blanckPosition-8].setTexture("23blocks", possibilities[blanckPosition])
            possibilities[blanckPosition] = possibilities[blanckPosition-8]
            possibilities[blanckPosition-8] = defauldBanckPosition
        }
    }


}
export function inicializarJuego(container) {
    class Menu extends Phaser.Scene{
        constructor(){
            super("Menu")
        }
        preload(){
            let progressBar = this.add.graphics();
            let width = this.cameras.main.width;
            let height = this.cameras.main.height;
            let loadingText = this.add.text(
                width / 2,
                height / 2 - 50,
                "Cargando...",
                {
                fontSize: "32px",
                fill: "#fff",
                }
                );
            let percentText = this.add.text(width / 2, height / 2 - 25, "0%", {
                    fontSize: "18px",
                    fill: "#fff",
                });
            let assetText = this.add.text(width / 2, height / 2 + 50, "Assets", {
                    fontSize: "18px",
                    fill: "#fff",
                });
                this.load.on("progress", function (value) {
                    percentText.setText(parseInt(value * 100) + "%");
                    progressBar.clear();
                    progressBar.fillStyle(0xffffff, 1);
                    progressBar.fillRect(width / 2 - 160, height / 2 - 10, value * 320, 50);
                });
                this.load.on("fileprogress", function (file) {
                    assetText.setText("Cargando: " + file.key);
                    console.log(file.src);
                });
                this.load.on("complete", function () {
                    progressBar.destroy();
                    loadingText.destroy();
                    percentText.destroy();
                    assetText.destroy();
                });


            this.load.image("win", "assets/images/you-win.png");
            this.load.image("gold-medal", "assets/images/gold-medal.png");
            this.load.spritesheet("confetti", "assets/images/confetti.png", {frameWidth: 128, frameHeight: 128});
            this.load.image("background", "assets/images/background.jpg");
            this.load.image("kid", "assets/images/nerd.png")
            this.load.image("menu", "assets/images/menu.png")
            this.load.spritesheet("23blocks", "assets/images/23blocks.png", {frameWidth: 91.166, frameHeight:91.2 })
            this.load.image("bg", "assets/images/bg-menu.jpg");
            this.load.image("controls", "assets/images/Player1.png")
            this.load.image("swipe", "assets/images/swipe.png")
            this.load.image("logo", "assets/images/23blockstitle.png")
            this.load.image("background", "assets/images/background.jpg");
            this.load.image("level", "assets/images/level-menu.png")
        }
        create(){
            this.add.image(800, 300, "bg" ).setScale(1.1)
            this.add.image(400, 300, "menu")
            this.add.image(600, 400, "kid")
            let zonaStart = this.add.zone(260, 160, 280, 80)
            zonaStart.setOrigin(0)
            zonaStart.setInteractive()
            zonaStart.on("pointerdown", () => {
                 this.scene.start("MainScene");
            })
            let zonaLevel = this.add.zone(260, 260, 280, 80)
            zonaLevel.setOrigin(0)
            zonaLevel.setInteractive()
            zonaLevel.on("pointerdown", ()=>{
                this.scene.start("Level")
            })
            let zonaControls = this.add.zone(260, 360, 280, 80)
            zonaControls.setOrigin(0)
            zonaControls.setInteractive()
            zonaControls.on("pointerdown", ()=>{
                this.scene.start("Controls")
            })
            this.add.text(350, 100, "level: "+ level, { fontFamily: "Arial", fontSize: "32px", color: "#000000" })
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaStart)
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaLevel)
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaControls)
        }

        update(){

        }

    }
    class MainScene extends Phaser.Scene{
        constructor(){
            super("MainScene")
        }
        preload(){

        }
        create(){
        canGoLeft = true
        canGoRight = true
        canGoUp = true
        canGoDown = true
        canGameFinish = true
        win = false
        numberToShowOrHide=0
        this.add.image(300, 200, 'background');
        shuffle(possibilities);
        var y = 200, x = 0;
        for (var i = 0; i < 24; i++) {
            if (i % 8 === 0 && i > 7) {
                x = 0;
                y += 70;
            }
            arrayBlocks.push(this.add.sprite(160+x*68, y, '23blocks', possibilities[i]).setScale(0.75));
            x++;
        }

        const blocks = this.add.zone(0, 0, 800, 530);
		blocks.setOrigin(0);
		blocks.setInteractive();
        var downX, upX, downY, upY, threshold = 50;
		blocks.on('pointerdown', function (pointer) {
			downX = pointer.x;
			downY = pointer.y;
		});

        blocks.on('pointerup', function (pointer) {

            var blanckPosition = getBlankPosition();
			upX = pointer.x;
			upY = pointer.y;
			if (upX < downX - threshold){
				moveLeft(blanckPosition)
			} else if (upX > downX + threshold) {
				moveRight(blanckPosition)
			} else if (upY < downY - threshold) {
				moveUp(blanckPosition)
			} else if (upY > downY + threshold) {
				moveDown(blanckPosition)
			}
            if(ArrayEquals(possibilities, finalConbination)){
                win = true
            }
		});
         if(level>=2){
            this.showOrHideNubers()
        }

        }
        showOrHideNubers(){
            let repeatAfter = 150
            if(level === 2){
                if(possibilities[numberToShowOrHide]<=7){
                    arrayBlocks[numberToShowOrHide].setTexture("23blocks", 8)
                }
                else if(possibilities[numberToShowOrHide]<=17){
                   arrayBlocks[numberToShowOrHide].setTexture("23blocks", 17)
                }
                else if(possibilities[numberToShowOrHide]<=25){
                   arrayBlocks[numberToShowOrHide].setTexture("23blocks", 25)
                }
            } else{
                if(possibilities[numberToShowOrHide]<=24){
                    arrayBlocks[numberToShowOrHide].setTexture("23blocks", 26)
                }
            }
            numberToShowOrHide++
            if(numberToShowOrHide === 24){
                numberToShowOrHide = 0
            }
            this.time.delayedCall(repeatAfter,this.showOrHideNubers, [], this);
        }
        update(){
            if(win && canGameFinish){
                canGameFinish = false
                this.time.addEvent({ delay: 250, loop: false, callback: () => { this.scene.start('WinScene') }});
            }
            else{
            var cursors = this.input.keyboard.createCursorKeys();
            if (cursors.left.isDown) {
                if(canGoLeft){
                    var blanckPosition = getBlankPosition()
                    moveLeft(blanckPosition)
                    canGoLeft = false
                    if((ArrayEquals(possibilities, finalConbination))){
                        win = true
                    }
                }
            } else if (cursors.right.isDown) {
                if(canGoRight){
                    var blanckPositionRight = getBlankPosition()
                    moveRight(blanckPositionRight)
                    canGoRight = false
                    if(ArrayEquals(possibilities, finalConbination)){
                        win = true
                    }
                }

            } else if (cursors.up.isDown) {
                if(canGoUp){
                    var blanckPositionUp = getBlankPosition()
                    moveUp(blanckPositionUp)
                    canGoUp = false
                    if(ArrayEquals(possibilities, finalConbination)){
                        win = true
                    }
                }

            } else if (cursors.down.isDown) {
                if(canGoDown){
                    var blanckPositionDown = getBlankPosition()
                    moveDown(blanckPositionDown)
                    canGoDown = false
                    if(ArrayEquals(possibilities, finalConbination)){
                        win = true
                    }
                }
            }
            if(cursors.left.isUp){
                canGoLeft = true
            }
            if(cursors.right.isUp){
                canGoRight = true
            }
            if(cursors.up.isUp){
                canGoUp = true
            }
            if(cursors.down.isUp){
                canGoDown = true
            }
        }
        }

    }
    class WinScene extends Phaser.Scene{
        constructor(){
            super("WinScene")
        }
        preload(){
        }
        create(){
            this.add.image(400, 320, "bg").setScale(1.1)
            this.add.image(400, 50, "logo")
            this.add.image(400, 450, "win")
            this.add.image(280, 450, "gold-medal")
            this.add.image(515, 450, "gold-medal")
            var y = 200, x = 0;
            for (var i = 0; i < 24; i++) {
                if (i % 8 === 0 && i > 7) {
                    x = 0;
                    y += 70;
                }
                arrayBlocks.push(this.add.sprite(160+x*68, y, '23blocks', finalConbination[i]).setScale(0.75));
                x++;
            }
            let confetti1 = this.add.sprite(180, 480, "confetti")
            let confetti2 = this.add.sprite(620,  450)
            this.anims.create({
                key:"conffeti",
                frames: this.anims.generateFrameNumbers("confetti", {start: 0, end: 56}),
                frameRate:25,
                repeat:-1
            })
            confetti1.anims.play("conffeti")
            confetti2.anims.play("conffeti")
            let zonaBack = this.add.zone(0,0, 800, 700)
            zonaBack.setInteractive()
            zonaBack.setOrigin(0)
            zonaBack.on("pointerdown", ()=>{
                this.scene.start("Menu")
            })
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaBack)

        }
    }
    class Controls extends Phaser.Scene{
        constructor(){
            super("Controls")
        }
        preload(){


        }
        create(){
            this.add.image(480, 320, "bg")
            this.add.image(350, 400, "kid")
            this.add.image(200, 200, "controls").setScale(0.8)
            this.add.image(500, 200, "swipe").setScale(0.8)
            this.add.image(350, 80, "logo")
            let zonaBack =  this.add.zone(0, 0, 800, 500)
            zonaBack.setInteractive()
            zonaBack.setOrigin(0)
            zonaBack.on("pointerdown", ()=>{
                console.log("click")
                this.scene.start("Menu")
            })
        }
        update(){

        }

    }

    class Level extends Phaser.Scene{
        constructor(){
            super("Level")
        }
        preload(){

        }
        create(){
            this.add.image(400, 320, "bg").setScale(1.1)
            this.add.image(400, 200, "level")
            this.add.image(600, 500, "kid")
            let zonaEasy = this.add.zone(260, 10, 280, 85 )
            zonaEasy.setInteractive()
            zonaEasy.setOrigin(0)
            zonaEasy.on("pointerdown", ()=>{
                alert("se cambio  el nivel 1")
                level=1
            })
            let zonaMedium = this.add.zone(260, 110, 280, 85)
            zonaMedium.setInteractive()
            zonaMedium.setOrigin(0)
            zonaMedium.on("pointerdown", ()=>{
                alert("se cambio el nivel 2")
                level= 2
            })
            let zonaHard = this.add.zone(260,210, 280, 85 )
            zonaHard.setInteractive()
            zonaHard.setOrigin(0)
            zonaHard.on("pointerdown", ()=>{
                alert("se cambio el nivel 3")
                level = 3
            })
            let zonaBack =  this.add.zone(260, 300, 280, 85)
            zonaBack.setInteractive()
            zonaBack.setInteractive()
            zonaBack.setOrigin(0)
            zonaBack.on("pointerdown", ()=>{
                this.scene.start("Menu")
            })

            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaEasy)
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaMedium)
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaHard)
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonaBack)
        }
        update(){

        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 768,
        height: 672,
        scene: [Menu, MainScene,WinScene,  Controls,  Level ],
        parent: container,
        Scale:{
            mode: Scale.ScaleManager.AUTO
        },
        physics:{
            default: "arcade"
        },
    }
    ;
    return new Phaser.Game(config)
}