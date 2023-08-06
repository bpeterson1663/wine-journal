import { addDoc, collection, getDocs, query, where } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { type FirebaseApiResponseT, type UserProfileT } from '../types'

export async function createUserProfile (data: UserProfileT): Promise<FirebaseApiResponseT> {
  try {
    const { firstName, lastName, userId } = data
    await addDoc(collection(db, 'users'), { firstName, lastName, userId })
    return {
      success: true,
      message: 'User profile created',
      data
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Error in creating user profile'
    }
  }
}

export async function getUserProfileById (id: string): Promise<FirebaseApiResponseT> {
  const fbq = query(collection(db, 'users'), where('userId', '==', id))
  const querySnapshot = await getDocs(fbq)

  let userProfile: UserProfileT = {
    firstName: '',
    lastName: '',
    userId: id
  }
  querySnapshot.forEach(doc => {
    if (doc.exists()) {
      const data = doc.data()
      userProfile = {
        firstName: data.firstName,
        lastName: data.lastName,
        userId: id
      }
    }
  })
  if (userProfile.firstName) {
    return {
      success: true,
      message: '',
      data: userProfile
    }
  } else {
    return {
      success: false,
      message: 'Document does not exist'
    }
  }
}
