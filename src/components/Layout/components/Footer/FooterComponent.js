import "./Footer.scss";
function Footer() {
  return (
    <div className="footer-20192 container-fluid ps-5 pb-5">
      <div className="site-section container-fluid ps-5">
        <div className="container">
          <div className="cta d-block d-md-flex align-items-center px-5">
            <div>
              <h2 className="mb-0 pb-0">
                Bạn đã sẵn sàng trở thành đối tác của Scats?
              </h2>
              <h4>Hãy liên hệ ngay với chúng tôi!</h4>
            </div>
            <div className="ms-auto">
              <a href="#" className="btn btn-dark shadow-none py-3 px-5">
                <h5>Liên hệ ngay</h5>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <a href="#" className="footer-logo logo">
                Scats
              </a>
              <p className="copyright">
                <small>&copy; 2022</small>
              </p>
            </div>
            <div className="col-sm">
              <h3>Khách hàng</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Iqiyi</a>
                </li>
                <li>
                  <a href="#">Netflix</a>
                </li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Doanh nghiệp</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  <a href="#">Chăm sóc khách hàng</a>
                </li>
                <li>
                  <a href="#">Liên hệ với chúng tôi</a>
                </li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Thông tin thêm</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Điều khoản &amp; điều kiện</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Theo dõi chúng tôi tại</h3>
              <ul className="list-unstyled social">
                <li>
                  <a href="#">
                    <span className="icon-facebook"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-linkedin"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-medium"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-paper-plane"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
