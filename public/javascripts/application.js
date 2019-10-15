/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

//call counter

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// copy button

import 'govuk-frontend/govuk/vendor/polyfills/Event'
import ClipboardJS from 'clipboard'

function Copy ($module) {
  this.$module = $module
}

Copy.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }
  var $button = document.createElement('button')
  $button.className = 'app-copy-button js-copy-button'
  $button.setAttribute('aria-live', 'assertive')
  $button.textContent = 'Copy code'

  $module.insertBefore($button, $module.firstChild)
  this.copyAction()
}
Copy.prototype.copyAction = function () {
  // Copy to clipboard
  try {
    new ClipboardJS('.js-copy-button', {
      target: function (trigger) {
        return trigger.nextElementSibling
      }
    }).on('success', function (e) {
      e.trigger.textContent = 'Code copied'
      e.clearSelection()
      setTimeout(function () {
        e.trigger.textContent = 'Copy code'
      }, 5000)
    })
  } catch (err) {
    if (err) {
      console.log(err.message)
    }
  }
}

export default Copy
