let STORAGE_URI;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    STORAGE_URI = 'http://localhost:3000/uploads'
} else {
    STORAGE_URI = 'https://my-brand-backend-8mqk.onrender.com/uploads'

}

export default STORAGE_URI;