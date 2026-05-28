// Importa os scripts do Firebase Service Worker SDK
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Configuração do Firebase (Use as mesmas chaves do seu environment.ts)
const firebaseConfig = {
  apiKey: "AIzaSyC-IGwzIqCC2mpXJxxCCjhw4eVkzNdIXog",
  authDomain: "notificationhub-d9fb5.firebaseapp.com",
  projectId: "notificationhub-d9fb5",
  storageBucket: "notificationhub-d9fb5.firebasestorage.app",
  messagingSenderId: "791895927795",
  appId: "1:791895927795:web:0f76812b85b5d9709fc086",
  measurementId: "G-V1Y7QH4S3L"
};

// Inicializa o app Firebase no escopo do Service Worker
firebase.initializeApp(firebaseConfig);

// Instancia o serviço de mensageria de segundo plano
const messaging = firebase.messaging();

// Opcional: Trata notificações em segundo plano se necessário
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em segundo plano recebida: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/icon-96x96.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
