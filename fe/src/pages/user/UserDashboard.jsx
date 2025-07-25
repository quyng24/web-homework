import { useEffect, useState } from "react";
import { Col, Row, Card, Carousel } from "antd";
const { Meta } = Card;
import { FaArrowRight } from "react-icons/fa";
import LayoutDefault from "../../layouts/LayoutDefault";
import BaseButton from "../../components/common/BaseButton";

export default function UserDashboard() {
  const [nameUser, setNameUser] = useState();
  const topics = [
    {id: 1, nameTopic: 'HTML', img: '../../assets/images/html-5.png'},
    {id: 2, nameTopic: 'CSS', img: '../../assets/images/css.jpg'},
    {id: 3, nameTopic: 'ReactJs', img: '../../assets/images/react-js.png'},
    {id: 4, nameTopic: 'React Native', img: '../../assets/images/react-native.jpg'},
    {id: 5, nameTopic: 'VueJs', img: '../../assets/images/vue-3.png'},
    {id: 6, nameTopic: 'NodeJs', img: '../../assets/images/node-js.png'},
  ];
  useEffect(() => setNameUser(JSON.parse(localStorage.getItem('user')).name), []);
  return (
    <LayoutDefault>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Xin chào, {nameUser}!</h2>
        <Row>
          <Col span={24}>
            <h2>Chào mừng bạn đến với SFE</h2>
            <p>Chào mừng bạn đến với SFE – nền tảng học tập trực tuyến giúp bạn 
              nâng cao kiến thức một cách hiệu quả và thú vị! 
              Chúng tôi tin rằng việc học là một hành trình liên tục và 
              SFE sẽ là người bạn đồng hành đáng tin cậy trên con đường đó.</p>
            <BaseButton label="Khám phá chủ đề" icon={<FaArrowRight/>} />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <h2>Cách Chúng Tôi Giúp Bạn Học Tập</h2>
            <p>Tại SFE, chúng tôi đơn giản hóa quá trình học tập và 
              kiểm tra kiến thức của bạn qua các bước dễ dàng:</p>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Carousel arrows infinite={false}>
              {topics.map(topic => (
                <Card
                key={topic.id}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={topic.title} src={topic.img} />}
                >
                  <Meta title={topic.title} description="www.instagram.com" />
                </Card>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
}
