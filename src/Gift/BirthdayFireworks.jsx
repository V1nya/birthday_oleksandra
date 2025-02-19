import { useEffect, useRef } from "react";
import GiftScene from "./GiftScene";

const BirthdayFireworks = ({setIsEnd}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const PI2 = Math.PI * 2;
        const random = (min, max) => Math.random() * (max - min + 1) + min | 0;
        const timestamp = () => new Date().getTime();

        class Birthday {
            constructor() {
                this.resize();
                this.fireworks = [];
                this.counter = 0;
            }

            resize() {
                this.width = canvas.width = window.innerWidth;
                let center = this.width / 2 | 0;
                this.spawnA = center - center / 4 | 0;
                this.spawnB = center + center / 4 | 0;
                this.height = canvas.height = window.innerHeight;
                this.spawnC = this.height * 0.1;
                this.spawnD = this.height * 0.5;
            }

            onClick(evt) {
                let x = evt.clientX;
                let y = evt.clientY;
                let count = random(3, 5);
                for (let i = 0; i < count; i++)
                    this.fireworks.push(new Firework(random(this.spawnA, this.spawnB), this.height, x, y, random(0, 260), random(30, 110)));
                this.counter = -1;
            }

            update(delta) {
                ctx.globalCompositeOperation = "hard-light";
                ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
                ctx.fillRect(0, 0, this.width, this.height);

                ctx.globalCompositeOperation = "lighter";
                for (let firework of this.fireworks) firework.update(delta);

                this.counter += delta * 3;
                if (this.counter >= 1) {
                    this.fireworks.push(
                        new Firework(random(this.spawnA, this.spawnB), this.height, random(0, this.width), random(this.spawnC, this.spawnD), random(0, 360), random(30, 110))
                    );
                    this.counter = 0;
                }

                if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead);
            }
        }

        class Firework {
            constructor(x, y, targetX, targetY, shade, offsprings) {
                this.dead = false;
                this.offsprings = offsprings;
                this.x = x;
                this.y = y;
                this.targetX = targetX;
                this.targetY = targetY;
                this.shade = shade;
                this.history = [];
            }

            update(delta) {
                if (this.dead) return;
                let xDiff = this.targetX - this.x;
                let yDiff = this.targetY - this.y;
                if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
                    this.x += xDiff * 2 * delta;
                    this.y += yDiff * 2 * delta;
                    this.history.push({x: this.x, y: this.y});
                    if (this.history.length > 20) this.history.shift();
                } else {
                    if (this.offsprings && !this.madeChilds) {
                        let babies = this.offsprings / 2;
                        for (let i = 0; i < babies; i++) {
                            let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
                            let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;
                            birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
                        }
                    }
                    this.madeChilds = true;
                    this.history.shift();
                }
                if (this.history.length === 0) this.dead = true;
                else {
                    for (let i = 0; this.history.length > i; i++) {
                        let point = this.history[i];
                        ctx.beginPath();
                        ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`;
                        ctx.arc(point.x, point.y, 1, 0, PI2, false);
                        ctx.fill();
                    }
                }
            }
        }

        let birthday = new Birthday();
        let then = timestamp();

        const loop = () => {
            requestAnimationFrame(loop);
            let now = timestamp();
            let delta = (now - then) / 1000;
            then = now;
            birthday.update(delta);
        };

        window.onresize = () => birthday.resize();
        document.onclick = evt => birthday.onClick(evt);
        document.ontouchstart = evt => birthday.onClick(evt);

        loop();
    }, []);

    return (
        <>
            <canvas ref={canvasRef} id="birthday"
                    style={{ display: "block", position: "absolute", top: 0, left: 0, zIndex: 0, width: "100vw", height: "100vh" }}>
            </canvas>

            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
            }}>
                <GiftScene setIsEnd={setIsEnd} />
            </div>
        </>
    );


}

export default BirthdayFireworks;
