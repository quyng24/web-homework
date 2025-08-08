import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BaseChart = ({ data, width, height }) => {
  const chartData = {
    responsive: false,
    labels: data.map(item => item.topicName),
    datasets: [
      {
        label: 'Số lượng làm bài',
        data: data.map(item => item.userCount),
        backgroundColor: [
          '#ff9b1d',
          '#d7a8de',
          '#f1e27c',
          '#5d91fa',
          '#8cdf7b'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie width={width} height={height} data={chartData} />;
};

export default BaseChart;
