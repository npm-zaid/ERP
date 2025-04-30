import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BookingAnalysis = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const data = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'DELHI',
        data: [10, 20, 30, 25, 15, 10],
        fill: false,
        borderColor: '#06b6d4',
        tension: 0.4,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#06b6d4',
      },
      {
        label: 'HEAD OFFICE',
        data: [5, 15, 70, 60, 40, 20],
        fill: false,
        borderColor: '#10b981',
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10b981',
      },
      {
        label: 'MUMBAI',
        data: [15, 25, 40, 35, 20, 15],
        fill: false,
        borderColor: '#f59e0b',
        tension: 0.4,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#f59e0b',
      },
    ],
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              font: {
                size: 14,
              },
              padding: 20,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 80,
            ticks: {
              stepSize: 10,
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            ticks: {
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
        },
        elements: {
          point: {
            radius: 6,
            hoverRadius: 8,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-4 w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800  mb-6">
        Booking Analysis
      </h2>
      <div className="relative h-96">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default BookingAnalysis;