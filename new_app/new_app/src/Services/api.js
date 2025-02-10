import axios from "axios";

// إنشاء مثيل من axios مع إعدادات مخصصة
const API = axios.create({
  baseURL: "http://localhost:1337/api", // عنوان الأساس للطلبات
  timeout: 10000, // مهلة الطلبات بالمللي ثانية
  headers: {
    "Content-Type": "application/json", // نوع المحتوى للطلبات
  },
});

// تصدير المثيل للاستخدام في أجزاء أخرى من التطبيق
export default API;
