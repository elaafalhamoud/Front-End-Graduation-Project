import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home'; // تأكد من أن الملف موجود
import Posts from './PostsPage'; // استخدم PostsPage بدلاً من Posts
import Register from './regist'; // تأكد من أن هذا الملف موجود

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذج

        // بيانات تسجيل دخول محلية
        const mockUser = {
            email: 'test@example.com',
            password: 'password123', // كلمة المرور التجريبية
        };

        // التحقق من بيانات الاعتماد
        if (email === mockUser.email && password === mockUser.password) {
            localStorage.setItem('authToken', 'mockToken'); // حفظ رمز مميز تجريبي
            toast.success('تم تسجيل الدخول بنجاح!'); // رسالة نجاح
            setTimeout(() => {
                window.location.href = '/my-issues'; // إعادة توجيه إلى صفحة المشاكل
            }, 1000); // الانتظار لمدة ثانية قبل التوجيه
        } else {
            toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة'); // رسالة خطأ
            console.error('خطأ في تسجيل الدخول');
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                        تسجيل الدخول
                    </button>
                </form>
                <p className="text-center mt-4">
                    لا تملك حسابًا؟ <a href="/register" className="text-blue-600 hover:underline">سجل هنا</a>
                </p>
            </div>
        </div>
    );
};

export default Login;