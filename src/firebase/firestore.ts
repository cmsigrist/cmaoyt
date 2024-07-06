import { getFirestore, query, getDocs, collection, where } from 'firebase/firestore';
import { app } from './firebase';
import { DBUser } from '../types/user';

// const firestore = getFirestore(app);

// const usersRef = collection(firestore, 'users');

// const getDBUser = async (
//   userID: string,
//   // flashContext: FlashState | undefined
// ): Promise<DBUser | undefined> => {
//   const q = query(usersRef, where('uid', '==', userID));
//   try {
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.size > 0) {
//       const res = querySnapshot.docs[0].data();

//       if (res !== undefined) {
//         const DBUser: DBUser = {
//           isLogged: true,
//           name: res.name,
//           role: res.role
//         };

//         console.log(DBUser);

//         return DBUser;
//       }
//       throw new Error('No results for user with uid: ' + userID);
//     }

//     throw new Error('No match for user with uid: ' + userID);
//   } catch (e: any) {
//     console.log(e);
//     // flashContext?.addMessage(e as string, FlashLevel.Error);
//   }
// };

// export { getDBUser };
