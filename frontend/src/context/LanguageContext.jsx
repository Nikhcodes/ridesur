import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // General
    appName: 'RideSur',
    logout: 'Logout',
    loading: 'Loading...',

    // Login
    welcomeBack: 'Welcome back',
    loginTitle: 'Log in to your account',
    email: 'Email',
    password: 'Password',
    loginBtn: 'Log in',
    loggingIn: 'Logging in...',
    noAccount: "Don't have an account?",
    registerHere: 'Register here',

    // Register
    createAccount: 'Create your account',
    getStarted: 'Get started',
    fullName: 'Full name',
    phone: 'Phone number',
    iAm: 'I am a',
    passenger: 'Passenger',
    driver: 'Driver',
    createBtn: 'Create account',
    creatingBtn: 'Creating account...',
    alreadyAccount: 'Already have an account?',
    loginHere: 'Log in here',

    // Passenger Dashboard
    welcomeBackName: 'Welcome back',
    whatDoYouNeed: 'What do you need?',
    bookRide: 'Book a Ride',
    requestTaxi: 'Request a taxi now',
    rideHistory: 'Ride History',
    viewPastRides: 'View past rides',
    profile: 'Profile',
    manageInfo: 'Manage your info',
    rideStatus: 'Ride Status',
    trackRide: 'Track your ride',
    yourAccount: 'Your Account',
    name: 'Name',
    role: 'Role',

    // Driver Dashboard
    driverPanel: 'Driver panel',
    availability: 'Availability',
    visibleToPassengers: 'You are visible to passengers',
    hiddenFromPassengers: 'You are hidden from passengers',
    online: 'Online',
    offline: 'Offline',
    actions: 'Actions',
    rideRequests: 'Ride Requests',
    viewOpenRides: 'View open rides',
    currentRide: 'Current Ride',
    manageActiveRide: 'Manage active ride',
    earnings: 'Earnings',
    viewIncome: 'View your income',
    pastRides: 'Past completed rides',

    // Admin Dashboard
    adminPanel: 'Admin panel',
    managePlatform: 'Manage Platform',
    users: 'Users',
    viewAllUsers: 'View all registered users',
    drivers: 'Drivers',
    viewAllDrivers: 'View all registered drivers',
    rides: 'Rides',
    viewAllRides: 'View all rides on the platform',
  },

  nl: {
    // General
    appName: 'RideSur',
    logout: 'Uitloggen',
    loading: 'Laden...',

    // Login
    welcomeBack: 'Welkom terug',
    loginTitle: 'Log in op je account',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    loginBtn: 'Inloggen',
    loggingIn: 'Inloggen...',
    noAccount: 'Heb je geen account?',
    registerHere: 'Registreer hier',

    // Register
    createAccount: 'Maak je account aan',
    getStarted: 'Aan de slag',
    fullName: 'Volledige naam',
    phone: 'Telefoonnummer',
    iAm: 'Ik ben een',
    passenger: 'Passagier',
    driver: 'Chauffeur',
    createBtn: 'Account aanmaken',
    creatingBtn: 'Account aanmaken...',
    alreadyAccount: 'Heb je al een account?',
    loginHere: 'Log hier in',

    // Passenger Dashboard
    welcomeBackName: 'Welkom terug',
    whatDoYouNeed: 'Wat heb je nodig?',
    bookRide: 'Rit boeken',
    requestTaxi: 'Vraag nu een taxi aan',
    rideHistory: 'Ritgeschiedenis',
    viewPastRides: 'Bekijk eerdere ritten',
    profile: 'Profiel',
    manageInfo: 'Beheer je gegevens',
    rideStatus: 'Ritstatus',
    trackRide: 'Volg je rit',
    yourAccount: 'Jouw Account',
    name: 'Naam',
    role: 'Rol',

    // Driver Dashboard
    driverPanel: 'Chauffeurspaneel',
    availability: 'Beschikbaarheid',
    visibleToPassengers: 'Je bent zichtbaar voor passagiers',
    hiddenFromPassengers: 'Je bent verborgen voor passagiers',
    online: 'Online',
    offline: 'Offline',
    actions: 'Acties',
    rideRequests: 'Ritverzoeken',
    viewOpenRides: 'Bekijk open ritten',
    currentRide: 'Huidige Rit',
    manageActiveRide: 'Beheer actieve rit',
    earnings: 'Inkomsten',
    viewIncome: 'Bekijk je inkomsten',
    pastRides: 'Voltooide ritten',

    // Admin Dashboard
    adminPanel: 'Beheerderspaneel',
    managePlatform: 'Platform beheren',
    users: 'Gebruikers',
    viewAllUsers: 'Bekijk alle geregistreerde gebruikers',
    drivers: 'Chauffeurs',
    viewAllDrivers: 'Bekijk alle geregistreerde chauffeurs',
    rides: 'Ritten',
    viewAllRides: 'Bekijk alle ritten op het platform',
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const toggle = () => setLanguage(prev => prev === 'en' ? 'nl' : 'en')

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}