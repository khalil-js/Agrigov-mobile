# 🌱 AgriGov Mobile

AgriGov Mobile is a cross-platform mobile application built with **React Native (Expo)**, designed to provide users with easy access to agricultural services. The app is powered by a **Django REST API backend** for authentication and data management.

---

## 🚀 Features

- 🔐 User Authentication (Login / Registration)
- 📱 Clean and responsive mobile UI
- 🌐 اتصال مع Django REST API
- ⚡ Fast development using Expo
- 🔄 Real-time data interaction with backend

---

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Django + Django REST Framework
- **API Communication:** Fetch / Axios

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/agrigov-mobile.git
cd agrigov-mobile
````

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## ▶️ Running the App

### Start Expo

```bash
npx expo start
```

This will open the Expo DevTools in your browser.

---

## 📱 Run on Your Physical Device

### Option 1: Using Expo Go (Recommended)

1. Install **Expo Go**:

   * Android: [https://play.google.com/store/apps/details?id=host.exp.exponent](https://play.google.com/store/apps/details?id=host.exp.exponent)
   * iOS: [https://apps.apple.com/app/expo-go/id982107779](https://apps.apple.com/app/expo-go/id982107779)

2. Make sure your phone and computer are on the **same Wi-Fi network**

3. Scan the QR code:

   * Android → use Expo Go app
   * iOS → use Camera app

---

### ⚠️ Important (Backend Connection)

If you're connecting to a **local Django server**, replace:

```js
http://127.0.0.1:8000
```

with your computer’s local IP address:

```js
http://192.168.x.x:8000
```

👉 Find your IP:

```bash
ipconfig   # Windows
ifconfig   # Mac/Linux
```

---

### Option 2: Using Emulator

#### Android:

* Install Android Studio
* Start an emulator
* Press **"a"** in Expo terminal

#### iOS (Mac only):

* Install Xcode
* Press **"i"** in Expo terminal

---

## 🔗 Backend Setup (Django)

Make sure your backend is running:

```bash
python manage.py runserver 
```

---

## 📁 Project Structure

```
/components
/screens
/services   # API calls
/assets
App.js
```

---

## 🧪 Troubleshooting

* ❌ App can't connect to backend
  → Check IP address & same Wi-Fi

* ❌ Expo not loading
  → Run:

  ```bash
  npx expo start --clear
  ```

* ❌ Network error
  → Disable firewall or allow port 8000

---

## 📌 Future Improvements

* 🌾 Add more agricultural services
* 📊 Dashboard & analytics
* 🔔 Push notifications
* 🌍 Multi-language support

---

## 👨‍💻 Author

Khalil – React Native & Django Developer

