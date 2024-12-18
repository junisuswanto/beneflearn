document.addEventListener('DOMContentLoaded', function () {
  const webhookURL = 'https://discord.com/api/webhooks/1318479486647406624/VdxysN2cM8qQWnEPlWPWeSuWZVpIL9wHpU2Hsm3jyEVpgfeymuAsxN5LHzsefOQ6NK34'; // Ganti dengan URL webhook Anda
  const form = document.querySelector('form');
  const messageInput = document.querySelector('#message');
  const statusDiv = document.querySelector('#status');

  form.onsubmit = function (event) {
    event.preventDefault(); // Mencegah halaman melakukan refresh

    const message = messageInput.value.trim(); // Ambil pesan dari input dan menghapus spasi depan atau spasi ganda menggunakan trim
    if (!message) {
      statusDiv.textContent = 'Message cannot be empty!';
      return;
    }

    const now = new Date();

    // Data JSON yang akan dikirim
    const payload = {
      content: message + '\n\r' + now,
    };

    // console.log(message + '\n\r' + now);

    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        if (response.ok) {
          statusDiv.textContent = 'Message sent successfully!';
          messageInput.value = '';
        } else {
          statusDiv.textContent = `Failed to send message: ${response.status}`;
        }
      })
      .catch(function (error) {
        statusDiv.textContent = `Error: ${error.message}`;
      });
  };
});
