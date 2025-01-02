import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Pagination, Spin, Empty } from "antd";
import { RootState, AppDispatch } from "../redux/store";
import { searchCampaign } from "../redux/campaign/campaignSlice";
import DisplayList from "../components/DisplayList";
import DisplayMap from "../components/DisplayMap";

const ResultsView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { displays, loading, error, searchParams, pagination } = useSelector(
    (state: RootState) => state.campaign
  );

  useEffect(() => {
    if (displays.length === 0 && !loading && !error) {
      navigate("/");
    }
  }, [displays, loading, error, navigate]);

  const handlePageChange = (page: number, pageSize?: number) => {
    dispatch(
      searchCampaign({
        ...searchParams,
        page,
        per_page: pageSize || searchParams.per_page,
      })
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (displays.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="No se encontraron resultados" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Row gutter={[16, 16]} className="flex flex-wrap">
        <Col xs={24} lg={8}>
          <DisplayList displays={displays} />
        </Col>

        <Col xs={24} lg={16}>
          <DisplayMap displays={displays} />
        </Col>
      </Row>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={pagination.current_page}
          total={pagination.total}
          pageSize={Number(pagination.per_page)}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} pantallas`}
        />
      </div>
    </div>
  );
};

export default ResultsView;
