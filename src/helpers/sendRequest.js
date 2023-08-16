import httpRequest from './httpRequest';

/**
 * Send POST request to Hubspot batch association endpoint. Max number of associations per hit is 2000.
 * @param {*} data 
 * @returns {Promise} Promise object represents the response from the Hubspot CRM API containing association data.
 */
export default async function sendRequest(data, method, endpoint) {
  var options = {
    "method": method,
    "port": null,
    "path": endpoint,
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      // "authorization": `Bearer ${process.env.PAPP_API_KEY}`
    }
  };

  console.log("Sending request...");
  console.log("> options", options);
  console.log("> data", data);

  // promisified POST request
  return httpRequest(options, data)
    .then(function(body) {
      return body;
    })
    .catch(function(err) {
      return err;
    });
}