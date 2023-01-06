import { addDoc, collection, getDocs, query, where } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { FirebaseApiResponseT, UserProfileT } from '../types'

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
