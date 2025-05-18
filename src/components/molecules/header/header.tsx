import { useEffect, useState } from "react";
import { XCircle, Justify, XLg } from "react-bootstrap-icons";
import styles from "./header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../utils/routes";
const Header = () => {
  const location = useLocation();

  const [user, setUser] = useState<any | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const localUser = localStorage.getItem("user");

  useEffect(() => {
    console.log("localUser", localUser);
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      setUser(null);
    }
    setMenuIsOpen(false);
  }, [location]);

  return (
    <div className={styles.header}>
      <div className={styles.leftPart}>
        <div className={styles.logo}>
          <img
            className={styles.logo}
            src="/organizer/organizer.png"
            alt="Logo"
          />
        </div>
        <div className={styles.title}>Organizer</div>
      </div>
      <div className={styles.rigthPart}>
        {user ? (
          <div className={styles.userContainer}>
            <div className={styles.user}>{user.displayName}</div>
            <XCircle
              className={styles.logout}
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            />
            <Justify
              className={styles.hamburger}
              onClick={() => setMenuIsOpen(true)}
            />
            <div
              className={styles.mobileMenu}
              style={{ top: menuIsOpen ? 0 : "-100vh" }}
            >
              <XLg
                className={styles.closeMenu}
                onClick={() => setMenuIsOpen(false)}
              />
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={routes.dashboard}>Dashboard</Link>
                </li>
                <li>
                  <Link to={routes.list}>Lista</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.login}>Login</div>
        )}
      </div>
    </div>
  );
};

export default Header;
