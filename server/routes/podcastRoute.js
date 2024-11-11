import express from "express"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import { addPodcast, addPodcastReview, deletePodcast, fetchNewPodcast, fetchPodcast, fetchTopPodcast, filterPodcast, podcasts, updatePodcast } from "../controller/podcastController.js"
const router = express.Router()

router.route("/").post(authenticate,authorizeAdmin,addPodcast)
.get(fetchPodcast)
// router.route("/:id").post(authenticate,authorizeAdmin,updatePodcast)
// .get(fetchPodcastById)
router.route("/delete/:id").delete(authenticate,authorizeAdmin,deletePodcast)

router.route("/podcasts").get(podcasts)
router.route("/:id/review").post(authenticate,addPodcastReview)
router.route("/toppodcast").get(fetchTopPodcast)
router.route("/newPodcast").get(fetchNewPodcast)
router.route("/filter-podcast").get(filterPodcast)

export default router