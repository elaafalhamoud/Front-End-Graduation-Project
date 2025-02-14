import React, { useEffect, useState } from 'react';

const EditIssue = () => {
    const [issue, setIssue] = useState({ title: '', description: '', status: 'open', user: '' });
    const urlParams = new URLSearchParams(window.location.search);
    const issueId = urlParams.get('id');

    // بيانات محلية للاختبار
    const mockIssues = [
        { id: '1', title: 'المشكلة الأولى', description: 'وصف المشكلة الأولى.', status: 'open', user: 'مستخدم 1' },
        { id: '2', title: 'المشكلة الثانية', description: 'وصف المشكلة الثانية.', status: 'in_progress', user: 'مستخدم 2' },
        { id: '3', title: 'المشكلة الثالثة', description: 'وصف المشكلة الثالثة.', status: 'closed', user: 'مستخدم 3' },
    ];

    useEffect(() => {
        if (issueId) {
            fetchIssue(issueId); // جلب تفاصيل المشكلة للتعديل
        }
    }, [issueId]);

    const fetchIssue = (issueId) => {
        const foundIssue = mockIssues.find(issue => issue.id === issueId);
        if (foundIssue) {
            setIssue(foundIssue); // ملء الحقول ببيانات المشكلة
        } else {
            alert('لم يتم العثور على المشكلة');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIssue(prev => ({ ...prev, [name]: value })); // تحديث حالة المشكلة
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        issueId ? updateIssue(issueId, issue) : addIssue(issue); // تحديث أو إضافة المشكلة
    };

    const updateIssue = (issueId, issueData) => {
        // منطق تحديث المشكلة محليًا
        alert('تم تحديث المشكلة بنجاح');
        window.location.href = '/my-issues'; // إعادة توجيه إلى قائمة المشاكل
    };

    const addIssue = (issueData) => {
        // منطق إضافة المشكلة محليًا
        alert('تم إضافة المشكلة بنجاح');
        window.location.href = '/my-issues'; // إعادة توجيه إلى قائمة المشاكل
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

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        repeatPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        if (formData.password !== formData.repeatPassword) {
            alert("كلمات المرور غير متطابقة!");
            return;
        }

        // هنا يمكنك إضافة منطق التحقق من المستخدمين الموجودين مسبقًا
        alert('تم التسجيل بنجاح!'); // رسالة تأكيد النجاح
        // يمكنك إعادة توجيه المستخدم إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
    };

    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="register-box">
                    <h1 className="register-title">تسجيل</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                autoComplete="off"
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="اسم المستخدم"
                                required
                            />
                            <label htmlFor="username" className="input-label">
                                اسم المستخدم
                            </label>
                        </div>

                        <div className="input-group">
                            <input
                                autoComplete="off"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="البريد الإلكتروني"
                                required
                            />
                            <label htmlFor="email" className="input-label">
                                البريد الإلكتروني
                            </label>
                        </div>

                        <div className="input-group">
                            <input
                                autoComplete="off"
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="كلمة المرور"
                                required
                            />
                            <label htmlFor="password" className="input-label">
                                كلمة المرور
                            </label>
                        </div>

                        <div className="input-group">
                            <input
                                autoComplete="off"
                                id="repeatPassword"
                                name="repeatPassword"
                                type="password"
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="أعد إدخال كلمة المرور"
                                required
                            />
                            <label htmlFor="repeatPassword" className="input-label">
                                أعد إدخال كلمة المرور
                            </label>
                        </div>

                        <button type="submit" className="submit-btn">
                            إرسال
                        </button>
                    </form>

                    <div className="w-full flex justify-center mt-4">
                        <button className="login-btn">
                            <a href="#">هل لديك حساب بالفعل؟</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <EditIssue />
            <Register />
        </div>
    );
};

export default App;