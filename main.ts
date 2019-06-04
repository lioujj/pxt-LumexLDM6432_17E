/**
* LUMEX LDM 64*32 17.E顯示器的函數
* 適用韌體版本：17.E以上
*/

//% weight=0 color=#ff9933 icon="\uf233" block="LDM64*32 17.E"
namespace LumexLDM6432_17E {

    export enum yesOrNo {
        //% block="yes"
        yes = 1,
        //% block="no"
        no = 0
    }

    export enum usrPatternType {
        //% block="5*5"
        type1 = 5,
        //% block="8*8"
        type2 = 8,
        //% block="12*12"
        type3 = 12,
        //% block="16*16"
        type4 = 16
    }
    
    export enum moveDirection {
        //% block="upward"        
        upward=32,
        //% block="downward" 
        downward=33,
        //% block="leftward" 
        leftward=34,
        //% block="rightward" 
        rightward=35
    }

    //% blockId="LDM_displayFirmware"  block="display firmware Revision"
    //% weight=100 blockGap=2
    export function LDM_displayFirmware(): void {
        serial.writeString("AT20=()")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_changeColor" block="swap displayed color from color %color1| to color %color2"
    //% weight=95 blockGap=2 color1.min=0 color1.max=111 color2.min=0 color2.max=111
    export function LDM_changeColor(color1: number, color2: number): void {
        serial.writeString("ATcc=(" + color1 + "," + color2 + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_changeColorArea" block="swap displayed color in the area:|x for the top left corner:%x|y for the top left corner:%y|width:%width|height:%height|from color %color1| to color %color2"
    //% weight=94 blockGap=2 color1.min=0 color1.max=111 color2.min=0 color2.max=111 x.min=0 x.max=63 y.min=0 y.max=31 width.min=1 width.max=64 height.min=1 height.max=32
    export function LDM_changeColorArea(x: number, y: number, width:number, height:number, color1:number, color2:number): void {
        serial.writeString("ATcf=("+x+","+y+","+width+","+height+"," + color1 + "," + color2 + ")")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_setXYcolor" block="set the color code %color| to X: %x| Y: %y"
    //% weight=90 blockGap=2 color.min=0 color.max=111 x.min=0 x.max=63 y.min=0 y.max=31
    export function LDM_setXYcolor(color: number, x: number, y: number): void {
        serial.writeString("ATee=(" + x + "," + y + "," + color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }


    //% blockId="LDM_changeToOneColor" block="change color of all pixels except the black color pixels to color code %color"
    //% weight=89 blockGap=2 color.min=0 color.max=111
    export function LDM_changeToOneColor(color: number): void {
        serial.writeString("ATc0=(" +color + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_colorEffect" block="set the color effect(1~9): %colorEffect"
    //% weight=85 blockGap=2 colorEffect.min=1 colorEffect.max=9
    export function LDM_colorEffect(colorEffect: number): void {
        if (colorEffect>0 && colorEffect<10)
        {
            serial.writeString("ATc"+colorEffect+ "=()")
            serial.readUntil("E")
            basic.pause(20)
        }
    }

    //% blockId="LDM_saveDisplayed" block="save the whole display contents to RAM"
    //% weight=80 blockGap=2
    export function LDM_saveDisplayed(): void {
        serial.writeString("AT2c=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_loadDisplayed" block="load and show the whole display contents from RAM"
    //% weight=75 blockGap=2
    export function LDM_loadDisplayed(): void {
        serial.writeString("AT2d=()")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_setPatternOverlay" block="set pattern overlay on background: %myAns"
    //% weight=70 blockGap=2
    export function LDM_setPatternOverlay(myAns:yesOrNo): void {
        if (myAns==1)
            serial.writeString("AT2b=(0)")
        else
            serial.writeString("AT2b=(1)")
        serial.readUntil("E")
        basic.pause(10)
    }

    //% blockId="LDM_loadPattern" block="load user pattern from EEPROM|pattern type:%myPattern|Pattern ID: %myID to |X:%x|Y:%y|display now %show"
    //% weight=65 blockGap=2 x.min=0 x.max=63 y.min=0 y.max=31 myID.min=0 myID.max=24
    export function LDM_loadPattern(myPattern: usrPatternType, myID: number, x: number, y: number, show: yesOrNo): void {
        let myStr = "AT29=("
        if (show == 0)
            myStr = "AT2e=("
        serial.writeString(myStr + x + "," + y + "," + myPattern + "," + myPattern + "," + myID + ")")
        serial.readUntil("E")
        basic.pause(20)
    }

    //% blockId="LDM_movePattern" block="move user pattern 1 pixel %myDir|pattern type:%myPattern|Pattern ID: %myID"
    //% weight=60 blockGap=2 myID.min=0 myID.max=24
    export function LDM_movePattern(myDir :moveDirection,myPattern: usrPatternType, myID: number): void {
        serial.writeString("AT"+myDir+"=(" +myPattern + "," + myPattern + "," + myID + ")")
        serial.readUntil("E")
        basic.pause(3)
    }

    //% blockId="LDM_showAll" block="Display the multi patterns in the same time"
    //% weight=55 blockGap=2
    export function LDM_showAll(): void {
        serial.writeString("AT2f=()")
        serial.readUntil("E")
        basic.pause(20)
    }
}   
