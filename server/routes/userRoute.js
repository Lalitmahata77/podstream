import express from "express"
import { createUser, deleteUser, getAlluser, login, logout, updateUser, userProfile } from "../controller/userController.js"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"


const router = express.Router()


router.route("/").post(createUser)

router.route("/login").post(login)
router.route("/logout").post(authenticate, logout)
router.route("/users").get(authenticate,authorizeAdmin,getAlluser)
router.route("/:id").get(authenticate,userProfile)
router.route("/update/:id").put(authenticate,updateUser)
router.route("/delet/admin/:id").delete(authenticate,authorizeAdmin,deleteUser)
export default router