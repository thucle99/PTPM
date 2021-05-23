import axios from "axios";


export function getUser(idUser) {
    return axios.get(`https://api.unsplash.com/users/${idUser}?client_id=fuOu4odHIMZNCseveRF1qVtYgBE19N5Yt9ET01QehZk`);
  }


