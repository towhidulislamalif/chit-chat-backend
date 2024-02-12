import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    const originalname = path.parse(file.originalname).name;
    const uniqueSuffix = Date.now();
    const filename = `${originalname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });
