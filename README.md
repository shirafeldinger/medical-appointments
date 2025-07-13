# Medical Appointments App

A React Native application for booking and managing medical appointments.

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- React Native development environment ([official guide](https://reactnative.dev/docs/environment-setup))
- Android Studio and/or Xcode (for running on Android/iOS)

### Install Dependencies

```sh
npm install
# or
yarn install
```

### Start Metro Bundler

```sh
npm start
# or
yarn start
```

### Run the App

#### Android

```sh
npm run android
# or
yarn android
```

#### iOS

1. Install CocoaPods (first time or after updating native dependencies):
   ```sh
   bundle install
   bundle exec pod install
   ```
2. Run the app:
   ```sh
   npm run ios
   # or
   yarn ios
   ```

## 🩺 Features

- User login with username
- Book appointments by specialty, date, and time
- View, update, and cancel appointments
- Multi-user support (each user sees only their own appointments)
- Hebrew interface, RTL support

## 🗂️ Project Structure

- `src/screens` — App screens (Login, Home, Booking, Calendar, Summary)
- `src/context` — Global state management (user, appointments)
- `src/types` — TypeScript types and interfaces
- `src/constants` — App constants (specialties, schedules)

## ❓ Troubleshooting

- See the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
- Make sure all dependencies are installed, Metro is running, and your emulator/simulator is set up.

## 📚 Useful Links

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

Let me know if you want to add or change anything!
