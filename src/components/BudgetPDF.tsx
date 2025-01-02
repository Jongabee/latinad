import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RootState } from "../redux/store";

const BudgetPDF: React.FC = () => {
  const { items, totalDays } = useSelector((state: RootState) => state.cart);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Presupuesto de Campaña", 14, 22);

    // Add campaign duration
    doc.setFontSize(12);
    doc.text(`Duración de la campaña: ${totalDays} días`, 14, 32);

    // Create table data
    const tableData = items.map((item) => [
      item.name,
      `$${item.pricePerDay}`,
      item.quantity.toString(),
      `$${item.pricePerDay * item.quantity * totalDays}`,
    ]);

    // Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.pricePerDay * item.quantity * totalDays,
      0
    );

    // Add table
    autoTable(doc, {
      head: [["Pantalla", "Precio/día", "Cantidad", "Total"]],
      body: [...tableData, ["", "", "Total", `$${total}`]],
      startY: 40,
    });

    // Save the PDF
    doc.save("presupuesto_campaña.pdf");
  };

  return (
    <Button
      icon={<DownloadOutlined />}
      onClick={generatePDF}
      disabled={items.length === 0}
    >
      Descargar Presupuesto PDF
    </Button>
  );
};

export default BudgetPDF;
