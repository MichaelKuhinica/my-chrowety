var pin = document.getElementById('oauth_pin').innerText;
chrome.extension.sendRequest({
  'autorisar': true,
  'pin': pin
});