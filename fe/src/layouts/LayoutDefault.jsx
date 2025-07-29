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
          <Row className="fixed top-0 left-0 right-0 z-50 text-white">
            <Col span={24}>
              <div className="w-full flex justify-between items-center h-[80px] px-10 bg-gradient-to-r from-blue-500 to-blue-400 shadow-md fixed top-0 left-0 right-0 z-50">
                <p>logo</p>
                <p onClick={() => navigate('/admin')} className="text-center text-lg font-semibold hover:underline cursor-pointer">Quản lý Người dùng</p>
                <p onClick={() => navigate('/admin/topic')} className="text-center text-lg font-semibold hover:underline cursor-pointer">Quản lý Chủ đề</p>
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
          <Row className="w-full flex justify-between items-center h-[80px] px-10 bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md fixed top-0 left-0 right-0 z-50 text-white">
            <Col span={4}>
              <p className="text-center">Logo</p>
            </Col>
            <Col span={5}>
              <p onClick={() => navigate('/user')} className="text-center text-lg font-semibold hover:underline cursor-pointer">
                Trang chủ
              </p>
            </Col>
            <Col span={5}>
              <p onClick={() => navigate('/user/topic')} className="text-center text-lg font-semibold hover:underline cursor-pointer">
                Chủ đề
              </p>
            </Col>
            <Col span={5}>
              <p onClick={() => navigate('/user/history')} className="text-center text-lg font-semibold hover:underline cursor-pointer">
                Lịch sử làm bài
              </p>
            </Col>
            <Col span={5}>
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
            <div className="mb-10 mt-[120px] mx-auto w-[90%] max-w-[1200px] bg-white p-8">
              {children}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <footer className="w-full text-center text-sm text-gray-500 py-6 border-t mt-10">
              © 2025 SFE. Tất cả quyền được bảo lưu.
            </footer>
          </Col>
        </Row>
      </div>
    );
}
