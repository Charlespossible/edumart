import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Exams from "./pages/Exams";
import Myleaderboard from "./pages/Myleaderboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Myprofile from "./pages/Myprofile";
import Myperfomance from "./pages/Myperfomance";
import MyexamHistory from "./pages/MyexamHistory";
import MyuserLeaderboard from "./pages/MyuserLeaderboard";
import Mysetting from "./pages/Mysetting";
import Admin from "./pages/Admin";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
//import Sidebar from "./components/Sidebar";
import Sidebar from "./pages/admin/Sidebar";
import UsersTable from "./pages/admin/UsersTable";
import UploadQuestions from "./pages/admin/UploadQuestions";
import CreateAdmin from "./pages/admin/CreateAdmin";
import Logout from "./pages/Logout";
import Protected from "./components/Protected";
import Forgotpassword from "./pages/Forgotpassword";
import QuizPage from "./pages/QuizPage";
import ExamPage from "./pages/ExamPage";



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/leaderboard" element={<Myleaderboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route element={<Protected />}>
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/dashboard/profile" element={<Myprofile />} />
      <Route path="/otp-verification" element={<OTPVerificationPage />} />
      <Route path="/dashboard/performance" element={<Myperfomance />} />
      <Route path="/dashboard/exam-history" element={<MyexamHistory />} />
      <Route path="/user-leaderboard" element={<MyuserLeaderboard />} />
      <Route path="/settings" element={<Mysetting />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/adminlogin" element={<AdminLogin />} />
      <Route path="/admin/sidebar" element={<Sidebar />} />
      <Route path="/admin/users" element={<UsersTable />} />
      <Route path="/admin/upload" element={<UploadQuestions />} />
      <Route path="/admin/createadmin" element={<CreateAdmin />} />
      <Route path="/admin/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
