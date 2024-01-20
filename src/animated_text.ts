import { Container, Text } from "pixi.js";
import { Tween } from "tweedle.js";

export class AnimatedText {
    public static Create(container: Container, text: string, position: {x: number, y: number}, animationDuration: number) {
        const newSuccessText = new Text(text);
        newSuccessText.position = position;
        new Tween(newSuccessText.scale).to({ x: 1.1, y: 1.1 }, animationDuration / 2).repeat(Infinity).yoyo(true).start();
        new Tween(newSuccessText.position).to({ x: newSuccessText.position.x + 20, y: newSuccessText.position.y + 20 }, animationDuration).repeat(Infinity).yoyo(true).start();
        container.addChild(newSuccessText);
        setTimeout(() => {
            container.removeChild(newSuccessText);
        }, animationDuration);
    }
}