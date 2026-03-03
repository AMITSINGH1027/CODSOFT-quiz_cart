import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import QuizList from "./pages/QuizList";
import TakeQuiz from "./pages/TakeQuiz";
import Result from "./pages/Result";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MyResults from "./pages/MyResults";
import CreateQuiz from "./pages/CreateQuiz";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageQuizzes from "./pages/ManageQuizzes";
import ResultsAnalytics from "./pages/ResultsAnalytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">


      <Navbar />

<Routes>

  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
  <Route path="/verify/:token" element={<VerifyEmail />} />

  <Route
    path="/quizzes"
    element={
      <ProtectedRoute>
        <QuizList />
      </ProtectedRoute>
    }
  />

  <Route
    path="/quiz/:id"
    element={
      <ProtectedRoute>
        <TakeQuiz />
      </ProtectedRoute>
    }
  />

  <Route
    path="/result"
    element={
      <ProtectedRoute>
        <Result />
      </ProtectedRoute>
    }
  />

  <Route
    path="/results"
    element={
      <ProtectedRoute>
        <MyResults />
      </ProtectedRoute>
    }
  />

  <Route
    path="/create"
    element={
      <ProtectedRoute>
        <CreateQuiz />
      </ProtectedRoute>
    }
  />

  {/* Admin Routes */}
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <AdminRoute>
        <ManageUsers />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/quizzes"
    element={
      <AdminRoute>
        <ManageQuizzes />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/results"
    element={
      <AdminRoute>
        <ResultsAnalytics />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/settings"
    element={
      <AdminRoute>
        <Settings />
      </AdminRoute>
    }
  />

</Routes>

      </div>
    </>
  );
}

export default App;