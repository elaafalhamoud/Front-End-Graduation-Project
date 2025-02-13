import React, { useState } from 'react';

// مكون الصفحة الرئيسية
const Home = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">مرحبًا بكم في موقعنا!</h1>
            <p className="mt-4">قم بالتسجيل للحصول على حساب جديد.</p>
        </div>
    );
};

// مكون تسجيل الدخول
const SignUpForm = () => {
    // إدارة حالة المدخلات باستخدام useState
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // دالة معالجة إرسال النموذج
    const handleSubmit = (event) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // فحص ما إذا كانت كلمات المرور متطابقة
        if (password !== confirmPassword) {
            alert('كلمات المرور غير متطابقة');
            return; // إنهاء الدالة
        }

        const userData = { username, email, password }; // تجميع بيانات المستخدم
        console.log('تم تسجيل المستخدم:', userData); // تسجيل البيانات في وحدة التحكم

        // عرض رسالة تأكيد
        alert('تم تسجيل حسابك بنجاح!');
        
        // إعادة تعيين الحقول
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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

// المكون الرئيسي
const App = () => {
    return (
        <div>
            <Home />
            <SignUpForm />
        </div>
    );
};

export default App;