import { BASE_URL } from "./BASE_URL";
import axios from "axios";
export function getVideoData() {
  return axios.get(`${BASE_URL}get_all_videos`);
}
export function uploadFile(data) {
  return axios.post(`${BASE_URL}uploadFile`, data);
}
export function getVideoWithSubtitle(id) {
  return axios.get(`${BASE_URL}get_video_with_subtitle/${id}`);
}
export function upldateSubtitles(data) {
  return axios.put(`http://127.0.0.1:5000/upldateSubtitles`,data);
}

// module.export = getVideoData
