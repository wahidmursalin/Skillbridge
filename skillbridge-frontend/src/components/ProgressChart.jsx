import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function ProgressChart({ labels, data, label = 'Skills gained' }) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: '#2563EB',
            backgroundColor: '#2563EB22',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#2563EB'
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, ticks: { stepSize: 2 } }
        }
      }}
    />
  )
}
