import express from "express"
import { createUser, getAlluser, login, logout, updateUser, userProfile } from "../controller/userController.js"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"


const router = express.Router()


router.route("/").post(createUser)

router.route("/login").post(login)
router.route("/logout").post(authenticate, logout)
router.route("/users").get(authenticate,authorizeAdmin,getAlluser)
router.route("/:id").get(authenticate,userProfile)
router.route("/update/:id").put(authenticate,updateUser)
export default router