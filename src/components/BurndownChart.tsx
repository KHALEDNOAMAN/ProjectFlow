import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BurndownDataPoint } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BurndownChartProps {
  data: BurndownDataPoint[];
  sprintName: string;
}

const BurndownChart: React.FC<BurndownChartProps> = ({ data, sprintName }) => {
  const chartData = {
    labels: data.map((d) => `Day ${d.day}`),
    datasets: [
      {
        label: 'Ideal Burndown',
        data: data.map((d) => d.ideal),
        borderColor: 'rgba(99, 102, 241, 0.6)',
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        borderDash: [8, 4],
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(99, 102, 241, 0.6)',
        pointBorderColor: 'rgba(99, 102, 241, 0.8)',
        tension: 0,
        fill: false,
      },
      {
        label: 'Actual Remaining',
        data: data.map((d) => d.actual),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#0891b2',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#06b6d4',
        pointHoverBorderColor: '#fff',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: 'Inter',
          weight: '600' as const,
        },
        bodyFont: {
          family: 'Inter',
        },
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y} points`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.08)',
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.08)',
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Inter',
            size: 11,
          },
        },
        title: {
          display: true,
          text: 'Story Points',
          color: '#64748b',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="burndown-container">
      <h3>📉 Burndown Chart — {sprintName}</h3>
      <div className="burndown-chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BurndownChart;
