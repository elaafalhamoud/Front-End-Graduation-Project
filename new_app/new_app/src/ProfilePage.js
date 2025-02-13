import React, { useState } from 'react';

const IssueCard = ({ title, description, counterValue, issueStatus, onDelete, increaseCounter, decreaseCounter, CommentsNumber }) => {
    return (
        <div className="issue-card bg-white p-4 border rounded shadow mb-4">
            <div className="header flex justify-between items-center">
                <h2 className="text-xl font-semibold">{title}</h2>
                <span className={`badge ${issueStatus === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {issueStatus}
                </span>
            </div>
            <p>{description}</p>
            <div className="controls mt-2">
                <div className="counter-group">
                    <button onClick={increaseCounter} className="counter-btn">+</button>
                    <span>{counterValue}</span>
                    <button onClick={decreaseCounter} className="counter-btn">-</button>
                </div>
                <button onClick={onDelete} className="delete-btn">حذف</button>
                <span>{CommentsNumber} تعليقات</span>
            </div>
        </div>
    );
};

const Home = () => {
    const [issues, setIssues] = useState([
        { id: 1, title: "المشكلة الأولى", description: "وصف المشكلة الأولى.", count: 0, comments: [] },
        { id: 2, title: "المشكلة الثانية", description: "وصف المشكلة الثانية.", count: 0, comments: [] },
        { id: 3, title: "المشكلة الثالثة", description: "وصف المشكلة الثالثة.", count: 0, comments: [] },
    ]);

    const handleDelete = (id) => {
        setIssues(issues.filter(issue => issue.id !== id)); // تحديث الحالة بعد الحذف
    };

    const handleIncreaseCounter = (id) => {
        setIssues(issues.map(issue => 
            issue.id === id ? { ...issue, count: issue.count + 1 } : issue
        ));
    };

    const handleDecreaseCounter = (id) => {
        setIssues(issues.map(issue => 
            issue.id === id ? { ...issue, count: issue.count > 0 ? issue.count - 1 : 0 } : issue
        ));
    };

    return (
        <div>
            <h2>Home</h2>
            {issues.map(issue => (
                <IssueCard
                    key={issue.id}
                    title={issue.title}
                    description={issue.description}
                    counterValue={issue.count}
                    issueStatus="Open" // حالة افتراضية للمشكلة
                    onDelete={() => handleDelete(issue.id)}
                    increaseCounter={() => handleIncreaseCounter(issue.id)}
                    decreaseCounter={() => handleDecreaseCounter(issue.id)}
                    CommentsNumber={issue.comments.length} // عدد التعليقات
                />
            ))}
        </div>
    );
};

export default Home;