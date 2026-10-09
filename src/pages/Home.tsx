import Board from "../components/Board";
import BoardContainer from "../components/BoardContainer";
import Navbar from "../components/Navbar";
import { useTasks } from "../context/TaskContext";

// DOUBLE CHECK CORRECT COMPONENT FUNCTION CONVENTION IS USED

const Home = () => {
  return (
    <>
      <Navbar />
      <BoardContainer />
      {/* <Board title="Boared heheeh" id={0} /> */}
    </>
  );
};

export default Home;
