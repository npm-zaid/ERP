import React from 'react'
import { NavLink } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const Sidebar = ({isOpen, setIsOpen}) => {
  return (
    <div className={`h-screen overflow-y-scroll scroller bg-white  text-black p-5 transition-all z-40  duration-300 ${isOpen ? 'sm:w-[25vw] w-[100vw]' : 'sm:w-[8vw] w-[15vw]'}`}>
    <div className={`flex flex-col gap-2  ${isOpen ? 'items-start' : 'items-center'}`}>

      <div className="flex items-center mb-2">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl cursor-pointer text-[#397BD0] transition-all group relative">
        {isOpen?<i class="ri-close-large-line"></i>:<i class="ri-menu-line"></i>}
        
        </button>
        {isOpen && <div className=' pl-2 flex'>
       
        <h1 className="text-2xl font-bold text-[#397BD0] text-nowrap">ERP SOFTWARE</h1>
        </div>
        }
      </div>

      <NavLink 
        to="/"
        onClick={() => setIsOpen(false)}
        className={({isActive}) => 
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i className="ri-dashboard-line"></i>
        {isOpen && "Dashboard"}
      
      </NavLink>

      <NavLink 
        to="/proof-of-delivery"
        onClick={() => setIsOpen(false)}
        className={({isActive}) => 
          ` px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
         <i class="ri-secure-payment-fill"></i>
        {isOpen && "Proof of Delivery"}
      
      </NavLink>

      <NavLink 
        to="/goods-received"
        onClick={() => setIsOpen(false)}
        className={({isActive}) => 
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
         <i className="ri-shopping-bag-line"></i>
        {isOpen && "Goods Received"}
      
      </NavLink>

      <NavLink 
        to="/container-interchange"
        onClick={() => setIsOpen(false)}
        className={({isActive}) => 
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
         <i className="ri-archive-line"></i>
        {isOpen && "Container Interchange"}
      
      </NavLink>


      <NavLink
        to="/list-of-lr"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-profile-line"></i>
        {isOpen && <span className='text-nowrap'>List of LR</span>}
       
      </NavLink>

      <NavLink
        to="/list-of-memo" 
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-archive-stack-line"></i>
        {isOpen && <span className='text-nowrap'>List of Memo</span>}

      </NavLink>

      <NavLink
        to="/list-of-memo-received"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i className="ri-file-chart-line"></i>
        {isOpen && "Memo Received"}
       
      </NavLink>

      <NavLink
        to="/list-of-delivery"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i className="ri-truck-line"></i>
        {isOpen && "Delivery"}
      
      </NavLink>

      <NavLink
        to="/list-of-full-load"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
      <i class="ri-database-line"></i>
        {isOpen && "Full Load"}
       
      </NavLink>

      <NavLink
        to="/list-of-sales-invoice"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i className="ri-receipt-line"></i>
        {isOpen && "Sales Invoice"}
       
      </NavLink>

      <NavLink 
        to="/list-of-transporter-bill"
        onClick={() => setIsOpen(false)}
        className={({isActive}) => 
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
       <i class="ri-dashboard-2-line"></i>
        {isOpen && "Transporter Bill"}
      
      </NavLink>

      <NavLink
        to="/list-of-cash-payment"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-money-dollar-circle-line"></i>
        {isOpen && <span className='text-nowrap'>Cash Payment</span>}
       
      </NavLink>

      <NavLink
        to="/list-of-cash-receipt" 
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-file-list-3-line"></i>
        {isOpen && "Cash Receipt"}

      </NavLink>

      <NavLink
        to="/list-of-bank-payment"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i className="ri-file-chart-line"></i>
        {isOpen && "Bank Payment"}
       
      </NavLink>

      <NavLink
        to="/account-ledger"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
       <i class="ri-bank-line"></i>
        {isOpen && "Account Ledger"}
      
      </NavLink>

      <NavLink
        to="/lr-register"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
       <i class="ri-pie-chart-2-line"></i>
        {isOpen && "Lr Register"}
       
      </NavLink>

      <NavLink
        to="/godown-stock"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-store-2-fill"></i>
        {isOpen && "Godown Stock"}
       
      </NavLink>

      <NavLink
        to="/payable-account"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-fingerprint-fill"></i>
        {isOpen && "Payable Account"}
       
      </NavLink>

      <NavLink
        to="/receivable-account"
        onClick={() => setIsOpen(false)}
        className={({isActive}) =>
          `px-2  rounded-sm transition-all duration-300 flex items-center gap-3 group relative
          ${isActive ? 'bg-[#397BD0] text-white' : ''} ${isOpen ? 'w-full' : ''}`
        }
      >
        <i class="ri-contacts-book-line"></i>
        {isOpen && "Receivable Account"}
       
      </NavLink>

      <button onClick={()=>setToken("")} className={`${isOpen ? 'w-full' : ''} mt-auto p-3 btn-donate transition-all duration-300 rounded-sm flex items-center gap-3 group relative`}>
        <i className="ri-logout-box-line"></i>
        
        {isOpen && "Logout"}
       
      </button>
      
    </div>
  </div>
  )
}

export default Sidebar