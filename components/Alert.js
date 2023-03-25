import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/bootstrap.css';

export const Alert = ({ message, type }) => {
    const alertify = require('alertifyjs');

    alertify.notify(message, type, 3);
    return null;
}
