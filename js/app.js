const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async () =>{
    const response = await fetch("js/data.json");
    const data = await response.json();
  
        data.forEach((prod)=>{
        let content = document.createElement("div");
        content.className = "card"
        content.innerHTML= `
        <img src="${prod.img}">
        <h3> ${prod.nombre}</h3>
        <p class="price"> ${prod.precio} $</p>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement("button")
        comprar.innerText= "Comprar";
        comprar.className = "comprar"
    
        content.append(comprar);
    
        comprar.addEventListener("click", () =>{
    
            const repeat = carrito.some((repeatprod)=> repeatprod.id === prod.id);
            if (repeat) {
                carrito.map((product)=> {
                    if (product.id === prod.id) {
                        product.cantidad++;
                    }
                });
            }else{
                carrito.push({
                    id: prod.id,
                    img: prod.img,
                    nombre: prod.nombre,
                    precio: prod.precio,
                    cantidad: prod.cantidad,
                });
            }
            carritoCount();
            saveLocal();
           
        });
    });

};

getProductos();


const saveLocal = () =>{

    localStorage.setItem("carrito", JSON.stringify(carrito) );
}

carritoCount();

document.addEventListener('DOMContentLoaded', function () {
    var scroll = new SmoothScroll('a[href*="#"]', {
      speed: 1500, // Ajusta la velocidad según tus preferencias
      easing: 'easeInOutCubic', // Puedes usar diferentes funciones de aceleración
    });
  });
  



