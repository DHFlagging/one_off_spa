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
  CDMapi.put("/ugly_sweater_submission/" + submission, {
    imageUrl: imgData,
    comment: comment === "" ? comments[random] : comment,
  })
    .then((response) => callback(response))
    .catch((error) => callback(error));
}

export function voteForSubmission(submission_id, callback) {
  CDMapi.post("/ugly_sweater_I_voted", {
    id: submission_id,
  }).then(() => getWhoIVotedFor(callback));
}

export function deleteVoteForSubmission(id, callback) {
  CDMapi.delete("/ugly_sweater_I_voted/"+id).then(() => getWhoIVotedFor(callback));
}

export function getEntries(dataCallback) {
  CDMapi.get("/ugly_sweater_submission").then((response) =>
    dataCallback(response.data)
  );
}

export function getWhoIVotedFor(dataCallback) {
  CDMapi.get("/ugly_sweater_who_I_voted_for").then((response) =>
    dataCallback(response.data)
  );
}
