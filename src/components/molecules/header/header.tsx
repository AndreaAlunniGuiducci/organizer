import { useEffect, useState } from "react";
import styles from "./header.module.scss";

const Header = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (window) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        setUser(JSON.parse(localUser));
      } else {
        setUser(null);
      }
    }
  }, [window]);
  return (
    <div className={styles.header}>
      <div className={styles.leftPart}>
        <div className={styles.logo}>
          <img
            className={styles.logo}
            src="/organizer.png"
            alt="Logo"
          />
        </div>
        <div className={styles.title}>Organizer</div>
      </div>
      <div className={styles.rigthPart}>
        {user ? (
          <div className={styles.user}>{user.displayName}</div>
        ) : (
          <div className={styles.login}>Login</div>
        )}
      </div>
    </div>
  );
};

export default Header;
