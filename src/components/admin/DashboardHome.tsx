import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardHome: React.FC = () => {
  // Mock Data for Bar Chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: [12000, 19000, 15000, 22000, 28000, 32000],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue Overview',
        font: {
          size: 16,
          family: "'Outfit', sans-serif"
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Mock Data for Doughnut Chart
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden'],
    datasets: [
      {
        label: 'Products by Category',
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Products by Category',
        font: {
          size: 16,
          family: "'Outfit', sans-serif"
        }
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Quick Cart Administration panel. Here is your store's overview.</p>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">$128,000</p>
          <span className="stat-change positive">+14% from last month</span>
        </div>
        <div className="stat-card">
          <h3>Active Products</h3>
          <p className="stat-value">1,245</p>
          <span className="stat-change positive">+5 new this week</span>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p className="stat-value">24</p>
          <span className="stat-change neutral">No change</span>
        </div>
        <div className="stat-card">
          <h3>Active Discounts</h3>
          <p className="stat-value">8</p>
          <span className="stat-change negative">-2 expiring soon</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card bar-chart-container">
          <Bar options={revenueOptions} data={revenueData} />
        </div>
        <div className="chart-card doughnut-chart-container">
          <Doughnut options={categoryOptions} data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
