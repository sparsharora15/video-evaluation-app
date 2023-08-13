import {BASE_URL} from "./BASE_URL";
import axios from "axios"
export function getVideoData() {
  return axios.get(`${BASE_URL}get_all_videos`);
}
export function uploadFile(data) {
  return axios.post(`${BASE_URL}uploadFile`,data);
}
export function getVideoWithSubtitle(id) {
  return axios.get(`${BASE_URL}get_video_with_subtitle/${id}`);
}

// module.export = getVideoData
