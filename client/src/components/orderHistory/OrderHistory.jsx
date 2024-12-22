import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import * as XLSX from "xlsx"; // Importa XLSX para la función de exportar a Excel

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

function OrderHistory() {
  const { cart } = useCart();
  const { user, userType } = useUser();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  const clearOrderHistory = () => {
    localStorage.removeItem("orderHistory");
    setOrderHistory([]);
  };

  // Función para eliminar un pedido específico
  const deleteOrder = (orderIndex) => {
    const updatedHistory = orderHistory.filter(
      (_, index) => index !== orderIndex
    );
    setOrderHistory(updatedHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
  };

  const getSalesByUserAndProduct = (userName) => {
    const userOrders = orderHistory.filter(
      (order) => order.user.name === userName
    );
    const salesByProduct = userOrders.reduce((acc, order) => {
      order.items.forEach((item) => {
        acc[item.name] = (acc[item.name] || 0) + item.count * item.price;
      });
      return acc;
    }, {});

    return salesByProduct;
  };

  const getChartData = (userName) => {
    const salesByProduct = getSalesByUserAndProduct(userName);
    const products = Object.keys(salesByProduct);
    const sales = products.map((product) => salesByProduct[product]);
    const totalSales = sales.reduce((sum, sale) => sum + sale, 0);

    return {
      labels: products,
      datasets: [
        {
          label: `Ventas por Producto de ${userName}`,
          data: sales,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 205, 86, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 205, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            color: "#fff",
            formatter: (value) => {
              const percentage = ((value / totalSales) * 100).toFixed(2);
              return `${percentage}%`;
            },
            font: {
              weight: "bold",
              size: 14,
            },
            position: "outside",
          },
        },
      },
    };
  };

  const getUniqueUsers = () => {
    const users = orderHistory.map((order) => order.user.name);
    return [...new Set(users)];
  };

  const generateExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(
      orderHistory.flatMap((order) =>
        order.items.map((item) => ({
          Usuario: order.user.name,
          Email: order.user.email,
          TipoUsuario: order.user.userType,
          Producto: item.name,
          Cantidad: item.count,
          PrecioUnitario: item.price,
          Total: item.count * item.price,
          Fecha: order.date,
        }))
      )
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Historial de Compras");
    XLSX.writeFile(wb, "historial_compras.xlsx");
    alert("Archivo Excel generado.");
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Historial de Ventas</h2>
        {orderHistory.length === 0 ? (
          <p className="text-center text-muted">No hay historial de ventas.</p>
        ) : (
          <>
            <div className="list-group">
              {orderHistory.map((order, index) => (
                <div
                  key={index}
                  className="card mb-3 shadow-sm"
                  style={{ borderRadius: "0.5rem", marginTop: "20px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      Compra del {new Date(order.date).toLocaleString()}
                    </h5>
                    <h6 className="text-muted">
                      Usuario: {order.user.name} ({order.user.email})
                    </h6>
                    <ul className="list-unstyled">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          <strong>{item.name}</strong> - {item.count} x ${" "}
                          {item.price} = ${item.count * item.price}
                        </li>
                      ))}
                    </ul>
                    <h6 className="mt-2 text-success">
                      Total: $
                      {order.items
                        .reduce((sum, item) => sum + item.count * item.price, 0)
                        .toFixed(2)}
                    </h6>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => deleteOrder(index)}
                    >
                      Eliminar ventas
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="btn btn-primary" onClick={generateExcel}>
                Generar Excel
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={clearOrderHistory}
              >
                Eliminar Historial
              </button>
            </div>

            <div className="mt-4" style={{ marginTop: "20px" }}>
              <h4>Ventas por Producto por Usuario</h4>
              <div className="row">
                {getUniqueUsers().map((userName, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <h5>{userName}</h5>
                    <div
                      className="chart-container"
                      style={{ width: "300px", height: "300px" }}
                    >
                      <Pie
                        data={getChartData(userName)}
                        options={getChartData(userName).options}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <footer
        className="text-center mt-4 py-3"
        style={{ marginTop: "20px" }}
      ></footer>
    </div>
  );
}

export default OrderHistory;
