import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import CreateItemPage from "./Pages/Items/CreateItemPage";
import EditItemPage from "./Pages/Items/EditItemPage";
import Items from "./Pages/Items";
import ItemRoute from "./Pages/Items/ItemRoute";


function App() {
  return (
      <Router className="App">
          <Routes>
              <Route path="/item" element={<ItemRoute/>}>
                  <Route index element={<Items/>}/>
                  <Route path="create" element={<CreateItemPage/>}/>
                  <Route path=":id" element={<EditItemPage/>}/>
              </Route>

          </Routes>
      </Router>
  );
}

export default App;
