import React from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import CartHeader from "./CartHeader";
import CartProduct from "./CartProduct";
import CartTotal from "./CartTotal";

function Cart() {
  const { cart, setCart, products, setProducts } = useCart();
  const { user, userType } = useUser(); // Accediendo al contexto UserContext

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productToRemove.id
    );
    const countInCart = cart.filter(
      (product) => product.id === productToRemove.id
    ).length;

    if (countInCart > 0) {
      const updatedProductList = [...products];
      const index = updatedProductList.findIndex(
        (product) => product.id === productToRemove.id
      );
      if (index > -1) {
        updatedProductList[index].stock += countInCart;
      }
      setProducts(updatedProductList);
    }

    setCart(updatedCart);
  };

  const getProductCount = (productId) => {
    return cart.filter((product) => product.id === productId).length;
  };

  const uniqueProducts = Array.from(
    cart
      .reduce((acc, product) => {
        if (!acc.has(product.id)) {
          acc.set(product.id, {
            ...product,
            count: getProductCount(product.id),
          });
        }
        return acc;
      }, new Map())
      .values()
  );

  const totalPrice = uniqueProducts.reduce((sum, product) => {
    return sum + product.price * product.count;
  }, 0);

  const sendOrderToServer = async () => {
    try {
      for (const product of uniqueProducts) {
        const newOrder = {
          date: new Date(),
          name: product.name,
          count: product.count,
          price: product.price,
          user: {
            name: user.name,
            email: user.email,
            userType: userType,
            id: user.id, // Accediendo al id desde el contexto UserContext
            address: user.address, // Accediendo a address desde el contexto UserContext
            dni: user.dni, // Accediendo a dni desde el contexto UserContext
          },
        };

        await axios.post("/orders", newOrder);
      }

      // Agregar el pedido al historial en localStorage
      const newOrder = {
        date: new Date(),
        user: {
          name: user.name,
          email: user.email,
          userType: userType,
        },
        items: uniqueProducts.map((product) => ({
          name: product.name,
          price: product.price,
          count: product.count,
        })),
      };

      const existingHistory =
        JSON.parse(localStorage.getItem("orderHistory")) || [];
      existingHistory.push(newOrder);
      localStorage.setItem("orderHistory", JSON.stringify(existingHistory));

      alert(`Pedido enviado exitosamente.`);

      // Borrar el carrito de compras después de enviar el pedido
      setCart([]);
    } catch (error) {
      console.error("Error al enviar los datos a /orders:", error);
      alert("Hubo un error al enviar el pedido.");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <CartHeader />
        {uniqueProducts.length === 0 ? (
          <p className="text-center text-muted">
            No hay productos en el carrito.
          </p>
        ) : (
          <div className="list-group">
            {uniqueProducts.map((product) => (
              <CartProduct
                key={product.id}
                product={product}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        )}
        {uniqueProducts.length > 0 && <CartTotal totalPrice={totalPrice} />}
        {uniqueProducts.length > 0 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-success ms-2"
              onClick={sendOrderToServer}
            >
              Enviar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
