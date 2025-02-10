import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch('https://your-api-endpoint.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', result.token);
                alert('تم تسجيل الدخول بنجاح!');
                window.location.href = '/my-issues'; // إعادة توجيه إلى صفحة المشاكل
            } else {
                alert('خطأ: ' + result.message);
            }
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء تسجيل الدخول');
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
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
            </div>
        </div>
    );
};

export default Login;