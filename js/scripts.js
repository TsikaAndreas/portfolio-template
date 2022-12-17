//Get the button
let mybutton = document.getElementById("btn-scroll-up");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// EmailJS Functionality
document.getElementById('contact-form').addEventListener('submit', emailjs);

function emailjs(event) {
  event.preventDefault(); // prevent reload

  let form = event.target;
  let formData = new FormData(form);
  formData.append('service_id', 'service_ij7vtfc');
  formData.append('template_id', 'template_mkwvlpk');
  formData.append('user_id', 'Nz0VCnHh8uuXTW1-w');

  let url = 'https://api.emailjs.com/api/v1.0/email/send-form';
  let req = new Request(url, {
    body: formData,
    method: 'POST',
  });

  fetch(req)
    .then((res) => {
      if (res.ok) {
        createEmailMessage('success', 'The message was sent successfully.');
      } else {
        createEmailMessage(null, 'Sorry something went wrong. (Status: ' + res.status + ') ' + res.statusText);
      }
    })
    .catch((error) => {
      createEmailMessage('error', error);
    });

}

function createEmailMessage(type, message) {
  let cf = document.querySelectorAll('#contact-form')[0];
  let el = document.createElement('div');
  
  el.classList.add('form-status');

  switch(type) {
    case 'success': 
      el.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fa-solid fa-circle-check"></i><span class="mx-3">` + message + `</span>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`
      break;
    case 'error':
      el.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="fa-solid fa-circle-exclamation"></i><span class="mx-3">` + message + `</span>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`
      break;
    default:
      el.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <i class="fa-solid fa-triangle-exclamation"></i><span class="mx-3">` + message + `</span>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`
  }

  cf.appendChild(el);
}