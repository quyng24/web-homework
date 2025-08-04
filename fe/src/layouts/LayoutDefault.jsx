import { Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../context/auth";
import { useEffect, useState } from "react";

export default function LayoutDefault({children}) {
  const [roleName, setRoleName] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkRole = async () => {
      await authProvider.init();
      console.log(authProvider.user.role);
      setRoleName(authProvider?.user?.role);
    };
    checkRole();
    console.log("🏁 Component loaded");
  console.log("👤 authProvider:", authProvider);
  }, []);
    return (
      <div className="w-full min-h-screen">
        {roleName === "admin" ? (
          <Row className="fixed top-0 left-0 right-0 z-50 text-white">
            <Col span={24}>
              <div className="w-full flex justify-between items-center h-[80px] px-10 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="flex justify-center items-center h-full">
                  <img className="max-w-[80px] max-h-[80px] mix-blend-multiply" src="https://static.vecteezy.com/system/resources/previews/027/426/352/non_2x/sfe-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg" alt="Logo" />
                </div>
                <p onClick={() => navigate('/admin')} className="text-center text-lg font-semibold hover:underline cursor-pointer">Quản lý Người dùng</p>
                <p onClick={() => navigate('/admin/topic')} className="text-center text-lg font-semibold hover:underline cursor-pointer">Quản lý Chủ đề</p>
                <Button type="primary" onClick={() => authProvider.signout(() => navigate('/login'))} >Đăng xuất</Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="w-full flex justify-between items-center h-[80px] px-10 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md fixed top-0 left-0 right-0 z-50 text-white">
            <Col span={4}>
              <div className="flex justify-center items-center w-full h-full">
                <img className="max-w-[80px] max-h-[80px] mix-blend-multiply" src="https://static.vecteezy.com/system/resources/previews/027/426/352/non_2x/sfe-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg" alt="Logo" />
              </div>
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
                <Button type="primary" onClick={() => authProvider.signout(() => navigate('/login'))} >Đăng xuất</Button>
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
