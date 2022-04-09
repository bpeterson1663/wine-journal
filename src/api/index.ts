import { addDoc, updateDoc, collection, getDocs, doc, getDoc, deleteDoc, query, where } from 'firebase/firestore/lite'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { db } from '../firebase'
import { WineT, ApiResponseT, SignUpT, FirebaseApiResponseT, UserProfileT, VarietalT } from '../types'

export async function getWines(userId: string) {
  try {
    const q = query(collection(db, 'wines'), where('userId', '==', userId))
    const winesSnapshot = await getDocs(q)

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
      message: `Error fetching wines ${e}`,
    }
  }
}

export async function getWineById(id: string): Promise<FirebaseApiResponseT> {
  const docRef = doc(db, 'wines', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      success: true,
      message: '',
      data: {
        ...docSnap.data(),
        id: docSnap.id,
      },
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

export async function updateWineEntry(data: WineT): Promise<ApiResponseT> {
  try {
    const wineRef = doc(db, 'wines', data.id)
    updateDoc(wineRef, { ...data })
    return {
      success: true,
      message: 'Wine Updated Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating wine ${e}`,
    }
  }
}

export async function deleteWineEntry(id: string): Promise<ApiResponseT> {
  try {
    deleteDoc(doc(db, 'wines', id))
    return {
      success: true,
      message: 'Wine Deleted Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error deleting wine ${e}`,
    }
  }
}

export async function getVarietals() {
  try {
    const q = collection(db, 'varietals')
    const varietalSnapshot = await getDocs(q)

    const varietalList = varietalSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    const data = varietalList.map((varietal) => varietal as VarietalT)
    return {
      success: true,
      message: '',
      data,
    }
  } catch (e) {
    return {
      success: false,
      message: `Error fetching varietals ${e}`,
    }
  }
}

export async function addVarietal(data: VarietalT): Promise<ApiResponseT> {
  try {
    addDoc(collection(db, 'varietals'), data)
    return {
      success: true,
      message: 'Varietal Created Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating varietal ${e}`,
    }
  }
}

export const createAuthenticatedUser = async (data: SignUpT): Promise<ApiResponseT> => {
  try {
    const auth = getAuth()
    const { email, password } = data
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

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
      message: 'Logged in successfully',
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

export async function logoutUser(): Promise<ApiResponseT> {
  try {
    const auth = getAuth()
    await signOut(auth)
    return {
      success: true,
      message: 'Logged out successfully',
    }
  } catch (err) {
    return {
      success: false,
      message: `Error trying to log out ${err}`,
    }
  }
}

export async function createUserProfile(data: UserProfileT): Promise<FirebaseApiResponseT> {
  try {
    const { firstName, lastName, userId } = data
    addDoc(collection(db, 'users'), { firstName, lastName, userId })
    return {
      success: true,
      message: 'User profile created',
      data,
    }
  } catch (err) {
    return {
      success: false,
      message: `Error in creating user profile ${err}`,
    }
  }
}

export async function getUserProfileById(id: string): Promise<FirebaseApiResponseT> {
  const q = query(collection(db, 'users'), where('userId', '==', id))
  const querySnapshot = await getDocs(q)

  let userProfile: UserProfileT = {
    firstName: '',
    lastName: '',
    userId: id,
  }
  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      const data = doc.data()
      userProfile = {
        firstName: data.firstName,
        lastName: data.lastName,
        userId: id,
      }
    }
  })
  if (userProfile.firstName) {
    return {
      success: true,
      message: '',
      data: userProfile,
    }
  } else {
    return {
      success: false,
      message: 'Document does not exist',
    }
  }
}
