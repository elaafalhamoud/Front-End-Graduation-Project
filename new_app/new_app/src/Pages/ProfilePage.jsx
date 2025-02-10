import React, { useEffect, useState } from 'react';
import IssueCard from '../components/IssueCard';

const Home = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const response = await fetch('https://your-api-endpoint.com/api/issues');
            const data = await response.json();
            if (response.ok) {
                setIssues(data);
            } else {
                alert('Error fetching issues');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://your-api-endpoint.com/api/issues/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setIssues(issues.filter(issue => issue.id !== id));
            } else {
                alert('Error deleting issue');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    const handleIncreaseCounter = (id) => {
        // دالة لزيادة العداد
        setIssues(issues.map(issue => 
            issue.id === id ? { ...issue, count: issue.count + 1 } : issue
        ));
    };

    const handleDecreaseCounter = (id) => {
        // دالة لتقليل العداد
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
                    issue={issue}
                    onDelete={handleDelete}
                    onEdit={() => null} // استبدل بـ دالة تحرير إذا لزم الأمر
                    increaseCounter={() => handleIncreaseCounter(issue.id)}
                    decreaseCounter={() => handleDecreaseCounter(issue.id)}
                    CommentsNumber={issue.comments.length} // عدد التعليقات
                    showComments={() => null} // دالة لإظهار التعليقات
                />
            ))}
        </div>
    );
};

export default Home;