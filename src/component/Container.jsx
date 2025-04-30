import React from 'react'
import Dashboard from './Dashboard'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ListOfLR from './ListOfLR'
import ListOfMemo from './ListOfMemo'
import ListOfMemoReceived from './ListOfMemoReceived'
import ListOfDelivery from './ListOfDelivery'
import ListOfFullLoad from './ListOfFullLoad'
import ListOfSalesInvoice from './ListOfSalesInvoice'
import ListOfTranspoterBill from './ListOfTranspoterBill'
import ListOfCashPayment from './ListOfCashPayment'
import ListOfCashReceipt from './ListOfCashReceipt'
import ListOfBankPayment from './ListOfBankPayment'
import AccountLedger from './AccountLedger'
import LrRegister from './LrRegister'
import GodownStockComponent from './GodownStockComponent'
import ReceivableAccount from './ReceivableAccount'
import PayableAccount from './PayableAccount'

// navbar
import ListOfAccount from './Navbar/ListOfAccount'
import ListOfAccountGroup from './Navbar/ListOfAccountGroup'
import ListOfPacking from './Navbar/ListOfPacking'
import ListOfPrice from './Navbar/ListOfPrice'
import ListOfBranch from './Navbar/ListOfBranch'
import ListOfCity from './Navbar/ListOfCity'
import ListOfArea from './Navbar/ListOfArea'
import ListOfState from './Navbar/ListOfState'
import ListOfCountry from './Navbar/ListOfCountry'
import ListOfDistrict from './Navbar/ListOfDistrict'
import ListOfTruck from './Navbar/ListOfTruck'
import ListOfTruckDriver from './Navbar/ListOfTruckDriver'
import ListOfTruckOwner from './Navbar/ListOfTruckOwner'

const Container = ({isOpen, setIsOpen}) => {
  return (
    <div className='fle flex-col '>
    <Navbar/>
    <div  className={` ${isOpen?'w-0 sm:w-[75vw]':'w-[92vw]'} overflow-hidden flex h-screen  bg-zinc-300 overflow-y-scroll scroller p-8`}>
   
   
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/list-of-lr" element={<ListOfLR/>} />
        <Route path="/list-of-memo" element={<ListOfMemo/>} />
        <Route path="/list-of-memo-received" element={<ListOfMemoReceived/>} />
        <Route path="/list-of-delivery" element={<ListOfDelivery/>} />
        <Route path="/list-of-full-load" element={<ListOfFullLoad/>} />
        <Route path="/list-of-sales-invoice" element={<ListOfSalesInvoice/>} />
        <Route path="/list-of-transporter-bill" element={<ListOfTranspoterBill/>} />
        <Route path="/list-of-cash-payment" element={<ListOfCashPayment/>} />
        <Route path="/list-of-cash-receipt" element={<ListOfCashReceipt/>} />
        <Route path="/list-of-bank-payment" element={<ListOfBankPayment/>} />
        <Route path="/account-ledger" element={<AccountLedger/>} />
        <Route path="/lr-register" element={<LrRegister/>} />
        <Route path="/godown-stock" element={<GodownStockComponent/>} />
        <Route path="/receivable-account" element={<ReceivableAccount/>} />
        <Route path="/payable-account" element={<PayableAccount/>} />

        {/* navbar */}
        <Route path="/master/Account" element={<ListOfAccount />} />
        <Route path="/master/Account-Group" element={<ListOfAccountGroup />} />
        <Route path="/master/Packing" element={<ListOfPacking />} />            
        <Route path="/master/Price List/Price Master" element={<ListOfPrice />} />            
        <Route path="/master/Branch/Branch Master" element={<ListOfBranch />} />            
        <Route path="/master/Place Master/City" element={<ListOfCity />} />            
        <Route path="/master/Place Master/Area" element={<ListOfArea />} />            
        <Route path="/master/Place Master/State" element={<ListOfState />} />            
        <Route path="/master/Place Master/Country" element={<ListOfCountry />} />            
        <Route path="/master/Place Master/District" element={<ListOfDistrict />} />            
        <Route path="/master/Truck Details/Truck Master" element={<ListOfTruck />} />            
        <Route path="/master/Truck Details/Truck Driver" element={<ListOfTruckDriver />} />            
        <Route path="/master/Truck Details/Truck Owner" element={<ListOfTruckOwner />} />            
        </Routes>
      
     
    </div>
    </div>
  )
}
        
export default Container