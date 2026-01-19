import Home_ from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Founder from "./components/Founder";
import Offer from "./components/Offer";
import Services from "./components/Services";
import Quiz_App from "./components/Quiz-App";
import MakeWeb from "./components/MakeWeb";

export default function Home() {
  return (
    <>
      <Home_ />
      <About />
      <Skills />
      <Projects limit={3} />
      <Services />
      <MakeWeb />
      <Quiz_App />
      <Founder />
      <Offer />
    </>
  );
}
