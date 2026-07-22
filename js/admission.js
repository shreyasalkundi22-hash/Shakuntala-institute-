/* Admission Engine & Quick Enquiry Form Validation */

document.addEventListener('DOMContentLoaded', () => {
  const admissionModal = document.getElementById('admissionModal');
  const openAdmissionBtns = document.querySelectorAll('.trigger-apply-modal');
  const closeAdmissionBtn = document.getElementById('closeAdmissionBtn');
  const admissionForm = document.getElementById('admissionForm');
  const enquiryForm = document.getElementById('enquiryForm');

  // Open Modal
  openAdmissionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (admissionModal) admissionModal.classList.add('active');
    });
  });

  // Close Modal
  if (closeAdmissionBtn && admissionModal) {
    closeAdmissionBtn.addEventListener('click', () => {
      admissionModal.classList.remove('active');
    });

    admissionModal.addEventListener('click', (e) => {
      if (e.target === admissionModal) {
        admissionModal.classList.remove('active');
      }
    });
  }

  // Handle Admission Form Submission
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎉 Application Submitted Successfully! Our Admissions Team will contact you within 24 hours.');
      admissionForm.reset();
      if (admissionModal) admissionModal.classList.remove('active');
    });
  }

  // Handle Enquiry Form Submission
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Thank you for your enquiry! A counselor will call you shortly.');
      enquiryForm.reset();
    });
  }

  // Toast Notification System
  function showToast(message) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4500);
  }
});
