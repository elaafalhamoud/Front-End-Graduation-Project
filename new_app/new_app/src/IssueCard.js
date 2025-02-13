import React, { useState } from "react";
// import "./IssueCard.css"; // إذا كان لديك CSS، يمكنك إلغاء تعليق هذا السطر

const IssueCard = ({
  title,
  description,
  increaseCounter,
  counterValue,
  issueStatus,
  decreaseCounter,
  onDelete,
  onEdit,
  showComments,
  CommentsNumber,
}) => {
  const badgeColors = {
    Open: "badge-red",
    Closed: "badge-green",
    "In-progress": "badge-yellow",
  };

  return (
    <div className="issue-card">
      <div className="card-content">
        <div className="header">
          <h2 className="title">{title}</h2>
          <span className={`badge ${badgeColors[issueStatus]}`}>{issueStatus}</span>
        </div>

        <p className="description">{description}</p>

        <div className="controls">
          <div className="buttons-group">
            <button onClick={onDelete} className="icon-btn delete-btn">🗑️</button>
            <button onClick={onEdit} className="icon-btn edit-btn">✏️</button>
            <button onClick={showComments} className="icon-btn comments-btn">
              💬 <span className="comment-count">{CommentsNumber}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Issues = () => {
    const [issues, setIssues] = useState([
        { id: 1, title: "مشكلة في تسجيل الدخول", description: "لا يمكن تسجيل الدخول إلى الحساب." },
        { id: 2, title: "خطأ في تحميل الصفحة", description: "الصفحة لا تتحمل بشكل صحيح." },
        { id: 3, title: "توقف التطبيق", description: "التطبيق يتوقف عند التشغيل." }
    ]);
    const [error, setError] = useState(null);
    const [newIssue, setNewIssue] = useState({ title: "", description: "" });
    const [editIssue, setEditIssue] = useState(null);

    const handleAddIssue = () => {
        if (!newIssue.title || !newIssue.description) {
            setError("يرجى ملء جميع الحقول.");
            return;
        }

        const newId = issues.length ? issues[issues.length - 1].id + 1 : 1; // توليد ID جديد
        setIssues([...issues, { ...newIssue, id: newId }]);
        setNewIssue({ title: "", description: "" });
        setError(null);
    };

    const handleEditIssue = () => {
        if (!editIssue) return;

        setIssues(issues.map((issue) => (issue.id === editIssue.id ? editIssue : issue)));
        setEditIssue(null);
        setError(null);
    };

    const handleDelete = (id) => {
        setIssues(issues.filter((issue) => issue.id !== id));
        setError(null);
    };

    return (
        <div>
            <h1>إدارة المنشورات</h1>
            {error && <p style={{ color: "red" }}>خطأ: {error}</p>}
            <div>
                <h2>إضافة منشور</h2>
                <input
                    type="text"
                    placeholder="العنوان"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="الوصف"
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                />
                <button onClick={handleAddIssue} style={{ backgroundColor: "green", color: "white" }}>
                    إضافة
                </button>
            </div>
            <ul>
                {issues.map((issue) => (
                    <li key={issue.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
                        <IssueCard 
                            title={issue.title} 
                            description={issue.description}
                            onDelete={() => handleDelete(issue.id)}
                            onEdit={() => setEditIssue(issue)} // يمكنك توسيع هذه الوظيفة لاحقًا
                            showComments={() => {}} // يمكنك إضافة الوظيفة الخاصة بالتعليقات لاحقًا
                            CommentsNumber={0} // يمكنك إضافة عدد التعليقات الحقيقي لاحقًا
                            issueStatus="Open" // يمكنك تعديل حالة المشكلة حسب الحاجة
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Issues;