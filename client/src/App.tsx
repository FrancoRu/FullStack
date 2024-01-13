import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/acess/RegisterPage";
import LoginPage from "./pages/acess/LoginPage";
import { AuthProvider } from "./context/auth/auth.context";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomePage from "./pages/acess/HomePage";
import Navbar from "./pages/nabvar/NavbarPage";
import CreateProject from "./pages/project/CreateProject";
import { ProjectProvider } from "./context/project/project.context";
import ReadProjects from "./pages/project/ReadProjects";
import ModifiedProject from "./pages/project/ModifiedProject";
import CreateTask from "./pages/task/CreateTask";
import { TaskProvider } from "./context/task/task.context";
import ModifiedTask from "./pages/task/ModifiedTask";
import { ErrorProvider } from "./context/error/error.context";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./pages/footer/Footer";
function App() {
  return (
    <>
      <ErrorProvider>
        <AuthProvider>
          <ProjectProvider>
            <TaskProvider>
              <BrowserRouter>
                <Navbar />
                <div className="container">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/project" element={<ReadProjects />} />
                      <Route path="/project/add" element={<CreateProject />} />
                      <Route
                        path="/project/modified"
                        element={<ModifiedProject />}
                      />
                      <Route path="/project/addtask" element={<CreateTask />} />
                      <Route
                        path="/project/modifiedTask"
                        element={<ModifiedTask />}
                      />
                    </Route>
                  </Routes>
                </div>
              </BrowserRouter>
            </TaskProvider>
          </ProjectProvider>
        </AuthProvider>
      </ErrorProvider>
      <Footer />
    </>
  );
}

export default App;
