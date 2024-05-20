import express from "express";


const router = express.Router();

//Get user's own article
router.get("/:user_name", async (req, res) => {
});

//Create a new article
router.post("/", async (req, res) => {
});

//Edit article
router.patch("/:article_id", async (req, res) => {
});

//Like article
router.patch("/:article_id/like", async (req, res) => {
});

//Dislike article
router.delete("/:article_id/like", async (req, res) => {
});

//Get number of likes
router.patch("/:article_id/like", async (req, res) => {
});

//Delete article
router.delete("/:article_id", async (req, res) => {
});

//Sort article, need to specify the sort options
router.get("/sort/{sort_options}", async(req, res) => {
});

//Create artile comment
router.post("/:artile_id/comment}", async(req, res) => {
});

//Get all comments for an artile
router.post("/:artile_id/comment}", async(req, res) => {
});

//Delete artile comment
router.delete("/:artile_id/comment/:comment_id}", async(req, res) => {
});

export default router;
