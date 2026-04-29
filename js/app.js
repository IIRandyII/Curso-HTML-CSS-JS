const items = document.querySelectorAll('.item');
const carrito = document.getElementById('carrito');
const totalElemento = document.getElementById('total');

let total = 0;

// 🟢 DRAG START
items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.precio);
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    });
});

// 🟢 PERMITIR DROP
carrito.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// 🟢 DROP EN CARRITO
carrito.addEventListener('drop', (e) => {
    e.preventDefault();

    const precio = parseInt(e.dataTransfer.getData('text/plain'));
    const html = e.dataTransfer.getData('text/html');

    const nuevoItem = document.createElement('div');
    nuevoItem.innerHTML = html;
    const itemReal = nuevoItem.firstChild;

    // Botón eliminar
    const btn = document.createElement('button');
    btn.textContent = "❌";
    btn.onclick = () => {
        total -= precio;
        actualizarTotal();
        itemReal.remove();
    };

    itemReal.appendChild(btn);

    carrito.appendChild(itemReal);

    total += precio;
    actualizarTotal();
});

// 🟢 ACTUALIZAR TOTAL
function actualizarTotal() {
    totalElemento.textContent = total;
}