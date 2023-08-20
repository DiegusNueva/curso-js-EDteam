/**
 * Lógica para crear pedidos y cobrar los pedidos del usuario
 */

const usuario = {
  nombre: "Diego",
  edad: 30,
  deuda: 0,
};

let pedido = [];
let costoPedido = 0;
let ventas = 0;

// Lista todos los productos del menú en un formato amigable
const mostrarMenu = () => {
  console.log(`CÓDIGO - NOMBRE PRODUCTO - COSTO`);

  for (let producto of productos) {
    console.log(`${producto.codigo} - ${producto.nombre} - ${producto.costo}€`);
  }
};

const pedirProducto = (cod) => {
  if (!cod) return "Ingrese un código válido";
  const productoEncontrado = productos.find(
    (producto) => producto.codigo === cod
  );

  if (typeof cod === "Number" || typeof cod == "boolean")
    return "Sólo se admiten códigos en formato texto";
  if (!productoEncontrado) return "El producto no existe";

  pedido.push(productoEncontrado);
  console.log("El producto ha sido agregado a su pedido. Su pedido es:");
  return verPedido();
};

const verPedido = () => pedido;

const calcularCosto = () => {
  let costo = 0;
  for (producto of pedido) {
    costo += producto.costo;
  }
  costoPedido = costo;
  return costoPedido;
};

const finalizarPedido = () => {
  calcularCosto();
  usuario.deuda = costoPedido;

  pedido = [];
  costoPedido = 0;

  return `${usuario.nombre}, debes de pagar ${usuario.deuda} euros.`;
};

// Función que permite pagar todo un pedido y entrega cambio si es necesario
const pagarPedido = (montoEntregado) => {
  switch (true) {
    case montoEntregado < usuario.deuda:
      return "No te alcanza para pagar tu deuda";
    case montoEntregado === usuario.deuda:
      usuario.deuda = 0;
      pedidoVendido();
      return "Tu pedido ha sido pagado";
    case montoEntregado > usuario.deuda:
      const cambio = montoEntregado - usuario.deuda;
      usuario.deuda = 0;
      pedidoVendido();
      return `Tu pedido ha sido pagado y tu cambio es de ${cambio}`;
    default:
      return "Introduce un valor válido";
  }
};

const pedidoVendido = () => ventas++;
