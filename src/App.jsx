import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout' 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import IncomeSummary from './pages/dashboard/IncomeSummary';
import ExpenseTracking from './pages/dashboard/ExpenseTracking';
import ManageExpense from './pages/dashboard/ManageExpense';
import CategoryBreakdown from './pages/dashboard/CategoryBreakdown';
import ExpenseCharts from './pages/dashboard/ExpenseCharts';
import TransactionHistory from './pages/dashboard/TransactionHistory';
import Settings from './pages/dashboard/Settings';
import AddCard from './components/AddCard';


const EmptyView = ({ name }) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
    <h2 className="text-xl font-bold text-gray-800">{name} Screen</h2>
    <p className="text-gray-500 mt-1">Screen is still in progress</p>
  </div>
);

const ProtectedRoute = () => {
  const session = sessionStorage.getItem('userSession');
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

const PublicRoute = ({ children }) => {
  const session = sessionStorage.getItem('userSession');
  
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/summary" element={<IncomeSummary />} />
          <Route path="/expenses" element={<ExpenseTracking />} />
          <Route path="/manage-expense" element={<ManageExpense />} />
          <Route path="/categories" element={<CategoryBreakdown />} />
          <Route path="/charts" element={<ExpenseCharts />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-card" element={<AddCard />} />


        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App;