import { Ticker, Container, Sprite, Text } from "pixi.js";
import { CircularProgressBar } from '@pixi/ui';

const SUCCESS_MODIFIER = 0.05;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    private timer: number = 0;
    private timerDurationInMs: number = 1000;
    private numberOfSuccess = 0;
    private actionTiming = {
        start: 450,
        end: 550
    };


    private progressBar = new CircularProgressBar({
        backgroundColor: 0x000000,
        backgroundAlpha: 0.5,
        lineWidth: 2,
        fillColor: 0xFFFFFF,
        radius: 20,
        value: 50,
        cap: 'round'
     });
    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.progressBar.x = 100;
        this.progressBar.y = 100;
        this.addChild(this.progressBar);

        Ticker.shared.add(this.update, this);

         // No pixi here, All HTML DOM baby!
         document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    private update(): void {
       this.timer += (Ticker.shared.elapsedMS * (1 + (SUCCESS_MODIFIER * clamp(this.numberOfSuccess, 1, 10))));
       if (this.timer > this.timerDurationInMs) {
        this.timer = 0;
       }
       this.progressBar.progress = Math.ceil(this.timer / this.timerDurationInMs * 100);
    }

    private onKeyPress(e: KeyboardEvent) {
        if (e.repeat)
            return;
        if (e.code === 'KeyE')
            return this.action();
    }

    private action() {
        if (this.timer >= this.actionTiming.start && this.timer <= this.actionTiming.end) {
            this.timer = 0;
            this.numberOfSuccess++;
        } else {
            this.timer = 0;
            this.numberOfSuccess = 0;
        }
    }
}