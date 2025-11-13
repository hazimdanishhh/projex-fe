import { useState } from "react";
import { Lifebuoy, EnvelopeSimple, ChatCircleText } from "phosphor-react";

import { useTheme } from "../../../context/ThemeContext";
import MessageUI from "../../../components/messageUI/MessageUI";
import CardLayout from "../../../components/cardLayout/CardLayout";
import CardSection from "../../../components/cardSection/CardSection";
import SectionHeader from "../../../components/sectionHeader/SectionHeader";

export default function Help() {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState({
    text: "Welcome to Help & Support",
    type: "info",
  });

  const supportItems = [
    {
      icon: EnvelopeSimple,
      title: "Contact Us",
      desc: "Reach out to our support team via email if you need direct assistance:",
    },
  ];

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={Lifebuoy} title="HELP & SUPPORT" />

              <CardLayout style="cardLayout1">
                {supportItems.map((item, index) => (
                  <div key={index} className="helpItem">
                    <item.icon size={28} />
                    <h3 className="textBold textXS">{item.title}</h3>
                    <p className="textXXS">
                      {item.desc}{" "}
                      <a href="mailto:contact@projex.com">contact@projex.com</a>
                    </p>
                  </div>
                ))}
              </CardLayout>
            </CardSection>
          </div>
        </div>
      </section>
    </>
  );
}
