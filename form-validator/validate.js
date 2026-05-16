function validateForm() {
  let valid = true;

  const fields = [
    { id: 'username',  errId: 'usernameErr',  label: 'Username',   minLen: 3 },
    { id: 'firstName', errId: 'firstNameErr', label: 'First name', minLen: 2 },
    { id: 'lastName',  errId: 'lastNameErr',  label: 'Last name',  minLen: 2 },
    { id: 'email',     errId: 'emailErr',     label: 'Email',      minLen: 0 },
    { id: 'message',   errId: 'messageErr',   label: 'Message',    minLen: 10 },
  ];

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    const val = el.value.trim();

    el.classList.remove('error');
    err.textContent = '';

    if (!val) {
      err.textContent = `${f.label} is required.`;
      el.classList.add('error');
      valid = false;
    } else if (f.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err.textContent = 'Enter a valid email.';
      el.classList.add('error');
      valid = false;
    } else if (f.minLen && val.length < f.minLen) {
      err.textContent = `${f.label} must be at least ${f.minLen} characters.`;
      el.classList.add('error');
      valid = false;
    }
  });

  if (valid) alert('Form submitted successfully!');
}