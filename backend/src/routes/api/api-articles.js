import express from "express";
import {getArticleByID, deleteArticle,deleteArticleAsAdmin, postArticle, getAllArticles, likeArticle, unlikeArticle, getArticleLikesCount, checkIfArticleIsLiked} from "../../db/article-dao.js";

const router = express.Router();

//Create a new article
router.post("/", async (req, res) => {
  try {
    let title = req.body.title;
    let text = req.body.text;
    let image = req.body.image;
    let user_id = req.body.user_id;
    let dateNow = new Date().toISOString().slice(0, 10);

    const posted = postArticle(title, image, user_id, text, dateNow);
    return res.sendStatus(posted ? 204 : 404);
  } catch {
    return res.sendStatus(422);
  }
});

//Get all articles
router.get("/", async (req, res) => {
  try {
    const allArticles = await getAllArticles();
    return res.json(allArticles);
  } catch {
    return res.sendStatus(422);
  }
});

//Get article by article id
router.get("/:article_id", async (req, res) => {
  let article_id = req.params.article_id;
  let article = await getArticleByID(article_id);
  return res.json(article);
});

//Edit article
router.patch("/:article_id", async (req, res) => {
});


//Get number of likes
router.get("/:article_id/like", async (req, res) => {
    try {
    
        const article_id = req.params.article_id;
        const likeNumber = await getArticleLikesCount(article_id);
        return res.json( likeNumber );
       
    } catch {
        return res.sendStatus(422);
        }
});

// checks if user liked an article 
router.get("/:article_id/like/:user_id/check", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const article_id = req.params.article_id;
        const liked = await checkIfArticleIsLiked(user_id, article_id);
        return res.json(liked);
    } catch (error) {
        console.error(error);
        return res.sendStatus(422);
    }
  });




//Like article

router.post("/:article_id/like", async (req, res) => {
    try{
        const user_id  = req.body.user_id;
        const article_id = req.params.article_id;
        const liked = await likeArticle(user_id, article_id);
        return res.sendStatus(liked ? 204 : 404);
    }catch{
        return res.sendStatus(422);
    }
});

//Dislike article
router.post("/:article_id/unlike", async (req, res) => {
    try {
        const user_id  = req.body.user_id;
        const article_id = req.params.article_id;
        const unliked = await unlikeArticle(user_id, article_id);
        return res.sendStatus(unliked ? 204 : 404);
      } catch {
        return res.sendStatus(422);
      }
});





//Delete article
router.delete("/:article_id", async (req, res) => {
  try {
    const article_id = req.params.article_id;
    const { user_id, is_admin } = req.body;

    let deleted;

    if (is_admin) {
      deleted = await deleteArticleAsAdmin(article_id);
    } else {
      deleted = await deleteArticle(article_id, user_id);
    }
    return res.sendStatus(deleted ? 204 : 404);
  } catch (error) {
    console.error("Error deleting article: ", error);
    return res.sendStatus(422);
  }
});

//Sort article, need to specify the sort options
router.get("/sort/{sort_options}", async (req, res) => {});

export default router;
