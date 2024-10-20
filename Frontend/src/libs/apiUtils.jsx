import axios from 'axios';
import shrek from '../assets/shrek/shrek.svg';
import ane from '../assets/shrek/ane.svg';
import chatpotte from '../assets/shrek/chatpotte.svg';
import fiona from '../assets/shrek/fiona.svg';
import pinocchio from '../assets/shrek/pinocchio.svg';
import ptitbiscuit from '../assets/shrek/ptitbiscuit.svg';
import lordfarquaad from '../assets/shrek/lordfarquaad.svg';
import charmant from '../assets/shrek/charmant.svg';
import marrainelabonnefee from '../assets/shrek/marrainelabonnefee.svg';
import tracassin from '../assets/shrek/tracassin.svg';

export const axiosRequest = async ({ method, url, setStateFunction = null, data = null, headers = null, suppressErrorLog = false, liked = null }) => {
    try {
        const config = { method, url, headers, data };
        const response = await axios(config);
        if (liked !== null) {
            const transformedData = response.data.reduce((acc, el) => { acc[el._id] = true; return acc; }, {});
            if (setStateFunction !== null) setStateFunction(transformedData);
            return transformedData;
        } else {
            if (setStateFunction !== null) setStateFunction(response.data);
            return response.data;
        }
    } catch (error) {
        if (!suppressErrorLog) console.error(`Error in Axios request to ${url}`, error.response || error);
        return null;
    }
};


export const profilePictures = [
    { name: "Shrek", image: shrek },
    { name: "Âne", image: ane },
    { name: "Chat Potté", image: chatpotte },
    { name: "Fiona", image: fiona },
    { name: "Pinocchio", image: pinocchio },
    { name: "P'tit Biscuit", image: ptitbiscuit },
    { name: "Lord Farquaad", image: lordfarquaad },
    { name: "Charmant", image: charmant },
    { name: "Marraine la bonne fée", image: marrainelabonnefee },
    { name: "Tracassin", image: tracassin },

];

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

export const calculateAge = (birthdate) => {
    const today = new Date(), birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
};