import {BASE_URL} from "./BASE_URL";

export function getVideoData(axios) {
  return axios.get(`${BASE_URL}get_all_videos`);
}
export function uploadFile(axios,data) {
  return axios.post(`${BASE_URL}uploadFile`,data);
}
export function getVideoWithSubtitle(axios,id) {
  return axios.get(`${BASE_URL}get_video_with_subtitle/${id}`);
}

// module.export = getVideoData
