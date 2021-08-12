import {
  Button,
  createTheme,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@material-ui/core";
import { useState } from "react";
import Fetch from "./FetchApi";
export default function Quiz({ modes }) {
  const [state, setState] = useState(0);
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState(null);
  const darkTheme = createTheme({
    palette: {
      type: !modes ? "dark" : "light",
    },
  });
  const [Data, loading] = Fetch(
    `https://opentdb.com/api.php?amount=25&category=9&difficulty=easy&type=boolean`
  );
  function handleNext() {
    let count = score;
    let ans = Data[state].correct_answer;
    if (check === ans) {
      count++;
    } else {
      count--;
    }

    setScore(count);
    console.log(Data[state].correct_answer, check, count);
    setState(state + 1);
  }
  console.log(check);
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ height: "100vh" }}>
        <div className="Content">
          {loading ? (
            state < 25 ? (
              <div className="Container">
                <h1>{Data[0].category}</h1>
                <p>{`Question ${state + 1}: ${Data[state].question}`}</p>
                <div className="ans">
                  <RadioGroup className="radio">
                    <FormControlLabel
                      control={
                        <Radio
                          color="primary"
                          value="True"
                          onChange={(e) => setCheck(e.target.value)}
                        />
                      }
                      label="True"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          color="primary"
                          value="False"
                          onChange={(e) => setCheck(e.target.value)}
                        />
                      }
                      label="False"
                    />
                  </RadioGroup>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Check
                </Button>
              </div>
            ) : (
              <div>
                <h5>
                  {score > 10
                    ? `Youre Score is ${score} 🦾🥳😇🥳`
                    : `Sorry: ${score} 😥😪😮😓😢`}
                </h5>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setState(0)}
                >
                  Try Again
                </Button>
              </div>
            )
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </Paper>
    </ThemeProvider>
  );
}
