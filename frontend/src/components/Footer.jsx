import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="f-info">
                <div className="f-info-icons">
                    <a href="https://github.com/Mananchovatiya" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github"></i>
                    </a>

                    <a href="https://www.linkedin.com/in/mananchovatiya/" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
                <div className="f-info-brand">
                    &copy; StayEase Private Limited
                </div>
                <div className="f-info-links">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
