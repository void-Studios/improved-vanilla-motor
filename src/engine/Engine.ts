/**
 * Interfaz que deben implementar todos los objetos que se quieran renderizar en pantalla.
 */
export interface GameObject {
    /**
     * Se encarga de actualizar la lógica interna del objeto basándose en el tiempo transcurrido.
     * @param deltaTime - Tiempo transcurrido desde el último frame en milisegundos.
     */
    update(deltaTime: number): void;
  
    /**
     * Se encarga de dibujar el objeto en el contexto de canvas.
     * @param context - El contexto 2D del canvas.
     */
    render(context: CanvasRenderingContext2D): void;
  }
  
  export class Engine {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private lastTime = 0;
    private gameObjects: GameObject[] = [];
  
    /**
     * Constructor del motor de juego.
     * @param canvasId - ID del elemento <canvas> en el DOM.
     */
    constructor(canvasId: string) {
      // Obtiene el elemento <canvas>
      const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement | null;
      if (!canvasElement) {
        throw new Error(`No se encontró ningún <canvas> con el ID: "${canvasId}"`);
      }
      this.canvas = canvasElement;
  
      const ctx = this.canvas.getContext("2d");
      if (!ctx) {
        throw new Error(`No se pudo obtener el contexto 2D del <canvas> con ID: "${canvasId}"`);
      }
      this.context = ctx;
    }
  
    /**
     * Inicia el ciclo de actualización y renderizado.
     */
    public start(): void {
      // Reiniciamos el tiempo previo, para que el primer deltaTime sea correcto
      this.lastTime = performance.now();
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
  
    /**
     * Bucle principal del juego.
     * @param timestamp - Marca de tiempo en milisegundos.
     */
    private gameLoop(timestamp: number): void {
      const deltaTime = timestamp - this.lastTime;
      this.lastTime = timestamp;
  
      this.update(deltaTime);
  
      this.render();
  
      //siguiente frame
      requestAnimationFrame((time) => this.gameLoop(time));
    }
  
    /**
     * Actualiza todos los objetos del juego.
     * @param deltaTime - Tiempo transcurrido desde el último frame (en ms).
     */
    private update(deltaTime: number): void {
      for (const gameObject of this.gameObjects) {
        gameObject.update(deltaTime);
      }
    }
  
    /**
     * Limpia el canvas y dibuja todos los objetos del juego.
     */
    private render(): void {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Dibujar cada objeto
      for (const gameObject of this.gameObjects) {
        gameObject.render(this.context);
      }
    }
  
    /**
     * Agrega un nuevo objeto al juego para ser actualizado y renderizado.
     * @param gameObject - Objeto que implemente la interfaz GameObject.
     */
    public addGameObject(gameObject: GameObject): void {
      this.gameObjects.push(gameObject);
    }
  }
  