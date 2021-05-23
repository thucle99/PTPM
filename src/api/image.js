import axios from "axios";
// export function getListImage(page) {
//   return axios.get(`https://picsum.photos/v2/list?page=${page}&limit=9`);
// }

const url="https://api.unsplash.com/collections/317099/photos?client_id=fuOu4odHIMZNCseveRF1qVtYgBE19N5Yt9ET01QehZk&page=6&per_page=100&fbclid=IwAR3MbrcvOxgwAFcMFh0Q7v4Aiuety4_eQFcku9Pzobp7H4ypLNgpTdYE1Qg"
export function getListImage(page) {
  return axios.get(url);
}

export function downloadImage(urlImage,idImage) {
  return  axios({
    url: urlImage, 
    method: 'GET',
    responseType: 'blob', // important
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', idImage+'.jpg'); //or any other extension
    document.body.appendChild(link);
    link.click();
 });
}
