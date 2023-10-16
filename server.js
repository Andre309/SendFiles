const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Налаштовуємо multer для завантаження файлів на сервер
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'import'); // Зберігаємо файли у папці "import"
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Налаштовуємо транспортер для відправлення пошти з Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'andrij.kibish@gmail.com',
    pass: 'pipito309'
  }
});

app.post('/send-email', upload.single('file'), (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'andrij.kibish@gmail.com',
    to,
    subject,
    text,
    attachments: [{ path: req.file.path }]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Помилка під час відправлення електронного листа.');
    } else {
      console.log('Email відправлено: ' + info.response);

      // Після відправлення, якщо потрібно, видаляємо файл
      // fs.unlinkSync(req.file.path);

      res.status(200).send('Ваш файл відправлено');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
