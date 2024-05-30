import express from "express";
import { postComment, getAllComments , deleteComment, deleteCommentAsAdmin, getCommentsByArt} from "../../db/comment-dao.js";

const router = express.Router();

//Create artile comment
router.post("/", async (req, res) => {
  try {
    let desc = req.body.desc;
    let user_id = req.body.user_id;
    let parent_comment_id = req.body.parent_comment_id;
    let article_id = req.body.article_id;
    let date = new Date().toISOString().slice(0, 10);
    let time = new Date().toISOString().slice(11, 19);
    console.log(desc, user_id, date, time);

    const posted = postComment(desc, date, time, user_id, article_id, parent_comment_id);
    console.log(posted);
    return res.sendStatus(posted ? 204 : 404);
  } catch (error){
    console.error("Post comment error:", error);
    return res.sendStatus(422);
  }
});

//Get all comments for an artile
router.get("/", async (req, res) => {
  try {
    const allComments = await getAllComments();
    console.log("Fetched comments:", allComments);
    return res.json(allComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.sendStatus(422);
  }
});

//Delete article comment
router.delete("/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const { user_id, is_admin } = req.body;

    let deleted;
    
    if (is_admin) {
      deleted = await deleteCommentAsAdmin(comment_id);
    } else {
      deleted = await deleteComment(comment_id, user_id);
    }

    return res.sendStatus(deleted ? 204 : 404);
  } catch (error) {
    console.error("Error deleting comment: ", error);
    return res.sendStatus(422);
  }
});

router.get("/:article_id", async (req, res) => {
  try {
    const comments = await getCommentsByArt(req.params.article_id);
    return res.json(comments);
  } catch (error) {
    return res.sendStatus(422);
  }
});

router.head("/:comment_id", async (req, res) => {
  try {
    const isParent = await commentIsParent(req.params.comment_id);
    return res.json(isParent);
  } catch (error) {
    return res.sendStatus(422);
  }
});

export default router;


