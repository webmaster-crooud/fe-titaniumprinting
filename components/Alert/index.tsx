import Swal from 'sweetalert2';

export const showAlert = async (type: string | undefined, message: string) => {
   if (type === 'success') {
      const toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 2500,
         width: '40%',
         background: 'rgba(67,97,238,1)',
      });
      toast.fire({
         icon: 'success',
         title: message,
         padding: '10px 20px',
      });
   } else if (type === 'warning') {
      const toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 2500,
         width: '40%',
         backdrop: '#eab308',
      });
      toast.fire({
         icon: 'warning',
         title: message,
         padding: '10px 20px',
      });
   } else {
      const toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 2500,
         width: '40%',
         background: '#e7515a',
      });
      toast.fire({
         icon: 'error',
         title: message,
         padding: '10px 20px',
      });
   }
};
