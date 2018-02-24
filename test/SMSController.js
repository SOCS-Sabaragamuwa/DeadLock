var requestify = require("requestify");

const url = `https://sv2.ideamarthosting.dialog.lk/mahesh950218/mahesh950218Apps/deadlock/sms.php`;

function send() {
  console.log("call");
  requestify
    .get(url, {
      params: {
        action: "0766764493"
      }
    })
    .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
      response.getBody();
    });
}

send();
