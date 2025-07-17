import toast, { Toaster } from 'react-hot-toast';

const showToast = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'loading':
            toast.loading(message);
            break;
        default:
            toast(message);
    }
};

export default showToast;
