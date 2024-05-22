import express from "express";
import { postArticle } from "../../db/article-dao.js";

const router = express.Router();

//Get user's own article
router.get("/:user_name", async (req, res) => {
});

//Create a new article
router.post("/", async (req, res) => {
try{
    let title = req.body.title;
    let text = req.body.text;
    let username = req.body.username;
    let dateNow = new Date().toISOString().slice(0, 10);

    const posted = postArticle(title, username, text, dateNow);
    return res.sendStatus(posted ? 204 : 404);
}catch{
    return res.sendStatus(422);
}
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