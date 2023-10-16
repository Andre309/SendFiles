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
      const blob = fileInput.files[0];
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = blob.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      alert('Завантажте файл');
    }
  });
  
