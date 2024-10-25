  // JavaScript code to handle Chart.js setup
  const hardwareCtx = document.getElementById('hardware').getContext('2d');
  const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
  const repairTasksCtx = document.getElementById('repairTasksChart').getContext('2d');

  // Hardware Quality Chart
  const hardwareChart = new Chart(hardwareCtx, {
      type: 'bar',
      data: {
          labels: ['Component A', 'Component B', 'Component C'],
          datasets: [{
              label: 'Quality Score',
              data: [85, 90, 75],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100
              }
          }
      }
  });

  // Hardware Temperature Monitoring Chart
  const temperatureChart = new Chart(temperatureCtx, {
      type: 'line',
      data: {
          labels: ['0h', '1h', '2h', '3h', '4h'],
          datasets: [{
              label: 'Temperature (°C)',
              data: [22, 24, 23, 25, 27],
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              fill: false,
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  max: 30
              }
          },
          animation: {
              onComplete: function() {
                  const latestTemp = this.data.datasets[0].data.slice(-1)[0];
                  const warningDiv = document.getElementById('warning');
                  if (latestTemp > 25) {
                      warningDiv.textContent = 'Warning: High Temperature!';
                      warningDiv.style.color = 'red';
                  } else {
                      warningDiv.textContent = '';
                  }
              }
          }
      }
  });

  // Repair Task Distribution Chart
  const repairTasksChart = new Chart(repairTasksCtx, {
      type: 'pie',
      data: {
          labels: ['Electrical', 'Mechanical', 'Structural'],
          datasets: [{
              label: 'Repair Tasks',
              data: [60, 30, 10],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
          }]
      },
      options: {
          responsive: true,
      }
  });

  // Video Chat Functionality
  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');
  const startButton = document.getElementById('startButton');
  const endButton = document.getElementById('endButton');
  let localStream;

  startButton.addEventListener('click', () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
              localStream = stream;
              localVideo.srcObject = stream;
              // Simulate remote video stream
              remoteVideo.srcObject = stream;
          })
          .catch(error => {
              console.error('Error accessing media devices.', error);
          });
  });

  endButton.addEventListener('click', () => {
      if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
          localVideo.srcObject = null;
          remoteVideo.srcObject = null;
      }
  });

  // Chat Functionality
  const chatWindow = document.getElementById('chatWindow');
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendButton');

  sendButton.addEventListener('click', () => {
      const message = chatInput.value;
      if (message.trim() !== '') {
          const messageElement = document.createElement('div');
          messageElement.textContent = message;
          chatWindow.appendChild(messageElement);
          chatInput.value = '';
          chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
      }
  });

// AI Detection Camera Functionality
const detectionCamera = document.getElementById('detectionCamera');
const startScanButton = document.getElementById('startScan');
const stopScanButton = document.getElementById('stopScan');
const aiOverlay = document.getElementById('aiOverlay');
let cameraStream;

startScanButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraStream = stream;
            detectionCamera.srcObject = stream;
            aiOverlay.textContent = "AI Scanning...";
            aiOverlay.style.display = 'block';
            // Simulate AI detection processing here
        })
        .catch(error => console.error('Camera access error:', error));
});

stopScanButton.addEventListener('click', () => {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        detectionCamera.srcObject = null;
        aiOverlay.style.display = 'none';
    }
});

// AI Chatbot Functionality
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSendButton = document.getElementById('chatbotSendButton');

chatbotSendButton.addEventListener('click', () => {
    const userMessage = chatbotInput.value;
    if (userMessage.trim()) {
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = `You: ${userMessage}`;
        chatbotWindow.appendChild(userMessageElement);
        chatbotInput.value = '';

        // Mock AI response for demonstration
        const aiResponseElement = document.createElement('div');
        aiResponseElement.textContent = 'AI: Processing your request...';
        chatbotWindow.appendChild(aiResponseElement);
        chatbotWindow.scrollTop = chatbotWindow.scrollHeight;

        setTimeout(() => {
            aiResponseElement.textContent = `AI: Here is the information you requested about "${userMessage}".`;
            chatbotWindow.scrollTop = chatbotWindow.scrollHeight;
        }, 1000);
    }
});
