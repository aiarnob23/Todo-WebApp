import Swal from "sweetalert2";

export const successAlert = (notificationMessage) => {
  Swal.fire({
    title: `${notificationMessage}`,
    text: "You can explore home page now",
    icon: "success",
    confirmButtonText: "Ok",
  });
};

export const errorAlert = (notificationMessage) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${notificationMessage}`,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
};
