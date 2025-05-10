import React from 'react'
import TruckReminder from './TruckReminder'
import BookingAnalysis from './BookingAnalysis'
import GodownStatus from './GodownStatus'
import Inbox from './Inbox'
import PartyLR from './PartyLR'
import CreditDays from './CreditDays'
import BillReminder from './BillReminder'
import PendingDelivery from './PendingDelivery'



const Dashboard = () => {
  return (

    <div className='w-full min-h-screen'>

        {/* 1st section */}
       <div className="grid  grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Receivable',
              value: '₹19,78,820',
              change: '+10%',
              icon: 'ri-wallet-line',
              color: '#F97316', // Orange
              trend: 'up',
            },
            {
              label: 'Payable',
              value: '₹29,800',
              change: '-5%',
              icon: 'ri-bank-card-line',
              color: '#FACC15', // Yellow
              trend: 'down',
            },
            {
              label: 'Expense',
              value: '₹2,400',
              change: '+3%',
              icon: 'ri-money-dollar-circle-line',
              color: '#5EA9ED', // Dark Blue
              trend: 'up',
            },
            {
              label: 'Today Invoice',
              value: '0',
              change: '0%',
              icon: 'ri-file-list-3-line',
              color: '#0D9488', // Teal
              trend: 'neutral',
            },
            {
              label: 'LR',
              value: '1',
              change: '+1%',
              icon: 'ri-truck-line',
              color: '#FF0001', // Light Yellow
              trend: 'up',
            },
            {
              label: 'Today Cash Receipt',
              value: '20',
              change: '+8%',
              icon: 'ri-coins-line',
              color: '#6B21A8', // Purple
              trend: 'up',
            },
            {
              label: 'Today Bank Receipt',
              value: '30',
              change: '+12%',
              icon: 'ri-bank-line',
              color: '#DB2777', // Pink
              trend: 'up',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white backdrop-blur-xl p-6 py-4 rounded-xl shadow-xl border-l-4 transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              style={{ borderColor: stat.color }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
                  <h3 className={`text-gray-900 text-2xl font-bold mt-1`}>{stat.value}</h3>
                </div>
                <div className="p-3 bg-gradient-to-br rounded-full shadow-lg" style={{ background: `${stat.color}20` }}>
                  <i className={`${stat.icon} text-3xl`} style={{ color: stat.color }}></i>
                </div>
              </div>
              <p
                className={`text-xs border-t  border-gray-400/80 mt-2 pt-2 flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-400' : stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                <i
                  className={
                    stat.trend === 'up'
                      ? 'ri-arrow-up-circle-fill'
                      : stat.trend === 'down'
                      ? 'ri-arrow-down-circle-fill'
                      : 'ri-checkbox-blank-circle-fill'
                  }
                  aria-label={stat.trend === 'up' ? 'Up trend' : stat.trend === 'down' ? 'Down trend' : 'No change'}
                ></i>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* 2nd section */}
        <div className='flex sm:flex-row flex-col gap-5 w-full  '>
          <div className='sm:w-1/2 w-full '><TruckReminder/></div>
          <div className='sm:w-1/2 w-full '><BookingAnalysis/></div>
        </div>

        {/* 3rd section */}
        <div className='flex sm:flex-row flex-col gap-5 w-full my-5'>
          <div className='sm:w-1/2 w-full '><GodownStatus/></div>
          <div className='sm:w-1/2 w-full '><Inbox/></div>
        </div>

        {/* 4th section */}
        <div className='flex sm:flex-row flex-col gap-5 w-full my-5'>
          <div className='sm:w-1/2 w-full '><PartyLR/></div>
          <div className='sm:w-1/2 w-full '><CreditDays/></div>
        </div>

         {/* 5th section */}
         <div className='flex sm:flex-row flex-col gap-5 w-full my-5'>
          <div className='sm:w-1/2 w-full '><BillReminder/></div>
          <div className='sm:w-1/2 w-full '><PendingDelivery/></div>   
        </div>

   </div>
  )
}

export default Dashboard