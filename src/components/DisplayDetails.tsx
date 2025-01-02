import React from "react";
import { Carousel, Descriptions } from "antd";
import { Display } from "../types";

interface DisplayDetailsProps {
  display: Display;
}

const DisplayDetails: React.FC<DisplayDetailsProps> = ({ display }) => {
  return (
    <div>
      <Carousel autoplay>
        {display.pictures &&
          display.pictures.map((picture, index) => (
            <div key={index}>
              <img
                src={picture.url}
                alt={`${display.name} - ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
      </Carousel>
      <Descriptions title={display.name} bordered column={1} className="mt-4">
        <Descriptions.Item label="Resolución">{`${display.resolution_width}x${display.resolution_height}`}</Descriptions.Item>
        <Descriptions.Item label="Ubicación">
          {display.formatted_address}
        </Descriptions.Item>
        <Descriptions.Item label="Precio por día">{`$${display.price_per_day.toFixed(
          2
        )} ${display.price_currency}`}</Descriptions.Item>
        <Descriptions.Item label="Tipo">
          {display.location_type}
        </Descriptions.Item>
        <Descriptions.Item label="Tamaño">{`${display.size_width}m x ${display.size_height}m (${display.size_type})`}</Descriptions.Item>
        <Descriptions.Item label="Descripción">
          {display.description}
        </Descriptions.Item>
        <Descriptions.Item label="Espacios publicitarios disponibles">
          {display.slots}
        </Descriptions.Item>
        <Descriptions.Item label="Duración de cada espacio">{`${
          display.slot_length / 1000
        } segundos`}</Descriptions.Item>
        <Descriptions.Item label="Shows por hora">
          {display.shows_per_hour.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default DisplayDetails;
