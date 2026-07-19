document.addEventListener('DOMContentLoaded', () => {
  // Stats base offsets for calculations
  const STAT_OFFSETS = {
    newEmployee: 1005,
    resignEmployee: 102,
    onLeave: 23,
    newApplication: 200
  };

  // SPA View Routing States
  let currentView = 'dashboard'; 
  const navDashboard = document.getElementById('navDashboard');
  const navEmployees = document.getElementById('navEmployees');
  const navAttendances = document.getElementById('navAttendances');
  const navCalendar = document.getElementById('navCalendar');
  const navPayroll = document.getElementById('navPayroll');
  const navLeaves = document.getElementById('navLeaves');
  const navDocuments = document.getElementById('navDocuments');
  const navApps = document.getElementById('navApps');
  const navSettings = document.getElementById('navSettings');
  
  const dashboardView = document.getElementById('dashboardView');
  const employeesView = document.getElementById('employeesView');
  const attendancesView = document.getElementById('attendancesView');
  const calendarView = document.getElementById('calendarView');
  const payrollView = document.getElementById('payrollView');
  const leavesView = document.getElementById('leavesView');
  const documentsView = document.getElementById('documentsView');
  const appsView = document.getElementById('appsView');
  const settingsView = document.getElementById('settingsView');
  const breadcrumbNav = document.getElementById('breadcrumbNav');

  // Login/Auth Components & State Toggling
  const loginPageView = document.getElementById('loginPageView');
  const appContainer = document.querySelector('.app-container');
  const loginForm = document.getElementById('loginForm');
  const userProfileCard = document.querySelector('.user-profile');

  // Forgot Password, OTP & New Password Elements
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const backToLoginBtn = document.getElementById('backToLoginBtn');
  const loginFormContainer = document.getElementById('loginFormContainer');
  const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  
  const otpFormContainer = document.getElementById('otpFormContainer');
  const otpForm = document.getElementById('otpForm');
  const backToForgotBtn = document.getElementById('backToForgotBtn');
  const otpInputs = document.querySelectorAll('.otp-digit');

  const newPasswordFormContainer = document.getElementById('newPasswordFormContainer');
  const newPasswordForm = document.getElementById('newPasswordForm');
  const backToOtpBtn = document.getElementById('backToOtpBtn');

  // Auth slide dot indicators
  const loginDot1 = document.getElementById('loginDot1');
  const loginDot2 = document.getElementById('loginDot2');
  const loginDot3 = document.getElementById('loginDot3');
  const loginDot4 = document.getElementById('loginDot4');

  function setAuthDots(activeDotIndex) {
    const dots = [loginDot1, loginDot2, loginDot3, loginDot4];
    dots.forEach((dot, index) => {
      if (dot) {
        if (index === activeDotIndex) {
          dot.style.background = '#4F46E5';
        } else {
          dot.style.background = '#CBD5E1';
        }
      }
    });
  }

  // Toggling Forgot Password view
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginFormContainer) loginFormContainer.style.display = 'none';
      if (forgotPasswordContainer) forgotPasswordContainer.style.display = 'flex';
      if (otpFormContainer) otpFormContainer.style.display = 'none';
      if (newPasswordFormContainer) newPasswordFormContainer.style.display = 'none';
      setAuthDots(1); // Make second dot active
    });
  }

  function returnToLoginState() {
    if (loginFormContainer) loginFormContainer.style.display = 'flex';
    if (forgotPasswordContainer) forgotPasswordContainer.style.display = 'none';
    if (otpFormContainer) otpFormContainer.style.display = 'none';
    if (newPasswordFormContainer) newPasswordFormContainer.style.display = 'none';
    setAuthDots(0); // Make first dot active
  }

  if (backToLoginBtn) {
    backToLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      returnToLoginState();
    });
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (forgotPasswordContainer) forgotPasswordContainer.style.display = 'none';
      if (otpFormContainer) otpFormContainer.style.display = 'flex';
      if (newPasswordFormContainer) newPasswordFormContainer.style.display = 'none';
      setAuthDots(2); // Make third dot active
      
      // Auto focus first OTP input box
      const firstOtp = document.getElementById('otp1');
      if (firstOtp) firstOtp.focus();
    });
  }

  // OTP inputs auto-shifting logic
  if (otpInputs && otpInputs.length > 0) {
    otpInputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });
  }

  if (backToForgotBtn) {
    backToForgotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (forgotPasswordContainer) forgotPasswordContainer.style.display = 'flex';
      if (otpFormContainer) otpFormContainer.style.display = 'none';
      if (newPasswordFormContainer) newPasswordFormContainer.style.display = 'none';
      setAuthDots(1); // Make second dot active
    });
  }

  if (otpForm) {
    otpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = Array.from(otpInputs).map(inp => inp.value).join('');
      if (code === '1509') {
        if (otpFormContainer) otpFormContainer.style.display = 'none';
        if (newPasswordFormContainer) newPasswordFormContainer.style.display = 'flex';
        setAuthDots(3); // Make fourth dot active
      } else {
        alert('Invalid OTP code. Please try again.');
      }
    });
  }

  if (backToOtpBtn) {
    backToOtpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (otpFormContainer) otpFormContainer.style.display = 'flex';
      if (newPasswordFormContainer) newPasswordFormContainer.style.display = 'none';
      setAuthDots(2); // Make third dot active
    });
  }

  if (newPasswordForm) {
    newPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newP = document.getElementById('newPassVal').value;
      const confirmP = document.getElementById('newPassConfirmVal').value;
      if (newP === confirmP) {
        alert('Password updated successfully!');
        returnToLoginState();
      } else {
        alert('Passwords do not match. Please re-enter.');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const credentials = {
        username: document.getElementById('loginUsername').value,
        password: document.getElementById('loginPassword').value
      };
      try {
        const resp = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        const data = await resp.json();
        if (resp.ok) {
          authToken = data.token;
          if (loginPageView) loginPageView.style.display = 'none';
          if (appContainer) appContainer.classList.remove('hidden');
          setView('dashboard');
          // Load initial data
          await fetchEmployees();
          await fetchEvents();
          await fetchIntegrations();
          await fetchSettings();
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        console.error('Login error', err);
        alert('Login error');
      }
    });
  }

  if (userProfileCard) {
    userProfileCard.style.cursor = 'pointer';
    userProfileCard.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginPageView) loginPageView.style.display = 'flex';
      if (appContainer) appContainer.classList.add('hidden');
      returnToLoginState(); // Reset back to default login form state
    });
  }

  // Input searches
  const globalSearch = document.getElementById('globalSearch');
  const appsSearchInput = document.getElementById('appsSearchInput');

  // Modals & Forms
  const employeeModal = document.getElementById('employeeModal');
  const attendanceModal = document.getElementById('attendanceModal');
  const eventModal = document.getElementById('eventModal');
  const integrationModal = document.getElementById('integrationModal');
  
  // JWT token storage
  let authToken = null;

  const employeeForm = document.getElementById('employeeForm');
  const eventForm = document.getElementById('eventForm');
  const integrationForm = document.getElementById('integrationForm');

  // Employee form submit (add/update)
  employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(employeeForm);
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });
    try {
      const method = selectedEmployeeId ? 'PUT' : 'POST';
      const url = selectedEmployeeId ? `/api/employees/${selectedEmployeeId}` : '/api/employees';
      const resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error('Failed to save employee');
      await fetchEmployees();
      // Close modal
      employeeModal.style.display = 'none';
      employeeForm.reset();
      selectedEmployeeId = null;
    } catch (err) {
      console.error(err);
      alert('Error saving employee');
    }
  });
  
  const settingsGeneralTab = document.getElementById('settingsGeneralTab');
  const settingsProfileTab = document.getElementById('settingsProfileTab');
  const settingsCompanyTab = document.getElementById('settingsCompanyTab');
  const settingsNotificationTab = document.getElementById('settingsNotificationTab');
  const settingsSecurityTab = document.getElementById('settingsSecurityTab');
  
  const addEmployeeBtn = document.getElementById('addEmployeeBtn');
  const closeEmployeeModalBtn = document.getElementById('closeEmployeeModalBtn');
  const cancelEmployeeModalBtn = document.getElementById('cancelEmployeeModalBtn');
  const modalTitle = document.getElementById('modalTitle');

  // Event Modal Buttons
  const closeEventModalBtn = document.getElementById('closeEventModalBtn');
  const cancelEventModalBtn = document.getElementById('cancelEventModalBtn');
  const deleteEventBtn = document.getElementById('deleteEventBtn');
  
  // Integration Modal Buttons
  const addNewIntegrationBtn = document.getElementById('addNewIntegrationBtn');
  const closeIntegrationModalBtn = document.getElementById('closeIntegrationModalBtn');
  const cancelIntegrationModalBtn = document.getElementById('cancelIntegrationModalBtn');

  // Actions dropdown
  const actionsDropdown = document.getElementById('actionsDropdown');
  const editRowBtn = document.getElementById('editRowBtn');
  const deleteRowBtn = document.getElementById('deleteRowBtn');
  let selectedEmployeeId = null;

  // Tab Filtering state
  let activeAttFilterTab = 'all'; 
  let activeAppsFilterTab = 'all';

  // Mock department tracker database
  const DEPARTMENTS = [
    { name: 'Product Design', rate: 80, building: 980 },
    { name: 'Engineering', rate: 95, building: 1240 },
    { name: 'Marketing', rate: 70, building: 640 },
    { name: 'Human Resources', rate: 85, building: 210 }
  ];
  let activeDeptIndex = 0;

  // Cached data state
  let cachedEmployees = [];
  let cachedEvents = [];
  let cachedIntegrations = [];
  let cachedSettings = {};
  let tempAvatarBase64 = null; // Holds the user avatar base64 or URL during local preview
  let tempLogoBase64 = null; // Holds the company logo base64 or URL during local preview

  const sidebar = document.getElementById('sidebar');

  // API Call Helpers
  async function fetchEmployees() {
    try {
      const response = await fetch('/api/employees', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      cachedEmployees = await response.json();
      renderAll();
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  }

  async function fetchEvents() {
    try {
      const response = await fetch('/api/events', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      cachedEvents = await response.json();
      renderCalendar();
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  }

  async function fetchIntegrations() {
    try {
      const response = await fetch('/api/integrations', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      cachedIntegrations = await response.json();
      renderIntegrations();
    } catch (err) {
      console.error('Error fetching integrations:', err);
    }
  }

  async function fetchSettings() {
    try {
      const response = await fetch('/api/settings', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      cachedSettings = await response.json();
      applySettingsValues(cachedSettings);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  }

  function applySettingsValues(settings) {
    if (!settings) return;
    
    // Bind General Details inputs
    const setMail = document.getElementById('setMail');
    const setCountry = document.getElementById('setCountry');
    const setLang = document.getElementById('setLang');
    const setTimezone = document.getElementById('setTimezone');
    const setTimeformat = document.getElementById('setTimeformat');
    const setWebsite = document.getElementById('setWebsite');
    const setBio = document.getElementById('setBio');
    const setTheme = document.getElementById('setTheme');

    if (setMail) setMail.value = settings.email || '';
    if (setCountry) setCountry.value = settings.country || 'India';
    if (setLang) setLang.value = settings.language || 'English';
    if (setTimezone) setTimezone.value = settings.timezone || 'UTC +05:30 - India Standard Time';
    if (setTimeformat) setTimeformat.value = settings.timeformat || '24 hours';
    if (setWebsite) setWebsite.value = settings.website || 'Pagedone.com';
    if (setBio) setBio.value = settings.bio || '';
    if (setTheme) setTheme.value = settings.theme || 'Light';

    // Bind Profile inputs
    const setProfileName = document.getElementById('setProfileName');
    const setProfileTitle = document.getElementById('setProfileTitle');
    const setProfilePhone = document.getElementById('setProfilePhone');
    const setProfileEmail = document.getElementById('setProfileEmail');
    const setProfileAddress = document.getElementById('setProfileAddress');
    const setProfileBio = document.getElementById('setProfileBio');
    const avatarPreviewImage = document.getElementById('avatarPreviewImage');
    const globalProfileAvatar = document.getElementById('globalProfileAvatar');

    if (setProfileName) setProfileName.value = settings.profileName || 'Ronald';
    if (setProfileTitle) setProfileTitle.value = settings.profileTitle || 'HR';
    if (setProfilePhone) setProfilePhone.value = settings.profilePhone || '';
    if (setProfileEmail) setProfileEmail.value = settings.profileEmail || 'ronaldrichards@gmail.com';
    if (setProfileAddress) setProfileAddress.value = settings.profileAddress || '';
    if (setProfileBio) setProfileBio.value = settings.profileBio || '';
    
    const avatarUrl = settings.profileAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150';
    if (avatarPreviewImage) avatarPreviewImage.src = avatarUrl;
    if (globalProfileAvatar) globalProfileAvatar.src = avatarUrl;
    tempAvatarBase64 = avatarUrl;

    // Bind Company Profile inputs
    const setCompName = document.getElementById('setCompName');
    const setCompUsername = document.getElementById('setCompUsername');
    const setCompEmail = document.getElementById('setCompEmail');
    const setCompWebsite = document.getElementById('setCompWebsite');
    const setCompFb = document.getElementById('setCompFb');
    const setCompX = document.getElementById('setCompX');
    const setCompIn = document.getElementById('setCompIn');
    const setCompPermEmails = document.getElementById('setCompPermEmails');
    const setCompPermReports = document.getElementById('setCompPermReports');
    const compLogoPreviewImage = document.getElementById('compLogoPreviewImage');

    if (setCompName) setCompName.value = settings.compName || 'Pagedone';
    if (setCompUsername) setCompUsername.value = settings.compUsername || '@Pagedone';
    if (setCompEmail) setCompEmail.value = settings.compEmail || 'info@pagedone.com';
    if (setCompWebsite) setCompWebsite.value = settings.compWebsite || 'www.Pagedone.com';
    if (setCompFb) setCompFb.value = settings.compFb || '@pagedone';
    if (setCompX) setCompX.value = settings.compX || '@pagedone';
    if (setCompIn) setCompIn.value = settings.compIn || '@pagedone';
    
    if (setCompPermEmails) setCompPermEmails.checked = settings.compPermEmails !== false;
    if (setCompPermReports) setCompPermReports.checked = settings.compPermReports === true;

    const logoUrl = settings.compLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150';
    if (compLogoPreviewImage) compLogoPreviewImage.src = logoUrl;
    tempLogoBase64 = logoUrl;

    // Bind Notification inputs
    const setNotifyDaily = document.getElementById('setNotifyDaily');
    const setNotifyNewEvent = document.getElementById('setNotifyNewEvent');
    const setNotifyNewTeam = document.getElementById('setNotifyNewTeam');
    const setNotifyReminders = document.getElementById('setNotifyReminders');
    const setNotifyPromotions = document.getElementById('setNotifyPromotions');
    const setNotifyEmails = document.getElementById('setNotifyEmails');
    const setNotifySms = document.getElementById('setNotifySms');
    const setNotifyMobile = document.getElementById('setNotifyMobile');
    const setNotifyDesktop = document.getElementById('setNotifyDesktop');

    if (setNotifyDaily) setNotifyDaily.checked = settings.notifyDaily !== false;
    if (setNotifyNewEvent) setNotifyNewEvent.checked = settings.notifyNewEvent === true;
    if (setNotifyNewTeam) setNotifyNewTeam.checked = settings.notifyNewTeam === true;
    
    if (setNotifyReminders) setNotifyReminders.checked = settings.notifyReminders !== false;
    if (setNotifyPromotions) setNotifyPromotions.checked = settings.notifyPromotions === true;
    if (setNotifyEmails) setNotifyEmails.checked = settings.notifyEmails === true;
    if (setNotifySms) setNotifySms.checked = settings.notifySms !== false;
    if (setNotifyMobile) setNotifyMobile.checked = settings.notifyMobile === true;
    if (setNotifyDesktop) setNotifyDesktop.checked = settings.notifyDesktop !== false;

    // Bind Security inputs
    const setSecurityRecoveryEmail = document.getElementById('setSecurityRecoveryEmail');
    const setSecurityTwoFactorEnabled = document.getElementById('setSecurityTwoFactorEnabled');

    if (setSecurityRecoveryEmail) setSecurityRecoveryEmail.value = settings.securityRecoveryEmail || 'info@pagedone.com';
    if (setSecurityTwoFactorEnabled) setSecurityTwoFactorEnabled.checked = settings.securityTwoFactorEnabled !== false;

    // Apply live theme style override
    if (settings.theme === 'Dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  // Render Engine
  function renderAll() {
    // 1. Dashboard status table
    const dbTableBody = document.querySelector('#dashboardTable tbody');
    if (dbTableBody) {
      dbTableBody.innerHTML = '';
      cachedEmployees.forEach(emp => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', emp.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-checkbox"></td>
          <td>
            <div class="user-cell">
              <img src="${emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${emp.name}" class="cell-avatar">
              <div class="cell-info">
                <span class="cell-name">${escapeHTML(emp.name)}</span>
                <span class="cell-email">${escapeHTML(emp.email)}</span>
              </div>
            </div>
          </td>
          <td>${escapeHTML(emp.dept)}</td>
          <td>${escapeHTML(emp.date)}</td>
          <td>
            <span class="status-chip ${emp.status.toLowerCase()}">
              <span class="status-dot"></span>
              ${emp.status}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="action-btn menu-trigger" data-id="${emp.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </td>
        `;
        dbTableBody.appendChild(tr);
      });
    }

    // 2. Employees grid list table
    const empTableBody = document.querySelector('#employeesTable tbody');
    if (empTableBody) {
      empTableBody.innerHTML = '';
      cachedEmployees.forEach(emp => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', emp.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-checkbox"></td>
          <td>
            <div class="user-cell">
              <img src="${emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${emp.name}" class="cell-avatar">
              <div class="cell-info">
                <span class="cell-name">${escapeHTML(emp.name)}</span>
                <span class="cell-email">${escapeHTML(emp.email)}</span>
              </div>
            </div>
          </td>
          <td>${escapeHTML(emp.role || 'UI Designer')}</td>
          <td>${escapeHTML(emp.dept)}</td>
          <td>${escapeHTML(emp.mobile || '+12 3456 7890')}</td>
          <td>${escapeHTML(emp.date)}</td>
          <td>
            <span class="status-chip ${emp.status.toLowerCase()}">
              <span class="status-dot"></span>
              ${emp.status}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="action-btn menu-trigger" data-id="${emp.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </td>
        `;
        empTableBody.appendChild(tr);
      });
    }

    // 3. Attendances View Table
    const attTableBody = document.querySelector('#attendanceTable tbody');
    if (attTableBody) {
      attTableBody.innerHTML = '';
      
      let filtered = cachedEmployees;
      if (activeAttFilterTab === 'present') {
        filtered = cachedEmployees.filter(e => e.status === 'Active' || e.status === 'Onboarding');
      } else if (activeAttFilterTab === 'leave') {
        filtered = cachedEmployees.filter(e => e.status === 'Inactive');
      }

      filtered.forEach(emp => {
        let attStatus = 'Present';
        let attClass = 'active';
        if (emp.status === 'Inactive') {
          attStatus = 'On Leave';
          attClass = 'inactive';
        } else if (emp.status === 'Onboarding') {
          attStatus = 'Intern';
          attClass = 'onboarding';
        }

        const tr = document.createElement('tr');
        tr.setAttribute('data-id', emp.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-checkbox"></td>
          <td>
            <div class="user-cell">
              <img src="${emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${emp.name}" class="cell-avatar">
              <div class="cell-info">
                <span class="cell-name">${escapeHTML(emp.name)}</span>
                <span class="cell-email">${escapeHTML(emp.email)}</span>
              </div>
            </div>
          </td>
          <td>${escapeHTML(emp.dept)}</td>
          <td>${escapeHTML(emp.date)}</td>
          <td>
            <span class="status-chip ${attClass}">
              <span class="status-dot"></span>
              ${attStatus}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="action-btn menu-trigger" data-id="${emp.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </td>
        `;
        attTableBody.appendChild(tr);
      });
    }

    // 4. Payroll View Table
    const payTableBody = document.querySelector('#payrollTable tbody');
    if (payTableBody) {
      payTableBody.innerHTML = '';
      cachedEmployees.forEach(emp => {
        const periodStr = emp.period || 'Monthly';
        const endDateStr = emp.endDate || 'Jun. 27, 2024';
        const salaryStr = emp.salary || '$800';
        const payStatusStr = emp.payStatus || 'In Progress';
        
        let statusClass = 'in-progress';
        if (payStatusStr.toLowerCase() === 'pending') statusClass = 'pending';
        if (payStatusStr.toLowerCase() === 'completed') statusClass = 'completed';

        const tr = document.createElement('tr');
        tr.setAttribute('data-id', emp.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-checkbox"></td>
          <td>
            <div class="user-cell">
              <img src="${emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${emp.name}" class="cell-avatar">
              <div class="cell-info">
                <span class="cell-name">${escapeHTML(emp.name)}</span>
                <span class="cell-email">${escapeHTML(emp.email)}</span>
              </div>
            </div>
          </td>
          <td>${escapeHTML(emp.dept)}</td>
          <td>
            <div style="display:flex; flex-direction:column;">
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-dark);">${periodStr === 'Monthly' ? '3/08/2024 - 4/09/2024' : '13/08/2024 - 19/08/2024'}</span>
              <span style="font-size:0.7rem; color:var(--text-muted);">${periodStr}</span>
            </div>
          </td>
          <td>${escapeHTML(endDateStr)}</td>
          <td>
            <div style="display:flex; flex-direction:column;">
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-dark);">${salaryStr.split(' ')[0]}</span>
              <span style="font-size:0.7rem; color:var(--text-muted);">${salaryStr.includes('/hr') ? 'Hourly' : 'Fix Amount'}</span>
            </div>
          </td>
          <td>
            <span class="status-chip ${statusClass}">
              <span class="status-dot"></span>
              ${payStatusStr}
            </span>
          </td>
          <td style="text-align: right;">
            <button class="action-btn menu-trigger" data-id="${emp.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </td>
        `;
        payTableBody.appendChild(tr);
      });
    }

    // 5. Leaves View Table
    const leavesTableBody = document.querySelector('#leavesTable tbody');
    if (leavesTableBody) {
      leavesTableBody.innerHTML = '';
      cachedEmployees.forEach(emp => {
        const leaveType = emp.leaveType || 'Personal Leave';
        const leaveStart = emp.leaveStart || 'Jun. 24, 2024';
        const leaveEnd = emp.leaveEnd || 'Jun. 27, 2024';
        const leaveStatus = emp.leaveStatus || 'Pending';

        let statusContent = '';
        if (leaveStatus === 'Pending') {
          statusContent = `
            <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
              <button class="btn-primary approve-leave-btn" data-id="${emp.id}" style="padding: 4px 10px; font-size: 0.72rem; border-radius: 6px; cursor: pointer;">Approve</button>
              <button class="btn-secondary reject-leave-btn" data-id="${emp.id}" style="padding: 4px 8px; font-size: 0.72rem; border-radius: 6px; color: var(--text-dark); cursor: pointer;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
          `;
        } else if (leaveStatus === 'Approved') {
          statusContent = `
            <span class="status-chip completed" style="display: inline-flex; margin: 0 auto;">
              <span class="status-dot"></span>
              Approved
            </span>
          `;
        } else {
          statusContent = `
            <span class="status-chip pending" style="display: inline-flex; margin: 0 auto;">
              <span class="status-dot"></span>
              Rejected
            </span>
          `;
        }

        const tr = document.createElement('tr');
        tr.setAttribute('data-id', emp.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-checkbox"></td>
          <td>
            <div class="user-cell">
              <img src="${emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${emp.name}" class="cell-avatar">
              <div class="cell-info">
                <span class="cell-name">${escapeHTML(emp.name)}</span>
                <span class="cell-email">${escapeHTML(emp.email)}</span>
              </div>
            </div>
          </td>
          <td>${escapeHTML(emp.dept)}</td>
          <td>${escapeHTML(leaveType)}</td>
          <td>${escapeHTML(leaveStart)}</td>
          <td>${escapeHTML(leaveEnd)}</td>
          <td style="text-align: center;">${statusContent}</td>
        `;
        leavesTableBody.appendChild(tr);
      });

      // Bind leaves table action buttons
      document.querySelectorAll('.approve-leave-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          try {
            await fetch(`/api/employees/${id}/approve-leave`, { method: 'POST' });
            await fetchEmployees();
          } catch (err) {
            console.error('Error approving leave:', err);
          }
        });
      });

      document.querySelectorAll('.reject-leave-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          try {
            await fetch(`/api/employees/${id}/reject-leave`, { method: 'POST' });
            await fetchEmployees();
          } catch (err) {
            console.error('Error rejecting leave:', err);
          }
        });
      });
    }

    // 6. Documents View Table
    const docTableBody = document.querySelector('#documentsTable tbody');
    if (docTableBody) {
      docTableBody.innerHTML = '';
      cachedEmployees.forEach(emp => {
        const lastMod = emp.lastModified || 'Jul. 12, 2023';
        const storageVal = parseInt(emp.storage || 20);

        const tr = document.createElement('tr');
        tr.setAttribute('data-id', emp.id);
        tr.innerHTML = `
          <td><input type="checkbox" class="row-checkbox"></td>
          <td>
            <div class="user-cell">
              <img src="${emp.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${emp.name}" class="cell-avatar">
              <div class="cell-info">
                <span class="cell-name">${escapeHTML(emp.name)}</span>
                <span class="cell-email">${escapeHTML(emp.email)}</span>
              </div>
            </div>
          </td>
          <td>${escapeHTML(lastMod)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px; width: 100%;">
              <div style="flex-grow: 1; height: 6px; background: #EEF2FF; border-radius: 4px; overflow: hidden;">
                <div style="width: ${storageVal}%; height: 100%; background: var(--primary); border-radius: 4px;"></div>
              </div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-dark);">${storageVal}%</span>
            </div>
          </td>
          <td style="text-align: right;">
            <button class="action-btn menu-trigger" data-id="${emp.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </td>
        `;
        docTableBody.appendChild(tr);
      });
    }

    // Update stats counters and gauge
    updateStatsCounters(cachedEmployees);
    updateGauge();

    // Hook select-all checkbox listeners
    setupCheckboxListeners();
  }

  // Render Apps Integrations Cards
  function renderIntegrations() {
    const appsGrid = document.getElementById('appsGrid');
    if (!appsGrid) return;
    appsGrid.innerHTML = '';

    let filtered = cachedIntegrations;
    if (activeAppsFilterTab === 'active') {
      filtered = cachedIntegrations.filter(app => app.active === true);
    } else if (activeAppsFilterTab === 'inactive' || activeAppsFilterTab === 'archived') {
      filtered = cachedIntegrations.filter(app => app.active === false);
    }

    // Search matching
    if (appsSearchInput && appsSearchInput.value.trim()) {
      const q = appsSearchInput.value.toLowerCase().trim();
      filtered = filtered.filter(app => app.name.toLowerCase().includes(q) || app.desc.toLowerCase().includes(q));
    }

    filtered.forEach(app => {
      let badgeBg = '#F3E8FF';
      let badgeColor = '#7C3AED';
      if (app.icon === 'blue') {
        badgeBg = '#E0F2FE';
        badgeColor = '#0284C7';
      } else if (app.icon === 'orange') {
        badgeBg = '#FEF3C7';
        badgeColor = '#D97706';
      } else if (app.icon === 'green') {
        badgeBg = '#D1FAE5';
        badgeColor = '#10B981';
      }

      const card = document.createElement('div');
      card.className = 'chart-card app-card';
      card.style.padding = '18px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.height = '180px';
      
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="background: ${badgeBg}; color: ${badgeColor}; padding: 8px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.15rem; width: 40px; height: 40px;">
              ${app.name.charAt(0)}
            </div>
            <strong style="font-size: 0.95rem; color: var(--text-dark);">${escapeHTML(app.name)}</strong>
          </div>
          <label class="switch">
            <input type="checkbox" class="app-toggle-cb" data-id="${app.id}" ${app.active ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
        <p style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4; margin: 10px 0; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
          ${escapeHTML(app.desc)}
        </p>
        <button style="width: 100%; border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; display: flex; justify-content: space-between; align-items: center; background: white; font-size: 0.78rem; font-weight: 600; color: var(--text-medium); cursor: pointer;">
          <span>Learn More</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      `;

      appsGrid.appendChild(card);
    });

    document.querySelectorAll('.app-toggle-cb').forEach(cb => {
      cb.addEventListener('change', async (e) => {
        const id = cb.getAttribute('data-id');
        try {
          await fetch(`/api/integrations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active: cb.checked })
          });
          await fetchIntegrations();
        } catch (err) {
          console.error('Error toggling app integration status:', err);
        }
      });
    });
  }

  function updateStatsCounters(employees) {
    const seedDiff = employees.length - 7;
    const currentNewEmployee = Math.max(0, STAT_OFFSETS.newEmployee + seedDiff);
    const leaveCount = employees.filter(e => e.status === 'Inactive' || e.leaveStatus === 'Approved').length;

    const elNew = document.getElementById('statNewEmployee');
    const elResign = document.getElementById('statResignEmployee');
    const elLeave = document.getElementById('statOnLeave');
    const elApp = document.getElementById('statNewApplication');

    if (elNew) elNew.textContent = currentNewEmployee;
    if (elResign) elResign.textContent = STAT_OFFSETS.resignEmployee;
    if (elLeave) elLeave.textContent = STAT_OFFSETS.onLeave + (leaveCount - 2);
    if (elApp) elApp.textContent = STAT_OFFSETS.newApplication;
  }

  function setupCheckboxListeners() {
    document.querySelectorAll('.select-all-cb').forEach(selectAll => {
      selectAll.addEventListener('change', (e) => {
        const table = e.target.closest('table');
        const rows = table.querySelectorAll('tbody .row-checkbox');
        rows.forEach(cb => cb.checked = e.target.checked);
      });
    });

    document.querySelectorAll('tbody .row-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const table = e.target.closest('table');
        const selectAll = table.querySelector('.select-all-cb');
        const rows = Array.from(table.querySelectorAll('tbody .row-checkbox'));
        if (selectAll) {
          selectAll.checked = rows.every(r => r.checked);
        }
      });
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Gauge & Selector interactions
  function updateGauge() {
    const gaugeFill = document.getElementById('gaugeFill');
    const gaugePercentText = document.getElementById('gaugePercentText');
    const activeDeptText = document.getElementById('activeDeptText');
    const todayAttCount = document.getElementById('todayAttCount');

    if (gaugeFill && gaugePercentText && activeDeptText) {
      const activeDept = DEPARTMENTS[activeDeptIndex];
      activeDeptText.textContent = activeDept.name;
      gaugePercentText.textContent = `${activeDept.rate}%`;
      if (todayAttCount) todayAttCount.textContent = activeDept.building;

      const dash = Math.round((activeDept.rate / 100) * 125);
      gaugeFill.setAttribute('stroke-dasharray', `${dash} 250`);
    }
  }

  const prevDeptBtn = document.getElementById('prevDeptBtn');
  const nextDeptBtn = document.getElementById('nextDeptBtn');

  if (prevDeptBtn && nextDeptBtn) {
    prevDeptBtn.addEventListener('click', () => {
      activeDeptIndex = (activeDeptIndex - 1 + DEPARTMENTS.length) % DEPARTMENTS.length;
      updateGauge();
    });
    nextDeptBtn.addEventListener('click', () => {
      activeDeptIndex = (activeDeptIndex + 1) % DEPARTMENTS.length;
      updateGauge();
    });
  }

  // Render Calendar Grid Events
  function renderCalendar() {
    document.querySelectorAll('.calendar-event-card').forEach(card => card.remove());
    
    cachedEvents.forEach(evt => {
      const col = document.querySelector(`.day-column[data-day="${evt.day}"]`);
      if (col) {
        const card = document.createElement('div');
        card.className = `calendar-event-card ${evt.color}`;
        card.setAttribute('data-id', evt.id);
        
        const topPos = (evt.start - 8.0) * 100;
        const cardHeight = (evt.end - evt.start) * 100;
        
        card.style.top = `${topPos}px`;
        card.style.height = `${cardHeight}px`;
        
        card.innerHTML = `
          <span class="event-name">${escapeHTML(evt.title)}</span>
          <span class="event-time">${escapeHTML(evt.label)}</span>
        `;
        
        col.appendChild(card);
        
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          openEventModal(true, evt);
        });
      }
    });
  }

  // Day columns empty slot click to ADD event
  document.querySelectorAll('.day-column').forEach(col => {
    col.addEventListener('click', (e) => {
      const rect = col.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const startHour = Math.floor(clickY / 100) + 8;
      const endHour = startHour + 1;
      const dayIndex = col.getAttribute('data-day');
      
      const mockEvent = {
        title: '',
        day: dayIndex,
        start: startHour,
        end: endHour,
        label: `${startHour % 12 || 12} ${startHour < 12 ? 'am' : 'pm'} - ${endHour % 12 || 12} ${endHour < 12 ? 'am' : 'pm'}`,
        color: 'light-blue'
      };
      
      openEventModal(false, mockEvent);
    });
  });

  // SPA Navigation Toggling
  function setView(view) {
    currentView = view;
    navDashboard.classList.remove('active');
    navEmployees.classList.remove('active');
    navAttendances.classList.remove('active');
    navCalendar.classList.remove('active');
    navPayroll.classList.remove('active');
    navLeaves.classList.remove('active');
    navDocuments.classList.remove('active');
    navApps.classList.remove('active');
    navSettings.classList.remove('active');

    dashboardView.classList.add('hidden');
    employeesView.classList.add('hidden');
    attendancesView.classList.add('hidden');
    calendarView.classList.add('hidden');
    payrollView.classList.add('hidden');
    leavesView.classList.add('hidden');
    documentsView.classList.add('hidden');
    appsView.classList.add('hidden');
    settingsView.classList.add('hidden');

    if (view === 'dashboard') {
      navDashboard.classList.add('active');
      dashboardView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `<a href="#" class="breadcrumb-item">Home</a>`;
    } else if (view === 'employees') {
      navEmployees.classList.add('active');
      employeesView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">Dashboard</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Employees</a>
      `;
    } else if (view === 'attendances') {
      navAttendances.classList.add('active');
      attendancesView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">Dashboard</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Attendances</a>
      `;
    } else if (view === 'calendar') {
      navCalendar.classList.add('active');
      calendarView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">Dashboard</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Calendar</a>
      `;
      fetchEvents();
    } else if (view === 'payroll') {
      navPayroll.classList.add('active');
      payrollView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">Dashboard</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Payroll</a>
      `;
    } else if (view === 'leaves') {
      navLeaves.classList.add('active');
      leavesView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">Dashboard</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Leaves</a>
      `;
    } else if (view === 'documents') {
      navDocuments.classList.add('active');
      documentsView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">Dashboard</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Documents</a>
      `;
    } else if (view === 'apps') {
      navApps.classList.add('active');
      appsView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">user</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Settings</a>
      `;
      fetchIntegrations();
    } else if (view === 'settings') {
      navSettings.classList.add('active');
      settingsView.classList.remove('hidden');
      breadcrumbNav.innerHTML = `
        <a href="#" class="breadcrumb-item">Home</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item">user</a>
        <span style="color: var(--text-muted); margin: 0 4px;">/</span>
        <a href="#" class="breadcrumb-item active" style="color: var(--primary); font-weight:600;">Settings</a>
      `;
      fetchSettings();
      // Default to General Details sub-tab
      showSettingsSubTab('general');
    }

    if (globalSearch) globalSearch.value = '';
    document.querySelectorAll('.table-filter').forEach(f => f.value = '');
    renderAll();
  }

  navDashboard.addEventListener('click', (e) => { e.preventDefault(); setView('dashboard'); });
  navEmployees.addEventListener('click', (e) => { e.preventDefault(); setView('employees'); });
  navAttendances.addEventListener('click', (e) => { e.preventDefault(); setView('attendances'); });
  navCalendar.addEventListener('click', (e) => { e.preventDefault(); setView('calendar'); });
  navPayroll.addEventListener('click', (e) => { e.preventDefault(); setView('payroll'); });
  navLeaves.addEventListener('click', (e) => { e.preventDefault(); setView('leaves'); });
  navDocuments.addEventListener('click', (e) => { e.preventDefault(); setView('documents'); });
  navApps.addEventListener('click', (e) => { e.preventDefault(); setView('apps'); });
  navSettings.addEventListener('click', (e) => { e.preventDefault(); setView('settings'); });

  // Mobile Bottom Navigation Setup
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute('data-target').replace('View', '');
      setView(targetView);
      
      // Update active state
      mobileNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Settings sub-tab navigation
  const btnGeneralDetailsSettings = document.getElementById('btnGeneralDetailsSettings');
  const btnProfileSettings = document.getElementById('btnProfileSettings');
  const btnCompanyProfileSettings = document.getElementById('btnCompanyProfileSettings');
  const btnNotificationSettings = document.getElementById('btnNotificationSettings');
  const btnSecuritySettings = document.getElementById('btnSecuritySettings');

  function showSettingsSubTab(tab) {
    // BUGFIX: Robust highlight states reset for all menu sub-items
    document.querySelectorAll('.settings-sub-item').forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = '';
      btn.style.color = '';
    });

    const forms = [settingsGeneralTab, settingsProfileTab, settingsCompanyTab, settingsNotificationTab, settingsSecurityTab];
    forms.forEach(f => {
      if (f) f.classList.add('hidden');
    });

    let activeBtn = null;
    let activeForm = null;

    if (tab === 'general') {
      activeBtn = btnGeneralDetailsSettings;
      activeForm = settingsGeneralTab;
    } else if (tab === 'profile') {
      activeBtn = btnProfileSettings;
      activeForm = settingsProfileTab;
    } else if (tab === 'company') {
      activeBtn = btnCompanyProfileSettings;
      activeForm = settingsCompanyTab;
    } else if (tab === 'notification') {
      activeBtn = btnNotificationSettings;
      activeForm = settingsNotificationTab;
    } else if (tab === 'security') {
      activeBtn = btnSecuritySettings;
      activeForm = settingsSecurityTab;
    }

    if (activeForm) {
      activeForm.classList.remove('hidden');
    }
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.style.background = '#EEF2FF';
      activeBtn.style.color = 'var(--primary)';
    }
  }

  if (btnGeneralDetailsSettings) {
    btnGeneralDetailsSettings.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsSubTab('general');
    });
  }

  if (btnProfileSettings) {
    btnProfileSettings.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsSubTab('profile');
    });
  }

  if (btnCompanyProfileSettings) {
    btnCompanyProfileSettings.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsSubTab('company');
    });
  }

  if (btnNotificationSettings) {
    btnNotificationSettings.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsSubTab('notification');
    });
  }

  if (btnSecuritySettings) {
    btnSecuritySettings.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsSubTab('security');
    });
  }

  // Sidebar Toggler collapse
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
  }

  // Table tabs switcher on Attendance view & Apps View
  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.att-tab-btn');
    if (tabBtn) {
      if (tabBtn.classList.contains('apps-tab-btn')) {
        document.querySelectorAll('.apps-tab-btn').forEach(btn => btn.classList.remove('active'));
        tabBtn.classList.add('active');
        activeAppsFilterTab = tabBtn.getAttribute('data-tab');
        renderIntegrations();
      } else {
        document.querySelectorAll('.att-tab-btn:not(.apps-tab-btn)').forEach(btn => btn.classList.remove('active'));
        tabBtn.classList.add('active');
        activeAttFilterTab = tabBtn.getAttribute('data-tab');
        renderAll();
      }
    }
  });

  // Searching filter matching
  function filterRows(query) {
    let activeTableId = 'dashboardTable';
    if (currentView === 'employees') activeTableId = 'employeesTable';
    if (currentView === 'attendances') activeTableId = 'attendanceTable';
    if (currentView === 'payroll') activeTableId = 'payrollTable';
    if (currentView === 'leaves') activeTableId = 'leavesTable';
    if (currentView === 'documents') activeTableId = 'documentsTable';

    const rows = document.querySelectorAll(`#${activeTableId} tbody tr`);
    rows.forEach(row => {
      const name = row.querySelector('.cell-name').textContent.toLowerCase();
      const email = row.querySelector('.cell-email').textContent.toLowerCase();
      const dept = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
      
      if (name.includes(query) || email.includes(query) || dept.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => filterRows(e.target.value.toLowerCase().trim()));
  }

  document.querySelectorAll('.table-filter:not(#appsSearchInput)').forEach(f => {
    f.addEventListener('input', (e) => filterRows(e.target.value.toLowerCase().trim()));
  });

  if (appsSearchInput) {
    appsSearchInput.addEventListener('input', () => {
      renderIntegrations();
    });
  }

  // Modal handlers
  function openEmployeeModal(isEdit = false, employee = null) {
    employeeModal.style.display = 'flex';
    if (isEdit && employee) {
      modalTitle.textContent = 'Edit Employee';
      document.getElementById('employeeId').value = employee.id;
      document.getElementById('empName').value = employee.name;
      document.getElementById('empEmail').value = employee.email;
      document.getElementById('empRole').value = employee.role || 'UI Designer';
      document.getElementById('empDept').value = employee.dept;
      document.getElementById('empMobile').value = employee.mobile || '+12 3456 7890';
      document.getElementById('empJoinDate').value = employee.date;
      document.getElementById('empStatus').value = employee.status;
      
      // Payroll fields
      document.getElementById('empPeriod').value = employee.period || 'Monthly';
      document.getElementById('empEndDate').value = employee.endDate || 'Jun. 27, 2024';
      document.getElementById('empSalary').value = employee.salary || '$800';
      document.getElementById('empPayStatus').value = employee.payStatus || 'In Progress';

      // Leaves fields
      document.getElementById('empLeaveType').value = employee.leaveType || 'Personal Leave';
      document.getElementById('empLeaveStatus').value = employee.leaveStatus || 'Pending';
      document.getElementById('empLeaveStart').value = employee.leaveStart || 'Jun. 24, 2024';
      document.getElementById('empLeaveEnd').value = employee.leaveEnd || 'Jun. 27, 2024';

      // Documents fields
      document.getElementById('empStorage').value = employee.storage || 20;
      document.getElementById('empLastModified').value = employee.lastModified || 'Jun. 24, 2023';
    } else {
      modalTitle.textContent = 'Add Employee';
      employeeForm.reset();
      document.getElementById('employeeId').value = '';
      document.getElementById('empJoinDate').value = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      document.getElementById('empRole').value = '';
      document.getElementById('empMobile').value = '';
      
      // Defaults
      document.getElementById('empPeriod').value = 'Monthly';
      document.getElementById('empEndDate').value = 'Jun. 27, 2024';
      document.getElementById('empSalary').value = '$800';
      document.getElementById('empPayStatus').value = 'In Progress';

      document.getElementById('empLeaveType').value = 'Personal Leave';
      document.getElementById('empLeaveStatus').value = 'Pending';
      document.getElementById('empLeaveStart').value = 'Jun. 24, 2024';
      document.getElementById('empLeaveEnd').value = 'Jun. 27, 2024';

      document.getElementById('empStorage').value = 20;
      document.getElementById('empLastModified').value = 'Jun. 24, 2023';
    }
  }

  // Action Menu Dropdown Positioner
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.menu-trigger');
    if (trigger) {
      e.stopPropagation();
      const id = trigger.getAttribute('data-id');
      selectedEmployeeId = id;
      
      const rect = trigger.getBoundingClientRect();
      actionsDropdown.style.top = `${rect.bottom + window.scrollY}px`;
      actionsDropdown.style.left = `${rect.left - 110 + window.scrollX}px`;
      actionsDropdown.style.display = 'block';
    } else if (!e.target.closest('#actionsDropdown')) {
      actionsDropdown.style.display = 'none';
    }
  });

  if (editRowBtn) {
    editRowBtn.addEventListener('click', () => {
      actionsDropdown.style.display = 'none';
      if (selectedEmployeeId) {
        const employee = cachedEmployees.find(emp => emp.id === selectedEmployeeId);
        if (employee) openEmployeeModal(true, employee);
      }
    });
  }

  if (deleteRowBtn) {
    deleteRowBtn.addEventListener('click', async () => {
      actionsDropdown.style.display = 'none';
      if (selectedEmployeeId && confirm('Are you sure you want to delete this employee?')) {
        try {
          await fetch(`/api/employees/${selectedEmployeeId}`, { method: 'DELETE' });
          await fetchEmployees();
        } catch (err) {
          console.error('Error deleting employee:', err);
        }
      }
    });
  }

  // Attendance Log modal
  const attendanceBtn = document.getElementById('attendanceBtn');
  const closeAttendanceModalBtn = document.getElementById('closeAttendanceModalBtn');
  const closeAttendanceDoneBtn = document.getElementById('closeAttendanceDoneBtn');

  function openAttendanceModal() {
    attendanceModal.style.display = 'flex';
    const listContainer = document.querySelector('.attendance-logs-list');
    listContainer.innerHTML = '';
    
    cachedEmployees.forEach(emp => {
      const isPresent = emp.status === 'Active' || emp.status === 'Onboarding';
      const statusText = isPresent ? 'Present' : 'Absent';
      const statusClass = isPresent ? 'present' : 'absent';
      const checkInTime = isPresent ? '09:00 AM' : '--:--';
      
      const item = document.createElement('div');
      item.className = 'log-item';
      item.innerHTML = `
        <div>
          <span class="log-name">${escapeHTML(emp.name)}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 8px;">(${escapeHTML(emp.dept)})</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="log-time">${checkInTime}</span>
          <span class="log-status ${statusClass}">${statusText}</span>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }

  function closeAttendanceModal() {
    attendanceModal.style.display = 'none';
  }

  if (attendanceBtn) attendanceBtn.addEventListener('click', openAttendanceModal);
  if (closeAttendanceModalBtn) closeAttendanceModalBtn.addEventListener('click', closeAttendanceModal);
  if (closeAttendanceDoneBtn) closeAttendanceDoneBtn.addEventListener('click', closeAttendanceModal);

  // Calendar Event Modal triggers
  function openEventModal(isEdit = false, eventData = null) {
    eventModal.style.display = 'flex';
    if (isEdit && eventData) {
      document.getElementById('eventId').value = eventData.id;
      document.getElementById('eventTitle').value = eventData.title;
      document.getElementById('eventDay').value = eventData.day;
      document.getElementById('eventStart').value = eventData.start;
      document.getElementById('eventEnd').value = eventData.end;
      document.getElementById('eventLabel').value = eventData.label;
      document.getElementById('eventColor').value = eventData.color;
      deleteEventBtn.style.display = 'block';
    } else if (eventData) {
      eventForm.reset();
      document.getElementById('eventId').value = '';
      document.getElementById('eventDay').value = eventData.day;
      document.getElementById('eventStart').value = eventData.start;
      document.getElementById('eventEnd').value = eventData.end;
      document.getElementById('eventLabel').value = eventData.label;
      document.getElementById('eventColor').value = eventData.color;
      deleteEventBtn.style.display = 'none';
    }
  }

  // Integrations Modal handlers
  function openIntegrationModal() {
    integrationModal.style.display = 'flex';
  }

  function closeIntegrationModal() {
    integrationModal.style.display = 'none';
    integrationForm.reset();
  }

  if (addNewIntegrationBtn) addNewIntegrationBtn.addEventListener('click', openIntegrationModal);
  if (closeIntegrationModalBtn) closeIntegrationModalBtn.addEventListener('click', closeIntegrationModal);
  if (cancelIntegrationModalBtn) cancelIntegrationModalBtn.addEventListener('click', closeIntegrationModal);

  if (integrationForm) {
    integrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('integrationName').value.trim();
      const desc = document.getElementById('integrationDesc').value.trim();
      const statusSelect = document.getElementById('integrationStatus').value;
      const active = statusSelect === 'active';
      const icon = document.getElementById('integrationIcon').value;

      const payload = { name, desc, active, icon };
      try {
        await fetch('/api/integrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        closeIntegrationModal();
        await fetchIntegrations();
      } catch (err) {
        console.error('Error creating new integration app:', err);
      }
    });
  }

  // Settings Save Actions (General Tab)
  if (settingsGeneralTab) {
    settingsGeneralTab.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('setMail').value.trim();
      const country = document.getElementById('setCountry').value;
      const language = document.getElementById('setLang').value;
      const timezone = document.getElementById('setTimezone').value;
      const timeformat = document.getElementById('setTimeformat').value;
      const website = document.getElementById('setWebsite').value.trim();
      const bio = document.getElementById('setBio').value.trim();
      const theme = document.getElementById('setTheme').value;

      const payload = { email, country, language, timezone, timeformat, website, bio, theme };
      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        await fetchSettings();
        alert('General settings saved successfully!');
      } catch (err) {
        console.error('Error updating settings preferences:', err);
      }
    });
  }

  // Settings Profile Save Action
  if (settingsProfileTab) {
    settingsProfileTab.addEventListener('submit', async (e) => {
      e.preventDefault();
      const profileName = document.getElementById('setProfileName').value.trim();
      const profileTitle = document.getElementById('setProfileTitle').value.trim();
      const profilePhone = document.getElementById('setProfilePhone').value.trim();
      const profileEmail = document.getElementById('setProfileEmail').value.trim();
      const profileAddress = document.getElementById('setProfileAddress').value.trim();
      const profileBio = document.getElementById('setProfileBio').value.trim();
      const profileAvatar = tempAvatarBase64;

      const payload = { profileName, profileTitle, profilePhone, profileEmail, profileAddress, profileBio, profileAvatar };
      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        await fetchSettings();
        alert('Profile saved successfully!');
      } catch (err) {
        console.error('Error saving profile changes:', err);
      }
    });
  }

  // Settings Company Save Action
  if (settingsCompanyTab) {
    settingsCompanyTab.addEventListener('submit', async (e) => {
      e.preventDefault();
      const compName = document.getElementById('setCompName').value.trim();
      const compUsername = document.getElementById('setCompUsername').value.trim();
      const compEmail = document.getElementById('setCompEmail').value.trim();
      const compWebsite = document.getElementById('setCompWebsite').value.trim();
      const compFb = document.getElementById('setCompFb').value.trim();
      const compX = document.getElementById('setCompX').value.trim();
      const compIn = document.getElementById('setCompIn').value.trim();
      const compPermEmails = document.getElementById('setCompPermEmails').checked;
      const compPermReports = document.getElementById('setCompPermReports').checked;
      const compLogo = tempLogoBase64;

      const payload = { compName, compUsername, compEmail, compWebsite, compFb, compX, compIn, compPermEmails, compPermReports, compLogo };
      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        await fetchSettings();
        alert('Company details saved successfully!');
      } catch (err) {
        console.error('Error saving company profile changes:', err);
      }
    });
  }

  // Settings Notification Save Action
  if (settingsNotificationTab) {
    settingsNotificationTab.addEventListener('submit', async (e) => {
      e.preventDefault();
      const notifyDaily = document.getElementById('setNotifyDaily').checked;
      const notifyNewEvent = document.getElementById('setNotifyNewEvent').checked;
      const notifyNewTeam = document.getElementById('setNotifyNewTeam').checked;
      const notifyReminders = document.getElementById('setNotifyReminders').checked;
      const notifyPromotions = document.getElementById('setNotifyPromotions').checked;
      const notifyEmails = document.getElementById('setNotifyEmails').checked;
      const notifySms = document.getElementById('setNotifySms').checked;
      const notifyMobile = document.getElementById('setNotifyMobile').checked;
      const notifyDesktop = document.getElementById('setNotifyDesktop').checked;

      const payload = { notifyDaily, notifyNewEvent, notifyNewTeam, notifyReminders, notifyPromotions, notifyEmails, notifySms, notifyMobile, notifyDesktop };
      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        await fetchSettings();
        alert('Notification settings saved successfully!');
      } catch (err) {
        console.error('Error saving notification preferences:', err);
      }
    });
  }

  // Settings Security Save Action
  if (settingsSecurityTab) {
    settingsSecurityTab.addEventListener('submit', async (e) => {
      e.preventDefault();
      const securityRecoveryEmail = document.getElementById('setSecurityRecoveryEmail').value.trim();
      const securityTwoFactorEnabled = document.getElementById('setSecurityTwoFactorEnabled').checked;

      const payload = { securityRecoveryEmail, securityTwoFactorEnabled };
      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        await fetchSettings();
        alert('Security settings saved successfully!');
      } catch (err) {
        console.error('Error saving security preferences:', err);
      }
    });
  }

  document.querySelectorAll('.cancel-settings-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applySettingsValues(cachedSettings);
    });
  });

  // Profile Picture Selector & Drag Zone
  const avatarDropzone = document.getElementById('avatarDropzone');
  const avatarFileInput = document.getElementById('avatarFileInput');
  const avatarPreviewImage = document.getElementById('avatarPreviewImage');

  if (avatarDropzone && avatarFileInput) {
    avatarDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      avatarDropzone.classList.add('dragover');
    });

    avatarDropzone.addEventListener('dragleave', () => {
      avatarDropzone.classList.remove('dragover');
    });

    avatarDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      avatarDropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleAvatarFileSelected(e.dataTransfer.files[0]);
      }
    });

    avatarFileInput.addEventListener('change', () => {
      if (avatarFileInput.files.length > 0) {
        handleAvatarFileSelected(avatarFileInput.files[0]);
      }
    });
  }

  function handleAvatarFileSelected(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempAvatarBase64 = e.target.result;
      if (avatarPreviewImage) {
        avatarPreviewImage.src = tempAvatarBase64;
      }
    };
    reader.readAsDataURL(file);
  }

  // Company Logo Selector & Drag Zone
  const compLogoDropzone = document.getElementById('compLogoDropzone');
  const compLogoFileInput = document.getElementById('compLogoFileInput');
  const compLogoPreviewImage = document.getElementById('compLogoPreviewImage');

  if (compLogoDropzone && compLogoFileInput) {
    compLogoDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      compLogoDropzone.classList.add('dragover');
    });

    compLogoDropzone.addEventListener('dragleave', () => {
      compLogoDropzone.classList.remove('dragover');
    });

    compLogoDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      compLogoDropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleCompLogoFileSelected(e.dataTransfer.files[0]);
      }
    });

    compLogoFileInput.addEventListener('change', () => {
      if (compLogoFileInput.files.length > 0) {
        handleCompLogoFileSelected(compLogoFileInput.files[0]);
      }
    });
  }

  function handleCompLogoFileSelected(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempLogoBase64 = e.target.result;
      if (compLogoPreviewImage) {
        compLogoPreviewImage.src = tempLogoBase64;
      }
    };
    reader.readAsDataURL(file);
  }

  // File Uploader Simulation Workflow
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const uploadLoaderContainer = document.getElementById('uploadLoaderContainer');
  const uploadProgressBar = document.getElementById('uploadProgressBar');
  const uploadProgressPercent = document.getElementById('uploadProgressPercent');
  const uploadFileName = document.getElementById('uploadFileName');
  const uploadStatusText = document.getElementById('uploadStatusText');
  const cancelUploadBtn = document.getElementById('cancelUploadBtn');

  if (dropzone && fileInput) {
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        startFileUploadAnimation(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        startFileUploadAnimation(fileInput.files[0]);
      }
    });
  }

  let uploadTimer = null;
  function startFileUploadAnimation(file) {
    if (uploadTimer) clearInterval(uploadTimer);
    
    uploadFileName.textContent = file.name;
    uploadStatusText.textContent = 'Uploading...';
    uploadProgressBar.style.width = '0%';
    uploadProgressPercent.textContent = '0%';
    uploadLoaderContainer.style.display = 'flex';
    
    let progress = 0;
    uploadTimer = setInterval(async () => {
      progress += 10;
      uploadProgressBar.style.width = `${progress}%`;
      uploadProgressPercent.textContent = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(uploadTimer);
        uploadStatusText.textContent = 'Upload complete';
        
        const targetEmp = cachedEmployees[0];
        if (targetEmp) {
          try {
            await fetch(`/api/employees/${targetEmp.id}/upload-document`, { method: 'POST' });
            await fetchEmployees();
          } catch (err) {
            console.error('Error modifying storage size:', err);
          }
        }
      }
    }, 150);
  }

  if (cancelUploadBtn) {
    cancelUploadBtn.addEventListener('click', () => {
      if (uploadTimer) clearInterval(uploadTimer);
      uploadLoaderContainer.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === employeeModal) closeEmployeeModal();
    if (e.target === attendanceModal) closeAttendanceModal();
    if (e.target === eventModal) closeEventModal();
    if (e.target === integrationModal) closeIntegrationModal();
  });

  // Fetch initial employees on start
  fetchEmployees();
  fetchSettings();
  
  // Set default view routing
  setView('dashboard');
});
