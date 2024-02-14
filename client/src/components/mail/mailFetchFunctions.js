export const postMail = (bodyMail, setMessage) => {
  fetch('/mail/new', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyMail)
  })
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.status === 201) {
        console.log(`mailFunctions.js postMail success`, jsonData);
      }
      setMessage(jsonData.data.insertedId);
    })
};

export const getMail = (mailId, setMail, setMessage) => {
  fetch(`/mail/get/${mailId}`)
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.status === 200) {
        setMail(jsonData.data);
      } else {
        setMail(null);
      }
      setMessage(jsonData.message);
    })
};

// Get the parameters from MyMail.js. Triggered by a useEffect in MyMails.js.
// the parameters are obtained from MyMails.js (see useEffect).
// The server will return the mails specific to the userId, and will take in consideration its mailOption (that will be used as a filter in getUserMails.js in the backend).
// The states of setMail and setMessage will then be updated.
export const getUserMailsOnOption = (userId, mailOption, setMail, setMessage) => {
  fetch(`/mails/get/${userId}/${mailOption}`)
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.status === 200) {
        setMail(jsonData.data);
      } else {
        setMail(null);
      }
      setMessage(jsonData.message);
    })
};

export const patchMail = (mailId, bodyMail, setMessage) => {
  fetch(`/mail/mod/${mailId}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyMail)
  })
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.status === 200) {
        setMessage(jsonData.message);
      }
    })
};

export const deleteMail = (mailId, setMail, setMessage) => {
  fetch(`/mail/del/${mailId}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.status === 200) {
        setMail(jsonData.data);
      }
      setMessage(jsonData.message);
    })
};