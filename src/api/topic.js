import axios from "axios";

const urlGetTopic="https://api.unsplash.com/topics?client_id=fuOu4odHIMZNCseveRF1qVtYgBE19N5Yt9ET01QehZk"

export function getListTopic() {
  return axios.get(urlGetTopic);
}

// export function getListImage(page) {
//     return axios.get(`https://api.unsplash.com/topics/bo8jQKTaE0Y/photos?client_id=fuOu4odHIMZNCseveRF1qVtYgBE19N5Yt9ET01QehZk`);
//   }


