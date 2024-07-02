import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CheckInReport from "./Pages/CheckInReport/CheckInReport";
import CustomerReport from "./Pages/CutomerReport/CutomerReport";
import EODReport from "./Pages/EODReport/EODReport";
import ExpenseReport from "./Pages/ExpenseReport/ExpenseReport";
import OrderReport from "./Pages/OrderReport/OrderReport";
import PaymentReport from "./Pages/PaymentReport/PaymentReport";
import ProcessedInventory from "./Pages/ProcessedInventory/ProcessedInventory";
import SalesReport from "./Pages/SalesReport/SalesReport";
import Transaction from "./Pages/Transaction/Transaction";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaymentReport />} />
          <Route path='/expenseReport' element={<ExpenseReport />} />
          <Route path='/eodReport' element={<EODReport />} />
          <Route path='/processedInventory' element={<ProcessedInventory />} />
          <Route path='/customerReport' element={<CustomerReport />} />
          <Route path='/checkInReport' element={<CheckInReport />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/salesReport' element={<SalesReport />} />
          <Route path='/orderReport' element={<OrderReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
