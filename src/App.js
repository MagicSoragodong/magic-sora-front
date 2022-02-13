import "./App.css";
import Main from "./routes/Main";
import Search from "./routes/Search";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Hot from "./routes/Hot";
import New from "./routes/New";
import Favtag from "./routes/Favtag";
import Deadline from "./routes/Deadline";
import Mypage from "./routes/Mypage";
import Mypost from "./routes/Mypost";
import Myvote from "./routes/Myvote";
import Writing from "./routes/Writing";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Switch : 한 번에 한 Route만 렌더링하기 위해. */}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/hot">
          <Hot />
        </Route>
        <Route path="/new">
          <New />
        </Route>
        <Route path="/favtag">
          <Favtag />
        </Route>
        <Route path="/deadline">
          <Deadline />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/myvote">
          <Myvote />
        </Route>
        <Route path="/mypost">
          <Mypost />
        </Route>
        <Route path="/writing">
          <Writing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// rfce
