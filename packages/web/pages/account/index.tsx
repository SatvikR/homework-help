import React, { useEffect, useState } from "react";
import { Login } from "../../components/account/Login";
import { Logout } from "../../components/account/Logout";
import { getLoggedIn } from "../../util/getLoggedIn";

const Account: React.FC = () => {
  const [logged_in, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(typeof getLoggedIn() === "string");
  });

  return (
    <div className="container">
      {(() => {
        if (logged_in === null) return null;
        return logged_in ? <Logout /> : <Login />;
      })()}
    </div>
  );
};

export default Account;
