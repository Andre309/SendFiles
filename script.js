const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const sendButton = document.getElementById('sendButton');

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    sendButton.style.display = 'block';
  } else {
    sendButton.style.display = 'none';
  }
});

sendButton.addEventListener('click', () => {
  if (fileInput.files.length > 0) {
    // Логіка відправлення файла на поштову скриньку
    // В цьому місці можна додати код для відправлення пошти
    alert('Ваш файл відправлено');
  } else {
    alert('Завантажте файл');
  }
});
