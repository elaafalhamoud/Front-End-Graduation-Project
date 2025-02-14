import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// مكون Modal
const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "5px", width: "300px", textAlign: "center" }}>
        <p>{message}</p>
        <button onClick={onConfirm} style={{ marginRight: "10px", backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px" }}>نعم</button>
        <button onClick={onCancel} style={{ backgroundColor: "#f44336", color: "white", padding: "10px", borderRadius: "5px" }}>لا</button>
      </div>
    </div>
  );
};

// مكون PostsPage
const PostsPage = () => {
  const [posts, setPosts] = useState(() => {
    // جلب البيانات من localStorage عند تحميل المكون
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  const [editPostId, setEditPostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleEdit = (post) => {
    setEditPostId(post.id);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
  };

  const handleUpdate = () => {
    if (!editPostTitle || !editPostContent) {
      toast.error("يرجى ملء جميع الحقول.");
      return;
    }

    const updatedPosts = posts.map(post => 
      post.id === editPostId ? { ...post, title: editPostTitle, content: editPostContent } : post
    );

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // حفظ البيانات في localStorage
    toast.success("تم تحديث البوست بنجاح.");
    setEditPostId(null);
    setEditPostTitle("");
    setEditPostContent("");
  };

  const handleDeleteRequest = (id) => {
    setPostToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedPosts = posts.filter(post => post.id !== postToDelete);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // حفظ البيانات في localStorage
    toast.success("تم حذف البوست بنجاح.");
    setShowModal(false);
    setPostToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  const handleAddComment = (postId) => {
    if (!newComment) {
      toast.error("يرجى كتابة تعليق.");
      return;
    }

    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    );

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // حفظ البيانات في localStorage
    toast.success("تم إضافة التعليق بنجاح.");
    setNewComment(""); // مسح حقل التعليق بعد الإضافة
  };

  const Post = ({ post }) => {
    return (
      <div className="post" style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
        {editPostId === post.id ? (
          <div>
            <input
              type="text"
              value={editPostTitle}
              onChange={(e) => setEditPostTitle(e.target.value)}
              placeholder="عنوان البوست"
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <textarea
              value={editPostContent}
              onChange={(e) => setEditPostContent(e.target.value)}
              placeholder="محتوى البوست"
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <div>
              <button onClick={handleUpdate} style={{ marginRight: "10px", backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px" }}>تحديث</button>
              <button onClick={() => setEditPostId(null)} style={{ backgroundColor: "#f44336", color: "white", padding: "10px", borderRadius: "5px" }}>إلغاء</button>
            </div>
          </div>
        ) : (
          <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
              <button onClick={() => handleEdit(post)} style={{ marginRight: "10px", backgroundColor: "#2196F3", color: "white", padding: "8px", borderRadius: "5px" }}>تعديل</button>
              <button onClick={() => handleDeleteRequest(post.id)} style={{ backgroundColor: "#f44336", color: "white", padding: "8px", borderRadius: "5px" }}>حذف</button>
            </div>
          </div>
        )}
        
        <div style={{ marginTop: "15px" }}>
          <h4>التعليقات:</h4>
          {post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <p key={index} style={{ margin: "5px 0", padding: "5px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#e9ecef" }}>
                {comment}
              </p>
            ))
          ) : (
            <p>لا توجد تعليقات بعد.</p>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="أضف تعليقك هنا..."
            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={() => handleAddComment(post.id)} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px" }}>أضف تعليق</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ToastContainer />
      <h2>صفحة البوستات</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {showModal && (
        <Modal 
          message="هل أنت متأكد أنك تريد حذف هذا البوست؟"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

// مكون Messages
const Messages = () => {
    const [messages, setMessages] = useState(() => {
        // جلب البيانات من localStorage عند تحميل المكون
        const storedMessages = localStorage.getItem("messages");
        return storedMessages ? JSON.parse(storedMessages) : [];
    });
    const [newMessage, setNewMessage] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editMessage, setEditMessage] = useState('');

    const handleAddMessage = () => {
        if (!newMessage) {
            toast.error("يرجى إدخال رسالة.");
            return;
        }

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem("messages", JSON.stringify(updatedMessages)); // حفظ البيانات في localStorage
        setNewMessage('');
        toast.success("تم إضافة الرسالة بنجاح.");
    };

    const handleEditMessage = (index) => {
        setEditIndex(index);
        setEditMessage(messages[index]);
    };

    const handleUpdateMessage = () => {
        if (!editMessage) {
            toast.error("يرجى إدخال رسالة.");
            return;
        }

        const updatedMessages = messages.map((msg, index) => 
            index === editIndex ? editMessage : msg
        );

        setMessages(updatedMessages);
        localStorage.setItem("messages", JSON.stringify(updatedMessages)); // حفظ البيانات في localStorage
        setEditIndex(null);
        setEditMessage('');
        toast.success("تم تحديث الرسالة بنجاح.");
    };

    const handleDeleteMessage = (index) => {
        const filteredMessages = messages.filter((_, i) => i !== index);
        setMessages(filteredMessages);
        localStorage.setItem("messages", JSON.stringify(filteredMessages)); // حفظ البيانات في localStorage
        toast.success("تم حذف الرسالة بنجاح.");
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h2 className="text-2xl mb-4">رسائل المستخدم</h2>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="أدخل رسالة جديدة"
                    className="border p-2 mb-2 w-full"
                />
                <button onClick={handleAddMessage} className="bg-blue-500 text-white p-2 rounded">
                    إضافة رسالة
                </button>
            </div>
            {messages.length > 0 && (
                <ul className="mt-4">
                    {messages.map((msg, index) => (
                        <li key={index} className="flex justify-between items-center border-b py-2">
                            {editIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editMessage}
                                        onChange={(e) => setEditMessage(e.target.value)}
                                        className="border p-2 w-2/3"
                                    />
                                    <button onClick={handleUpdateMessage} className="bg-green-500 text-white p-2 rounded ml-2">
                                        تحديث
                                    </button>
                                    <button onClick={() => setEditIndex(null)} className="bg-red-500 text-white p-2 rounded ml-2">
                                        إلغاء
                                    </button>
                                </div>
                            ) : (
                                <div className="flex-1">{msg}</div>
                            )}
                            <div>
                                <button onClick={() => handleEditMessage(index)} className="bg-yellow-500 text-white p-2 rounded ml-2">
                                    تعديل
                                </button>
                                <button onClick={() => handleDeleteMessage(index)} className="bg-red-500 text-white p-2 rounded ml-2">
                                    حذف
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// المكون الرئيسي للتطبيق
const App = () => {
    return (
        <div>
            <PostsPage />
            <Messages />
        </div>
    );
};

// استدعاء المكون الرئيسي
ReactDOM.render(<App />, document.getElementById('root'));