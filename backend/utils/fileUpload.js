const path = require('path');
const fs = require('fs');

exports.saveFile = (file) => {
  const uploadPath = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
  const savePath = path.join(uploadPath, file.name);
  file.mv(savePath, (err) => {
    if (err) throw err;
  });
  return `/uploads/${file.name}`;
};