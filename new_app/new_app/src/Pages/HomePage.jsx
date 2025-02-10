import React, { useState } from 'react';

// مكون تسجيل الدخول
const SignUpForm = () => {
    // إدارة حالة المدخلات باستخدام useState
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // دالة معالجة إرسال النموذج
    const handleSubmit = async (event) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // فحص ما إذا كانت كلمات المرور متطابقة
        if (password !== confirmPassword) {
            alert('كلمات المرور غير متطابقة');
            return; // إنهاء الدالة
        }

        const userData = { username, email, password }; // تجميع بيانات المستخدم

        try {
            // إرسال البيانات إلى واجهة برمجة التطبيقات
            const response = await fetch('https://your-api-endpoint.com/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData), // تحويل البيانات إلى سلسلة نصية
            });

            const result = await response.json(); // تحويل الاستجابة إلى كائن JSON
            if (response.ok) {
                alert('تم التسجيل بنجاح!'); // رسالة نجاح
                window.location.href = '/login'; // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
            } else {
                alert('خطأ: ' + result.message); // عرض رسالة خطأ
            }
        } catch (error) {
            console.error(error); // تسجيل الخطأ في وحدة التحكم
            alert('حدث خطأ أثناء التسجيل'); // عرض رسالة خطأ عامة
        }
    };

    // واجهة المستخدم للنموذج
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-4">تسجيل حساب جديد</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">اسم المستخدم</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أدخل اسمك"
                    required
                />
                <label className="block mb-2">البريد الإلكتروني</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                />
                <label className="block mb-2">كلمة المرور</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أدخل كلمة المرور"
                    required
                />
                <label className="block mb-2">تأكيد كلمة المرور</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="أكد كلمة المرور"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                >
                    تسجيل
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;