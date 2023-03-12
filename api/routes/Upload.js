const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({ storage })

router.post("/uploadImage", upload.single('file'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})
router.post("/updateImage", upload.single('file'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

module.exports = router;