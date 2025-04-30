import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GodownStatus = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const data = {
    labels: ['In Godown (W: 98629.72)', 'Inward Godown (W: 27708.5)', 'In Transit (W: 31931.6)'],
    datasets: [
      {
        data: [98629.72, 27708.5, 31931.6],
        backgroundColor: ['#18BC85', '#F59E0B', '#06B6D4'],
        borderWidth: 2,
        borderColor: '#e5e7eb',
      },
    ],
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
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
                family: 'Arial',
                weight: 'bold',
              },
              padding: 20,
              color: '#1f2937',
            },
          },
          tooltip: {
            backgroundColor: '#1f2937',
            titleFont: { size: 14, family: 'Arial' },
            bodyFont: { size: 12, family: 'Arial' },
            padding: 10,
            cornerRadius: 8,
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
    <div className="p-6 w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold   text-black  mb-6">
        Godown Status
      </h2>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default GodownStatus;