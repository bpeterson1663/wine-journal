import { createAuthenticatedUser, loginUser, logoutUser } from 'api/auth'
import { addTastingEntry, deleteTastingEntry, getTastingById, getTastings, updateTastingEntry } from 'api/tastings'
import { createUserProfile, getUserProfileById } from 'api/users'

export {
  createAuthenticatedUser,
  loginUser,
  logoutUser,
  createUserProfile,
  getUserProfileById,
  getTastings,
  getTastingById,
  addTastingEntry,
  updateTastingEntry,
  deleteTastingEntry
}
