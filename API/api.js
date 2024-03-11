let Base_URL;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    Base_URL = 'http://localhost:3000/api';
} else {
    Base_URL = 'https://my-brand-backend-8mqk.onrender.com/api';

}

export default Base_URL;