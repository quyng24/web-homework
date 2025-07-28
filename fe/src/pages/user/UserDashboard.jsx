import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Col, Row, Card, Carousel } from "antd";
const { Meta } = Card;
import LayoutDefault from "../../layouts/LayoutDefault";
import BaseButton from "../../components/common/BaseButton";
import { getTopics } from "../../api/apiTopic";

export default function UserDashboard() {
  const [nameUser, setNameUser] = useState();
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const contentStudy = [
    {
      title: "Khám Phá Chủ Đề Đa Dạng",
      desc: "Chúng tôi cung cấp một thư viện các chủ đề học tập phong phú được sắp xếp khoa học. Dù bạn quan tâm đến lịch sử, khoa học, toán học, hay bất kỳ lĩnh vực nào khác, bạn sẽ tìm thấy những bài học phù hợp với sở thích và nhu cầu của mình. Chỉ cần chọn chủ đề bạn muốn khám phá!"
    },
    {
      title: "Luyện Tập Với Bài Kiểm Tra Tương Tác",
      desc: "Sau khi chọn chủ đề, bạn có thể bắt đầu làm các bài kiểm tra được thiết kế riêng. Các bài tập này sẽ giúp bạn củng cố kiến thức và kiểm tra mức độ hiểu bài của mình. Giao diện thân thiện giúp bạn dễ dàng tương tác và trả lời các câu hỏi."
    },
    {
      title: "Nhận Kết Quả Ngay Lập Tức",
      desc: "Sau khi hoàn thành và nộp bài, bạn sẽ nhận được kết quả chi tiết ngay lập tức. Bạn sẽ biết chính xác số câu trả lời đúng, số câu trả lời sai, và tỷ lệ phần trăm câu đúng của mình. Điều này giúp bạn nhanh chóng đánh giá hiệu suất học tập."
    },
    {
      title: "Xem Lại và Học Hỏi Từ Lỗi Sai",
      desc: "Chúng tôi hiểu rằng học từ lỗi lầm là điều quan trọng. Vì vậy, bạn có thể xem lại toàn bộ bài làm của mình, bao gồm cả những câu trả lời đúng và sai, cùng với đáp án chính xác. Điều này giúp bạn hiểu rõ hơn về những điểm cần cải thiện."
    },
    {
      title: "Thực Hành Lại Bất Cứ Lúc Nào",
      desc: "Kiến thức cần được ôn luyện thường xuyên. Bạn có thể làm lại bất kỳ bài kiểm tra nào mà bạn đã hoàn thành trước đó, dù là để cải thiện điểm số hay chỉ đơn giản là để củng cố kiến thức."
    }
  ];
  useEffect(() => {
    setNameUser(JSON.parse(localStorage.getItem('user')).name);
    const fetchDataTopics = async () => {
      const res = await getTopics();
      setTopics(res.data);
    }
    fetchDataTopics();
  }, []);
  return (
    <LayoutDefault>
      <div className="flex flex-col">
        <h2 className="text-4xl mt-10 mb-15 font-bold text-blue-700">👋 Xin chào, {nameUser}!</h2>

        {/* Giới thiệu */}
        <Row gutter={[24, 24]} className="my-10">
          <Col xs={24} md={12}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Chào mừng bạn đến với <span className="text-blue-600 font-bold">SFE</span></h2>
            <p className="text-gray-600 leading-relaxed">
              Nền tảng học tập trực tuyến giúp bạn nâng cao kiến thức một cách hiệu quả và thú vị!
              SFE sẽ là người bạn đồng hành đáng tin cậy trên hành trình học tập không ngừng của bạn.
            </p>
            <div className="mt-4">
              <BaseButton
                label="Khám phá chủ đề"
                icon={<FaArrowRight />}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all px-6 py-2 rounded-lg shadow"
              />
            </div>
          </Col>
          <Col xs={0} md={12}>
            <img
              src="https://t4.ftcdn.net/jpg/03/79/40/09/360_F_379400937_dUYIQ7yzPK0PbB9TukDe3InmGRxVcsG5.jpg"
              alt="Learning"
              className="w-full h-auto object-contain"
            />
          </Col>
        </Row>

        {/* Giới thiệu cách học */}
        <Row gutter={[16, 16]} className="mt-10">
          <Col span={24}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🧭 Cách Chúng Tôi Giúp Bạn Học Tập
            </h2>
            <p className="text-gray-600 mb-6">
              Tại SFE, chúng tôi đơn giản hóa quá trình học tập và kiểm tra kiến thức của bạn qua các bước dễ dàng:
            </p>
          </Col>
          {contentStudy.map((item, index) => (
            <Col xs={24} md={12} key={index}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all h-full">
                <div className="flex items-start gap-4">
                  <p className=" text-blue-500 text-lg font-bold">
                    {index + 1}. 
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <h2 className="text-3xl text-center font-semibold text-blue-600 mt-35 mb-10">Các topic mà các bạn có thể thực hành ngay</h2>

        {/* Carousel chủ đề */}
        <Row>
          <Col span={24}>
            <Carousel arrows autoplay infinite slidesToShow={2} slidesToScroll={1}>
              {topics.map((topic, index) => (
                <div key={index} className="p-6">
                  <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <img
                      src={topic.imgTopic}
                      alt={topic.topicName}
                      className="w-full h-[70%] object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-start mt-5 gap-4">
                    <div className="max-w-[70%] h-24 pr-2">
                      <h3 className="text-xl font-bold text-gray-900">{topic.topicName}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{topic.descriptionTopic}</p>
                    </div>
                    <BaseButton label="View topic" onClick={() => navigate('/user/topic')} />
                  </div>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>

      </div>
    </LayoutDefault>
  );
}
