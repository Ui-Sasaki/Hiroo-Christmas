import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TransactionTable from './components/TransactionTable';
import Buttons from './components/Buttons';
import LoginPage from './pages/LoginPage'; // 👈 Make sure this file exists

const App = () => {
     return (
          <Router>
               <Routes>
                    {/* Login page (no sidebar/header) */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Main layout */}
                    <Route
                         path="/"
                         element={
                              <div className="flex h-screen" style={{ backgroundColor: '#E3EDF9' }}>
                                   <Sidebar />
                                   <div className="flex-1 overflow-y-auto">
                                        {/* Header section */}
                                        <div className="bg-white px-6 py-3 shadow">
                                             <Header />
                                        </div>

                                        {/* Spacer between header and buttons */}
                                        <div style={{ height: '3rem', backgroundColor: '#E3EDF9' }} />

                                        {/* Buttons section */}
                                        <div style={{ backgroundColor: '#E3EDF9' }} className="px-6 py-4">
                                             <Buttons />
                                        </div>

                                        {/* Main content area */}
                                        <div className="p-6">
                                             <div className="bg-white p-4 rounded shadow">
                                                  <TransactionTable />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         }
                    />
               </Routes>
          </Router>
     );
};

export default App;
