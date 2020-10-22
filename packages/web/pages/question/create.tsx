import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CreateQuestion } from "../../components/question/CreateQuestion";
import { getLoggedIn } from "../../util/getLoggedIn";

const Create: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!getLoggedIn()) router.push("/account");
  }, []);

  return (
    <div className="container">
      <CreateQuestion />
    </div>
  );
};

export default Create;
