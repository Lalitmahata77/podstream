import express from "express"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import { createCategory, listCategory, readCategory, removeCategory, updateCategory } from "../controller/categoryController.js"
const router = express.Router()

router.route("/").post(authenticate,authorizeAdmin, createCategory)
router.route("/update/:id").put(authenticate,authorizeAdmin,updateCategory)
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);
export default router