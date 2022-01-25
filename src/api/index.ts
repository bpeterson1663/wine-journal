import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { WineT, ApiResponseT } from '../types'

export async function getWines() {
  try {
    const winesCol = collection(db, 'wines')
    const winesSnapshot = await getDocs(winesCol)
    const wineList = winesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    const payload = wineList.map((wine) => wine as WineT)
    return {
      success: true,
      payload,
    }
  } catch (e) {
    return {
      success: false,
      message: `Error creating wine ${e}`,
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
