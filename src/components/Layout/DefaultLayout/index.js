import Header from "../components/Header";
import Footer from "../components/Footer/FooterComponent";
import SideBar from "../components/Sidebar";
import GoTop from "../components/BackToTop/BackToTop";

function DefaultLayout({ children }) {
  return (
    <div className="container-fluid px-0">
      <Header />
      <div className="container-fluid ps-4 pe-0">
        <div className="container-fluid">
          <SideBar />
        </div>
        <div className="content ps-5 pe-0">{children}</div>
      </div>
      <div className="wrap-footer">
        <Footer />
      </div>
      <GoTop scrollStepInPx="50" delayInMs="5000"></GoTop>
    </div>
  );
}

export default DefaultLayout;
