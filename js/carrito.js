    const pintarCarrito = () =>{ 

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className ="modal-header"
    modalHeader.innerHTML = `
        <h1 class ="modal-header-title">Carrito</h1>

    
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML= "X";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click", ()=>{
        modalContainer.style.display = "none"
    });

    modalHeader.append(modalbutton);

    carrito.forEach((prod)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content"
        carritoContent.innerHTML=`
            <img src="${prod.img}">
            <h3>${prod.nombre}</h3>
            <p> ${prod.precio} $</p>
            <span class="restar"> - </span>
            <p> Cantidad: ${prod.cantidad}</p>
            <span class="sumar"> + </span>
            <p> Total: ${prod.cantidad*prod.precio}</p>
            <span class="delete-product"> ❌ </span>
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        let sumar = carritoContent.querySelector(".sumar");
        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", ()=>{
            eliminarprod(prod.id);
        });

        restar.addEventListener("click", () =>{
            if (prod.cantidad !==1 ) {
                prod.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        sumar.addEventListener("click", () =>{
            
                prod.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalbuying = document.createElement("div");
    totalbuying.className = "total-content"
    totalbuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalbuying);
   
    }

verCarrito.addEventListener("click", pintarCarrito)

const eliminarprod = (id)=>{
    const foundId = carrito.find((ele) => ele.id === id);

    carrito = carrito.filter((carritoId)=> {
        return carritoId !== foundId;
    });

    carritoCount();
    saveLocal();
    pintarCarrito();
}


const carritoCount = () =>{
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}