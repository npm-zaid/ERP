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


// sea components 
import ProofOfDelivery from '../Sea-Components/ProofOfDelivery'
import GoodsReceived from '../Sea-Components/GoodsReceived'
import ContainerInterchange from '../Sea-Components/ContainerInterchange'


//reports
import StockReport from '../Sea-Components/StockReport'
import ClearanceReport from '../Sea-Components/ClearanceReport'
import WarehouseProcessingReport from '../Sea-Components/WarehouseProcessingReport'
import WarehouseStockReport from '../Sea-Components/WarehouseStockReport'
import TrucksReport from '../Sea-Components/TrucksReport'
import CommoditiesPlanReport from '../Sea-Components/CommoditiesPlanReport'
import DeliveryPlanReport from '../Sea-Components/DeliveryPlanReport'
import ContainerReturnReport from '../Sea-Components/ContainerReturnReport'
import EntryPlanReport from '../Sea-Components/EntryPlanReport'

//profile
import ProfileCard from './Navbar/ProfileCard'


//transactions
import ListOfCrossingLr from './Navbar/ListOfCrossingLr'
import ListOfMemoTransfer from './Navbar/ListOfMemoTransfer'
import ListOfLoadingSheet from './Navbar/ListOfLoadingSheet'
import ListOfDeliveryMemo from './Navbar/ListOfDeliveryMemo'
import ListOfTrip from './Navbar/ListOfTrip'
import ListOfTruckExpense from './Navbar/ListOfTruckExpense'
import ListOfBankReceipt from './Navbar/ListOfBankReceipt'
import ListOfFundReceive from './Navbar/ListOfFundReceive'
import ListOfFundTransfer from './Navbar/ListOfFundTransfer'
import ListOfContra from './Navbar/ListOfContra'
import ListOfJournal from './Navbar/ListOfJournal'
import ListOfCreditNote from './Navbar/ListOfCreditNote'
import ListOfDebitNote from './Navbar/ListOfDebitNote'
import ListOfExpense from './Navbar/ListOfExpense'
import ListOfQuotation from './Navbar/ListOfQuotation'
import ListOfPurchaseOrder from './Navbar/ListOfPurchaseOrder'
import GSTJournal from './Navbar/GSTJournal'
import GSTUtilization from './Navbar/GSTUtilization'
import GSTPayment from './Navbar/GSTPayment'
import GSTIncomeEntry from './Navbar/GSTIncomeEntry'
import GSTExpenseEntry from './Navbar/GSTExpenseEntry'
import GSTRcmEntry from './Navbar/GSTRcmEntry'
import CreditNoteWithoutStock from './Navbar/CreditNoteWithoutStock'
import CreditNoteWithStock from './Navbar/CreditNoteWithStock'
import DebitNoteWithoutStock from './Navbar/DebitNoteWithoutStock'
import DebitNoteWithStock from './Navbar/DebitNoteWithStock'

