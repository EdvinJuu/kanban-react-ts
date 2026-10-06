import Board from "../components/Board";
import Navbar from "../components/Navbar";
import { useTasks } from "../context/TaskContext";

// DOUBLE CHECK CORRECT COMPONENT FUNCTION CONVENTION IS USED

const Home = () => {
  const { tasks } = useTasks();
  return (
    <>
      <Navbar />
      <Board title="Boared heheeh" id={0} tasks={tasks} />
    </>
  );
};

export default Home;
