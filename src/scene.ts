import { Container, Ticker } from "pixi.js";
import { Group } from "tweedle.js";
import { CircularProgressBar } from '@pixi/ui';
import { Attack } from './attack';
import { AnimatedText } from "./animated_text";

export class Scene extends Container {

    private progressBar = new CircularProgressBar({
        backgroundColor: 0x000000,
        backgroundAlpha: 0.5,
        lineWidth: 2,
        fillColor: 0xFFFFFF,
        radius: 20,
        value: 50,
        cap: 'round'
     });

    constructor(private readonly screenWidth: number, private readonly screenHeight: number) {
        super();

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.progressBar.x = 100;
        this.progressBar.y = 100;
        const myAttack = new Attack(this.progressBar);
        myAttack.addEventListener('success', (e) => {
            AnimatedText.Create(this, 'success', { x: this.progressBar.x + 10, y: this.progressBar.y + 100 }, 200);
        });
        this.addChild(this.progressBar);
        Ticker.shared.add(this.update, this);
    }

    private update(): void {
        //You need to update a group for the tweens to do something!
        Group.shared.update()
    }
}