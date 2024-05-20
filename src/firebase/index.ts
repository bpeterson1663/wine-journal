import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

type Prefix = "user" | "wine"
type FileType = "jpg" | "jpeg" | "png"

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
export const db = getFirestore(app);

export const auth = getAuth();

export const storage = getStorage()

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const signInWithGooglePopup = async () =>
	await signInWithPopup(auth, googleProvider);

export async function uploadImage(file: Blob | null, prefix: Prefix, id: string, fileType: FileType) {
	const fileRef = ref(storage, `${prefix}-${id}.${fileType}`);
	if (!file) {
		return
	}
	await uploadBytes(fileRef, file);
	const photoUrl = await getDownloadURL(fileRef);
	
	
	return {
		photoUrl
	}
}