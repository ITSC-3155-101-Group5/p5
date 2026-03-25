/**
 * fetchModel - Fetch a model from the web server.
 *    url - string - The URL to issue the GET request.
 * Returns: a Promise that resolves with:
 *    { data: <parsed JSON response> }
 * or rejects with:
 *    { status: <HTTP status>, statusText: <status text> }
 */

function fetchModel(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // async GET request

    // Called when request state changes
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const jsonData = JSON.parse(xhr.responseText);
            resolve({ data: jsonData });
          } catch (err) {
            reject({
              status: xhr.status,
              statusText: "Invalid JSON response"
            });
          }
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      }
    };

    // Handle network errors
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText || "Network Error"
      });
    };

    xhr.send();
  });
}

export default fetchModel;