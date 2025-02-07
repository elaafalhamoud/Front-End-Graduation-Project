import { useEffect, useState } from "react";
import IssueCard from "./IssueCard";
import { getIssues, deleteIssue } from "../Services/authService";

const Home = () => {
  const [issues, setIssues] = useState([]);

  const handleIncrease = (index) => {
    const updatedCards = [...issues];
    updatedCards[index].counter += 1;
    setIssues(updatedCards);
  };

  const handleDecrease = (index) => {
    const updatedCards = [...issues];
    updatedCards[index].counter -= 1;
    setIssues(updatedCards);
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteIssue(id);
      const updatedCards = issues.filter((issue) => issue.documentId !== id);
      setIssues(updatedCards);
      console.log(response);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const fetchDate = async () => {
    try {
      const response = await getIssues();
      console.log(response);
      setIssues(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);
  return (
    <>
      {issues.map((issue, id) => (
        <IssueCard
          key={id}
          id={id}
          title={issue.title}
          description={issue.description}
          counterValue={issue.counter}
          issueStatus={issue.issueStatus}
          documentId={issue.documentId}
          // imageUrl={issue.imageUrl}
          increaseCounter={handleIncrease}
          decreaseCounter={handleDecrease}
          onDlete={handleDelete}
          onEdit={() => null}
          CommentsNumber={8}
          showComments={() => null}
        />
      ))}
    </>
  );
};

export default Home;
