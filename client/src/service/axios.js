import axios from "axios";
const appClient = axios.create({
  baseURL: "https://dvaapi.pythonanywhere.com/api/",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("_gxcd"),
  },
});

export default {
  addFamilyHistory(payload) {
    return appClient.post("family_history/", payload);
  },
  updateDiseases(payload) {
    return appClient.put("disease_library/" + payload.id + "/", payload);
  },
  getDiseases(id) {
    return appClient.get("disease_library/" + id + "/");
  },
  getDiseasesList() {
    return appClient.get("disease_library/");
  },
  addDiseases(payload) {
    return appClient.post("disease_library/", payload);
  },
  login(payload) {
    return appClient.post("https://dvaapi.pythonanywhere.com/login/", payload);
  },
  patientCreate(payload) {
    return appClient.post("patients/", payload);
  },
  getPatientList() {
    return appClient.get("patients/");
  },
  getPatientProfile(id) {
    return appClient.get("patients/" + id + "/");
  },
  updatePatient(payload) {
    return appClient.put("patients/" + payload.id + "/", payload);
  },
  searchPatient(payload) {
    return appClient.get(
      "patients/?name=" +
        payload.name +
        "&phone=" +
        payload.phone +
        "&sex=" +
        payload.sex +
        "&age_min=" +
        payload.age_min +
        "&age_max=" +
        payload.age_max
    );
  },
};
