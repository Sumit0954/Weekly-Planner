import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayAllTask from "./DisplayAllTask";
import AddPlan from "./AddPlan";


const App = ()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DisplayAllTask />}></Route>
      <Route path="/addPlan" element={<AddPlan />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;