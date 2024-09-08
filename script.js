document.getElementById("calcularTotal").addEventListener("click", calcularTotal);

function calcularTotal() {
    let subtotal = 0;

    document.querySelectorAll("tbody tr").forEach(
        function(row)
        {
            const cantidad = row.querySelector(".cantidad").value;
            const precioUnitario = row.querySelector(".precioUnitario").value;
            const precioTotal = row.querySelector(".precioTotal");

            if (cantidad > 0 && precioUnitario > 0) {
                const totalProducto = cantidad * precioUnitario;
                subtotal += totalProducto;
                precioTotal.value = totalProducto.toFixed(2);
            } else {
                precioTotal.value = "0.00";
            }
        }
    );

    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    const totalAhora12 = total / 12;
    const totalAhora18 = (total * 1.35) / 18;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("iva").textContent = iva.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("totalAhora12").textContent = totalAhora12.toFixed(2);
    document.getElementById("totalAhora18").textContent = totalAhora18.toFixed(2);
}

document.getElementById("imprimirPresupuesto").addEventListener("click", function() {
    window.print();
});

document.getElementById("exportarPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Presupuestos mecatrónica", 10, 10);

    const cliente = document.getElementById("cliente").value;
    doc.setFontSize(12);
    doc.text(`Cliente: ${cliente}`, 10, 20);

    const tabla = document.querySelectorAll("tbody tr");
    let y = 40;

    tabla.forEach(function(row, index) {
        const cantidad = row.querySelector(".cantidad").value;
        const producto = row.querySelector(".producto").value;
        const precioUnitario = row.querySelector(".precioUnitario").value;
        const precioTotal = row.querySelector(".precioTotal").value;

        if (producto !== "Seleccionar Producto")
        {
            doc.text(`${index + 1}. ${producto}`, 10, y);
            doc.text(`Cantidad: ${cantidad}`, 70, y);
            doc.text(`Precio Unitario: $${precioUnitario}`, 110, y);
            doc.text(`Precio Total: $${precioTotal}`, 160, y);
            y += 10;
        }
    });

    const subtotal = document.getElementById("subtotal").textContent;
    const iva = document.getElementById("iva").textContent;
    const total = document.getElementById("total").textContent;
    const totalAhora12 = document.getElementById("totalAhora12").textContent;
    const totalAhora18 = document.getElementById("totalAhora18").textContent;

    y += 20;
    doc.text(`Subtotal: $${subtotal}`, 10, y);
    doc.text(`IVA (21%): $${iva}`, 10, y + 10);
    doc.text(`Total: $${total}`, 10, y + 20);
    doc.text(`Cuota Ahora 12 (Sin interés): $${totalAhora12}`, 10, y + 30);
    doc.text(`Cuota Ahora 18 (35% interés): $${totalAhora18}`, 10, y + 40);
    doc.save("presupuesto.pdf");
});