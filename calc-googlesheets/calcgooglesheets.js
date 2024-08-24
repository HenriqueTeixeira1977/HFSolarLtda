const scriptURL =                       
"https://script.google.com/macros/s/AKfycbyKDOlZMCMyXt4xVwjK8B8jnOsTc-hA_SHesFl8HKrnfFnetH8Xa_NmXh4P0gdFX_chWA/exec";

const form = document.forms["submit-to-google-sheet"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  var formData = new FormData(form);
  var terms = document.getElementById("terms").checked;
  if (terms) {
    formData.append("terms", "Yes");
  } else {
    formData.append("terms", "No");
  }

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      swal("Done", "Submitted Successfully.", "success");
    })
    .catch((error) => {
      swal("Error", "Something went wrong. please try again!", "error");
    });
});