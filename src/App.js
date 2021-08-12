import { Fab } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { useState } from "react";
import Quiz from "./Components/FetchQuiz";
function App() {
  const [mode, setMode] = useState(false);
  return (
    <>
      <Quiz modes={mode} />
      <Fab className="modes" color="primary" onClick={() => setMode(!mode)}>
        {mode ? <Brightness4 /> : <Brightness7 />}
      </Fab>
    </>
  );
}

export default App;
