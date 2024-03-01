// middleware de multer
const upload = require('../utils/multer');

// ...

imageRouter.route('/')
    .create(upload.single('image'), create);
