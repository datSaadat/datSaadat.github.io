import {firebaseConfig} from './config.js';
export async function connect(onState,onRecords,onError){
 if(!firebaseConfig)return null;
 const base='https://www.gstatic.com/firebasejs/12.19.0/';
 const [A,U,D]=await Promise.all([import(base+'firebase-app.js'),import(base+'firebase-auth.js'),import(base+'firebase-firestore.js')]);
 const app=A.initializeApp(firebaseConfig),auth=U.getAuth(app),db=D.getFirestore(app);let unsubscribe=()=>{};
 const visits=()=>D.collection(db,'users',auth.currentUser.uid,'visits');
 U.onAuthStateChanged(auth,user=>{unsubscribe();onState(user);if(user)unsubscribe=D.onSnapshot(visits(),snap=>onRecords(snap.docs.map(d=>({...d.data(),id:d.id}))),onError);});
 return {get user(){return auth.currentUser;},async save(v){if(!auth.currentUser)throw Error('Sign in first.');const {id,...data}=v;await D.setDoc(D.doc(visits(),id),data);},async remove(id){await D.deleteDoc(D.doc(visits(),id));},async signIn(email,password){await U.setPersistence(auth,U.browserSessionPersistence);return U.signInWithEmailAndPassword(auth,email,password);},async signUp(email,password,displayName){await U.setPersistence(auth,U.browserSessionPersistence);const r=await U.createUserWithEmailAndPassword(auth,email,password);await U.updateProfile(r.user,{displayName});await U.sendEmailVerification(r.user);return r;},async google(){await U.setPersistence(auth,U.browserSessionPersistence);return U.signInWithPopup(auth,new U.GoogleAuthProvider());},reset:email=>U.sendPasswordResetEmail(auth,email),signOut:()=>U.signOut(auth)};
}
