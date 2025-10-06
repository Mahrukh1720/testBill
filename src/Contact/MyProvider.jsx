import { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContext = createContext(); // by default do not pass any value

const MyProvider = (props) => {
  const [stage, setStage] = useState(1); // default stage
  const [players, setPlayers] = useState([]); // multiple players in a list
  const [result, setResult] = useState(""); // empty string for name

  const addPlayerHandler = (name) => {
    setPlayers((prevState) => [...prevState, name]);
  };

  const removePlayerHandle = (idx) => {
    let newArray = [...players];
    newArray.splice(idx, 1);
    setPlayers(newArray);
  };

  const nextHandler = () => {
    if (players.length < 2) {
      toast.error("You need more than 1 player", {
        position: "top-left",
        autoClose: 5000,
      });
    } else {
      setStage(2);
    }
  };

  const generateLosser = () => {
    let result = players[Math.floor(Math.random() * players.length)];
    setResult(result);
  };

  const resetGameHandler = () => {
    setStage(1);
    setPlayers([]);
    setResult("");
  };

  return (
    <>
      <MyContext.Provider
        value={{
          stage,
          players,
          result,

          addPlayer: addPlayerHandler,
          removePlayer: removePlayerHandle,
          next: nextHandler,
          generateLosser,
          resetGame: resetGameHandler,
        }}
      >
        {props.children}
      </MyContext.Provider>
      <ToastContainer />
    </>
  );
};

export { MyContext, MyProvider };
