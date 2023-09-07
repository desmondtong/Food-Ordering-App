import { Route, Routes } from "react-router-dom";


function App() {
  return <div>
    <Routes>
      <Route path='/' element =></Route>
      <Route path="/settings" element={<Settings />}></Route>
    </Routes>
  </div>;
}

export default App;
