import { Engine, GameObject } from "./engine/Engine";

class Square implements GameObject {
  private x: number;
  private y: number;
  private size: number;
  private speedX: number;
  private speedY: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.speedX = 0.3; // bajar y subir velocidad
    this.speedY = 0.2; // por px / ms creo xd
  }

  public update(deltaTime: number): void {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    // Rebotes contra límites del canvas (suponiendo 800x600, por ejemplo)
    const canvasWidth = 800;
    const canvasHeight = 600;

    if (this.x < 0 || this.x + this.size > canvasWidth) {
      this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y + this.size > canvasHeight) {
      this.speedY = -this.speedY;
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.size, this.size);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const engine = new Engine("gameCanvas");

  const square = new Square(50, 125, 50); // aqui movele el spawneo del cuadrado
  engine.addGameObject(square);

  engine.start();
});