import ListOfEstSalesInvoice from './Navbar/ListOfEstSalesInvoice'
import ListOfSupplementaryInvoice from './Navbar/ListOfSupplementaryInvoice'
import ListOfEstTransportBill from './Navbar/ListOfEstTransportBill'
import ListOfFreightBill from './Navbar/ListOfFreightBill'
import StockInward from './Navbar/StockInward'
import StockOutward from './Navbar/StockOutward'
import StockInwardFromTruck from './Navbar/StockInwardFromTruck'
import StockRemovalEntry from './Navbar/StockRemovalEntry'




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

          {/* sea components */}
          <Route path="/proof-of-delivery" element={<ProofOfDelivery />} />  
        <Route path="/goods-received" element={<GoodsReceived />} />  
        <Route path="/container-interchange" element={<ContainerInterchange />} />  
        

        {/* navbar links */}

        {/* master */}
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

        {/* reports */}
        <Route path="/reports/Stock" element={<StockReport />} />  
        <Route path="/reports/Clearance" element={<ClearanceReport />} /> 
        <Route path="/reports/WH. Processing" element={<WarehouseProcessingReport />} />  
        <Route path="/reports/Warehouse Stock" element={<WarehouseStockReport />} />  
        <Route path="/reports/Trucks" element={<TrucksReport />} />  
        <Route path="/reports/Delivery Plan" element={<DeliveryPlanReport />} />  
        <Route path="/reports/Commodities" element={<CommoditiesPlanReport />} />  
        <Route path="/reports/Container Return" element={<ContainerReturnReport />} />  
        <Route path="/reports/Entry Plan" element={<EntryPlanReport />} />  
        
        {/* transactions */}
        <Route path="/transactions/Outward/LR. Entry" element={<ListOfLR/>} />  
        <Route path="/transactions/Outward/Memo Entry" element={<ListOfMemo/>} />  
        <Route path="/transactions/Outward/Crossing Lr" element={<ListOfCrossingLr/>} />  
        <Route path="/transactions/Outward/Memo Transfer" element={<ListOfMemoTransfer/>} />  
        <Route path="/transactions/Outward/Loading Sheet" element={<ListOfLoadingSheet/>} />  
        <Route path="/transactions/Inward/Memo Receive" element={<ListOfMemoReceived/>} />  
        <Route path="/transactions/Inward/Delivery Of Memo" element={<ListOfDeliveryMemo/>} />  
        <Route path="/transactions/Inward/Delivery Of LR" element={<ListOfDelivery/>} />  
        <Route path='/transactions/Trip Entry' element={<ListOfTrip/>} />  
        <Route path='/transactions/Full Load' element={<ListOfFullLoad/>} />  
        <Route path='/transactions/Truck Expense' element={<ListOfTruckExpense/>} /> 

        <Route path='/transactions/bank/cash/Bank Receipt' element={<ListOfBankReceipt/>} />  
        <Route path='/transactions/bank/cash/Bank Payment' element={<ListOfBankPayment/>} />  
        <Route path='/transactions/bank/cash/Cash Receipt' element={<ListOfCashReceipt/>} />  
        <Route path='/transactions/bank/cash/Cash Payment' element={<ListOfCashPayment/>} />  
        <Route path='/transactions/bank/cash/Contra' element={<ListOfContra/>} />  
        <Route path='/transactions/bank/cash/Fund Receive' element={<ListOfFundReceive/>} />  
        <Route path='/transactions/bank/cash/Fund Transfer' element={<ListOfFundTransfer/>} />  

      
        <Route path='/transactions/Journal voucher/Journal voucher' element={<ListOfJournal/>} />  
        <Route path='/transactions/Journal voucher/Credit Note' element={<ListOfCreditNote/>} />  
        <Route path='/transactions/Journal voucher/Debit Note' element={<ListOfDebitNote/>} />  
        <Route path='/transactions/Journal voucher/Expense Entry' element={<ListOfExpense/>} />  
        <Route path='/transactions/Quotation' element={<ListOfQuotation/>} />  
        {/* <Route path='/transactions/Purchase Order' element={<ListOfPurchaseOrder/>} />   */}

        <Route path='/transactions/gst/GST Journal' element={<GSTJournal/>} />  
        <Route path='/transactions/gst/GST Utilization' element={<GSTUtilization/>} />  
        <Route path='/transactions/gst/GST Payment' element={<GSTPayment/>} />  
        <Route path='/transactions/gst/GST Income Entry' element={<GSTIncomeEntry/>} />  
        <Route path='/transactions/gst/GST Expense Entry' element={<GSTExpenseEntry/>} />  
        <Route path='/transactions/gst/GST RCM Entry' element={<GSTRcmEntry/>} />  
        <Route path='/transactions/gst/CN Entry w/o Stock' element={<CreditNoteWithoutStock/>} />  
        <Route path='/transactions/gst/CN Entry With Stock' element={<CreditNoteWithStock/>} />  
        <Route path='/transactions/gst/DN Entry w/o Stock' element={<DebitNoteWithoutStock/>} />  
        <Route path='/transactions/gst/DN Entry With Stock' element={<DebitNoteWithStock/>} />  

        {/* <Route path='/transactions/sales/Sales Bill' element={<ListOfSalesInvoice/>} />  
        <Route path='/transactions/sales/Trans Bill' element={<ListOfTranspoterBill/>} />
        <Route path='/transactions/sales/Estimate Bill' element={<ListOfEstSalesInvoice/>} />  
        <Route path='/transactions/sales/Supplementary Bill' element={<ListOfSupplementaryInvoice/>} />  
        <Route path='/transactions/sales/Est Transport Bill' element={<ListOfEstTransportBill/>} /> 
        <Route path='/transactions/sales/Freight Bill' element={<ListOfFreightBill/>} /> 

        <Route path='/transactions/inventory/Stock Inward' element={<StockInward/>} /> 
        <Route path='/transactions/inventory/Stock Outward' element={<StockOutward/>} /> 
        <Route path='/transactions/inventory/Stock Inward from Truck' element={<StockInwardFromTruck/>} /> 
        <Route path='/transactions/inventory/Stock Removal Entry' element={<StockRemovalEntry/>} /> 
        
         */}
    
       
       


      
        {/* profile */}
        <Route path="/profile" element={<ProfileCard />} />
        </Routes>
      
     
    </div>
    </div>
  )
}
        
export default Container