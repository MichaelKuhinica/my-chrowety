var pin = document.getElementById('oauth_pin').innerText;
chrome.extension.sendRequest({
  'autorizar': true,
  'pin': pin
});