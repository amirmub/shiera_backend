import project_report from "../data/Project_Reports.pdf";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-left">
        <p>Developed by <strong>Amir</strong></p>
        <a
          className="footer-link"
          href={project_report}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Project Report PDF"
        >
          Project Report
        </a>
      </div>
      <div className="footer-right">
        <p>
          &copy; 2025 <span className="brand-name">Shiera_Developers</span> | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
