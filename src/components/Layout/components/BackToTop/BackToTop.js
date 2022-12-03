import { useEffect, useState } from "react";
import "./BackToTop.scss";

const BackToTop = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <>
      {showButton && (
        <button
          title="Back to top"
          onClick={scrollToTop}
          className="back-to-top pb-1"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <path d="M16 14L6 24 7.4 25.4 16 16.8 24.6 25.4 26 24zM4 8H28V10H4z"></path>
          </svg>
        </button>
      )}
      {/* &#8679; is used to create the upward arrow */}
    </>
  );
};

export default BackToTop;
