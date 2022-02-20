import { addDoc, collection, getDocs, doc, getDoc } from 'firebase/firestore/lite'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '../firebase'
import { WineT, ApiResponseT, SignUpT, WineApiResponseT } from '../types'

export async function getWines(userId: string) {
  try {
    const winesCol = collection(db, 'wines')
    const winesSnapshot = await getDocs(winesCol)
    const wineList = winesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    const data = wineList.map((wine) => wine as WineT)
    return {
      success: true,
      message: '',
      data,
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating wine ${e}`,
    }
  }
}

export async function getWineById(id: string): Promise<WineApiResponseT> {
  const docRef = doc(db, 'wines', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      success: true,
      message: '',
      data: docSnap.data(),
    }
  } else {
    return {
      success: false,
      message: 'Document does not exist',
    }
  }
}

export async function addWineEntry(data: WineT): Promise<ApiResponseT> {
  try {
    addDoc(collection(db, 'wines'), data)
    return {
      success: true,
      message: 'Wine Created Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating wine ${e}`,
    }
  }
}

export const createAuthenticatedUser = async (data: SignUpT): Promise<ApiResponseT> => {
  try {
    const auth = getAuth()
    const { email, password } = data
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await createUserProfile(data)
    return {
      success: true,
      message: 'User Created Successfully',
      data: {
        email,
        uid: user.uid,
      },
    }
  } catch (err) {
    return {
      success: false,
      message: `Error ${err}`,
    }
  }
}

export async function loginUser(email: string, password: string): Promise<ApiResponseT> {
  const auth = getAuth()
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return {
      success: true,
      message: 'Logged In Succesfully',
      data: {
        email,
        uid: user.uid,
      },
    }
  } catch (err) {
    return {
      success: false,
      message: `Error ${err}`,
    }
  }
}

export async function createUserProfile(data: SignUpT): Promise<ApiResponseT> {
  try {
    const { email, firstName, lastName } = data
    addDoc(collection(db, 'users'), { email, firstName, lastName })
    return {
      success: true,
      message: 'User profile created',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error in creating user profile ${e}`,
    }
  }
}
