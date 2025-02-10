import React, { useEffect, useState } from "react";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });
  const [editIssue, setEditIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  // جلب المنشورات من API
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("لا يوجد رمز مصادقة");

      const response = await fetch("https://your-api-endpoint.com/api/issues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("فشل في جلب البيانات");

      const data = await response.json();
      setIssues(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // إضافة منشور جديد
  const handleAddIssue = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("لا يوجد رمز مصادقة");

      const response = await fetch("https://your-api-endpoint.com/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newIssue),
      });

      if (!response.ok) throw new Error("فشل في إضافة المنشور");

      const createdIssue = await response.json();
      setIssues([...issues, createdIssue]); // تحديث الحالة محليًا
      setNewIssue({ title: "", description: "" }); // تصفية الحقول بعد الإضافة
    } catch (error) {
      setError(error.message);
    }
  };

  // تعديل منشور معين
  const handleEditIssue = async () => {
    if (!editIssue) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("لا يوجد رمز مصادقة");

      const response = await fetch(`https://your-api-endpoint.com/api/issues/${editIssue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editIssue),
      });

      if (!response.ok) throw new Error("فشل في تعديل المنشور");

      setIssues(issues.map((issue) => (issue.id === editIssue.id ? editIssue : issue)));
      setEditIssue(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // حذف منشور معين
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("لا يوجد رمز مصادقة");

      const response = await fetch(`https://your-api-endpoint.com/api/issues/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("فشل حذف المشكلة");

      setIssues(issues.filter((issue) => issue.id !== id)); // تحديث القائمة محليًا
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>إدارة المنشورات</h1>
      {error && <p style={{ color: "red" }}>خطأ: {error}</p>}

      {/* إضافة منشور جديد */}
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

      {/* تعديل منشور */}
      {editIssue && (
        <div>
          <h2>تعديل المنشور</h2>
          <input
            type="text"
            placeholder="العنوان"
            value={editIssue.title}
            onChange={(e) => setEditIssue({ ...editIssue, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="الوصف"
            value={editIssue.description}
            onChange={(e) => setEditIssue({ ...editIssue, description: e.target.value })}
          />
          <button onClick={handleEditIssue} style={{ backgroundColor: "blue", color: "white" }}>
            حفظ التعديلات
          </button>
        </div>
      )}

      {/* عرض المنشورات */}
      <ul>
        {issues.map((issue) => (
          <li key={issue.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            <button onClick={() => setEditIssue(issue)} style={{ backgroundColor: "yellow" }}>
              تعديل
            </button>
            <button
              onClick={() => handleDelete(issue.id)}
              style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Issues;
