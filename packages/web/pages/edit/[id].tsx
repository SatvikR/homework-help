import { useRouter } from "next/router";
import React from "react";
import { EditQuestion } from "../../components/question/EditQuestion";

const Edit: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div className="container">
      <EditQuestion id={id as string} />
    </div>
  );
};

export default Edit;
