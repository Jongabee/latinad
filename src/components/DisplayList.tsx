import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Card, Modal } from "antd";
// import { ShoppingCartOutlined } from "@ant-design/icons";
import { Display } from "../types";
import DisplayDetails from "./DisplayDetails";
import { addToCart } from "../redux/cart/cartSlice";
import { RootState } from "../redux/store";
import { truncateText } from "../utils/truncateText";

interface DisplayListProps {
  displays: Display[];
}

const DisplayList: React.FC<DisplayListProps> = ({ displays }) => {
  const dispatch = useDispatch();
  const [selectedDisplay, setSelectedDisplay] = useState<Display | null>(null);
  const { totalDays } = useSelector((state: RootState) => state.cart);

  const handleDisplayClick = (display: Display) => {
    setSelectedDisplay(display);
  };

  const handleCloseModal = () => {
    setSelectedDisplay(null);
  };

  const handleAddToCart = (display: Display) => {
    dispatch(addToCart({ display, days: totalDays }));
  };

  return (
    <>
      <List
        dataSource={displays}
        itemLayout="horizontal"
        renderItem={(display) => (
          <List.Item>
            <Card onClick={() => handleDisplayClick(display)}>
              <div className="flex items-center gap-3">
                <img
                  alt={display.name || "Imagen de pantalla"}
                  src={
                    display.pictures && display.pictures.length > 0
                      ? display.pictures[0].url
                      : "/placeholder.svg"
                  }
                  className=" w-1/2 rounded-lg"
                />

                <div className="w-1/2 ">
                  <div className="text-xs">
                    <p className="font-bold">
                      {truncateText(display.formatted_address, 25)}
                    </p>
                    <p className="text-blue-400">{`${
                      display.price_currency
                    }$ ${display.price_per_day.toFixed(2)} / día`}</p>
                    <hr className="m-1" />
                    <p>{`Tamaño: ${display.size_width}m x ${display.size_height}m`}</p>
                    <p>{`Resolución: ${display.resolution_width}x${display.resolution_height}`}</p>
                  </div>
                  {/* <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(display);
                    }}
                    type="primary"
                  >
                    Agregar al carrito
                  </Button> */}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        open={!!selectedDisplay}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        centered
      >
        {selectedDisplay && <DisplayDetails display={selectedDisplay} />}
      </Modal>
    </>
  );
};

export default DisplayList;
