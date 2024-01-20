import { Ticker, Container } from "pixi.js";

const SUCCESS_MODIFIER = 0.05;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

export class Attack extends EventTarget {
    private timer: number = 0;
    private timerDurationInMs: number = 1000;
    private actionTiming = {
        start: 450,
        end: 550
    };
    private numberOfSuccess = 0;
 
    constructor(private progressBar: Container) {
        super();
        Ticker.shared.add(this.update, this);
        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    private update(): void {
        this.timer += (Ticker.shared.elapsedMS * (1 + (SUCCESS_MODIFIER * clamp(this.numberOfSuccess, 1, 10))));
        if (this.timer > this.timerDurationInMs) {
            this.dispatchEvent(new Event('fail'));
            this.timer = 0;
        }
        (this.progressBar as any).progress = Math.ceil(this.timer / this.timerDurationInMs * 100);
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
            this.dispatchEvent(new Event('success'));
        } else {
            this.timer = 0;
            this.numberOfSuccess = 0;
            this.dispatchEvent(new Event('fail'));
        }
    }
}