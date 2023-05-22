import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './Component/Alert';
import Login from './Component/Login';
import Navbar from "./Component/Navbar";
import Signup from './Component/Signup';
import LoadingBar from 'react-top-loading-bar'
import Home from './Component/Home';
import Books from './Component/Books';
import IssuedBooks from './Component/IssuedBooks';
import IssueBook from './Component/admin/IssueBook';
import AvailableBooks from './Component/AvailableBooks';
import AdminLogin from './Component/admin/AdminLogin';
import AdminPanel from './Component/admin/AdminPanel';
import AddBooks from './Component/admin/AddBooks';


function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)
  const [progress, setProgress] = useState(0)

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    }
    else {
      setMode('light');
    }
  }

  const showAlert = (message, bgColor, textColor, msgType) => {
    setAlert({
      msg: message,
      bgColor: bgColor,
      textColor: textColor,
      msgType: msgType

    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }
  return (
    <div>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <LoadingBar height={3} color='#f11946' progress={progress}/>
          <div className={`${mode === 'dark' ? 'bg-[#15202B] border-b border-gray-600' : 'bg-[#F9F9F9]'} min-h-screen pt-12 md:pt-16 pb-6`}>
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home setProgress={setProgress}  showAlert={showAlert} mode={mode}/>} />
              <Route exact path="/login" element={<Login mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/books" element={<Books mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/availablebooks" element={<AvailableBooks mode={mode} setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/issuedbooks" element={<IssuedBooks mode={mode} setProgress={setProgress} showAlert={showAlert} />} />

              {/* admin */}
              <Route exact path="/adminlogin" element={<AdminLogin setProgress={setProgress} mode={mode} showAlert={showAlert} />} />
              <Route exact path="/adminpanel" element={<AdminPanel setProgress={setProgress} mode={mode} showAlert={showAlert} />} /> 
              <Route exact path="/addbooks" element={<AddBooks setProgress={setProgress} mode={mode} showAlert={showAlert} />} /> 
              <Route exact path="/issuebook" element={<IssueBook setProgress={setProgress} mode={mode} showAlert={showAlert} />} /> 

              



              <Route path="*" element={<h1 className="text-center text-4xl font-semibold text-red-500">404 Not Found</h1>} />

              
            </Routes>
          </div>

        </Router>
    </div>
  );
}

export default App;
