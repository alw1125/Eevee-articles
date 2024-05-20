import express from "express";

const router = express.Router();

//Create new user
router.post("/", async (req, res) => {
});

//Return all user list
router.get("/", async (req, res) => {
});

//User login
router.post("/login", async(req, res) => {
});

//User logput
router.post("/logout", async(req, res) => {
});

//Edit user information
router.patch("/:user_name", async(req, res) => {
});

//Delete user
router.delete("/user_name", async(req, res) => {
});

export default router;
