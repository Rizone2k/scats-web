import BackToTop from "../components/BackToTop/BackToTop";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";

function FooterRemove({ children }) {
  return (
    <div className="container-fluid px-0">
      <Header />
      <div className="container-fluid ps-4 pe-0">
        <div className="container-fluid">
          <SideBar />
        </div>
        <div className="content ps-5 pe-0">{children}</div>
      </div>
      <div className="wrap-footer"></div>
      <BackToTop scrollStepInPx="50" delayInMs="5000"></BackToTop>
    </div>
  );
}

export default FooterRemove;
