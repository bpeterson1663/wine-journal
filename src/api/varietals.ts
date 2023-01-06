import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../firebase'
import { ApiResponseT, VarietalT } from '../types'

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
