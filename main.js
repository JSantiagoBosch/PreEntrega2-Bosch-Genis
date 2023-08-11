//Pre-Entrega #2

//Mi proyecto final va a ser una pagina web de una cervecería Artesanal

// Creo los productos que voy a tener en mi pagina

const products = [
    {id: 1, name: "Rubia", price: 800},
    {id: 2, name: "Roja", price: 900},
    {id: 3, name: "Negra", price: 700},
    {id: 4, name: "Belga", price: 1200},
    {id: 5, name: "Lager", price: 850},
    {id: 6, name: "India Pale Ale", price: 950},
    {id: 7, name: "Honey", price: 950},
    {id: 8, name: "Lambic", price: 750},
];

// Creo un vector Carrito que va a estar vacio para ir guardando lo que voy a comprar

const cart = [];


// Como la pagina va a ser sobre cerveza, lo primero que vamos a pedir es que se ingrese su fecha de nacimiento, para saber si es o no mayor de edad.

function loginToMyPage() {

    let access = false;

    while (!access) {

    let yearOfBirthInput = prompt("Ingrese el año en el que nació para continuar: ");

    if (yearOfBirthInput === null) {
        alert("Acceso cancelado. Hasta Luego!");
        return false;
    }

    let yearOfBirth = parseInt(yearOfBirthInput);
    
    if (isNaN(yearOfBirth)) {
        alert("Por favor, ingrese un año de nacimiento válido.");
    } else if (2023 - yearOfBirth < 18 || 2023 - yearOfBirth > 100) {
        alert("Edad no valida, no puede continuar.");
    } else {
        alert("¡Bienvenido a Jubilus!");
        access = true;
    }

    }

    return access;
}

// Funcion para mostrar todos los productos por consola

function showProducts() {
    alert("Por Comodidad la lista de productos se va a visualizar en la consola")
    console.log("Lista de productos:");
    for (const product of products) {
        console.log(`${product.id} - ${product.name} - $${product.price}`);
    }
}

// Funcion de filtrado, le pasamos el precio maximo que queremos y nos devuelve los productos menores que el precio maximo

function filterProductsByPrice(maxPrice) {
    return products.filter(product => product.price <= maxPrice);
}

// Esta funcion va a recibir por parametro el nombre del producto a buscar, en caso de encontrarlo lo muestra por pantalla, caso contrario muestro un mensaje

function searchproduct(name) {

    let product = products.find((item) => item.name === name);
        
            if (product) {
            alert(`
             Id: ${product.id}
             Nombre: ${product.name}
             Precio: ${product.price}
            `);
            } else {
            alert("El producto no se encuentra disponible");
            }
}

// La funcion sortBy va a recibir por parametro la condicion con la cual va a ordenar y va a retornar el vector ordenado de forma creciente

function sortBy(condition) {

    if ( condition === "ID") {
       return products.sort((a, b) => {
        if (b.id > a.id) {
          return -1;
        }
        if (b.id < a.id) {
          return 1;
        }
        // a es igual a b
        return 0;
      }) 
    } else if (condition === "NOMBRE") {
        return products.sort((a, b) => {
        if (b.name > a.name) {
          return -1;
        }
        if (b.name < a.name) {
          return 1;
        }
        
        return 0;
      })
    } else {
        return products.sort((a, b) => {
      if (b.price > a.price) {
        return -1;
      }
      if (b.price < a.price) {
        return 1;
      }
      
      return 0;
    })
    }
}

// Funcion para agregar al carrito, le pasamos por parametro el ID que queremos buscar y buscamos un producto con el mismo ID, lo guardamos en productoEncontrado, luego se usa la funcion push para agregarlo a nuestro vector cart, si no se encuentra muestra un mensaje

function addToCart(productId) {
    const productFound = products.find(product => product.id === productId);
    if (productFound) {
        cart.push(productFound);
        alert(`Cerveza ${productFound.name} agregado al carrito.`);
    } else {
        alert("Producto no encontrado.");
    }
}

// Recorro cart con un for para mostrar todo lo que hay en el carrito

function showCart() {
    console.log("Carrito de compras:");
    for (const product of cart) {
        console.log(`${product.name} - $${product.price}`);
    }
}

// Calculo el total del carrito, con reduce estoy haciendo que el precio de los productos se vayan guardando en un unico valor

function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}

// Funcion para mostrar las Opciones

function showOption(){
    alert(`Opciones:
            1. Mostrar productos
            2. Ordenar de forma creciente
            3. Filtrar productos por precio
            4. Buscar producto por nombre
            5. Agregar producto al carrito
            6. Mostrar carrito
            7. Calcular total
            8. Salir`);
}

// Funcion para ejecutar una opcion, recibo por parametro que opcion se realiza y se ejecuta por un switch

function executeOpcion(option) {

    switch (option) {

        case 1:

            showProducts();
            break;

        case 2:

            const condition = prompt("Ingrese como desea ordenar la lista: (ID - NOMBRE - PRECIO)")

            const organizedProducts = sortBy(condition);

            console.log("Productos Ordenados:");
            for (const product of organizedProducts) {
                console.log(`${product.id} - ${product.name} - $${product.price}`);
            }
            break;

        case 3:

            // Tengo que pasarle el precio maximo a la funcion filterProductsByPrice

            const maxPrice = parseFloat(prompt("Ingrese el precio máximo: "));
            const filterProducts = filterProductsByPrice(maxPrice);

            // Muestro los productos filtrados

            console.log("Productos filtrados:");
            for (const product of filterProducts) {
                console.log(`${product.id} - ${product.name} - $${product.price}`);
            }
            break;

        case 4:

            let name = prompt("Ingrese el nombre del producto que desea buscar");
            searchproduct(name);

            break;
        
        case 5:

            // Pido ID para pasarselo a la funcion addToCart 

            const productId = parseInt(prompt("Ingrese el ID del producto: "));

            // Se agrega el producto al carrito

            addToCart(productId);
            break;

        case 6:

            // Muestro el carrito    

            showCart();
            break;

        case 7:

            // LLamo a la funcion calculateTotal y lo guardo en total para despues mostrarlo

            const total = calculateTotal();
            alert(`Total: $${total}`);
            break;

        case 8:

            // Salgo del while

            alert("¡Hasta luego!");
            break;

        default:

            // En caso de que se ingrese un valor distinto a las opciones muestro un mensaje

            alert("Opción no válida.");
            break;
    }
}

// Ecommerce va a ser mi funcion principal, al principio controlo si es mayor de edad, si no lo es salgo de la pagina

function ECommerce() {

    let access = loginToMyPage();

    if(!access){
        return;
    }

    // Aca voy a elegir la opcion para pasarla como parametro 

    let option = 0;
    while (option !== 8) {

        showOption();
        
        option = parseInt(prompt(`Seleccione una opción:`));
        executeOpcion(option);
    }
}

// Iniciar el e-commerce
ECommerce();