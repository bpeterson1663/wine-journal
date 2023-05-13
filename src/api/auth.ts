import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { ApiResponseT, SignUpT } from '../types'

export const createAuthenticatedUser = async (data: SignUpT): Promise<ApiResponseT> => {
  try {
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
