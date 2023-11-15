import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { type ApiResponseT, type FirebaseApiResponseT } from '../types'
import { TastingT } from 'schemas/tastings'

export async function getTastings (userId: string) {
  try {
    const fbq = query(collection(db, 'tastings'), where('userId', '==', userId))
    const tastingsSnapshot = await getDocs(fbq)
    const tastingList = tastingsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        ...data,
        date: data.date.toDate(),
        id: doc.id
      }
    })
    const data = tastingList.map(tasting => tasting as TastingT)
    return {
      success: true,
      message: '',
      data
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: 'Error fetching tastings'
    }
  }
}

export async function getTastingById (id: string): Promise<FirebaseApiResponseT> {
  const docRef = doc(db, 'tastings', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return {
      success: true,
      message: '',
      data: {
        ...data,
        id: docSnap.id,
        date: data.date.toDate()
      }
    }
  } else {
    return {
      success: false,
      message: 'Document does not exist'
    }
  }
}

export async function addTastingEntry (data: TastingT): Promise<ApiResponseT> {
  try {
    await addDoc(collection(db, 'tastings'), data)
    return {
      success: true,
      message: 'Tasting Created Successfully'
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: 'Error creating tasting'
    }
  }
}

export async function updateTastingEntry (data: TastingT): Promise<ApiResponseT> {
  try {
    const tastingRef = doc(db, 'tastings', data.id)
    await updateDoc(tastingRef, { ...data })
    return {
      success: true,
      message: 'Tasting Updated Successfully'
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: 'Error creating tasting'
    }
  }
}

export async function deleteTastingEntry (id: string): Promise<ApiResponseT> {
  try {
    await deleteDoc(doc(db, 'tastings', id))
    return {
      success: true,
      message: 'Tasting Deleted Successfully'
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: 'Error deleting tasting'
    }
  }
}
