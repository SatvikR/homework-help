import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ViewLoggedIn } from "../../components/view/ViewLoggedIn";
import { ViewLoggedOut } from "../../components/view/ViewLoggedOut";
import { getLoggedIn } from "../../util/getLoggedIn";

const ViewQuestion: React.FC = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(typeof getLoggedIn() === "string");
  }, []);

  return (
    <div className="container">
      {loggedIn === null && <h1>Loading...</h1>}
      {loggedIn && <ViewLoggedIn id={router.query.id as string} />}
      {!loggedIn && loggedIn !== null && (
        <ViewLoggedOut id={router.query.id as string} />
      )}
    </div>
  );
};

export default ViewQuestion;
