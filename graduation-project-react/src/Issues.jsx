import './App.css';
import React, { useEffect, useState } from 'react';

// تعريف مكون Issues
const Issues = () => {
    // تعريف الحالة لتخزين المشاكل والأخطاء
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);

    // استخدام useEffect لجلب البيانات عند تحميل المكون
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                // الحصول على رمز المصادقة من التخزين المحلي
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('لا يوجد رمز مصادقة');
                }

                // إرسال طلب GET لجلب المشاكل
                const response = await fetch('https://your-api-endpoint.com/api/issues', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                // التحقق من استجابة الشبكة
                if (!response.ok) {
                    throw new Error('استجابة الشبكة لم تكن صحيحة');
                }

                // تحويل البيانات المستلمة إلى JSON
                const data = await response.json();
                // تحديث حالة المشاكل
                setIssues(data);
            } catch (error) {
                // ضبط الحالة للأخطاء في حال حدوث مشكلة
                setError(error.message);
            }
        };

        // استدعاء الدالة لجلب المشاكل
        fetchIssues();
    }, [
    

    ]);

    // عرض المكون
    return (
        <div>
            <h1>المشاكل</h1>
            {error && <p>خطأ: {error}</p>}
            <ul>
                {issues.map(issue => (
                    <li key={issue.id}>{issue.title}</li>
                ))}
            </ul>
        </div>
    );
};

// تصدير المكون
export default Issues;