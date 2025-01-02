import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Menu, Button } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { RootState } from "../redux/store";
import { removeFromCart, updateQuantity } from "../redux/cart/cartSlice";
import BudgetPDF from "./BudgetPDF";

const CartDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalDays } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const calculateTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.pricePerDay * item.quantity * totalDays,
      0
    );
  };

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.id}>
          <div className="flex justify-between items-center">
            <div>
              <h4>{item.name}</h4>
              <p>{`$${item.pricePerDay} x ${item.quantity} x ${totalDays} días`}</p>
              <p className="font-bold">{`Total: $${
                item.pricePerDay * item.quantity * totalDays
              }`}</p>
            </div>
            <div>
              <Button
                size="small"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <span className="mx-2">{item.quantity}</span>
              <Button
                size="small"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveItem(item.id)}
                className="ml-2"
              />
            </div>
          </div>
        </Menu.Item>
      ))}
      {items.length > 0 && (
        <>
          <Menu.Item>
            <div className="text-right">
              <h3 className="font-bold">{`Total de la campaña: $${calculateTotalPrice()}`}</h3>
            </div>
          </Menu.Item>
          <Menu.Item>
            <BudgetPDF />
          </Menu.Item>
        </>
      )}
      {items.length === 0 && (
        <Menu.Item>
          <p>El carrito está vacío</p>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <Button icon={<ShoppingCartOutlined />}>Carrito ({items.length})</Button>
    </Dropdown>
  );
};

export default CartDropdown;
