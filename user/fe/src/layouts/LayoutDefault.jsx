import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import BaseButton from "../components/common/BaseButton";
import { authProvider } from "../context/auth";
import { useEffect, useState } from "react";

export default function LayoutDefault({children}) {
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('user')).role;
        setRoleName(role)
    }, [])
    return (
      <div className="w-full min-h-screen">
        {roleName === "admin" ? (
          <Row className="fixed top-0 left-0 right-0 z-50">
            <Col span={24}>
              <div className="w-full flex justify-between items-center min-h-[100px] p-5 bg-blue-400">
                <p>logo</p>
                <BaseButton
                  label="Đăng xuất"
                  colorBtn="transparent"
                  text="white"
                  onClick={() => authProvider.signout(() => navigate("/login"))}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="w-full flex justify-between items-center min-h-[100px] p-5 bg-blue-400 fixed top-0 left-0 right-0 z-50">
            <Col span={6}>
              <p className="text-center">Logo</p>
            </Col>
            <Col span={6}>
              <p onClick={() => navigate('/user')} className="text-center text-2xl text-white font-medium">
                Home
              </p>
            </Col>
            <Col span={6}>
              <p className="text-center text-2xl text-white font-medium">
                Topic
              </p>
            </Col>
            <Col span={6}>
              <div className="w-full flex justify-center items-end">
                <BaseButton
                  label="Đăng xuất"
                  colorBtn="transparent"
                  text="white"
                  onClick={() => authProvider.signout(() => navigate("/login"))}
                />
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <div className="mb-10 mt-[150px] mx-auto w-[70%] p-5">
              {children}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p className="text-2xl text-center p-3">Footer</p>
          </Col>
        </Row>
      </div>
    );
}
