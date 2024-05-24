import express from "express";

const router = express.Router();

//Create artile comment
router.post("/:artile_id/comment}", async (req, res) => {
  try {
    let text = req.body.text;
    let user_id = req.body.user_id;
    let dateNow = new Date().toISOString().slice(0, 10);

    const posted = postComment(user_id, text, dateNow);
    return res.sendStatus(posted ? 204 : 404);
  } catch {
    return res.sendStatus(422);
  }
});

//Get all comments for an artile
router.post("/:artile_id/comment}", async (req, res) => {
  try {
    const allComments = await getAllComments();
    console.log(allComments);
    return res.json(allComments);
  } catch {
    return res.sendStatus(422);
  }
});

//Delete artile comment
router.delete("/:artile_id/comment/:comment_id}", async (req, res) => {});
