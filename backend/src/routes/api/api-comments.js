import express from "express";
import { postComment } from "../../db/comment-dao";

const router = express.Router();

//Create artile comment
router.post("/", async (req, res) => {
  try {
    let desc = req.body.text;
    let user_id = req.body.user_id;
    let date = new Date().toISOString().slice(0, 10);
    let time = new Date().toISOString().slice(11, 19);
    console.log(desc, user_id, date, time);

    const posted = postComment(desc, date, time, user_id);
    console.log(posted);
    return res.sendStatus(posted ? 204 : 404);
  } catch (error){
    console.error("Post comment error:", error);
    return res.sendStatus(422);
  }
});

//Get all comments for an artile
router.get("/:artile_id", async (req, res) => {
  try {
    const allComments = await getAllComments();
    console.log(allComments);
    return res.json(allComments);
  } catch {
    return res.sendStatus(422);
  }
});

//Delete artile comment
router.delete("/:artile_id/:comment_id", async (req, res) => {});

export default router;
