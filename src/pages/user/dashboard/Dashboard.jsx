import { useEffect, useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import PageTransition from "../../../components/pageTransition/PageTransition";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import QuickActions from "../../../components/quickActions/QuickActions";
import SectionHeader from "../../../components/sectionHeader/SectionHeader";
import { CaretRight, Megaphone, SquaresFour } from "phosphor-react";
import CardSection from "../../../components/cardSection/CardSection";
import CardLayout from "../../../components/cardLayout/CardLayout";
import { Link } from "react-router";
import { getProjects } from "../../../api/project.api";
import ProjectCard from "../../../components/projectCard.jsx/ProjectCard";

function Dashboard() {
  const { user } = useAuth();
  const { darkMode, toggleMode } = useTheme();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showExitTransition, setShowExitTransition] = useState(true);
  const [projects, setProjects] = useState([]);

  // Page Transition Animation + Message
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExitTransition(false);
    }, 800); // Shorter duration to hide the circle

    setMessage({ text: `Welcome back ${user.name}`, type: "success" });

    return () => clearTimeout(timer);
  }, []);

  const fetchProjects = async () => {
    setMessage({ text: "Loading Projects", type: "loading" });
    const res = await getProjects();
    setProjects(res.data);
    setMessage({ text: "Projects loaded", type: "success" });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <PageTransition isVisible={showExitTransition} mode="exit" />
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <QuickActions />
          </div>
        </div>
      </section>

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={SquaresFour} title="LATEST PROJECTS" />
              <CardLayout style="cardLayout1">
                {projects
                  .slice() // create a shallow copy so we don't mutate the original
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
                  .slice(0, 2)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} dashboard />
                  ))}
                <Link
                  to="/user/workspace/projects"
                  className="button buttonType2"
                >
                  View All
                  <CaretRight weight="bold" />
                </Link>
              </CardLayout>
            </CardSection>
          </div>
        </div>
      </section>
      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <SectionHeader icon={Megaphone} title="LATEST ANNOUNCEMENTS" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
