import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { ApiResponseT, FirebaseApiResponseT } from 'types'
import { WineT } from 'schemas/cellar'

export async function getWines (userId: string) {
  try {
    const fbq = query(collection(db, 'wines'), where('userId', '==', userId))
    const winesSnapshot = await getDocs(fbq)

    const wineList = winesSnapshot.docs.map(doc => {
      const data = doc.data()
      const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
      const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price
      return {
        ...data,
        id: doc.id,
        quantity,
        price
      }
    })
    const data = wineList.map(wine => wine as WineT)
    return {
      success: true,
      message: '',
      data
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Error getting wines'
    }
  }
}

export async function getWineById (id: string): Promise<FirebaseApiResponseT> {
  const docRef = doc(db, 'wines', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
    const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price
    return {
      success: true,
      message: '',
      data: {
        ...data,
        id: docSnap.id,
        quantity,
        price
      }
    }
  } else {
    return {
      success: false,
      message: 'Document does not exist'
    }
  }
}

export async function addWineEntry (data: WineT): Promise<FirebaseApiResponseT> {
  const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
  const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price
  try {
    const docData = await addDoc(collection(db, 'wines'), { ...data, quantity, price })
    return {
      data: docData,
      success: true,
      message: 'Wine added to cellar'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Error adding wine'
    }
  }
}

export async function updateWineEntry (data: WineT): Promise<FirebaseApiResponseT> {
  try {
    const wineRef = doc(db, 'wines', data.id)
    const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
    const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price
    await updateDoc(wineRef, { ...data, quantity, price })
    return {
      success: true,
      message: 'Wine Updated Successfully'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Error creating wine'
    }
  }
}

export async function deleteWineEntry (id: string): Promise<ApiResponseT> {
  try {
    await deleteDoc(doc(db, 'wines', id))
    return {
      success: true,
      message: 'Wine Deleted Successfully'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Error deleting wine'
    }
  }
}
