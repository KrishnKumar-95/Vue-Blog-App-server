const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is post 1 description",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Cave_26%2C_Ajanta.jpg",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is post 2 description",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Cave_26%2C_Ajanta.jpg",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is post 3 description",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Cave_26%2C_Ajanta.jpg",
  },
];

router.get("/", (req, res) => {
  res.json({ status: 200, verb: "Node Server Running" });
});

router.get("/posts", (req, res) => {
  const _posts = [];
  if (posts.length > 0) {
    // posts.map((v) => {
    //   const __posts = {
    //     ...v,
    //     image: "/image/" + v.photo.filename, // Update the URL format here
    //   };
    //   _posts.push(__posts);
    // });
  }
  res.status(200).json({ data: posts, status: 200, total: posts.length });
});

router.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  res.status(200).json({ data: post, status: 200 });
});

router.post("/create", upload.single("photo"), (req, res) => {
    console.log({ req });
  const id = posts.length;
  const request = {
    id,
    title: req.body.title,
    content: req.body.content,
    photo: req.file,
  };

  if (request.title.trim() === "" || request.content.trim() === "") {
    return res
      .status(400)
      .json({ message: "Title and content cannot be empty." });
  }
  posts.push(request);
  res.json(request);
});

module.exports = router;
