import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { ApiResponseT, FirebaseApiResponseT, WineT } from '../types'

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
      message: 'Wine added to cellar',
    }
  } catch (e) {
    return {
      success: false,
      message: `Error adding wine ${e}`,
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
