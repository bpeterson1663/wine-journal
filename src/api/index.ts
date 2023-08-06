import { createAuthenticatedUser, loginUser, logoutUser } from 'api/auth'
import { addTastingEntry, deleteTastingEntry, getTastingById, getTastings, updateTastingEntry } from 'api/tastings'
import { createUserProfile, getUserProfileById } from 'api/users'
import { addWineEntry, deleteWineEntry, getWineById, getWines, updateWineEntry } from 'api/cellar'

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
  deleteTastingEntry,
  addWineEntry,
  deleteWineEntry,
  getWineById,
  getWines,
  updateWineEntry
}
