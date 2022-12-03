import Header from "../components/Header";
import BackToTop from "../components/BackToTop/BackToTop";
function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">{children}</div>
      </div>
      <BackToTop></BackToTop>
    </div>
  );
}

export default HeaderOnly;
