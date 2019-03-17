/**
* LUMEX LDM 64*32 17.E顯示器的函數
* 適用韌體版本：17.E以上
*/

//% weight=0 color=#ff9933 icon="\uf233" block="LDM64*32 17.E"
namespace LumexLDM6432_17E {

    export enum showNow {
        //% block="now"
        yes = 0xd1,
        //% block="later"
        no = 0x00
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


    //% blockId="LDM_displayFirmware"  block="display firmware Revision"
    //% weight=100 blockGap=2
    export function LDM_displayFirmware(): void {
        serial.writeString("AT20=()")
        serial.readUntil("E")
        basic.pause(3)
    }


    //% blockId="LDM_changeColor" block="swap displayed color from color %color1| to color %color2"
    //% weight=59 blockGap=2 color1.min=0 color1.max=111 color2.min=0 color2.max=111
    export function LDM_changeColor(color1: number, color2: number): void {
        serial.writeString("ATcc=(" + color1 + "," + color2 + ")")
        serial.readUntil("E")
        basic.pause(3)
    }

    //% blockId="LDM_setXYcolor" block="set the color code %color| to X: %x| Y: %y"
    //% weight=59 blockGap=2 color.min=0 color.max=111 x.min=0 x.max=63 y.min=0 y.max=31
    export function LDM_setXYcolor(color: number, x: number, y: number): void {
        serial.writeString("ATee=(" + x + "," + y + "," + color + ")")
        serial.readUntil("E")
        basic.pause(3)
    }

    //% blockId="LDM_saveDisplayed" block="save the whole display contents to RAM"
    //% weight=34 blockGap=2
    export function LDM_saveDisplayed(): void {
        serial.writeString("AT2c=()")
        serial.readUntil("E")
        basic.pause(3)
    }

    //% blockId="LDM_loadDisplayed" block="load and show the whole display contents from RAM"
    //% weight=33 blockGap=2
    export function LDM_loadDisplayed(): void {
        serial.writeString("AT2d=()")
        serial.readUntil("E")
        basic.pause(3)
    }

    //% blockId="LDM_loadPattern" block="load user pattern from EEPROM|pattern type:%myPattern|Pattern ID: %myID to |X:%x|Y:%y|display %show"
    //% weight=32 blockGap=2 x.min=0 x.max=63 y.min=0 y.max=31 myID.min=0 myID.max=24
    export function LDM_loadPattern(myPattern: usrPatternType, myID: number, x: number, y: number, show: showNow): void {
        let myStr = "AT29=("
        if (show == 0)
            myStr = "AT2e=("
        serial.writeString(myStr + x + "," + y + "," + myPattern + "," + myPattern + "," + myID + ")")
        serial.readUntil("E")
        basic.pause(3)
    }

    //% blockId="LDM_showAll" block="Display the multi patterns in the same time"
    //% weight=31 blockGap=2
    export function LDM_showAll(): void {
        serial.writeString("AT2f=()")
        serial.readUntil("E")
        basic.pause(3)
    }
}   