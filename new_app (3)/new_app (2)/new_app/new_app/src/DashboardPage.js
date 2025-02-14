import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="flex h-screen">
            {/* الشريط الجانبي */}
            <aside className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">لوحة التحكم</h2>
                <ul>
                    <li 
                        onClick={() => handleSectionChange('overview')} 
                        className={`p-2 cursor-pointer ${activeSection === 'overview' ? 'bg-gray-600' : ''}`}
                    >
                        نظرة عامة
                    </li>
                    <li 
                        onClick={() => handleSectionChange('reports')} 
                        className={`p-2 cursor-pointer ${activeSection === 'reports' ? 'bg-gray-600' : ''}`}
                    >
                        التقارير
                    </li>
                    <li 
                        onClick={() => handleSectionChange('settings')} 
                        className={`p-2 cursor-pointer ${activeSection === 'settings' ? 'bg-gray-600' : ''}`}
                    >
                        الإعدادات
                    </li>
                    <li className="p-2 cursor-pointer hover:bg-red-600">
                        <Link to="/login">تسجيل الخروج</Link>
                    </li>
                </ul>
            </aside>

            {/* المحتوى الرئيسي للوحة التحكم */}
            <main className="w-3/4 p-6">
                <h1 className="text-2xl font-bold mb-4">مرحبًا بك في لوحة التحكم</h1>
                {activeSection === 'overview' && (
                    <section className="bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold">نظرة عامة</h2>
                        <p>هنا تجد نظرة عامة حول بياناتك.</p>
                    </section>
                )}

                {activeSection === 'reports' && (
                    <section className="bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold">التقارير</h2>
                        <p>يمكنك العثور على التقارير المختلفة هنا.</p>
                    </section>
                )}

                {activeSection === 'settings' && (
                    <section className="bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold">الإعدادات</h2>
                        <p>يمكنك إدارة إعداداتك هنا.</p>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Dashboard;