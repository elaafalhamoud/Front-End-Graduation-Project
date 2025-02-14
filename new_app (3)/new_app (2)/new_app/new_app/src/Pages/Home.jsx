import { useEffect, useState } from "react";
import IssueCard from "./IssueCard";
import { getIssues, deleteIssue } from "../Services/authService";
import Header from "./Header";

const Home = () => {
  const [issues, setIssues] = useState([]);

  // دالة لزيادة العداد
  const handleIncrease = (index) => {
    const updatedCards = [...issues];
    updatedCards[index].counter += 1;
    setIssues(updatedCards);
  };

  // دالة لتقليل العداد
  const handleDecrease = (index) => {
    const updatedCards = [...issues];
    updatedCards[index].counter -= 1;
    setIssues(updatedCards);
  };

  // دالة لحذف المشكلة
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

  // دالة لجلب البيانات
  const fetchDate = async () => {
    try {
      const response = await getIssues();
      console.log(response);
      setIssues(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  // استخدام useEffect لجلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        {issues.map((issue, id) => (
          <IssueCard
            key={id}
            id={id}
            title={issue.title}
            description={issue.description}
            counterValue={issue.counter}
            issueStatus={issue.issueStatus}
            documentId={issue.documentId}
            increaseCounter={handleIncrease}
            decreaseCounter={handleDecrease}
            onDlete={handleDelete}
            onEdit={() => null}
            CommentsNumber={8}
            showComments={() => null}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
