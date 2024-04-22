/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 * @returns a Promise that should be filled with the response of the GET request
 * parsed as a JSON object and returned in the property named "data" of an
 * object. If the request has an error, the Promise should be rejected with an
 * object that contains the properties:
 * {number} status          The HTTP response status
 * {string} statusText      The statusText from the xhr request
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();

      // Configure it: GET-request for the URL
      xhr.open('GET', url, true);

      // Send the request over the network
      xhr.send();

      // This will be called after the response is received
      xhr.onload = function() {
          if (xhr.status !== 200) { // analyze HTTP response status
              reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`)); // e.g. 404: Not Found
          } else { // show the result
              // response is the server response
              let data = JSON.parse(xhr.responseText);
              resolve(data); // we got the data, let's resolve the Promise
          }
      };

      xhr.onerror = function() {
          reject(new Error("Network Error")); // network errors
      };

      xhr.ontimeout = function() {
          reject(new Error("Request timed out")); // timeout errors
      };
  });
}


export default fetchModel;
