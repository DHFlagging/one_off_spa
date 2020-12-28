import { CDMapi } from "../../api";

export function submitEntry(imgData, comment, callback) {
  const comments = [
    "Got Ugly?",
    "Does this sweater accentuate me well?",
    "I love xmas sweaters!!",
    "Ma, just take the picture",
  ];
  const random = Math.floor(Math.random() * comments.length);
  CDMapi.post("/ugly_sweater_submission", {
    imageUrl: imgData,
    comment: comment === "" ? comments[random] : comment,
  })
    .then((response) => callback(response))
    .catch((error) => callback(error));
}

export function updateEntry(submission, imgData, comment, callback) {
  const comments = [
    "Got Ugly?",
    "Does this sweater accentuate me well?",
    "I love xmas sweaters!!",
    "Ma, just take the picture",
  ];
  const random = Math.floor(Math.random() * comments.length);
  CDMapi.put("/ugly_sweater_submission/"+submission, {
    imageUrl: imgData,
    comment: comment === "" ? comments[random] : comment,
  })
    .then((response) => callback(response))
    .catch((error) => callback(error));
}

export function getEntries(dataCallback)
{
  CDMapi.get('/ugly_sweater_submission').then(response => dataCallback(response.data))
}