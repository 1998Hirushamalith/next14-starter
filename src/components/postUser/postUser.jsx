import { getUser } from "@/lib/data";
import styles from "./postuser.module.css";
import Image from "next/image";

// FETCH DATA WITH AN API
// const getData = async (userId)=>{ // get userId
//     const res = await fetch (`https://jsonplaceholder.typicode.com/users/${userId}` , {cache:"no-store"}); // use it here

//     if(!res.ok){
//         throw new Error("Something went wrong");
//     }

//     return res.json();
// };

const PostUser = async ({userId}) => {

    // FETCH DATA WITH AN API
    // const user = await getData(userId);

    // FETCH DATA WITHOUT AN API
        const user = await getUser(userId);

    return (
        <div className={styles.container}>
            <Image
                className={styles.avatar}
                src={user && user.img ? user.img : "/noavatar.png"}
                alt="" 
                width={50}
                height={50}
                />
                <div className={styles.texts}>
                    <span className={styles.title}>Author</span>
                    {/* <span className={styles.username}>{user.username}</span> */}
                    <span className={styles.username}>{user ? user.username : 'Unknown'}</span>
                </div>
        </div>
    );
};

export default PostUser;