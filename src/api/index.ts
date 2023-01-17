import { createAuthenticatedUser, loginUser, logoutUser } from './auth'
import { createUserProfile, getUserProfileById } from './users'
import { addVarietal, getVarietals } from './varietals'
import { addTastingEntry, deleteTastingEntry, getTastingById, getTastings, updateTastingEntry } from './tastings'
import { addWineEntry, deleteWineEntry, getWineById, getWines, updateWineEntry } from './wines'

export {
  createAuthenticatedUser,
  loginUser,
  logoutUser,
  createUserProfile,
  getUserProfileById,
  getVarietals,
  addVarietal,
  getTastings,
  getTastingById,
  addTastingEntry,
  updateTastingEntry,
  deleteTastingEntry,
  addWineEntry,
  deleteWineEntry,
  getWineById,
  getWines,
  updateWineEntry,
}
