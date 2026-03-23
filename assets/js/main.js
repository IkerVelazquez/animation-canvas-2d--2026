// Obtiene el elemento canvas del HTML
const canvas = document.getElementById("canvas");

// Obtiene el contexto 2D para poder dibujar
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones actuales de la ventana del navegador
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Ajusta el tamaño del canvas al tamaño de la ventana
canvas.height = window_height;
canvas.width = window_width;

// Establece el color de fondo del canvas
canvas.style.background = "#ff8";


// ========================
// CLASE CIRCLE
// ========================
class Circle {
  /**
   * Constructor de la clase Circle
   * @param {number} x - Posición inicial en X
   * @param {number} y - Posición inicial en Y
   * @param {number} radius - Radio del círculo
   * @param {string} color - Color del borde del círculo
   * @param {string} text - Texto que se mostrará dentro del círculo
   * @param {number} speed - Velocidad del movimiento
   */
  constructor(x, y, radius, color, text, speed) {
    // Posición del círculo
    this.posX = x;
    this.posY = y;

    // Tamaño y apariencia
    this.radius = radius;
    this.color = color;
    this.text = text;

    // Velocidad base
    this.speed = speed;

    // Dirección del movimiento (dx = horizontal, dy = vertical)
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  /**
   * Dibuja el círculo y su texto en el canvas
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.beginPath();

    // Configuración del texto
    context.strokeStyle = this.color;
    context.textAlign = "center";     // Centra horizontalmente
    context.textBaseline = "middle";  // Centra verticalmente
    context.font = "20px Arial";

    // Dibuja el texto en el centro del círculo
    context.fillText(this.text, this.posX, this.posY);

    // Configuración del círculo
    context.lineWidth = 2;

    // Dibuja el círculo
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();

    context.closePath();
  }

  /**
   * Actualiza la posición del círculo y controla los rebotes
   * @param {CanvasRenderingContext2D} context
   */
  update(context) {
    // Dibuja el círculo en su nueva posición
    this.draw(context);

    // ========================
    // COLISIONES CON BORDES
    // ========================

    // Rebote en el borde derecho
    if (this.posX + this.radius > window_width) {
      this.dx = -this.dx;
    }

    // Rebote en el borde izquierdo
    if (this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Rebote en el borde superior
    if (this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Rebote en el borde inferior
    if (this.posY + this.radius > window_height) {
      this.dy = -this.dy;
    }

    // Actualiza la posición sumando la velocidad
    this.posX += this.dx;
    this.posY += this.dy;
  }
}


// ========================
// CREACIÓN DE CÍRCULOS
// ========================

// Genera valores aleatorios para posición y tamaño
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);

// Crea el primer círculo (azul)
let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
miCirculo.draw(ctx);

// Crea el segundo círculo (rojo)
let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);
miCirculo2.draw(ctx);


// ========================
// ANIMACIÓN
// ========================

/**
 * Función que se ejecuta continuamente para animar los círculos
 */
let updateCircle = function () {
  // Llama a la función en el siguiente frame (animación fluida)
  requestAnimationFrame(updateCircle);

  // Limpia todo el canvas antes de redibujar
  ctx.clearRect(0, 0, window_width, window_height);

  // Actualiza y dibuja ambos círculos
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

// Inicia la animación
updateCircle();