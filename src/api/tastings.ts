import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { ApiResponseT, FirebaseApiResponseT, TastingT } from '../types'

export async function getTastings(userId: string) {
  try {
    const q = query(collection(db, 'tastings'), where('userId', '==', userId))
    const tastingsSnapshot = await getDocs(q)

    const tastingList = tastingsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    const data = tastingList.map((tasting) => tasting as TastingT)
    return {
      success: true,
      message: '',
      data,
    }
  } catch (e) {
    return {
      success: false,
      message: `Error fetching tastings ${e}`,
    }
  }
}

export async function getTastingById(id: string): Promise<FirebaseApiResponseT> {
  const docRef = doc(db, 'tastings', id)
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

export async function addTastingEntry(data: TastingT): Promise<ApiResponseT> {
  try {
    addDoc(collection(db, 'tastings'), data)
    return {
      success: true,
      message: 'Tasting Created Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating tasting ${e}`,
    }
  }
}

export async function updateTastingEntry(data: TastingT): Promise<ApiResponseT> {
  try {
    const tastingRef = doc(db, 'tastings', data.id)
    updateDoc(tastingRef, { ...data })
    return {
      success: true,
      message: 'Tasting Updated Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating tasting ${e}`,
    }
  }
}

export async function deleteTastingEntry(id: string): Promise<ApiResponseT> {
  try {
    deleteDoc(doc(db, 'tastings', id))
    return {
      success: true,
      message: 'Tasting Deleted Successfully',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error deleting tasting ${e}`,
    }
  }
}
