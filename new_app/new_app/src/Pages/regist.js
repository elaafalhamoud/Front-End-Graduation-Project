import React, { useEffect, useState } from 'react';

const EditIssue = () => {
    const [issue, setIssue] = useState({ title: '', description: '', status: 'open', user: '' });
    const urlParams = new URLSearchParams(window.location.search);
    const issueId = urlParams.get('id');

    useEffect(() => {
        if (issueId) {
            fetchIssue(issueId); // جلب تفاصيل المشكلة للتعديل
        }
    }, [issueId]);

    const fetchIssue = async (issueId) => {
        try {
            const response = await fetch(`https://your-api-endpoint.com/api/issues/${issueId}`);
            const data = await response.json();

            if (response.ok) {
                setIssue(data); // ملء الحقول ببيانات المشكلة
            } else {
                alert('خطأ في جلب المشكلة');
            }
        } catch (error) {
            console.error(error);
            alert('حدث خطأ');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIssue(prev => ({ ...prev, [name]: value })); // تحديث حالة المشكلة
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        issueId ? updateIssue(issueId, issue) : addIssue(issue); // تحديث أو إضافة المشكلة
    };

    const updateIssue = async (issueId, issueData) => {
        try {
            const response = await fetch(`https://your-api-endpoint.com/api/issues/${issueId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(issueData),
            });

            if (response.ok) {
                alert('تم تحديث المشكلة بنجاح');
                window.location.href = '/my-issues'; // إعادة توجيه إلى قائمة المشاكل
            } else {
                alert('خطأ في تحديث المشكلة');
            }
        } catch (error) {
            console.error(error);
            alert('حدث خطأ');
        }
    };

    const addIssue = async (issueData) => {
        try {
            const response = await fetch('https://your-api-endpoint.com/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(issueData),
            });

            if (response.ok) {
                alert('تم إضافة المشكلة بنجاح');
                window.location.href = '/my-issues'; // إعادة توجيه إلى قائمة المشاكل
            } else {
                alert('خطأ في إضافة المشكلة');
            }
        } catch (error) {
            console.error(error);
            alert('حدث خطأ');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-4">{issueId ? 'تحرير المشكلة' : 'إضافة مشكلة'}</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">العنوان</label>
                <input
                    type="text"
                    name="title"
                    value={issue.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أدخل عنوان المشكلة"
                    required
                />
                <label className="block mb-2">الوصف</label>
                <textarea
                    name="description"
                    value={issue.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أدخل وصف المشكلة"
                    required
                />
                <label className="block mb-2">الحالة</label>
                <select
                    name="status"
                    value={issue.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    required
                >
                    <option value="open">مفتوحة</option>
                    <option value="in_progress">قيد التقدم</option>
                    <option value="closed">مغلقة</option>
                </select>
                <label className="block mb-2">المستخدم</label>
                <input
                    type="text"
                    name="user"
                    value={issue.user}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أدخل اسم المستخدم"
                    required
                />
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                    حفظ المشكلة
                </button>
            </form>
        </div>
    );
};

export default EditIssue;