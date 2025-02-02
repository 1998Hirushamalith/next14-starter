import { Suspense } from 'react'
import styles from './admin.module.css'
import AdminPosts from '@/components/adminPosts/adminPosts'
import AdminPostForm from '@/components/adminPostForm/adminPostForm'
import AdminUsers from '@/components/adminUsers/adminUsers';
import AdminUserForm from '@/components/adminUserForm/adminUserForm';
import { auth } from '@/lib/auth';

const AdminPage = async () => {

    const session = await auth();

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Suspense fallback={<div>loading...</div>}>
                        <AdminPosts />
                    </Suspense>
                </div>
                <div className={styles.col}>
                        <AdminPostForm  userId = {session.user.id} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Suspense fallback={<div>loading...</div>}>
                        <AdminUsers />
                    </Suspense>
                </div>
                <div className={styles.col}>
                        <AdminUserForm  />
                </div>
            </div>
        </div>
    );
};
export default AdminPage;



// src/app/admin/page.jsx

// "use client";

// import { useState, useEffect } from 'react';
// import { Suspense } from 'react';
// import styles from './admin.module.css';
// import AdminPosts from '@/components/adminPosts/adminPosts';
// import AdminPostForm from '@/components/adminPostForm/adminPostForm';
// import AdminUsers from '@/components/adminUsers/adminUsers';
// import AdminUserForm from '@/components/adminUserForm/adminUserForm';
// import { auth } from '@/lib/auth';

// const AdminPage = () => {
//     const [session, setSession] = useState(null);

//     useEffect(() => {
//         const getSession = async () => {
//             const sessionData = await auth();
//             setSession(sessionData);
//         };

//         getSession();
//     }, []);

//     if (!session) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className={styles.container}>
//             <div className={styles.row}>
//                 <div className={styles.col}>
//                     <Suspense fallback={<div>loading...</div>}>
//                         <AdminPosts />
//                     </Suspense>
//                 </div>
//                 <div className={styles.col}>
//                     <AdminPostForm userId={session.user.id} />
//                 </div>
//             </div>
//             <div className={styles.row}>
//                 <div className={styles.col}>
//                     <Suspense fallback={<div>loading...</div>}>
//                         <AdminUsers />
//                     </Suspense>
//                 </div>
//                 <div className={styles.col}>
//                     <AdminUserForm />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminPage;