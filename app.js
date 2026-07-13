document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.update()))
      .catch(() => {});
  }

  // DOM Elements
  const recordBtn = document.getElementById("recordBtn");
  const markItDownBtn = document.getElementById("markItDownBtn");
  const transcriptBox = document.getElementById("transcriptBox");
  const aiResponse = document.getElementById("aiResponse");
  const langBtns = document.querySelectorAll(".lang-btn");
  const sosBtn = document.getElementById("sosBtn");
  const statusPill = document.getElementById("statusPill");
  const revealEls = document.querySelectorAll(".reveal");
  const counterEls = document.querySelectorAll(".counter");
  const demoScenarioLabel = document.getElementById("demoScenarioLabel");
  const demoScenarioText = document.getElementById("demoScenarioText");
  const mockTranscript = document.getElementById("mockTranscript");
  const mockInsight = document.getElementById("mockInsight");
  const mockSignal = document.getElementById("mockSignal");
  const mockLangBadge = document.getElementById("mockLangBadge");
  const exportBtn = document.getElementById("exportBtn");
  const exportDoctorReportBtn = document.getElementById("exportDoctorReportBtn");
  const exportFhirBtn = document.getElementById("exportFhirBtn");
  const exportEhrssBtn = document.getElementById("exportEhrssBtn");
  const seedAdvancedDemoBtn = document.getElementById("seedAdvancedDemoBtn");
  const consentPatientExportCheck = document.getElementById("consentPatientExportCheck");
  const consentNoAudioCheck = document.getElementById("consentNoAudioCheck");
  const consentRedactionCheck = document.getElementById("consentRedactionCheck");
  const consentStatusText = document.getElementById("consentStatusText");
  const fhirMappingPreview = document.getElementById("fhirMappingPreview");
  const exportHistoryList = document.getElementById("exportHistoryList");
  const dataPromiseBanner = document.getElementById("dataPromiseBanner");
  const dataPromiseStatus = document.getElementById("dataPromiseStatus");
  const dataPromiseAcceptBtns = document.querySelectorAll(".dataPromiseAcceptBtn");
  const dataPromiseEssentialBtns = document.querySelectorAll(".dataPromiseEssentialBtn");
  const clearDeviceMemoryBtns = document.querySelectorAll(".clearDeviceMemoryBtn");
  const realWorldOps = document.getElementById("realWorldOps");
  const demoModeBtn = document.getElementById("demoModeBtn");
  const judgeModeStatus = document.getElementById("judgeModeStatus");
  const evidenceTotal = document.getElementById("evidenceTotal");
  const evidenceMix = document.getElementById("evidenceMix");
  const evidenceLatency = document.getElementById("evidenceLatency");
  const evidenceSus = document.getElementById("evidenceSus");
  const impactTimeSaved = document.getElementById("impactTimeSaved");
  const impactCompletion = document.getElementById("impactCompletion");
  const impactEscalation = document.getElementById("impactEscalation");
  const impactExportCount = document.getElementById("impactExportCount");
  const analyticsCategory = document.getElementById("analyticsCategory");
  const analyticsSignal = document.getElementById("analyticsSignal");
  const analyticsReadiness = document.getElementById("analyticsReadiness");
  const caregiverTriageQueue = document.getElementById("caregiverTriageQueue");
  const baselineRadarText = document.getElementById("baselineRadarText");
  const careTeamPlanText = document.getElementById("careTeamPlanText");
  const alertRoutingText = document.getElementById("alertRoutingText");
  const guidedPromptText = document.getElementById("guidedPromptText");
  const elderModeBtn = document.getElementById("elderModeBtn");
  const highContrastBtn = document.getElementById("highContrastBtn");
  const fontIncreaseBtn = document.getElementById("fontIncreaseBtn");
  const fontDecreaseBtn = document.getElementById("fontDecreaseBtn");
  const repeatPromptBtn = document.getElementById("repeatPromptBtn");
  const hapticTestBtn = document.getElementById("hapticTestBtn");
  const guidedDemoBtn = document.getElementById("guidedDemoBtn");
  const startJourneyTutorialBtn = document.getElementById("startJourneyTutorialBtn");
  const journeyTutorialStatus = document.getElementById("journeyTutorialStatus");
  const journeyTutorialProgressBar = document.getElementById("journeyTutorialProgressBar");
  const journeyTutorialCounter = document.getElementById("journeyTutorialCounter");
  const tutorialStepChips = document.querySelectorAll(".tutorial-step-chip");
  const openPortalBtn = document.getElementById("openPortalBtn");
  const openRegisterBtn = document.getElementById("openRegisterBtn");
  const memberWorkspaceBtn = document.getElementById("memberWorkspaceBtn");
  const profileEntryPanel = document.getElementById("profileEntryPanel");
  const profileEntryStatus = document.getElementById("profileEntryStatus");
  const homeChoosePatientBtn = document.getElementById("homeChoosePatientBtn");
  const homeChooseHospitalStaffBtn = document.getElementById("homeChooseHospitalStaffBtn");
  const homeChooseFamilyMemberBtn = document.getElementById("homeChooseFamilyMemberBtn");
  const careTermsScroll = document.getElementById("careTermsScroll");
  const careTermsAgreeCheck = document.getElementById("careTermsAgreeCheck");
  const careTermsAcceptBtn = document.getElementById("careTermsAcceptBtn");
  const careTermsStatus = document.getElementById("careTermsStatus");
  const sessionNotificationBar = document.getElementById("sessionNotificationBar");
  const sessionAvatar = document.getElementById("sessionAvatar");
  const sessionName = document.getElementById("sessionName");
  const sessionRole = document.getElementById("sessionRole");
  const sessionNotificationText = document.getElementById("sessionNotificationText");
  const sessionMessageText = document.getElementById("sessionMessageText");
  const chatFocusBtn = document.getElementById("chatFocusBtn");
  const secureChatRoom = document.getElementById("secureChatRoom");
  const secureChatMessages = document.getElementById("secureChatMessages");
  const secureChatInput = document.getElementById("secureChatInput");
  const sendSecureChatBtn = document.getElementById("sendSecureChatBtn");
  const secureChatStatus = document.getElementById("secureChatStatus");
  const globalLangSelect = document.getElementById("globalLangSelect");
  const countryThemeBadge = document.getElementById("countryThemeBadge");
  const languageSwitchStatus = document.getElementById("languageSwitchStatus");
  const hospitalBrandBanner = document.getElementById("hospitalBrandBanner");
  const hospitalBrandIcon = document.getElementById("hospitalBrandIcon");
  const hospitalBrandName = document.getElementById("hospitalBrandName");
  const hospitalBrandMeta = document.getElementById("hospitalBrandMeta");
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const googleRegisterBtn = document.getElementById("googleRegisterBtn");
  const backWelcomeBtn = document.getElementById("backWelcomeBtn");
  const switchAccountBtn = document.getElementById("switchAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const reopenRoleSetupBtn = document.getElementById("reopenRoleSetupBtn");
  const authStatusText = document.getElementById("authStatusText");
  const memberStatusText = document.getElementById("memberStatusText");
  const memberOnboarding = document.getElementById("memberOnboarding");
  const memberOnboardingStatus = document.getElementById("memberOnboardingStatus");
  const memberRoleSelect = document.getElementById("memberRoleSelect");
  const memberHospitalSelect = document.getElementById("memberHospitalSelect");
  const memberHospitalOtherRow = document.getElementById("memberHospitalOtherRow");
  const memberHospitalOtherInput = document.getElementById("memberHospitalOtherInput");
  const saveMemberProfileBtn = document.getElementById("saveMemberProfileBtn");
  const chooseHospitalStaffBtn = document.getElementById("chooseHospitalStaffBtn");
  const choosePatientBtn = document.getElementById("choosePatientBtn");
  const chooseFamilyMemberBtn = document.getElementById("chooseFamilyMemberBtn");
  const hospitalAccountCenter = document.getElementById("hospitalAccountCenter");
  const hospitalAccountStatus = document.getElementById("hospitalAccountStatus");
  const hospitalAccountNameInput = document.getElementById("hospitalAccountNameInput");
  const hospitalOfficialDomainInput = document.getElementById("hospitalOfficialDomainInput");
  const hospitalProofUrlInput = document.getElementById("hospitalProofUrlInput");
  const createHospitalAccountBtn = document.getElementById("createHospitalAccountBtn");
  const joinHospitalAccountCodeInput = document.getElementById("joinHospitalAccountCodeInput");
  const joinHospitalAccountBtn = document.getElementById("joinHospitalAccountBtn");
  const hospitalAccountCodeHint = document.getElementById("hospitalAccountCodeHint");
  const hospitalInviteEmailInput = document.getElementById("hospitalInviteEmailInput");
  const hospitalInviteBtn = document.getElementById("hospitalInviteBtn");
  const hospitalAccountMembersList = document.getElementById("hospitalAccountMembersList");
  const roleScopedSections = document.querySelectorAll("[data-role-access]");
  const memberNameValue = document.getElementById("memberNameValue");
  const memberModeValue = document.getElementById("memberModeValue");
  const memberRiskValue = document.getElementById("memberRiskValue");
  const memberLastSyncValue = document.getElementById("memberLastSyncValue");
  const recentLogsList = document.getElementById("recentLogsList");
  const addQuickNoteBtn = document.getElementById("addQuickNoteBtn");
  const saveCarePlanBtn = document.getElementById("saveCarePlanBtn");
  const generateBriefBtn = document.getElementById("generateBriefBtn");
  const downloadNotesBtn = document.getElementById("downloadNotesBtn");
  const copyBriefBtn = document.getElementById("copyBriefBtn");
  const clearNotesBtn = document.getElementById("clearNotesBtn");
  const memberNotesList = document.getElementById("memberNotesList");
  const sessionBriefText = document.getElementById("sessionBriefText");
  const familyRelayText = document.getElementById("familyRelayText");
  const familyRelayPatientNameInput = document.getElementById("familyRelayPatientNameInput");
  const familyRelayPatientAgeInput = document.getElementById("familyRelayPatientAgeInput");
  const familyRelayRelativeNameInput = document.getElementById("familyRelayRelativeNameInput");
  const familyRelayRelationshipInput = document.getElementById("familyRelayRelationshipInput");
  const familyRelayPreferredLanguageInput = document.getElementById("familyRelayPreferredLanguageInput");
  const familyRelayPhoneInput = document.getElementById("familyRelayPhoneInput");
  const familyRelayHospitalPhoneInput = document.getElementById("familyRelayHospitalPhoneInput");
  const familyRelayEmailInput = document.getElementById("familyRelayEmailInput");
  const generateFamilyRelayBtn = document.getElementById("generateFamilyRelayBtn");
  const copyFamilyRelayBtn = document.getElementById("copyFamilyRelayBtn");
  const callFamilyRelayPhoneBtn = document.getElementById("callFamilyRelayPhoneBtn");
  const callFamilyRelayHospitalBtn = document.getElementById("callFamilyRelayHospitalBtn");
  const sendFamilyRelayWhatsAppBtn = document.getElementById("sendFamilyRelayWhatsAppBtn");
  const sendFamilyRelaySmsBtn = document.getElementById("sendFamilyRelaySmsBtn");
  const sendFamilyRelayGmailBtn = document.getElementById("sendFamilyRelayGmailBtn");
  const orgProjectStatus = document.getElementById("orgProjectStatus");
  const orgProjectNameInput = document.getElementById("orgProjectNameInput");
  const createOrgProjectBtn = document.getElementById("createOrgProjectBtn");
  const orgProjectSelect = document.getElementById("orgProjectSelect");
  const deleteOrgProjectBtn = document.getElementById("deleteOrgProjectBtn");
  const orgMemberEmailInput = document.getElementById("orgMemberEmailInput");
  const addOrgMemberBtn = document.getElementById("addOrgMemberBtn");
  const orgMembersList = document.getElementById("orgMembersList");
  const orgRoomNameInput = document.getElementById("orgRoomNameInput");
  const addOrgRoomBtn = document.getElementById("addOrgRoomBtn");
  const orgRoomWhoInput = document.getElementById("orgRoomWhoInput");
  const orgRoomWatchoutsInput = document.getElementById("orgRoomWatchoutsInput");
  const orgRoomButtonsInput = document.getElementById("orgRoomButtonsInput");
  const orgRoomTagsInput = document.getElementById("orgRoomTagsInput");
  const applyRoomDefaultsBtn = document.getElementById("applyRoomDefaultsBtn");
  const orgRoomsList = document.getElementById("orgRoomsList");
  const aiSignalCategory = document.getElementById("aiSignalCategory");
  const aiSignalConfidence = document.getElementById("aiSignalConfidence");
  const aiSignalSeverity = document.getElementById("aiSignalSeverity");
  const aiSignalNextStep = document.getElementById("aiSignalNextStep");
  const liveMonitorStatus = document.getElementById("liveMonitorStatus");
  const liveMonitorRoomValue = document.getElementById("liveMonitorRoomValue");
  const liveMonitorConfidence = document.getElementById("liveMonitorConfidence");
  const liveMonitorClinician = document.getElementById("liveMonitorClinician");
  const liveMonitorTrend = document.getElementById("liveMonitorTrend");
  const liveMonitorUrlInput = document.getElementById("liveMonitorUrlInput");
  const liveMonitorConnectBtn = document.getElementById("liveMonitorConnectBtn");
  const liveMonitorDisconnectBtn = document.getElementById("liveMonitorDisconnectBtn");
  const liveMonitorSourceStatus = document.getElementById("liveMonitorSourceStatus");
  const liveMonitorCopySampleBtn = document.getElementById("liveMonitorCopySampleBtn");
  const liveMonitorTestBtn = document.getElementById("liveMonitorTestBtn");
  const liveMonitorPasteInput = document.getElementById("liveMonitorPasteInput");
  const liveMonitorPasteRunBtn = document.getElementById("liveMonitorPasteRunBtn");
  const liveMonitorPasteClearBtn = document.getElementById("liveMonitorPasteClearBtn");
  const liveMonitorHeartRate = document.getElementById("liveMonitorHeartRate");
  const liveMonitorSpo2 = document.getElementById("liveMonitorSpo2");
  const liveMonitorTemp = document.getElementById("liveMonitorTemp");
  const liveMonitorResp = document.getElementById("liveMonitorResp");
  const liveMonitorCause = document.getElementById("liveMonitorCause");
  const liveMonitorAction = document.getElementById("liveMonitorAction");
  const liveMonitorCallBtn = document.getElementById("liveMonitorCallBtn");
  const seeSoundTarget = document.getElementById("seeSoundTarget");
  const seeSoundCompareBtn = document.getElementById("seeSoundCompareBtn");
  const seeSoundTranscript = document.getElementById("seeSoundTranscript");
  const seeSoundIpa = document.getElementById("seeSoundIpa");
  const seeSoundScore = document.getElementById("seeSoundScore");
  const seeSoundAdvice = document.getElementById("seeSoundAdvice");
  const seeSoundMouth = document.getElementById("seeSoundMouth");
  const seeSoundMouthHint = document.getElementById("seeSoundMouthHint");
  const seeSoundCoachImage = document.getElementById("seeSoundCoachImage");
  const loginPortal = document.getElementById("loginPortal");
  const memberUnlockBtn = document.getElementById("memberUnlockBtn");
  const appExperience = document.getElementById("appExperience");
  const memberGateBanner = document.getElementById("memberGateBanner");
  const memberLockables = document.querySelectorAll(".member-lockable");
  const memberOnlyBadges = document.querySelectorAll(".member-only-badge");
  const brandHomeLink = document.querySelector(".brand-lockup");

  let currentLang = "en-US";
  let activeUiLang = "en";
  let recognition = null;
  let isListening = false;
  let scenarioIndex = 0;
  let activeUserId = "local-demo";
  let judgeModeTimer = null;
  let judgeModeRemaining = 0;
  const localLogsKey = "carevoice.logs.v1";
  const memberNotesKey = "carevoice.member.notes.v1";
  const orgProjectsKey = "carevoice.orgProjects.v1";
  const orgActiveProjectKey = "carevoice.orgProjects.active.v1";
  const uiLangKey = "carevoice.ui.lang.v1";
  const uiLangCookieKey = "carevoice_ui_lang";
  const localLogs = [];
  const memberNotes = [];
  const orgProjects = [];
  let careReportExportCount = Number(localStorage.getItem("carevoice.reportExports.v1") || "0") || 0;
  let elderTextScale = Number(localStorage.getItem("carevoice.elderTextScale.v1") || "1") || 1;
  let pendingVoiceEntry = null;
  let orgActiveProjectId = localStorage.getItem(orgActiveProjectKey) || "";
  let orgLoadedForIdentity = "";
  let currentOrgUser = null;
  const responseLatencies = [];
  let mouthGuideTimer = null;
  let liveMonitorTick = 0;
  let liveMonitorSnapshot = null;
  let liveMonitorSocket = null;
  let liveMonitorStreamReading = null;
  const liveMonitorUrlKey = "carevoice.liveMonitor.wsUrl.v1";
  const exportHistoryKey = "carevoice.exportHistory.v1";
  const dataPromiseChoiceKey = "carevoice.dataPromise.choice.v1";
  const realWorldProfileKey = "carevoice.realWorld.profile.v1";
  const realWorldContactsKey = "carevoice.realWorld.contacts.v1";
  const realWorldConsentKey = "carevoice.realWorld.consent.v1";
  const realWorldInboxStatusKey = "carevoice.realWorld.inboxStatus.v1";
  const realWorldAuditKey = "carevoice.realWorld.audit.v1";
  let familyRelayDraft = "";
  const familyRelayProfileKey = "carevoice.familyRelay.profile.v1";
  const familyRelayRecipientsKey = "carevoice.familyRelay.recipients.v1";
  const memberProfileKeyPrefix = "carevoice.member.profile.v1";
  const careTermsKeyPrefix = "carevoice.terms.accepted.v1";
  const secureChatKeyPrefix = "carevoice.secureChat.messages.v1";
  const pendingRoleChoiceKey = "carevoice.pendingRoleChoice.v1";
  const hospitalAccountsKey = "carevoice.hospitalAccounts.v1";
  const hospitalMembershipKeyPrefix = "carevoice.hospitalMembership.v1";
  const roleWorkspaceRoutes = {
    hospital_staff: "staff.html",
    patient: "patient.html",
    family_member: "family.html"
  };
  let currentMemberProfile = null;
  let hospitalAccounts = [];
  let currentHospitalMembership = null;
  let verifiedHospitalAccountIds = new Set();
  let forceShowMemberOnboarding = false;
  let pendingHomeRoleChoice = "";
  let secureChatRecords = [];

  const postAuthRouteKey = "carevoice.postAuthRoute.v1";
  let journeyTutorialTimer = null;
  let journeyTutorialIndex = 0;

  const journeyTutorialSteps = [
    { id: "voice", label: "Open Voice Capture Studio", target: "voice-section", offset: 24, message: "Step 1 of 4: show where users speak." },
    { id: "signal", label: "Show AI triage output", target: "voice-section", offset: 24, message: "Step 2 of 4: explain how the app labels medication, symptom, or emergency." },
    { id: "evidence", label: "Open evidence snapshot", target: "evidence", offset: 24, message: "Step 3 of 4: show the live evidence and readiness snapshot." },
    { id: "member", label: "Show caregiver handoff", target: "memberWorkspaceBtn", offset: 24, message: "Step 4 of 4: show the member workspace for handoff and export." }
  ];

  function setPostAuthRoute(route) {
    try {
      sessionStorage.setItem(postAuthRouteKey, route);
    } catch (e) {
      // ignore
    }
    try {
      localStorage.setItem(postAuthRouteKey, route);
    } catch (e) {
      // ignore
    }
  }

  function getPostAuthRoute() {
    try {
      const value = sessionStorage.getItem(postAuthRouteKey);
      if (value) return value;
    } catch (e) {
      // ignore
    }
    try {
      return localStorage.getItem(postAuthRouteKey);
    } catch (e) {
      return null;
    }
  }

  function clearPostAuthRoute() {
    try {
      sessionStorage.removeItem(postAuthRouteKey);
    } catch (e) {
      // ignore
    }
    try {
      localStorage.removeItem(postAuthRouteKey);
    } catch (e) {
      // ignore
    }
  }
  const isMemberWorkspacePage = () => {
    const path = (window.location && window.location.pathname) ? window.location.pathname : "";
    return path.endsWith("/member.html")
      || path.endsWith("member.html")
      || path.endsWith("/staff.html")
      || path.endsWith("staff.html")
      || path.endsWith("/patient.html")
      || path.endsWith("patient.html")
      || path.endsWith("/family.html")
      || path.endsWith("family.html");
  };

  function getCurrentWorkspacePageName() {
    const path = (window.location && window.location.pathname) ? window.location.pathname : "";
    const parts = path.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1].toLowerCase() : "index.html";
  }

  function getRoleWorkspaceRoute(role) {
    return roleWorkspaceRoutes[String(role || "")] || "member.html";
  }

  const sensitiveStoragePrefix = "carevoice.enc.v1:";
  const secureChatStoragePrefix = "carevoice.chat.enc.v1:";

  function setPendingRoleChoice(role) {
    pendingHomeRoleChoice = String(role || "").trim();
    try {
      if (pendingHomeRoleChoice) {
        localStorage.setItem(pendingRoleChoiceKey, pendingHomeRoleChoice);
      }
    } catch (err) {
      console.warn("Could not save pending role choice:", err);
    }
  }

  function getPendingRoleChoice() {
    if (pendingHomeRoleChoice) return pendingHomeRoleChoice;
    try {
      pendingHomeRoleChoice = localStorage.getItem(pendingRoleChoiceKey) || "";
    } catch (err) {
      pendingHomeRoleChoice = "";
    }
    return pendingHomeRoleChoice;
  }

  function clearPendingRoleChoice() {
    pendingHomeRoleChoice = "";
    try {
      localStorage.removeItem(pendingRoleChoiceKey);
    } catch (err) {
      // ignore
    }
  }

  function bufferToBase64(buffer) {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  function base64ToUint8Array(value) {
    const binary = atob(String(value || ""));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  async function deriveAesKeyFromSeed(seed) {
    if (!window.crypto || !window.crypto.subtle) return null;
    const material = new TextEncoder().encode(String(seed || "carevoice"));
    const hash = await window.crypto.subtle.digest("SHA-256", material);
    return window.crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
  }

  function getSensitiveStorageSeed() {
    const identity = window.auth && window.auth.currentUser && window.auth.currentUser.uid
      ? window.auth.currentUser.uid
      : activeUserId || "local-demo";
    const host = window.location && window.location.host ? window.location.host : "carevoice";
    return `carevoice-sensitive-cache::${identity}::${host}`;
  }

  async function encryptStringWithSeed(plainText, seed, prefix = sensitiveStoragePrefix) {
    if (!window.crypto || !window.crypto.subtle) return String(plainText || "");
    const key = await deriveAesKeyFromSeed(seed);
    if (!key) return String(plainText || "");
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(String(plainText || ""));
    const cipherBuffer = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    const payload = {
      iv: bufferToBase64(iv),
      data: bufferToBase64(cipherBuffer)
    };
    return `${prefix}${bufferToBase64(new TextEncoder().encode(JSON.stringify(payload)))}`;
  }

  async function decryptStringWithSeed(storedValue, seed, prefix = sensitiveStoragePrefix) {
    const text = String(storedValue || "");
    if (!text) return "";
    if (!text.startsWith(prefix)) return text;
    if (!window.crypto || !window.crypto.subtle) return "";
    const key = await deriveAesKeyFromSeed(seed);
    if (!key) return "";

    const encodedPayload = text.slice(prefix.length);
    const payloadJson = new TextDecoder().decode(base64ToUint8Array(encodedPayload));
    const payload = JSON.parse(payloadJson || "{}");
    const iv = base64ToUint8Array(payload.iv || "");
    const cipher = base64ToUint8Array(payload.data || "");
    const plainBuffer = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
    return new TextDecoder().decode(plainBuffer);
  }

  async function encryptSensitiveString(plainText) {
    return encryptStringWithSeed(plainText, getSensitiveStorageSeed(), sensitiveStoragePrefix);
  }

  async function decryptSensitiveString(storedValue) {
    return decryptStringWithSeed(storedValue, getSensitiveStorageSeed(), sensitiveStoragePrefix);
  }

  async function readSensitiveJson(storageKey, fallbackValue) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return fallbackValue;
      const decoded = await decryptSensitiveString(raw);
      return decoded ? JSON.parse(decoded) : fallbackValue;
    } catch (err) {
      console.warn(`Could not decrypt ${storageKey}:`, err);
      return fallbackValue;
    }
  }

  async function writeSensitiveJson(storageKey, value) {
    try {
      const encrypted = await encryptSensitiveString(JSON.stringify(value));
      localStorage.setItem(storageKey, encrypted);
    } catch (err) {
      console.warn(`Could not encrypt ${storageKey}:`, err);
    }
  }

  async function readSensitiveText(storageKey, fallbackValue = "") {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return fallbackValue;
      return await decryptSensitiveString(raw);
    } catch (err) {
      console.warn(`Could not decrypt ${storageKey}:`, err);
      return fallbackValue;
    }
  }

  async function writeSensitiveText(storageKey, value) {
    try {
      const encrypted = await encryptSensitiveString(String(value || ""));
      localStorage.setItem(storageKey, encrypted);
    } catch (err) {
      console.warn(`Could not encrypt ${storageKey}:`, err);
    }
  }

  const firestoreFieldPrefix = "carevoice.cloud.v1:";

  function getCloudLogSeed(userUid) {
    const host = window.location && window.location.host ? window.location.host : "carevoice";
    return `carevoice-cloud-log::${String(userUid || activeUserId || "local-demo")}::${host}`;
  }

  function getHospitalAccountCryptoSeed(accountId) {
    const account = getHospitalAccountById(accountId);
    if (!account || !account.code) return "";
    return `carevoice-cloud-org::${String(accountId || "")}::${String(account.code || "").trim().toUpperCase()}`;
  }

  async function encryptCloudLogText(text, userUid) {
    return encryptStringWithSeed(String(text || ""), getCloudLogSeed(userUid), firestoreFieldPrefix);
  }

  async function encryptOrgRoomsForCloud(rooms, accountId) {
    const seed = getHospitalAccountCryptoSeed(accountId);
    if (!seed) return "";
    return encryptStringWithSeed(JSON.stringify(Array.isArray(rooms) ? rooms : []), seed, firestoreFieldPrefix);
  }

  async function decryptOrgRoomsFromCloud(encryptedRooms, accountId, fallbackRooms = []) {
    const seed = getHospitalAccountCryptoSeed(accountId);
    if (!seed) return Array.isArray(fallbackRooms) ? fallbackRooms : [];
    try {
      const decoded = await decryptStringWithSeed(encryptedRooms, seed, firestoreFieldPrefix);
      const parsed = JSON.parse(decoded || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Could not decrypt Firestore room payload:", err);
      return Array.isArray(fallbackRooms) ? fallbackRooms : [];
    }
  }

  function getMemberProfileStorageKey(uid) {
    return `${memberProfileKeyPrefix}.${String(uid || "local-demo")}`;
  }

  function getCareTermsStorageKey(user) {
    return `${careTermsKeyPrefix}.${String(user && user.uid ? user.uid : "local-demo")}`;
  }

  function hasAcceptedCareTerms(user) {
    if (!user || !user.uid) return false;
    try {
      const raw = localStorage.getItem(getCareTermsStorageKey(user));
      const parsed = raw ? JSON.parse(raw) : null;
      return Boolean(parsed && parsed.accepted === true && parsed.uid === user.uid);
    } catch (err) {
      console.warn("Could not read CareVoice terms acceptance:", err);
      return false;
    }
  }

  function hasScrolledCareTermsToEnd() {
    if (!careTermsScroll) return false;
    return careTermsScroll.scrollTop + careTermsScroll.clientHeight >= careTermsScroll.scrollHeight - 8;
  }

  function updateCareTermsGate(user) {
    if (!careTermsAgreeCheck || !careTermsAcceptBtn || !careTermsStatus) return;
    const accepted = hasAcceptedCareTerms(user || (window.auth && window.auth.currentUser ? window.auth.currentUser : null));
    const scrolledToEnd = hasScrolledCareTermsToEnd();
    if (accepted) {
      careTermsAgreeCheck.disabled = false;
      careTermsAgreeCheck.checked = true;
      careTermsAcceptBtn.disabled = true;
      careTermsStatus.textContent = "Terms accepted for this signed-in account. You may choose a role.";
      return;
    }
    careTermsAgreeCheck.disabled = !scrolledToEnd;
    if (!scrolledToEnd) careTermsAgreeCheck.checked = false;
    careTermsAcceptBtn.disabled = !(scrolledToEnd && careTermsAgreeCheck.checked);
    careTermsStatus.textContent = scrolledToEnd
      ? "End reached. Tick the acknowledgement, then accept before choosing a role."
      : "Scroll to the end of the terms before the acknowledgement can be accepted.";
  }

  function markCareTermsAccepted(user) {
    if (!user || !user.uid) return false;
    try {
      localStorage.setItem(getCareTermsStorageKey(user), JSON.stringify({
        accepted: true,
        uid: user.uid,
        email: getUserEmail(user),
        acceptedAt: new Date().toISOString(),
        version: "2026-07-11"
      }));
      updateCareTermsGate(user);
      return true;
    } catch (err) {
      console.warn("Could not save CareVoice terms acceptance:", err);
      if (careTermsStatus) careTermsStatus.textContent = "Could not save terms acceptance. Please try again.";
      return false;
    }
  }

  function requireCareTermsBeforeHomeRole(role, user) {
    if (hasAcceptedCareTerms(user)) return true;
    pendingHomeRoleChoice = role;
    if (profileEntryStatus) {
      profileEntryStatus.textContent = getStaticFallbackText("Before opening a workspace, scroll through and accept the CareVoice terms below.");
    }
    updateCareTermsGate(user);
    if (careTermsScroll && typeof careTermsScroll.scrollIntoView === "function") {
      careTermsScroll.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return false;
  }

  function buildMemberProfileRecord(user, profile, source) {
    const role = String(profile && profile.role ? profile.role : "").trim();
    const email = getUserEmail(user);
    return {
      uid: user.uid,
      email,
      displayName: String(user.displayName || "").trim(),
      photoURL: String(user.photoURL || "").trim(),
      role,
      roleLabel: getMemberRoleLabel(role),
      roleRoute: getRoleWorkspaceRoute(role),
      hospital: String(profile && profile.hospital ? profile.hospital : "").trim(),
      hospitalOther: String(profile && profile.hospitalOther ? profile.hospitalOther : "").trim(),
      source: String(source || "profile_setup"),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      updatedAtMs: Date.now()
    };
  }

  async function saveMemberProfileRecordToFirestore(user, profile, source) {
    if (!window.db || !window.firebase || !user || !user.uid || !profile || !profile.role) return false;
    const email = getUserEmail(user);
    if (!email) return false;
    const record = buildMemberProfileRecord(user, profile, source);
    await window.db.collection("memberProfiles").doc(user.uid).set(record, { merge: true });
    return true;
  }

  function getSecureChatStorageKey(user) {
    return `${secureChatKeyPrefix}.${String(user && user.uid ? user.uid : "local-demo")}`;
  }

  function getSecureChatSeed(user) {
    return `carevoice-secure-chat::${String(user && user.uid ? user.uid : activeUserId)}::${getUserEmail(user) || "local"}`;
  }

  function getSecureChatRoomId(user) {
    const role = currentMemberProfile && currentMemberProfile.role ? currentMemberProfile.role : "member";
    return `CV-CHAT-${String(role).toUpperCase()}-${String(user && user.uid ? user.uid : activeUserId).slice(0, 8)}`;
  }

  async function encryptSecureChatText(user, text) {
    return encryptStringWithSeed(String(text || ""), getSecureChatSeed(user), secureChatStoragePrefix);
  }

  async function decryptSecureChatText(user, encryptedText) {
    return decryptStringWithSeed(encryptedText, getSecureChatSeed(user), secureChatStoragePrefix);
  }

  function loadSecureChatRecords(user) {
    if (!user || !user.uid) return [];
    try {
      const raw = localStorage.getItem(getSecureChatStorageKey(user));
      const parsed = raw ? JSON.parse(raw) : [];
      secureChatRecords = Array.isArray(parsed) ? parsed.slice(-50) : [];
    } catch (err) {
      console.warn("Could not load secure chat records:", err);
      secureChatRecords = [];
    }
    return secureChatRecords;
  }

  function persistSecureChatRecords(user) {
    if (!user || !user.uid) return;
    try {
      localStorage.setItem(getSecureChatStorageKey(user), JSON.stringify(secureChatRecords.slice(-50)));
    } catch (err) {
      console.warn("Could not save secure chat records:", err);
    }
  }

  async function saveSecureChatRecordToFirestore(user, record) {
    if (!window.db || !window.firebase || !user || !user.uid || !record || !record.encryptedText) return false;
    await window.db.collection("secureChats").doc(user.uid).collection("messages").add({
      uid: user.uid,
      email: getUserEmail(user),
      role: currentMemberProfile && currentMemberProfile.role ? currentMemberProfile.role : "member",
      roomId: getSecureChatRoomId(user),
      encryptedText: record.encryptedText,
      senderName: record.senderName,
      createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      createdAtMs: record.createdAtMs
    });
    return true;
  }

  async function renderSecureChatMessages(user) {
    if (!secureChatMessages) return;
    if (!user || !user.uid) {
      secureChatMessages.innerHTML = '<p class="secure-chat-empty">Sign in to open the encrypted room.</p>';
      return;
    }
    const rows = await Promise.all(secureChatRecords.slice(-20).map(async (record) => {
      const plain = await decryptSecureChatText(user, record.encryptedText);
      const time = record.createdAtMs ? new Date(record.createdAtMs).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "now";
      return `<article class="secure-chat-message"><strong>${escapeHtml(record.senderName || "CareVoice Member")}</strong><p>${escapeHtml(plain || "[Encrypted message unavailable]")}</p><small>${escapeHtml(time)} • encrypted at rest</small></article>`;
    }));
    secureChatMessages.innerHTML = rows.length ? rows.join("") : '<p class="secure-chat-empty">No encrypted messages yet. Start with a care update.</p>';
    secureChatMessages.scrollTop = secureChatMessages.scrollHeight;
  }

  async function addSecureChatMessage(user, text, senderName) {
    const trimmed = String(text || "").trim();
    if (!user || !user.uid || !trimmed) return false;
    const record = {
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      senderName: String(senderName || user.displayName || user.email || "CareVoice Member"),
      encryptedText: await encryptSecureChatText(user, trimmed),
      createdAtMs: Date.now()
    };
    secureChatRecords.push(record);
    secureChatRecords = secureChatRecords.slice(-50);
    persistSecureChatRecords(user);
    await renderSecureChatMessages(user);
    saveSecureChatRecordToFirestore(user, record).catch((err) => {
      console.warn("Could not save secure chat message to Firestore:", err);
    });
    return true;
  }

  async function initSecureChatForUser(user) {
    if (!secureChatRoom) return;
    if (!user || !user.uid || !isMemberWorkspacePage()) {
      secureChatRoom.classList.add("hidden");
      secureChatRecords = [];
      await renderSecureChatMessages(null);
      if (secureChatStatus) secureChatStatus.textContent = "Sign in and choose a role to unlock the encrypted room.";
      return;
    }
    secureChatRoom.classList.remove("hidden");
    loadSecureChatRecords(user);
    if (!secureChatRecords.length) {
      const roleLabel = currentMemberProfile && currentMemberProfile.role ? getMemberRoleLabel(currentMemberProfile.role) : "Member";
      await addSecureChatMessage(user, `Secure room opened for ${roleLabel}. Messages are encrypted before local storage and cloud sync.`, "CareVoice System");
      await addSecureChatMessage(user, "Care team channel ready: use this for patient updates, family questions, and handoff notes.", "CareVoice System");
    } else {
      await renderSecureChatMessages(user);
    }
    if (secureChatStatus) secureChatStatus.textContent = `Room ${getSecureChatRoomId(user)} • encrypted message storage active.`;
  }

  function updateSessionNotificationBar(user) {
    if (!sessionNotificationBar) return;
    if (!user || !user.uid || !isMemberWorkspacePage()) {
      sessionNotificationBar.classList.add("hidden");
      return;
    }
    const roleLabel = currentMemberProfile && currentMemberProfile.role ? getMemberRoleLabel(currentMemberProfile.role) : "Member";
    const userLabel = user.displayName || user.email || "CareVoice member";
    sessionNotificationBar.classList.remove("hidden");
    if (sessionAvatar) {
      sessionAvatar.src = user.photoURL || "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png";
      sessionAvatar.alt = `${userLabel} profile picture`;
    }
    if (sessionName) sessionName.textContent = userLabel;
    if (sessionRole) sessionRole.textContent = `${roleLabel} workspace`;
    if (sessionNotificationText) sessionNotificationText.textContent = "3 notifications: role saved, secure room active, care calendar synced";
    if (sessionMessageText) sessionMessageText.textContent = "2 chat messages waiting in encrypted room";
  }

  function getHospitalMembershipStorageKey(uid) {
    return `${hospitalMembershipKeyPrefix}.${String(uid || "local-demo")}`;
  }

  async function loadHospitalAccountsFromFirestore(user) {
    if (!window.db || !user || !user.uid) return [];
    const merged = new Map();

    const ownerSnap = await window.db.collection("hospitalAccounts").where("ownerUid", "==", user.uid).get();
    ownerSnap.forEach((doc) => {
      const data = doc.data() || {};
      merged.set(doc.id, { id: doc.id, ...data });
    });

    const adminSnap = await window.db.collection("hospitalAccounts").where("admins", "array-contains", user.uid).get();
    adminSnap.forEach((doc) => {
      const data = doc.data() || {};
      merged.set(doc.id, { id: doc.id, ...data });
    });

    const email = getUserEmail(user);
    if (email) {
      const memberSnap = await window.db.collection("hospitalAccounts").where("memberEmails", "array-contains", email).get();
      memberSnap.forEach((doc) => {
        const data = doc.data() || {};
        merged.set(doc.id, { id: doc.id, ...data });
      });
    }

    return Array.from(merged.values());
  }

  async function loadVerifiedHospitalAccountsFromFirestore() {
    if (!window.db) return [];
    const snap = await window.db.collection("hospitalAccounts").where("verificationStatus", "==", "verified").get();
    const items = [];
    snap.forEach((doc) => {
      const data = doc.data() || {};
      items.push({ id: doc.id, ...data });
    });
    return items;
  }

  async function loadHospitalMembershipFromFirestore(user) {
    if (!window.db || !user || !user.uid) return null;
    const doc = await window.db.collection("hospitalMemberships").doc(user.uid).get();
    if (!doc.exists) return null;
    const data = doc.data() || {};
    return {
      accountId: String(data.accountId || ""),
      role: String(data.role || "staff"),
      joinedAt: Number(data.joinedAt || Date.now())
    };
  }

  async function saveHospitalAccountToFirestore(account) {
    if (!window.db || !account || !account.id) return;
    normalizeAccountMembers(account);
    const payload = {
      name: String(account.name || "Hospital Team"),
      code: String(account.code || "").trim().toUpperCase(),
      ownerUid: String(account.ownerUid || ""),
      ownerEmail: String(account.ownerEmail || "").trim().toLowerCase(),
      admins: Array.isArray(account.admins) ? account.admins.map((v) => String(v || "")).filter(Boolean) : [],
      adminEmails: Array.isArray(account.adminEmails) ? account.adminEmails.map((v) => String(v || "").trim().toLowerCase()).filter(Boolean) : [],
      members: Array.isArray(account.members) ? account.members.map((v) => String(v || "")).filter(Boolean) : [],
      memberEmails: Array.isArray(account.memberEmails) ? account.memberEmails.map((v) => String(v || "").trim().toLowerCase()).filter(Boolean) : [],
      officialDomain: String(account.officialDomain || "").trim().toLowerCase(),
      proofUrl: String(account.proofUrl || "").trim(),
      verificationStatus: String(account.verificationStatus || "pending"),
      verifiedAt: account.verifiedAt ? Number(account.verifiedAt) : null,
      proofSubmittedAt: account.proofSubmittedAt ? Number(account.proofSubmittedAt) : Date.now(),
      createdAt: Number(account.createdAt || Date.now()),
      updatedAt: Date.now()
    };
    await window.db.collection("hospitalAccounts").doc(String(account.id)).set(payload, { merge: true });
  }

  async function saveHospitalMembershipToFirestore(user, membership) {
    if (!window.db || !user || !user.uid || !membership) return;
    const payload = {
      uid: user.uid,
      accountId: String(membership.accountId || ""),
      role: String(membership.role || "staff"),
      joinedAt: Number(membership.joinedAt || Date.now()),
      updatedAt: Date.now()
    };
    await window.db.collection("hospitalMemberships").doc(user.uid).set(payload, { merge: true });
  }

  async function hydrateHospitalAccessForUser(user) {
    loadHospitalAccounts();
    loadHospitalMembershipForUser(user);
    if (!window.db || !user || !user.uid) return;

    try {
      const [cloudAccounts, verifiedAccounts, cloudMembership] = await Promise.all([
        loadHospitalAccountsFromFirestore(user),
        loadVerifiedHospitalAccountsFromFirestore(),
        loadHospitalMembershipFromFirestore(user)
      ]);

      const mergedCloudAccounts = []
        .concat(Array.isArray(cloudAccounts) ? cloudAccounts : [])
        .concat(Array.isArray(verifiedAccounts) ? verifiedAccounts : []);

      verifiedHospitalAccountIds = new Set(
        (Array.isArray(verifiedAccounts) ? verifiedAccounts : [])
          .map((item) => item && item.id ? String(item.id) : "")
          .filter(Boolean)
      );

      if (mergedCloudAccounts.length) {
        const merged = new Map();
        hospitalAccounts.forEach((item) => {
          if (item && item.id) merged.set(item.id, item);
        });
        mergedCloudAccounts.forEach((item) => {
          if (item && item.id) merged.set(item.id, item);
        });
        hospitalAccounts = Array.from(merged.values());
        persistHospitalAccounts();
      }

      if (cloudMembership) {
        currentHospitalMembership = cloudMembership;
        try {
          localStorage.setItem(getHospitalMembershipStorageKey(user.uid), JSON.stringify(cloudMembership));
        } catch (err) {
          console.warn("Could not cache cloud hospital membership locally:", err);
        }
      }
    } catch (err) {
      console.warn("Could not sync hospital access from Firestore:", err);
    }
  }

  function loadHospitalAccounts() {
    try {
      const parsed = JSON.parse(localStorage.getItem(hospitalAccountsKey) || "[]");
      hospitalAccounts = Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.name && item.code) : [];
    } catch (err) {
      console.warn("Could not load hospital accounts:", err);
      hospitalAccounts = [];
    }
  }

  function persistHospitalAccounts() {
    try {
      localStorage.setItem(hospitalAccountsKey, JSON.stringify(hospitalAccounts.slice(-200)));
    } catch (err) {
      console.warn("Could not save hospital accounts:", err);
    }
  }

  function loadHospitalMembershipForUser(user) {
    if (!user || !user.uid) {
      currentHospitalMembership = null;
      return null;
    }
    try {
      const parsed = JSON.parse(localStorage.getItem(getHospitalMembershipStorageKey(user.uid)) || "null");
      currentHospitalMembership = parsed && typeof parsed === "object" ? parsed : null;
    } catch (err) {
      console.warn("Could not load hospital membership:", err);
      currentHospitalMembership = null;
    }
    return currentHospitalMembership;
  }

  function saveHospitalMembershipForUser(user, membership) {
    if (!user || !user.uid) return;
    try {
      localStorage.setItem(getHospitalMembershipStorageKey(user.uid), JSON.stringify(membership || null));
      currentHospitalMembership = membership || null;
    } catch (err) {
      console.warn("Could not save hospital membership:", err);
    }

    if (window.db && membership) {
      saveHospitalMembershipToFirestore(user, membership).catch((err) => {
        console.warn("Could not save hospital membership to Firestore:", err);
      });
    }
  }

  function generateHospitalJoinCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 8; i += 1) {
      code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return code;
  }

  function getHospitalAccountById(accountId) {
    return hospitalAccounts.find((item) => item && item.id === String(accountId || "")) || null;
  }

  function getHospitalAccountByCode(code) {
    const normalized = String(code || "").trim().toUpperCase();
    return hospitalAccounts.find((item) => item && String(item.code || "").toUpperCase() === normalized) || null;
  }

  function normalizeHospitalIdentity(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function isVerifiedHospitalAccount(account) {
    return account
      && String(account.verificationStatus || "").toLowerCase() === "verified"
      && verifiedHospitalAccountIds.has(String(account.id || ""));
  }

  function getVerifiedHospitalAccountForProfile(profile) {
    const hospitalLabel = getHospitalLabelFromProfile(profile);
    if (!hospitalLabel || hospitalLabel === "N/A") return null;

    const membershipAccount = currentHospitalMembership && currentHospitalMembership.accountId
      ? getHospitalAccountById(currentHospitalMembership.accountId)
      : null;
    if (isVerifiedHospitalAccount(membershipAccount)) return membershipAccount;

    const target = normalizeHospitalIdentity(hospitalLabel);
    return hospitalAccounts.find((account) => {
      if (!isVerifiedHospitalAccount(account)) return false;
      return normalizeHospitalIdentity(account.name) === target;
    }) || null;
  }

  function normalizeOfficialDomain(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .replace(/^@/, "");
  }

  function getEmailDomain(email) {
    const parts = String(email || "").trim().toLowerCase().split("@");
    return parts.length === 2 ? parts[1] : "";
  }

  function getUserEmail(user) {
    return String(user && user.email ? user.email : "").trim().toLowerCase();
  }

  function normalizeAccountMembers(account) {
    if (!account || typeof account !== "object") return;
    if (!Array.isArray(account.members)) account.members = [];
    if (!Array.isArray(account.memberEmails)) account.memberEmails = [];
    if (!Array.isArray(account.admins)) account.admins = [];
    if (!Array.isArray(account.adminEmails)) account.adminEmails = [];
  }

  function canManageHospitalAccount(user, account) {
    if (!user || !user.uid || !account) return false;
    normalizeAccountMembers(account);
    return account.ownerUid === user.uid || account.admins.includes(user.uid);
  }

  function renderHospitalAccountMembers(user, account) {
    if (!hospitalAccountMembersList) return;
    hospitalAccountMembersList.innerHTML = "";

    if (!account) {
      const li = document.createElement("li");
      li.textContent = "Join or create an account to view staff members.";
      hospitalAccountMembersList.appendChild(li);
      return;
    }

    normalizeAccountMembers(account);
    const emails = Array.from(new Set(account.memberEmails.map((value) => String(value || "").trim().toLowerCase()).filter(Boolean)));
    if (!emails.length) {
      const li = document.createElement("li");
      li.textContent = "No staff emails yet.";
      hospitalAccountMembersList.appendChild(li);
      return;
    }

    const canManage = canManageHospitalAccount(user, account);
    const ownerEmail = String(account.ownerEmail || "").trim().toLowerCase();

    emails.forEach((email) => {
      const li = document.createElement("li");
      const isOwner = ownerEmail && ownerEmail === email;
      const roleLabel = isOwner ? "Owner" : "Staff";
      li.textContent = `${email} (${roleLabel})`;

      if (canManage && !isOwner) {
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "secondary-btn";
        removeBtn.dataset.removeHospitalMemberEmail = email;
        removeBtn.textContent = "Remove";
        li.appendChild(document.createTextNode(" "));
        li.appendChild(removeBtn);
      }

      hospitalAccountMembersList.appendChild(li);
    });
  }

  function getHospitalLabelFromProfile(profile) {
    const value = profile && profile.hospital ? String(profile.hospital) : "";
    if (!value) return "";
    if (value === "na") return "N/A";
    if (value === "other") return String(profile.hospitalOther || "").trim();
    return value
      .replace(/_/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  }

  const hospitalBrandProfiles = {
    queen_mary_hospital: {
      icon: "QMH",
      name: "Queen Mary Hospital",
      meta: "CareVoice workspace customised for Queen Mary Hospital care teams."
    },
    queen_elizabeth_hospital: {
      icon: "QEH",
      name: "Queen Elizabeth Hospital",
      meta: "CareVoice workspace customised for Queen Elizabeth Hospital care teams."
    },
    prince_of_wales_hospital: {
      icon: "PWH",
      name: "Prince of Wales Hospital",
      meta: "CareVoice workspace customised for Prince of Wales Hospital care teams."
    },
    tuen_mun_hospital: {
      icon: "TMH",
      name: "Tuen Mun Hospital",
      meta: "CareVoice workspace customised for Tuen Mun Hospital care teams."
    }
  };

  function getCustomHospitalIcon(name) {
    const words = String(name || "")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    const initials = words.slice(0, 3).map((word) => word[0]).join("").toUpperCase();
    return initials || "H";
  }

  function applyHospitalBranding(profile) {
    if (!hospitalBrandBanner || !document.body) return;

    const hospitalValue = profile && profile.hospital ? String(profile.hospital) : "";
    const hospitalLabel = getHospitalLabelFromProfile(profile);
    const hasHospital = hospitalValue && hospitalValue !== "na" && hospitalLabel && hospitalLabel !== "N/A";

    if (!hasHospital) {
      hospitalBrandBanner.classList.add("hidden");
      document.body.removeAttribute("data-hospital-theme");
      return;
    }

    const verifiedAccount = getVerifiedHospitalAccountForProfile(profile);
    if (!verifiedAccount) {
      hospitalBrandBanner.classList.add("hidden");
      document.body.removeAttribute("data-hospital-theme");
      return;
    }

    const knownBrand = hospitalBrandProfiles[hospitalValue];
    const verifiedName = String(verifiedAccount.name || hospitalLabel).trim();
    const brand = knownBrand || {
      icon: getCustomHospitalIcon(verifiedName),
      name: verifiedName,
      meta: `Verified hospital workspace for ${verifiedName}.`
    };

    hospitalBrandBanner.classList.remove("hidden");
    document.body.setAttribute("data-hospital-theme", knownBrand ? hospitalValue : "custom_hospital");
    const displayName = getStaticFallbackText(brand.name);
    const displayMeta = activeUiLang === "zh"
      ? `已驗證醫院工作區：${displayName}。`
      : brand.meta;
    if (hospitalBrandIcon) hospitalBrandIcon.textContent = brand.icon;
    if (hospitalBrandName) hospitalBrandName.textContent = displayName;
    if (hospitalBrandMeta) hospitalBrandMeta.textContent = displayMeta;
  }

  function applyRoleScopedSections(role) {
    roleScopedSections.forEach((section) => {
      const allowRaw = String(section.getAttribute("data-role-access") || "");
      const allow = allowRaw
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      const visible = !allow.length || allow.includes(String(role || ""));
      section.classList.toggle("hidden", !visible);
    });
  }

  function refreshHospitalAccountUi(user) {
    if (!isMemberWorkspacePage()) return;
    const role = currentMemberProfile && currentMemberProfile.role ? String(currentMemberProfile.role) : "";
    const isStaff = role === "hospital_staff";
    if (hospitalAccountCenter) {
      hospitalAccountCenter.classList.toggle("hidden", !isStaff || !user || !user.uid);
    }

    if (!isStaff) {
      if (hospitalAccountCodeHint) {
        hospitalAccountCodeHint.textContent = "Hospital staff account center is only shown for hospital staff roles.";
      }
      return;
    }

    const account = currentHospitalMembership && currentHospitalMembership.accountId
      ? getHospitalAccountById(currentHospitalMembership.accountId)
      : null;

    if (account) {
      const verificationStatus = String(account.verificationStatus || "pending").toLowerCase();
      if (hospitalAccountStatus) {
        hospitalAccountStatus.textContent = activeUiLang === "zh"
          ? (verificationStatus === "verified"
            ? `已驗證醫院帳戶：${account.name}。相關用戶會啟用醫院品牌顯示。`
            : `${account.name} 正在等待驗證。證明審核前，醫院品牌顯示會保持鎖定。`)
          : (verificationStatus === "verified"
            ? `Verified hospital account: ${account.name}. Branding is active for linked users.`
            : `Verification pending for ${account.name}. Branding stays locked until proof is reviewed.`);
      }
      if (hospitalAccountCodeHint) {
        const statusLabel = activeUiLang === "zh"
          ? (verificationStatus === "verified" ? "已驗證" : "待審核")
          : verificationStatus;
        hospitalAccountCodeHint.textContent = activeUiLang === "zh"
          ? `目前帳戶：${account.name} • 加入碼：${account.code} • 狀態：${statusLabel}`
          : `Current account: ${account.name} • Join code: ${account.code} • Status: ${statusLabel}`;
      }
    } else {
      if (hospitalAccountStatus) {
        hospitalAccountStatus.textContent = "Create a hospital account or join one with a code to enable staff-level collaboration.";
      }
      if (hospitalAccountCodeHint) {
        hospitalAccountCodeHint.textContent = "No account joined yet.";
      }
    }

    renderHospitalAccountMembers(user, account);
  }

  function isMemberProfileComplete(profile) {
    if (!profile || typeof profile !== "object") return false;
    if (!profile.role) return false;
    if (!profile.hospital) return false;
    if (profile.hospital === "other") {
      return Boolean(String(profile.hospitalOther || "").trim());
    }
    return true;
  }

  function getMemberProfileFromUi() {
    return {
      role: String(memberRoleSelect ? memberRoleSelect.value : "").trim(),
      hospital: String(memberHospitalSelect ? memberHospitalSelect.value : "").trim(),
      hospitalOther: String(memberHospitalOtherInput ? memberHospitalOtherInput.value : "").trim(),
      updatedAt: Date.now()
    };
  }

  function updateHospitalOtherVisibility() {
    if (!memberHospitalOtherRow || !memberHospitalSelect) return;
    const showOther = memberHospitalSelect.value === "other";
    memberHospitalOtherRow.classList.toggle("hidden", !showOther);
    if (!showOther && memberHospitalOtherInput) {
      memberHospitalOtherInput.value = "";
    }
  }

  function loadMemberProfileForUser(user) {
    if (!user || !user.uid) {
      currentMemberProfile = null;
      return null;
    }
    try {
      const raw = localStorage.getItem(getMemberProfileStorageKey(user.uid));
      const parsed = raw ? JSON.parse(raw) : null;
      currentMemberProfile = parsed && typeof parsed === "object" ? parsed : null;
    } catch (err) {
      console.warn("Could not load member onboarding profile:", err);
      currentMemberProfile = null;
    }

    if (memberRoleSelect) memberRoleSelect.value = currentMemberProfile && currentMemberProfile.role ? String(currentMemberProfile.role) : "";
    if (memberHospitalSelect) memberHospitalSelect.value = currentMemberProfile && currentMemberProfile.hospital ? String(currentMemberProfile.hospital) : "";
    if (memberHospitalOtherInput) memberHospitalOtherInput.value = currentMemberProfile && currentMemberProfile.hospitalOther ? String(currentMemberProfile.hospitalOther) : "";
    updateHospitalOtherVisibility();
    return currentMemberProfile;
  }

  async function loadMemberProfileRecordFromFirestore(user) {
    if (!window.db || !user || !user.uid) return null;
    try {
      const doc = await window.db.collection("memberProfiles").doc(user.uid).get();
      if (!doc.exists) return null;
      const data = doc.data() || {};
      const profile = {
        role: String(data.role || "").trim(),
        hospital: String(data.hospital || "").trim() || "na",
        hospitalOther: String(data.hospitalOther || "").trim(),
        updatedAt: Number(data.updatedAtMs || Date.now())
      };
      return profile.role ? profile : null;
    } catch (err) {
      console.warn("Could not load member profile from Firestore:", err);
      return null;
    }
  }

  async function hydrateMemberProfileForUser(user) {
    const localProfile = loadMemberProfileForUser(user);
    if (!user || !user.uid || isMemberProfileComplete(localProfile)) return localProfile;
    const cloudProfile = await loadMemberProfileRecordFromFirestore(user);
    if (!cloudProfile) return localProfile;
    try {
      localStorage.setItem(getMemberProfileStorageKey(user.uid), JSON.stringify(cloudProfile));
    } catch (err) {
      console.warn("Could not cache Firestore member profile locally:", err);
    }
    currentMemberProfile = cloudProfile;
    if (memberRoleSelect) memberRoleSelect.value = cloudProfile.role || "";
    if (memberHospitalSelect) memberHospitalSelect.value = cloudProfile.hospital || "";
    if (memberHospitalOtherInput) memberHospitalOtherInput.value = cloudProfile.hospitalOther || "";
    updateHospitalOtherVisibility();
    return cloudProfile;
  }

  function saveMemberProfileForUser(user) {
    if (!user || !user.uid) return false;
    const profile = getMemberProfileFromUi();
    const savedRole = currentMemberProfile && isMemberProfileComplete(currentMemberProfile)
      ? String(currentMemberProfile.role || "")
      : "";
    if (savedRole && profile.role && profile.role !== savedRole) {
      if (memberOnboardingStatus) {
        memberOnboardingStatus.textContent = getStaticFallbackText(`This account already has one role: ${getMemberRoleLabel(savedRole)}. Sign out and use a different Google account for another role.`);
      }
      return false;
    }
    if (!isMemberProfileComplete(profile)) {
      if (memberOnboardingStatus) {
        memberOnboardingStatus.textContent = getStaticFallbackText("Please choose role and hospital. If hospital is Other, enter its name.");
      }
      return false;
    }

    try {
      localStorage.setItem(getMemberProfileStorageKey(user.uid), JSON.stringify(profile));
      currentMemberProfile = profile;
      clearPendingRoleChoice();
      saveMemberProfileRecordToFirestore(user, profile, "member_profile_setup").catch((err) => {
        console.warn("Could not save member profile to Firestore:", err);
      });
      forceShowMemberOnboarding = false;
      if (memberOnboardingStatus) {
        memberOnboardingStatus.textContent = getStaticFallbackText("Profile saved. Member workspace unlocked.");
      }
      return true;
    } catch (err) {
      console.warn("Could not save member onboarding profile:", err);
      if (memberOnboardingStatus) {
        memberOnboardingStatus.textContent = getStaticFallbackText("Could not save profile. Please try again.");
      }
      return false;
    }
  }

  function setRoleChoiceInUi(role) {
    if (memberRoleSelect) {
      memberRoleSelect.value = role;
    }
    if (role !== "hospital_staff" && memberHospitalSelect && !memberHospitalSelect.value) {
      memberHospitalSelect.value = "na";
    }
    updateHospitalOtherVisibility();
  }

  function chooseRoleAndRedirect(role) {
    const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
    if (!user) {
      if (memberOnboardingStatus) {
        memberOnboardingStatus.textContent = getStaticFallbackText("Please sign in first.");
      }
      return;
    }

    if (currentMemberProfile && isMemberProfileComplete(currentMemberProfile) && currentMemberProfile.role && currentMemberProfile.role !== role) {
      if (memberOnboardingStatus) {
        memberOnboardingStatus.textContent = getStaticFallbackText(`This account already has one role: ${getMemberRoleLabel(currentMemberProfile.role)}. Opening that workspace.`);
      }
      routeToRoleWorkspaceIfNeeded(user, true);
      return;
    }

    setRoleChoiceInUi(role);
    if (role === "hospital_staff" && memberHospitalSelect && !memberHospitalSelect.value) {
      memberHospitalSelect.value = "other";
    }
    if (role === "hospital_staff" && memberHospitalOtherInput && !String(memberHospitalOtherInput.value || "").trim()) {
      memberHospitalOtherInput.value = "Choose hospital on staff page";
    }
    updateHospitalOtherVisibility();

    if (saveMemberProfileForUser(user)) {
      loadMemberProfileForUser(user);
      const unlocked = applyMemberOnboardingGate(user);
      refreshMemberTools();
      if (unlocked) {
        routeToRoleWorkspaceIfNeeded(user, true);
      }
    }
  }

  function chooseHomeIdentityAndRedirect(role) {
    const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
    if (!user || !user.uid) {
      setPendingRoleChoice(role);
      if (profileEntryStatus) {
        profileEntryStatus.textContent = getStaticFallbackText(`Sign in with Google to continue as ${getMemberRoleLabel(role)}. We will bring this choice back after login.`);
      }
      setPostAuthRoute("member");
      showLoginPortal();
      return;
    }

    if (currentMemberProfile && isMemberProfileComplete(currentMemberProfile) && currentMemberProfile.role && currentMemberProfile.role !== role) {
      if (profileEntryStatus) {
        profileEntryStatus.textContent = getStaticFallbackText(`This account already has one role: ${getMemberRoleLabel(currentMemberProfile.role)}. Opening that workspace.`);
      }
      window.location.href = getRoleWorkspaceRoute(currentMemberProfile.role);
      return;
    }

    if (!requireCareTermsBeforeHomeRole(role, user)) {
      return;
    }

    const profile = {
      role,
      hospital: role === "hospital_staff" ? "other" : "na",
      hospitalOther: role === "hospital_staff" ? "Choose hospital on staff page" : "",
      updatedAt: Date.now()
    };

    try {
      localStorage.setItem(getMemberProfileStorageKey(user.uid), JSON.stringify(profile));
      currentMemberProfile = profile;
      clearPendingRoleChoice();
      if (profileEntryStatus) {
        profileEntryStatus.textContent = getStaticFallbackText("Profile saved. Opening your workspace...");
      }
      saveMemberProfileRecordToFirestore(user, profile, "homepage_role_chooser")
        .catch((err) => {
          console.warn("Could not save homepage role to Firestore:", err);
        })
        .finally(() => {
          window.location.href = getRoleWorkspaceRoute(role);
        });
    } catch (err) {
      console.warn("Could not save homepage identity choice:", err);
      if (profileEntryStatus) {
        profileEntryStatus.textContent = getStaticFallbackText("Could not save profile. Please try again.");
      }
    }
  }

  function getMemberRoleLabel(role) {
    switch (String(role || "")) {
      case "hospital_staff":
        return "Hospital Staff";
      case "patient":
        return "Patient";
      case "family_member":
        return "Family Member";
      default:
        return "";
    }
  }

  function reopenRoleSetup() {
    const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
    if (!user || !user.uid) {
      if (memberStatusText) {
        memberStatusText.textContent = getStaticFallbackText("Please sign in first.");
      }
      return;
    }

    forceShowMemberOnboarding = true;
    if (memberOnboarding) memberOnboarding.classList.remove("hidden");
    if (memberOnboardingStatus) {
      memberOnboardingStatus.textContent = getStaticFallbackText("Choose Hospital Staff, Patient, or Family Member, then save to enter that workspace.");
    }
    if (memberOnboarding) {
      glideToElement(memberOnboarding, 22);
    }
  }

  function applyMemberOnboardingGate(user) {
    if (!isMemberWorkspacePage()) return true;
    const isAuthed = Boolean(user && user.uid);
    const profileComplete = isAuthed && isMemberProfileComplete(currentMemberProfile);
    const role = currentMemberProfile && currentMemberProfile.role ? String(currentMemberProfile.role) : "";
    const requiresHospitalAccount = role === "hospital_staff";
    const hasHospitalAccount = Boolean(currentHospitalMembership && currentHospitalMembership.accountId && getHospitalAccountById(currentHospitalMembership.accountId));
    const fullyComplete = profileComplete && (!requiresHospitalAccount || hasHospitalAccount);

    if (memberOnboarding) {
      memberOnboarding.classList.toggle("hidden", !isAuthed || (fullyComplete && !forceShowMemberOnboarding));
    }

    applyHospitalBranding(profileComplete ? currentMemberProfile : null);

    const shouldUnlock = isAuthed && profileComplete;
    setFeatureAccess(shouldUnlock);
    if (logoutBtn) logoutBtn.disabled = !isAuthed;
    applyRoleScopedSections(shouldUnlock ? role : "");
    refreshHospitalAccountUi(user);

    if (memberStatusText) {
      if (!isAuthed) {
        memberStatusText.textContent = getStaticFallbackText("Guest mode active. Please sign in.");
      } else if (!profileComplete) {
        memberStatusText.textContent = getStaticFallbackText("Signed in. Complete role and hospital setup to unlock the workspace.");
      } else if (requiresHospitalAccount && !hasHospitalAccount) {
        memberStatusText.textContent = getStaticFallbackText("Signed in. Hospital staff must create or join a hospital account before entering the workspace.");
      }
    }

    if (memberOnboardingStatus && isAuthed && profileComplete && requiresHospitalAccount && !hasHospitalAccount) {
      memberOnboardingStatus.textContent = getStaticFallbackText("Hospital staff need a hospital account. Create one or join with a code below.");
    }

    return shouldUnlock;
  }

  function routeToRoleWorkspaceIfNeeded(user, force = false) {
    if (!user || !user.uid) return false;
    if (!currentMemberProfile || !isMemberProfileComplete(currentMemberProfile)) return false;

    const role = String(currentMemberProfile.role || "");
    if (!role) return false;

    const target = getRoleWorkspaceRoute(role);
    const currentPage = getCurrentWorkspacePageName();
    const shouldRoute = force || (currentPage !== target && isMemberWorkspacePage());
    if (!shouldRoute) return false;

    window.location.href = target;
    return true;
  }

  function getDemoScenariosForUiLang(lang) {
    switch (lang) {
      case "zh":
        return [
          {
            label: "用藥提醒檢查",
            transcript: "我啱啱食咗血壓藥，今晚要再食嗎？",
            insight: "💊 已記錄用藥相關內容，並準備照顧者摘要。",
            note: "示範情境輪播（方便現場演示）"
          },
          {
            label: "症狀升級監測",
            transcript: "我今日有啲頭暈同胸口唔舒服。",
            insight: "🩺 已記錄症狀。建議照顧者覆核並安排求醫。",
            note: "示範情境輪播（方便現場演示）"
          },
          {
            label: "緊急偵測流程",
            transcript: "佢喺廁所暈低咗，快啲幫手！",
            insight: "🚨 偵測到緊急訊號。已啟動 SOS 升級流程。",
            note: "示範情境輪播（方便現場演示）"
          }
        ];
      case "de":
        return [
          {
            label: "Medikamenten-Check-in",
            transcript: "Ich habe gerade mein Blutdruckmedikament genommen. Muss ich es heute Abend nochmal nehmen?",
            insight: "💊 Medikamentenbezogene Eingabe protokolliert. Zusammenfassung für Betreuer vorbereitet.",
            note: "Szenarien wechseln automatisch (Live-Demo)"
          },
          {
            label: "Symptom-Eskalation",
            transcript: "Mir ist heute schwindlig und meine Brust fühlt sich eng an.",
            insight: "🩺 Symptom protokolliert. Empfehlung: zeitnahe Pflege-/Arzt-Rücksprache.",
            note: "Szenarien wechseln automatisch (Live-Demo)"
          },
          {
            label: "Notfall-Workflow",
            transcript: "Er ist im Bad ohnmächtig geworden. Bitte helfen Sie sofort.",
            insight: "🚨 Notfall erkannt. SOS-Eskalation aktiviert.",
            note: "Szenarien wechseln automatisch (Live-Demo)"
          }
        ];
      case "ja":
        return [
          {
            label: "服薬リマインダー確認",
            transcript: "さっき血圧の薬を飲みました。今夜ももう一回飲む必要がありますか？",
            insight: "💊 服薬に関する内容を記録しました。介護者向けサマリーを準備します。",
            note: "シナリオを自動で切り替え（ライブデモ用）"
          },
          {
            label: "症状の悪化モニタリング",
            transcript: "今日はめまいがして、胸が苦しい感じがします。",
            insight: "🩺 症状を記録しました。介護者の確認と受診の相談を推奨します。",
            note: "シナリオを自動で切り替え（ライブデモ用）"
          },
          {
            label: "緊急検知フロー",
            transcript: "お風呂場で倒れました。今すぐ助けてください。",
            insight: "🚨 緊急を検知しました。SOS エスカレーションを起動します。",
            note: "シナリオを自動で切り替え（ライブデモ用）"
          }
        ];
      case "es":
        return [
          {
            label: "Revisión de medicación",
            transcript: "Acabo de tomar mi pastilla de la presión. ¿Tengo que tomarla otra vez esta noche?",
            insight: "💊 Entrada de medicación registrada. Resumen para el cuidador preparado.",
            note: "Escenarios rotan automáticamente (demo en vivo)"
          },
          {
            label: "Monitoreo de síntomas",
            transcript: "Hoy me siento mareado y tengo una presión en el pecho.",
            insight: "🩺 Síntoma registrado. Recomendación: revisión del cuidador y consulta médica.",
            note: "Escenarios rotan automáticamente (demo en vivo)"
          },
          {
            label: "Flujo de emergencia",
            transcript: "Se desmayó en el baño. Por favor, ayúdenos ahora.",
            insight: "🚨 Emergencia detectada. Escalación SOS activada.",
            note: "Escenarios rotan automáticamente (demo en vivo)"
          }
        ];
      case "fr":
        return [
          {
            label: "Vérification de médication",
            transcript: "Je viens de prendre mon médicament pour la tension. Dois-je le reprendre ce soir ?",
            insight: "💊 Entrée liée aux médicaments enregistrée. Résumé pour l'aidant prêt.",
            note: "Scénarios en rotation automatique (démo)"
          },
          {
            label: "Suivi des symptômes",
            transcript: "Aujourd'hui j'ai des vertiges et une gêne dans la poitrine.",
            insight: "🩺 Symptôme enregistré. Recommandation : revue par l'aidant et avis médical.",
            note: "Scénarios en rotation automatique (démo)"
          },
          {
            label: "Workflow d'urgence",
            transcript: "Il s'est évanoui dans la salle de bain. Aidez-nous tout de suite.",
            insight: "🚨 Urgence détectée. Escalade SOS activée.",
            note: "Scénarios en rotation automatique (démo)"
          }
        ];
      default:
        return [
          {
            label: "Medication reminder check-in",
            transcript: "I just took my blood pressure medicine. Do I need to take it again tonight?",
            insight: "💊 Medication-related input logged. Caregiver summary prepared.",
            note: "Scenario cycling for live presentation demo"
          },
          {
            label: "Symptom escalation monitoring",
            transcript: "I feel dizzy today and have tightness in my chest.",
            insight: "🩺 Symptom logged. Suggest caregiver review and doctor consultation.",
            note: "Scenario cycling for live presentation demo"
          },
          {
            label: "Emergency detection workflow",
            transcript: "He fainted in the bathroom, please help now.",
            insight: "🚨 Emergency signal detected. SOS escalation pathway activated.",
            note: "Scenario cycling for live presentation demo"
          }
        ];
    }
  }

  function getMockLangBadgeForUiLang(lang) {
    switch (lang) {
      case "zh":
        return "粵/EN";
      case "en":
        return "EN/粵";
      case "de":
        return "DE/EN";
      case "ja":
        return "JA/EN";
      case "es":
        return "ES/EN";
      case "fr":
        return "FR/EN";
      default:
        return "EN";
    }
  }

  function syncShowcaseDemoForUiLang(lang) {
    demoScenarios = getDemoScenariosForUiLang(lang);
    scenarioIndex = 0;
    renderDemoScenario(scenarioIndex);
    pulseSignal();
    if (mockLangBadge) {
      mockLangBadge.textContent = getMockLangBadgeForUiLang(lang);
    }
  }

  function getVoiceQuickToggleConfig(uiLang) {
    switch (uiLang) {
      case "zh":
        return {
          primary: { speech: "zh-HK", label: "粵語" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "de":
        return {
          primary: { speech: "de-DE", label: "Deutsch" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "ja":
        return {
          primary: { speech: "ja-JP", label: "日本語" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "es":
        return {
          primary: { speech: "es-ES", label: "Español" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "fr":
        return {
          primary: { speech: "fr-FR", label: "Français" },
          secondary: { speech: "en-US", label: "English" }
        };
      default:
        return {
          primary: { speech: "en-US", label: "English" },
          secondary: { speech: "zh-HK", label: "Cantonese" }
        };
    }
  }

  function syncVoiceQuickLanguageToggle(uiLang) {
    if (!langBtns || !langBtns.length) return;
    const config = getVoiceQuickToggleConfig(uiLang);
    const first = langBtns[0];
    const second = langBtns[1];
    if (!first || !second) return;

    first.dataset.lang = config.primary.speech;
    second.dataset.lang = config.secondary.speech;
    first.textContent = config.primary.label;
    second.textContent = config.secondary.label;
    langBtns.forEach((btn) => {
      btn.disabled = true;
      btn.setAttribute("aria-disabled", "true");
    });

    syncQuickLanguageButtons();
  }

  let demoScenarios = getDemoScenariosForUiLang("en");

  const i18n = {
    en: {
      "nav.professionals": "Professionals",
      "nav.platform": "Platform",
      "nav.journey": "Journey",
      "nav.market": "Market",
      "nav.contact": "Contact",
      "nav.language": "Language",
      "nav.switching": "Switching language...",
      "nav.switchDone": "Language updated",
      "nav.switchLocalOnly": "Language updated (local mode; translator unavailable)",
      "nav.memberLogin": "Member Login",
      "nav.register": "Register",
      "nav.workspace": "Member Workspace",
      "nav.demo": "Request Live Demo",
      "welcome.eyebrow": "Bienvenue",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Une plateforme professionnelle de sante vocale pour les equipes de soins aux aines, les partenaires communautaires et les aidants familiaux a Hong Kong.",
      "welcome.status": "Utilisez le bouton Connexion membre en haut a droite pour ouvrir l'acces professionnel.",
      "portal.eyebrow": "Portail Membre",
      "portal.title": "Console d'acces professionnel",
      "portal.signInGoogle": "Se connecter avec Google",
      "portal.registerGoogle": "S'inscrire avec Google",
      "portal.back": "Retour a l'accueil",
      "gate.preview": "Mode Apercu",
      "gate.title": "Essayez l'experience principale avant la connexion",
      "gate.copy": "Vous pouvez tester la capture vocale et le coach de prononciation maintenant. Connectez-vous pour debloquer les exports, le mode jury et les outils complets de l'espace membre.",
      "gate.button": "Ouvrir la connexion membre",
      "voice.title": "Studio de capture vocale",
      "voice.live": "Direct",
      "voice.stack": "Pile d'intelligence vocale",
      "welcome.eyebrow": "Welcome",
      "voice.liveTranscript": "Transcription en direct",
      "voice.aiInsight": "Insight IA",
      "voice.seeSoundTitle": "Coach de prononciation SeeSound",
      "voice.targetPlaceholder": "J'ai besoin d'aide pour la prononciation",
      "welcome.title": "CareVoice Clinical Connect",
      "voice.visualCoach": "Coach visuel de communication",
      "voice.coachCaption": "Observez la posture des levres et reproduisez la forme de la bouche pendant que vous parlez.",
      "voice.lipGuide": "Guide labial : suivez le mouvement des levres et copiez la forme en parlant",
      "welcome.copy": "A professional voice-health platform for elderly care teams, community partners, and family caregivers across Hong Kong.",
      "welcome.status": "Use the small Member Login button on the top-right to open the professional access portal.",
      "portal.eyebrow": "Member Portal",
      "portal.title": "Professional Access Console",
      "portal.signInGoogle": "Sign in with Google",
      "portal.registerGoogle": "Register with Google",
      "portal.back": "Back to Welcome",
      "gate.preview": "Preview Mode",
      "gate.title": "Try the core experience before login",
      "gate.copy": "You can test voice capture and pronunciation coaching now. Sign in to unlock exports, judge mode, and full member workspace tools.",
      "gate.button": "Open Member Login",
      "voice.title": "Voice Capture Studio",
      "voice.live": "Live",
      "voice.stack": "Speech Intelligence Stack",
      "voice.recordBtn": "🎙️ Hold to Speak",
      "voice.quickCantonese": "Cantonese",
      "voice.quickEnglish": "English",
      "voice.liveTranscript": "Live Transcript",
      "voice.aiInsight": "AI Insight",
      "voice.seeSoundTitle": "SeeSound Pronunciation Coach",
      "voice.targetPlaceholder": "I need help with pronunciation",
      "voice.compare": "Compare with Target",
      "voice.visualCoach": "Visual Communication Coach",
      "voice.coachCaption": "Watch lip posture and match your mouth shape while speaking.",
      "voice.lipGuide": "Lip guide: follow the moving lips and copy the shape while speaking",
      "voice.upperLip": "Upper Lip",
      "voice.lowerLip": "Lower Lip",
      "voice.waitingForVoice": "Waiting for voice input...",
      "voice.readyToListen": "Ready to listen",
      "voice.signal.liveTranscript": "Live Transcript",
      "voice.signal.ipa": "IPA Output",
      "voice.signal.score": "Pronunciation Score",
      "voice.signal.advice": "Correction Advice",
      "voice.recordBtnListening": "👂 Listening...",
      "voice.status.listening": "Listening",
      "voice.status.analyzing": "Analyzing",
      "voice.status.ready": "System Ready",
      "voice.status.speechError": "Speech error",
      "voice.speechErrorMessage": "❌ Speech recognition failed. Please try again.",
      "ai.signal.title": "AI TRIAGE SIGNAL",
      "ai.signal.category": "Category",
      "ai.signal.confidence": "Confidence",
      "ai.signal.severity": "Severity",
      "ai.signal.nextStep": "Recommended Next Step",
      "ai.category.general": "General",
      "ai.category.symptom": "Symptom",
      "ai.category.medication": "Medication",
      "ai.category.emergency": "Emergency",
      "ai.severity.low": "Low",
      "ai.severity.medium": "Medium",
      "ai.severity.critical": "Critical",
      "ai.next.default": "Continue routine monitoring and daily check-ins.",
      "ai.next.critical": "Trigger SOS and contact caregiver or emergency services immediately.",
      "ai.next.symptom": "Monitor progression and arrange caregiver review within 24 hours.",
      "ai.next.medication": "Confirm dosage history and medication timing with caregiver.",
      "ai.response.logged": "✅ Logged successfully.",
      "ai.response.medication": "💊 Medication-related input logged.",
      "ai.response.symptom": "🩺 Symptom logged. Monitor changes or consult a doctor.",
      "ai.response.emergency": "🚨 Emergency detected! Caregiver alerted.",
      "seesound.advice.excellent": "Excellent articulation. Keep the rhythm steady and maintain the same mouth movement.",
      "seesound.advice.good": "Good overall. Slow down slightly on stressed syllables and keep vowel length consistent.",
      "seesound.advice.moderate": "Moderate match. Focus on clearer consonants and repeat phrase in shorter chunks.",
      "seesound.advice.needTranscript": "Speak one full sentence first, then compare with your target phrase.",
      "seesound.advice.needTarget": "Set a target phrase to enable detailed correction suggestions.",
      "seesound.advice.low": "Low match. Try speaking slower, exaggerate mouth opening, and repeat 2-3 times for improvement.",
      "mouth.hint.neutral": "Mouth hint: neutral opening",
      "mouth.hint.rounded": "Mouth hint: rounded lips for /o u/ sounds",
      "mouth.hint.open": "Mouth hint: open jaw for /a/ sounds",
      "mouth.hint.wide": "Mouth hint: wide smile shape for /i e/ sounds",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Sending...",
      "sos.sent": "✅ Notification Sent",
      "status.trial": "Trial Mode (sign in to unlock full features)",
      "judge.trialMessage": "Trial mode active. Sign in to run Judge Mode and export evidence.",
      "member.l10n.eyebrow": "Localized Workflow",
      "member.l10n.title": "Member Workflow Desk",
      "member.tools.downloadNotes": "Download Notes CSV",
      "member.tools.copyBrief": "Copy Session Brief",
      "member.tools.clearNotes": "Clear Notes",
      "demo.eyebrow": "Professor Demo View",
      "demo.title": "Designed Like a Fundable Health-Tech Product",
      "demo.activeScenario": "Active Scenario:",
      "demo.mockTitle": "CareVoice Session",
      "demo.userSays": "User says",
      "demo.aiResponse": "AI response",
      "demo.signal.live": "LIVE",
      "demo.signal.sync": "SYNC"
    },
    zh: {
      "nav.professionals": "醫護專區",
      "nav.platform": "平台",
      "nav.journey": "流程",
      "nav.market": "市場",
      "nav.contact": "聯絡",
      "nav.language": "語言",
      "nav.switching": "轉緊語言...",
      "nav.switchDone": "語言轉好咗",
      "nav.switchLocalOnly": "語言轉好咗（本地模式，翻譯服務暫時用唔到）",
      "nav.memberLogin": "會員登入",
      "nav.register": "註冊",
      "nav.workspace": "會員工作區",
      "nav.demo": "申請即時示範",
      "welcome.eyebrow": "歡迎",
      "welcome.title": "CareVoice 臨床連接平台",
      "welcome.copy": "專為長者照護團隊、社區夥伴與家庭照顧者而設的專業語音健康平台。",
      "welcome.status": "請用右上角會員登入，打開專業存取入口。",
      "portal.eyebrow": "會員入口",
      "portal.title": "專業存取控制台",
      "portal.signInGoogle": "使用 Google 登入",
      "portal.registerGoogle": "使用 Google 註冊",
      "portal.back": "返回歡迎頁",
      "gate.preview": "預覽模式",
      "gate.title": "登入前都可以先體驗核心功能",
      "gate.copy": "你可以先試語音輸入同發音教練。登入後就可以解鎖匯出、評審模式同完整會員工具。",
      "gate.button": "打開會員登入",
      "voice.title": "語音錄製工作室",
      "voice.live": "即時",
      "voice.stack": "語音智能技術層",
      "voice.recordBtn": "🎙️ 撳住講嘢",
      "voice.quickCantonese": "粵語",
      "voice.quickEnglish": "英文",
      "voice.liveTranscript": "即時語音轉錄",
      "voice.aiInsight": "AI 健康分析",
      "voice.seeSoundTitle": "SeeSound 發音教練",
      "voice.targetPlaceholder": "我想改善發音",
      "voice.compare": "同目標句比較",
      "voice.visualCoach": "可視化發音教練",
      "voice.coachCaption": "睇住嘴形，講嘢時跟住模仿。",
      "voice.lipGuide": "嘴形指引：跟住移動中嘅嘴唇去模仿口形",
      "voice.upperLip": "上唇",
      "voice.lowerLip": "下唇",
      "voice.waitingForVoice": "等待語音輸入...",
      "voice.readyToListen": "準備就緒",
      "voice.signal.liveTranscript": "即時語音轉錄",
      "voice.signal.ipa": "IPA 輸出",
      "voice.signal.score": "發音分數",
      "voice.signal.advice": "修正建議",
      "voice.recordBtnListening": "👂 正在聆聽...",
      "voice.status.listening": "正在聆聽",
      "voice.status.analyzing": "分析中",
      "voice.status.ready": "系統就緒",
      "voice.status.speechError": "語音錯誤",
      "voice.speechErrorMessage": "❌ 語音識別失敗。請再試一次。",
      "ai.signal.title": "AI 風險提示",
      "ai.signal.category": "類別",
      "ai.signal.confidence": "信心",
      "ai.signal.severity": "嚴重程度",
      "ai.signal.nextStep": "建議下一步",
      "ai.category.general": "一般",
      "ai.category.symptom": "症狀",
      "ai.category.medication": "用藥",
      "ai.category.emergency": "緊急",
      "ai.severity.low": "低",
      "ai.severity.medium": "中",
      "ai.severity.critical": "危急",
      "ai.next.default": "繼續日常留意同定時覆診／檢查。",
      "ai.next.critical": "立即按 SOS，聯絡照顧者或緊急服務。",
      "ai.next.symptom": "留意變化，建議 24 小時內安排照顧者跟進。",
      "ai.next.medication": "同照顧者確認用藥時間同劑量。",
      "ai.response.logged": "✅ 已記錄。",
      "ai.response.medication": "💊 已記錄用藥相關內容。",
      "ai.response.symptom": "🩺 已記錄症狀描述。建議留意變化或諮詢醫生。",
      "ai.response.emergency": "🚨 檢測到緊急情況！已通知照顧者。",
      "seesound.advice.excellent": "發音好清晰。保持節奏一致，同一樣嘴形去講。",
      "seesound.advice.good": "整體唔錯。重音位置可以慢少少，母音長度保持一致。",
      "seesound.advice.moderate": "匹配一般。留意子音清晰度，分段短句重複練習。",
      "seesound.advice.needTranscript": "先講一句完整句子，之後再同目標句比較。",
      "seesound.advice.needTarget": "先設定目標句，先可以顯示更詳細嘅修正建議。",
      "seesound.advice.low": "匹配較低。試下慢啲講、誇張啲開口，重複 2-3 次。",
      "mouth.hint.neutral": "嘴形提示：自然張口",
      "mouth.hint.rounded": "嘴形提示：/o u/ 類音用圓唇",
      "mouth.hint.open": "嘴形提示：/a/ 類音落顎張大口",
      "mouth.hint.wide": "嘴形提示：/i e/ 類音微笑拉闊嘴角",
      "sos.button": "🆘 緊急聯絡 / SOS",
      "sos.sending": "📡 發送中... / Sending...",
      "sos.sent": "✅ 已發送通知 / Notification Sent",
      "status.trial": "試用模式／登入解鎖完整功能",
      "judge.trialMessage": "試用模式進行中。登入後先可以用評審模式同匯出證據。",
      "member.l10n.eyebrow": "語言工作台",
      "member.l10n.title": "會員流程桌",
      "member.tools.downloadNotes": "下載備註 CSV",
      "member.tools.copyBrief": "複製 Session Brief",
      "member.tools.clearNotes": "清除備註",
      "demo.eyebrow": "教授示範視角",
      "demo.title": "產品級健康科技：專業可投資",
      "demo.activeScenario": "目前情境：",
      "demo.mockTitle": "CareVoice 會話",
      "demo.userSays": "用戶說",
      "demo.aiResponse": "AI 回應",
      "demo.signal.live": "即時",
      "demo.signal.sync": "同步"
    },
    de: {
      "nav.professionals": "Fachkräfte",
      "nav.platform": "Plattform",
      "nav.journey": "Ablauf",
      "nav.market": "Markt",
      "nav.contact": "Kontakt",
      "nav.language": "Sprache",
      "nav.switching": "Sprache wird umgestellt...",
      "nav.switchDone": "Sprache aktualisiert",
      "nav.switchLocalOnly": "Sprache aktualisiert (lokaler Modus; Ubersetzer nicht verfugbar)",
      "nav.memberLogin": "Mitglieder-Login",
      "nav.register": "Registrieren",
      "nav.workspace": "Mitgliederbereich",
      "nav.demo": "Live-Demo anfragen",
      "welcome.eyebrow": "Willkommen",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Eine professionelle Sprach-Gesundheitsplattform für Pflegeteams, Partner und Familien.",
      "welcome.status": "Nutzen Sie den Mitglieder-Login oben rechts für den professionellen Zugang.",
      "portal.eyebrow": "Mitgliederportal",
      "portal.title": "Professionelle Zugriffskonsole",
      "portal.signInGoogle": "Mit Google anmelden",
      "portal.registerGoogle": "Mit Google registrieren",
      "portal.back": "Zurück",
      "gate.preview": "Vorschau-Modus",
      "gate.title": "Kernfunktionen vor Login testen",
      "gate.copy": "Sprachaufnahme und Aussprache-Coaching können sofort getestet werden.",
      "gate.button": "Mitglieder-Login öffnen",
      "voice.title": "Spracherfassungs-Studio",
      "voice.live": "Live",
      "voice.stack": "Sprachintelligenz-Stack",
      "voice.recordBtn": "🎙️ Zum Sprechen halten",
      "voice.quickCantonese": "Kantonesisch",
      "voice.quickEnglish": "Englisch",
      "voice.liveTranscript": "Live-Transkript",
      "voice.aiInsight": "KI-Einblick",
      "voice.seeSoundTitle": "SeeSound Aussprache-Coach",
      "voice.targetPlaceholder": "Ich brauche Hilfe bei der Aussprache",
      "voice.compare": "Mit Ziel vergleichen",
      "voice.visualCoach": "Visueller Kommunikationscoach",
      "voice.coachCaption": "Achte auf die Lippenhaltung und imitiere die Mundform beim Sprechen.",
      "voice.lipGuide": "Lippenhilfe: Folge den bewegten Lippen und kopiere die Form",
      "voice.upperLip": "Oberlippe",
      "voice.lowerLip": "Unterlippe",
      "voice.waitingForVoice": "Warte auf Spracheingabe...",
      "voice.readyToListen": "Bereit zum Zuhören",
      "voice.signal.liveTranscript": "Live-Transkript",
      "voice.signal.ipa": "IPA-Ausgabe",
      "voice.signal.score": "Aussprache-Score",
      "voice.signal.advice": "Korrekturhinweise",
      "voice.recordBtnListening": "👂 Hören...",
      "voice.status.listening": "Hört zu",
      "voice.status.analyzing": "Analysiert",
      "voice.status.ready": "Bereit",
      "voice.status.speechError": "Sprachfehler",
      "voice.speechErrorMessage": "❌ Spracherkennung fehlgeschlagen. Bitte erneut versuchen.",
      "ai.signal.title": "AI-TRIAGE-SIGNAL",
      "ai.signal.category": "Kategorie",
      "ai.signal.confidence": "Sicherheit",
      "ai.signal.severity": "Schweregrad",
      "ai.signal.nextStep": "Empfohlener nächster Schritt",
      "ai.category.general": "Allgemein",
      "ai.category.symptom": "Symptom",
      "ai.category.medication": "Medikation",
      "ai.category.emergency": "Notfall",
      "ai.severity.low": "Niedrig",
      "ai.severity.medium": "Mittel",
      "ai.severity.critical": "Kritisch",
      "ai.next.default": "Weiter beobachten und tägliche Check-ins fortsetzen.",
      "ai.next.critical": "SOS auslösen und sofort Betreuungsperson oder Notdienst kontaktieren.",
      "ai.next.symptom": "Verlauf beobachten und innerhalb von 24 Stunden eine Betreuungsperson einbinden.",
      "ai.next.medication": "Dosisverlauf und Einnahmezeit mit der Betreuungsperson abgleichen.",
      "ai.response.logged": "✅ Erfolgreich protokolliert.",
      "ai.response.medication": "💊 Medikamentenbezogener Eintrag protokolliert.",
      "ai.response.symptom": "🩺 Symptom protokolliert. Verlauf beobachten oder Arzt kontaktieren.",
      "ai.response.emergency": "🚨 Notfall erkannt! Betreuungsperson benachrichtigt.",
      "seesound.advice.excellent": "Sehr klare Aussprache. Halten Sie den Rhythmus stabil und die Mundbewegung konsistent.",
      "seesound.advice.good": "Insgesamt gut. Bei betonten Silben etwas langsamer und Vokallängen konstant halten.",
      "seesound.advice.moderate": "Mäßige Übereinstimmung. Konsonanten deutlicher sprechen und in kürzeren Abschnitten wiederholen.",
      "seesound.advice.needTranscript": "Sprechen Sie zuerst einen ganzen Satz, dann mit dem Zielsatz vergleichen.",
      "seesound.advice.needTarget": "Legen Sie einen Zielsatz fest, um detailliertere Hinweise zu erhalten.",
      "seesound.advice.low": "Geringe Übereinstimmung. Langsamer sprechen, Mundöffnung stärker betonen und 2–3× wiederholen.",
      "mouth.hint.neutral": "Mundhinweis: neutral geöffnet",
      "mouth.hint.rounded": "Mundhinweis: Lippen runden für /o u/-Laute",
      "mouth.hint.open": "Mundhinweis: Kiefer öffnen für /a/-Laute",
      "mouth.hint.wide": "Mundhinweis: leichtes Lächeln für /i e/-Laute",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Senden...",
      "sos.sent": "✅ Benachrichtigung gesendet",
      "status.trial": "Testmodus (Anmelden zum Freischalten)",
      "judge.trialMessage": "Testmodus aktiv. Bitte anmelden, um Judge Mode zu starten und Evidence zu exportieren.",
      "member.l10n.eyebrow": "Lokalisierter Workflow",
      "member.l10n.title": "Mitglieder-Workflow Desk",
      "member.tools.downloadNotes": "Notizen als CSV herunterladen",
      "member.tools.copyBrief": "Session-Brief kopieren",
      "member.tools.clearNotes": "Notizen löschen",
      "demo.eyebrow": "Demo-Ansicht",
      "demo.title": "Wie ein finanzierbares Health-Tech-Produkt designt",
      "demo.activeScenario": "Aktives Szenario:",
      "demo.mockTitle": "CareVoice Sitzung",
      "demo.userSays": "Nutzer sagt",
      "demo.aiResponse": "KI-Antwort",
      "demo.signal.live": "LIVE",
      "demo.signal.sync": "SYNC"
    },
    ja: {
      "nav.professionals": "医療専門職",
      "nav.platform": "プラットフォーム",
      "nav.journey": "利用フロー",
      "nav.market": "市場",
      "nav.contact": "連絡先",
      "nav.language": "言語",
      "nav.switching": "言語を切り替え中...",
      "nav.switchDone": "言語を更新しました",
      "nav.switchLocalOnly": "言語を更新しました（ローカルモード: 翻訳サービスを利用できません）",
      "nav.memberLogin": "メンバーログイン",
      "nav.register": "登録",
      "nav.workspace": "メンバーワークスペース",
      "nav.demo": "ライブデモを依頼",
      "welcome.eyebrow": "ようこそ",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "高齢者ケアチームと家族向けの音声ヘルスケアプラットフォームです。",
      "welcome.status": "右上のメンバーログインからプロ向けアクセスを開いてください。",
      "portal.eyebrow": "メンバーポータル",
      "portal.title": "プロフェッショナルアクセスコンソール",
      "portal.signInGoogle": "Google でログイン",
      "portal.registerGoogle": "Google で登録",
      "portal.back": "戻る",
      "gate.preview": "プレビューモード",
      "gate.title": "ログイン前にコア機能を体験",
      "gate.copy": "音声入力と発音コーチを先に試せます。",
      "gate.button": "メンバーログインを開く",
      "voice.title": "音声キャプチャスタジオ",
      "voice.live": "ライブ",
      "voice.stack": "音声インテリジェンス構成",
      "voice.recordBtn": "🎙️ 押して話す",
      "voice.quickCantonese": "広東語",
      "voice.quickEnglish": "英語",
      "voice.liveTranscript": "ライブ文字起こし",
      "voice.aiInsight": "AI インサイト",
      "voice.seeSoundTitle": "SeeSound 発音コーチ",
      "voice.targetPlaceholder": "発音の練習をしたい",
      "voice.compare": "目標と比較",
      "voice.visualCoach": "ビジュアル発音コーチ",
      "voice.coachCaption": "唇の形を見ながら、話すときに同じ形を真似してください。",
      "voice.lipGuide": "唇ガイド：動く唇に合わせて口の形を真似する",
      "voice.upperLip": "上唇",
      "voice.lowerLip": "下唇",
      "voice.waitingForVoice": "音声入力を待っています...",
      "voice.readyToListen": "準備完了",
      "voice.signal.liveTranscript": "ライブ文字起こし",
      "voice.signal.ipa": "IPA 出力",
      "voice.signal.score": "発音スコア",
      "voice.signal.advice": "修正アドバイス",
      "voice.recordBtnListening": "👂 聞き取り中...",
      "voice.status.listening": "聞き取り中",
      "voice.status.analyzing": "分析中",
      "voice.status.ready": "準備完了",
      "voice.status.speechError": "音声エラー",
      "voice.speechErrorMessage": "❌ 音声認識に失敗しました。もう一度お試しください。",
      "ai.signal.title": "AI トリアージ",
      "ai.signal.category": "カテゴリ",
      "ai.signal.confidence": "信頼度",
      "ai.signal.severity": "重要度",
      "ai.signal.nextStep": "推奨アクション",
      "ai.category.general": "一般",
      "ai.category.symptom": "症状",
      "ai.category.medication": "服薬",
      "ai.category.emergency": "緊急",
      "ai.severity.low": "低",
      "ai.severity.medium": "中",
      "ai.severity.critical": "重大",
      "ai.next.default": "日常の観察と定期チェックを継続してください。",
      "ai.next.critical": "SOS を実行し、介護者または緊急サービスへ直ちに連絡してください。",
      "ai.next.symptom": "経過を観察し、24時間以内に介護者の確認を手配してください。",
      "ai.next.medication": "服薬履歴と服用タイミングを介護者と確認してください。",
      "ai.response.logged": "✅ 記録しました。",
      "ai.response.medication": "💊 服薬に関する内容を記録しました。",
      "ai.response.symptom": "🩺 症状を記録しました。変化を観察し、必要なら医師に相談してください。",
      "ai.response.emergency": "🚨 緊急を検知しました。介護者に通知しました。",
      "seesound.advice.excellent": "発音がとても明瞭です。リズムと口の動きを一定に保ちましょう。",
      "seesound.advice.good": "全体的に良好です。強調する音は少しゆっくり、母音の長さを揃えましょう。",
      "seesound.advice.moderate": "一致度は中程度です。子音をはっきりさせ、短い区切りで繰り返しましょう。",
      "seesound.advice.needTranscript": "まず1文話してから、目標フレーズと比較してください。",
      "seesound.advice.needTarget": "詳細な修正提案のために目標フレーズを設定してください。",
      "seesound.advice.low": "一致度が低いです。ゆっくり話し、口の開きを大きくして2〜3回繰り返しましょう。",
      "mouth.hint.neutral": "口のヒント：自然に口を開ける",
      "mouth.hint.rounded": "口のヒント：/o u/ は唇を丸める",
      "mouth.hint.open": "口のヒント：/a/ は顎を開く",
      "mouth.hint.wide": "口のヒント：/i e/ は口角を横に引く",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 送信中...",
      "sos.sent": "✅ 通知を送信しました",
      "status.trial": "トライアルモード（ログインで全機能）",
      "judge.trialMessage": "トライアルモードです。Judge Mode とエクスポートを使うにはログインしてください。",
      "member.l10n.eyebrow": "言語別ワークフロー",
      "member.l10n.title": "メンバーワークフローデスク",
      "member.tools.downloadNotes": "ノートCSVをダウンロード",
      "member.tools.copyBrief": "Session Brief をコピー",
      "member.tools.clearNotes": "ノートを削除",
      "demo.eyebrow": "デモ表示",
      "demo.title": "資金調達可能なヘルステック製品のように設計",
      "demo.activeScenario": "実行中シナリオ：",
      "demo.mockTitle": "CareVoice セッション",
      "demo.userSays": "ユーザー発話",
      "demo.aiResponse": "AI 応答",
      "demo.signal.live": "ライブ",
      "demo.signal.sync": "同期"
    },
    es: {
      "nav.professionals": "Profesionales",
      "nav.platform": "Plataforma",
      "nav.journey": "Recorrido",
      "nav.market": "Mercado",
      "nav.contact": "Contacto",
      "nav.language": "Idioma",
      "nav.switching": "Cambiando idioma...",
      "nav.switchDone": "Idioma actualizado",
      "nav.switchLocalOnly": "Idioma actualizado (modo local: traductor no disponible)",
      "nav.memberLogin": "Inicio de sesión",
      "nav.register": "Registrarse",
      "nav.workspace": "Espacio de miembros",
      "nav.demo": "Solicitar demo",
      "welcome.eyebrow": "Bienvenido",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Una plataforma profesional de salud por voz para equipos de cuidado de mayores, socios comunitarios y cuidadores familiares en Hong Kong.",
      "welcome.status": "Usa el botón de inicio de sesión de miembro en la esquina superior derecha para abrir el acceso profesional.",
      "portal.eyebrow": "Portal de Miembros",
      "portal.title": "Consola de Acceso Profesional",
      "portal.signInGoogle": "Iniciar sesión con Google",
      "portal.registerGoogle": "Registrarse con Google",
      "portal.back": "Volver a Bienvenida",
      "gate.preview": "Modo de Vista Previa",
      "gate.title": "Prueba la experiencia principal antes de iniciar sesión",
      "gate.copy": "Puedes probar ahora la captura de voz y el entrenamiento de pronunciación. Inicia sesión para desbloquear exportaciones, modo jurado y herramientas completas del espacio de miembros.",
      "gate.button": "Abrir inicio de sesión de miembro",
      "voice.title": "Estudio de Captura de Voz",
      "voice.live": "En vivo",
      "voice.stack": "Stack de Inteligencia de Voz",
      "voice.recordBtn": "🎙️ Mantener para hablar",
      "voice.quickCantonese": "Cantonés",
      "voice.quickEnglish": "Inglés",
      "voice.liveTranscript": "Transcripción en vivo",
      "voice.aiInsight": "Insight de IA",
      "voice.seeSoundTitle": "Entrenador de pronunciación SeeSound",
      "voice.targetPlaceholder": "Necesito ayuda con la pronunciación",
      "voice.compare": "Comparar con objetivo",
      "voice.visualCoach": "Entrenador visual de comunicación",
      "voice.coachCaption": "Observa la postura de los labios e imita la forma de la boca mientras hablas.",
      "voice.lipGuide": "Guía labial: sigue el movimiento de los labios y copia la forma mientras hablas",
      "voice.upperLip": "Labio superior",
      "voice.lowerLip": "Labio inferior",
      "voice.waitingForVoice": "Esperando entrada de voz...",
      "voice.readyToListen": "Listo para escuchar",
      "voice.signal.liveTranscript": "Transcripción en vivo",
      "voice.signal.ipa": "Salida IPA",
      "voice.signal.score": "Puntuación de pronunciación",
      "voice.signal.advice": "Consejo de corrección",
      "voice.recordBtnListening": "👂 Escuchando...",
      "voice.status.listening": "Escuchando",
      "voice.status.analyzing": "Analizando",
      "voice.status.ready": "Listo",
      "voice.status.speechError": "Error de voz",
      "voice.speechErrorMessage": "❌ Falló el reconocimiento de voz. Inténtalo de nuevo.",
      "ai.signal.title": "SEÑAL DE TRIAGE IA",
      "ai.signal.category": "Categoría",
      "ai.signal.confidence": "Confianza",
      "ai.signal.severity": "Severidad",
      "ai.signal.nextStep": "Siguiente paso recomendado",
      "ai.category.general": "General",
      "ai.category.symptom": "Síntoma",
      "ai.category.medication": "Medicación",
      "ai.category.emergency": "Emergencia",
      "ai.severity.low": "Bajo",
      "ai.severity.medium": "Medio",
      "ai.severity.critical": "Crítico",
      "ai.next.default": "Continúa con el monitoreo rutinario y chequeos diarios.",
      "ai.next.critical": "Activa SOS y contacta al cuidador o servicios de emergencia de inmediato.",
      "ai.next.symptom": "Monitorea la evolución y coordina revisión del cuidador en 24 horas.",
      "ai.next.medication": "Confirma dosis y horario de medicación con el cuidador.",
      "ai.response.logged": "✅ Registrado correctamente.",
      "ai.response.medication": "💊 Registro relacionado con medicación.",
      "ai.response.symptom": "🩺 Síntoma registrado. Monitorea cambios o consulta a un médico.",
      "ai.response.emergency": "🚨 Emergencia detectada. Cuidador alertado.",
      "seesound.advice.excellent": "Articulación excelente. Mantén el ritmo estable y el mismo movimiento de boca.",
      "seesound.advice.good": "Buen resultado. Reduce un poco la velocidad en sílabas acentuadas y mantén las vocales consistentes.",
      "seesound.advice.moderate": "Coincidencia moderada. Aclara consonantes y repite en fragmentos más cortos.",
      "seesound.advice.needTranscript": "Di una frase completa primero y luego compara con tu objetivo.",
      "seesound.advice.needTarget": "Define una frase objetivo para habilitar sugerencias más detalladas.",
      "seesound.advice.low": "Coincidencia baja. Habla más lento, abre más la boca y repite 2–3 veces.",
      "mouth.hint.neutral": "Pista de boca: apertura neutral",
      "mouth.hint.rounded": "Pista de boca: labios redondeados para /o u/",
      "mouth.hint.open": "Pista de boca: abre la mandíbula para /a/",
      "mouth.hint.wide": "Pista de boca: sonrisa amplia para /i e/",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Enviando...",
      "sos.sent": "✅ Notificación enviada",
      "status.trial": "Modo de prueba (inicia sesión para desbloquear)",
      "judge.trialMessage": "Modo de prueba activo. Inicia sesión para usar Judge Mode y exportar evidencia.",
      "member.l10n.eyebrow": "Flujo localizado",
      "member.l10n.title": "Mesa de flujo para miembros",
      "member.tools.downloadNotes": "Descargar notas CSV",
      "member.tools.copyBrief": "Copiar Session Brief",
      "member.tools.clearNotes": "Borrar notas",
      "demo.eyebrow": "Vista de demo",
      "demo.title": "Diseñado como un producto Health-Tech financiable",
      "demo.activeScenario": "Escenario activo:",
      "demo.mockTitle": "Sesión CareVoice",
      "demo.userSays": "El usuario dice",
      "demo.aiResponse": "Respuesta de IA",
      "demo.signal.live": "EN VIVO",
      "demo.signal.sync": "SYNC"
    },
    fr: {
      "nav.professionals": "Professionnels",
      "nav.platform": "Plateforme",
      "nav.journey": "Parcours",
      "nav.market": "Marché",
      "nav.contact": "Contact",
      "nav.language": "Langue",
      "nav.switching": "Changement de langue...",
      "nav.switchDone": "Langue mise a jour",
      "nav.switchLocalOnly": "Langue mise a jour (mode local : traducteur indisponible)",
      "nav.memberLogin": "Connexion membre",
      "nav.register": "Inscription",
      "nav.workspace": "Espace membre",
      "nav.demo": "Demander une démo",
      "voice.recordBtn": "🎙️ Maintenir pour parler",
      "voice.quickCantonese": "Cantonais",
      "voice.quickEnglish": "Anglais",
      "voice.compare": "Comparer à la cible",
      "voice.upperLip": "Lèvre supérieure",
      "voice.lowerLip": "Lèvre inférieure",
      "voice.waitingForVoice": "En attente d'entrée vocale...",
      "voice.readyToListen": "Prêt à écouter",
      "voice.signal.liveTranscript": "Transcription en direct",
      "voice.signal.ipa": "Sortie IPA",
      "voice.signal.score": "Score de prononciation",
      "voice.signal.advice": "Conseil de correction",
      "voice.recordBtnListening": "👂 Écoute...",
      "voice.status.listening": "Écoute",
      "voice.status.analyzing": "Analyse",
      "voice.status.ready": "Prêt",
      "voice.status.speechError": "Erreur vocale",
      "voice.speechErrorMessage": "❌ La reconnaissance vocale a échoué. Veuillez réessayer.",
      "ai.signal.title": "SIGNAL DE TRIAGE IA",
      "ai.signal.category": "Catégorie",
      "ai.signal.confidence": "Confiance",
      "ai.signal.severity": "Gravité",
      "ai.signal.nextStep": "Prochaine étape recommandée",
      "ai.category.general": "Général",
      "ai.category.symptom": "Symptôme",
      "ai.category.medication": "Médication",
      "ai.category.emergency": "Urgence",
      "ai.severity.low": "Faible",
      "ai.severity.medium": "Moyen",
      "ai.severity.critical": "Critique",
      "ai.next.default": "Poursuivez la surveillance de routine et les check-ins quotidiens.",
      "ai.next.critical": "Déclenchez SOS et contactez immédiatement l'aidant ou les urgences.",
      "ai.next.symptom": "Surveillez l'évolution et planifiez une revue avec l'aidant sous 24 h.",
      "ai.next.medication": "Confirmez l'historique de dose et l'horaire avec l'aidant.",
      "ai.response.logged": "✅ Enregistré avec succès.",
      "ai.response.medication": "💊 Entrée liée aux médicaments enregistrée.",
      "ai.response.symptom": "🩺 Symptôme enregistré. Surveillez les changements ou consultez un médecin.",
      "ai.response.emergency": "🚨 Urgence détectée ! Aidant alerté.",
      "seesound.advice.excellent": "Excellente articulation. Gardez un rythme stable et le même mouvement de bouche.",
      "seesound.advice.good": "Bon ensemble. Ralentissez légèrement sur les syllabes accentuées et gardez les voyelles cohérentes.",
      "seesound.advice.moderate": "Correspondance modérée. Renforcez les consonnes et répétez par segments plus courts.",
      "seesound.advice.needTranscript": "Prononcez d'abord une phrase complète, puis comparez avec votre cible.",
      "seesound.advice.needTarget": "Définissez une phrase cible pour activer des suggestions plus détaillées.",
      "seesound.advice.low": "Faible correspondance. Parlez plus lentement, ouvrez davantage la bouche et répétez 2–3 fois.",
      "mouth.hint.neutral": "Indice bouche : ouverture neutre",
      "mouth.hint.rounded": "Indice bouche : lèvres arrondies pour /o u/",
      "mouth.hint.open": "Indice bouche : mâchoire ouverte pour /a/",
      "mouth.hint.wide": "Indice bouche : sourire large pour /i e/",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Envoi...",
      "sos.sent": "✅ Notification envoyée",
      "status.trial": "Mode essai (connectez-vous pour déverrouiller)",
      "judge.trialMessage": "Mode essai actif. Connectez-vous pour lancer le Judge Mode et exporter les preuves.",
      "member.l10n.eyebrow": "Flux localisé",
      "member.l10n.title": "Bureau de flux membre",
      "member.tools.downloadNotes": "Télécharger les notes CSV",
      "member.tools.copyBrief": "Copier le Session Brief",
      "member.tools.clearNotes": "Effacer les notes",
      "demo.eyebrow": "Vue démo",
      "demo.title": "Conçu comme un produit Health-Tech finançable",
      "demo.activeScenario": "Scénario actif :",
      "demo.mockTitle": "Session CareVoice",
      "demo.userSays": "L'utilisateur dit",
      "demo.aiResponse": "Réponse IA",
      "demo.signal.live": "LIVE",
      "demo.signal.sync": "SYNC"
    }
  };

  const uiToSpeechLang = {
    en: "en-US",
    zh: "zh-HK",
    de: "de-DE",
    ja: "ja-JP",
    es: "es-ES",
    fr: "fr-FR"
  };

  const uiToGoogleLang = {
    en: "en",
    zh: "zh-TW",
    de: "de",
    ja: "ja",
    es: "es",
    fr: "fr"
  };
  const timezoneToUiLang = {
    "Asia/Hong_Kong": "zh",
    "Asia/Macau": "zh",
    "Asia/Shanghai": "zh",
    "Asia/Taipei": "zh",
    "Asia/Tokyo": "ja",
    "Europe/Berlin": "de",
    "Europe/Madrid": "es",
    "Europe/Paris": "fr"
  };

  function detectUiLangFromLocation() {
    let timeZone = "";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
      timeZone = "";
    }

    if (timezoneToUiLang[timeZone]) {
      return timezoneToUiLang[timeZone];
    }

    const browserLangs = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

    const normalized = browserLangs.map((lang) => String(lang || "").toLowerCase());
    if (normalized.some((lang) => lang.startsWith("zh"))) return "zh";
    if (normalized.some((lang) => lang.startsWith("ja"))) return "ja";
    if (normalized.some((lang) => lang.startsWith("de"))) return "de";
    if (normalized.some((lang) => lang.startsWith("es"))) return "es";
    if (normalized.some((lang) => lang.startsWith("fr"))) return "fr";
    return "en";
  }

  let pendingGoogleLang = null;
  let googleTranslateReady = false;
  let allowGoogleTranslateInit = false;
  let translationRetryTimer = null;
  let switchStatusTimer = null;
  let translateUiSuppressorStyleEl = null;
  let translateUiHeadObserver = null;
  let translateUiBodyObserver = null;

  function ensureTranslateUiSuppressorInstalled() {
    if (!document || !document.head) return;

    const css = `
/* CareVoice: hard-hide Google Translate injected UI so it never overlays content. */
html body iframe.VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate,
html body iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd.skiptranslate,
html body .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
html body .VIpgJd-ZVi9od-aZ2wEe-OiiCO,
html body .goog-te-banner-frame.skiptranslate,
html body iframe.goog-te-banner-frame,
html body .goog-te-gadget,
html body .goog-te-gadget-simple,
html body .goog-te-gadget-icon,
html body .goog-logo-link,
html body .goog-te-balloon-frame,
html body #goog-gt-tt,
html body > div.skiptranslate {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* Google Translate sometimes offsets the page; force layout back. */
html body {
  top: 0 !important;
}
`;

    if (!translateUiSuppressorStyleEl) {
      translateUiSuppressorStyleEl = document.createElement("style");
      translateUiSuppressorStyleEl.id = "carevoice-translate-ui-suppressor";
      translateUiSuppressorStyleEl.type = "text/css";
      translateUiSuppressorStyleEl.appendChild(document.createTextNode(css));
    }

    // Ensure our style is the last thing in <head>, so it wins even if Translate injects CSS later.
    const head = document.head;
    if (translateUiSuppressorStyleEl.parentNode !== head) {
      head.appendChild(translateUiSuppressorStyleEl);
    } else if (head.lastElementChild !== translateUiSuppressorStyleEl) {
      head.appendChild(translateUiSuppressorStyleEl);
    }

    if (!translateUiHeadObserver) {
      translateUiHeadObserver = new MutationObserver(() => {
        if (!document.head || !translateUiSuppressorStyleEl) return;
        if (document.head.lastElementChild !== translateUiSuppressorStyleEl) {
          document.head.appendChild(translateUiSuppressorStyleEl);
        }
      });
      translateUiHeadObserver.observe(head, { childList: true });
    }

    // Remove the stray "✂" text node if Translate injects it.
    // Some builds inject it deeper than the body direct children, so scan the subtree.
    const cleanupScissors = () => {
      if (!document.body) return;

      const toRemove = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node) continue;
        const value = String(node.nodeValue || "").trim();
        if (value === "✂") {
          toRemove.push(node);
        }
      }

      toRemove.forEach((node) => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    };

    cleanupScissors();
    if (!translateUiBodyObserver && document.body) {
      translateUiBodyObserver = new MutationObserver(() => cleanupScissors());
      translateUiBodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  // Google callback entrypoint from the external translate script.
  window.__carevoiceInitTranslate = () => {
    if (!allowGoogleTranslateInit) return;
    ensureTranslateUiSuppressorInstalled();
    tryInitGoogleTranslateWidget();
  };
  window.googleTranslateElementInit = () => {
    if (typeof window.__carevoiceInitTranslate === "function") {
      window.__carevoiceInitTranslate();
    }
  };

  const quickSpeechToUiLang = {
    "zh-HK": "zh",
    "zh-CN": "zh",
    "en-US": "en",
    "de-DE": "de",
    "ja-JP": "ja",
    "es-ES": "es",
    "fr-FR": "fr"
  };

  const staticFallbackMaps = {
    zh: {
      "BUSINESS PROPOSITION": "商業主張",
      "Voice-to-Care Continuum": "語音到照護連續流程",
      "From symptom narration to caregiver escalation and audit logs in one unified workflow.": "由症狀敘述到照顧者升級同審核紀錄，全部放喺同一個流程。",
      "DEPLOYMENT READINESS": "部署就緒",
      "Institutional Grade Rollout": "機構級落地推行",
      "Designed for NGOs, clinics, and pilot programmes with measurable operational outcomes.": "為 NGO、診所同試點計劃而設，營運成效可量化。",
      "TRUST FRAMEWORK": "信任框架",
      "Responsible AI + Human Oversight": "負責任 AI + 人手監督",
      "Assistive decision support only, with transparent risk flags and non-diagnostic safeguards.": "只提供輔助決策支持，風險提示透明，並設有非診斷安全機制。",
      "HEALTHCARE PROFESSIONALS": "醫護專業人員",
      "Built for Doctors, Nurses, and Care Managers": "為醫生、護士同照護經理而設",
      "Doctor View": "醫生視角",
      "Nursing Team": "護理團隊",
      "Care Manager": "照護經理",
      "Open Professional Workspace": "開啟專業工作區",
      "View Evidence Library": "查看證據資料庫",
      "COMPANY POSITIONING": "公司定位",
      "A Full-Stack Voice Health Platform for Aging Communities": "面向高齡社群嘅全棧語音健康平台",
      "Start Product Demo": "開始產品示範",
      "View Market Potential": "查看市場潛力",
      "CORE OFFERING": "核心方案",
      "Voice-First Care OS": "語音優先照護系統",
      "BUSINESS READINESS": "商業化就緒",
      "B2B2C Expansion": "B2B2C 擴展",
      "ACTIVE SESSION": "目前會話",
      "Member Access": "會員存取",
      "Trial mode active. Member login required for exports, judge mode, and cloud sync.": "試用模式進行中。匯出、評審模式同雲端同步需要會員登入。",
      "OPERATIONS COCKPIT": "營運控制台",
      "Member Workspace Overview": "會員工作區總覽",
      "SESSION MODE": "會話模式",
      "Trial": "試用",
      "SIGNED-IN MEMBER": "已登入會員",
      "Not Signed In": "未登入",
      "RISK EVENTS IN SESSION": "本次會話風險事件",
      "LAST SYNC": "最後同步",
      "Not Synced": "未同步",
      "Recent Voice Records": "最近語音紀錄",
      "Professional Checklist": "專業檢查清單",
      "MEMBER COMMAND DECK": "會員指令面板",
      "Professional Follow-up Tools": "專業跟進工具",
      "Add Follow-up Note": "新增跟進備註",
      "Save Care Plan Snapshot": "儲存照護計劃快照",
      "Generate Session Brief": "產生會話摘要",
      "Member Notes": "會員備註",
      "No notes yet.": "暫時未有備註。",
      "Auto Brief": "自動摘要",
      "PROFESSOR DEMO VIEW": "教授示範視圖",
      "Designed Like a Fundable Health-Tech Product": "以可融資醫療科技產品標準設計",
      "REAL-LIFE SCENARIOS": "真實生活場景",
      "How CareVoice Works in Daily Life": "CareVoice 喺日常生活點樣運作",
      "ASSESSMENT EVIDENCE": "評審證據",
      "HOW PEOPLE USE IT": "實際使用方式",
      "GO-TO-MARKET": "市場拓展策略",
      "REVENUE MODEL": "收入模式",
      "DEFENSIBILITY": "護城河",
      "MARKET INTELLIGENCE": "市場情報",
      "Verified Findings": "已驗證發現",
      "Discover More: Reports, Media, Expert Voices": "深入了解：報告、媒體、專家觀點",
      "DESIGNED FOR COLLABORATION WITH": "協作對象",
      "University Labs": "大學實驗室",
      "Elderly NGOs": "長者 NGO",
      "Primary Clinics": "基層診所",
      "Caregiver Networks": "照顧者網絡",
      "Platform": "平台",
      "Market": "市場",
      "Live Demo": "即時示範",
      "Guest mode active.": "訪客模式進行中。",
      "Switch to Google Account": "切換至 Google 帳戶",
      "Sign out": "登出",
      "First-Time Setup": "首次設定",
      "Tell us who you are": "請選擇你的身分",
      "Choose your role and hospital before entering the member workspace.": "進入會員工作區前，請先選擇身分同醫院。",
      "Profile Setup": "個人檔案設定",
      "I am Hospital Staff": "我是醫院職員",
      "I am Patient": "我是病人",
      "I am Family Member": "我是病人家屬",
      "Role": "身分",
      "Select role": "選擇身分",
      "Hospital Staff": "醫院職員",
      "Patient": "病人",
      "Family Member": "病人家屬",
      "Hospital": "醫院",
      "Hospital Workspace": "醫院工作區",
      "CareVoice workspace customised for this hospital.": "CareVoice 工作區已按此醫院自訂。",
      "Select hospital": "選擇醫院",
      "Queen Mary Hospital": "瑪麗醫院",
      "Queen Elizabeth Hospital": "伊利沙伯醫院",
      "Prince of Wales Hospital": "威爾斯親王醫院",
      "Tuen Mun Hospital": "屯門醫院",
      "N/A": "不適用",
      "Other": "其他",
      "Enter hospital name": "輸入醫院名稱",
      "Custom hospital name": "自訂醫院名稱",
      "Save and Continue": "儲存並繼續",
      "Hospital Accounts": "醫院帳戶",
      "Hospital Staff Account Hub": "醫院職員帳戶中心",
      "Create a hospital account or join one with a code to enable staff-level collaboration.": "建立醫院帳戶，或用加入碼加入現有帳戶，以啟用職員協作。",
      "Create Hospital Account": "建立醫院帳戶",
      "Hospital account name": "醫院帳戶名稱",
      "Hospital account name (e.g., Queen Mary Ward A Team)": "醫院帳戶名稱（例如：瑪麗醫院 A 病房團隊）",
      "Official hospital email domain": "醫院官方電郵網域",
      "Official hospital email domain (e.g., ha.org.hk)": "醫院官方電郵網域（例如：ha.org.hk）",
      "Hospital proof link": "醫院證明連結",
      "Proof link: hospital website, staff directory, or authorization letter": "證明連結：醫院網站、職員名錄或授權信",
      "Create Account": "建立帳戶",
      "Hospital branding stays locked until the account proof is reviewed and marked verified.": "醫院品牌顯示會保持鎖定，直至帳戶證明完成審核並標記為已驗證。",
      "Join Existing Account": "加入現有帳戶",
      "Hospital join code": "醫院加入碼",
      "Enter hospital join code": "輸入醫院加入碼",
      "Join Account": "加入帳戶",
      "No account joined yet.": "尚未加入任何帳戶。",
      "Manage Staff Access": "管理職員存取權",
      "Hospital staff invite email": "醫院職員邀請電郵",
      "Invite staff email (e.g., nurse@hospital.hk)": "邀請職員電郵（例如：nurse@hospital.hk）",
      "Add Staff Email": "新增職員電郵",
      "Owners/admins can add or remove staff emails for this hospital account.": "擁有人／管理員可以為此醫院帳戶新增或移除職員電郵。",
      "No hospital staff members yet.": "尚未有醫院職員成員。",
      "Download Notes CSV": "下載備註 CSV",
      "Copy Session Brief": "複製會話摘要",
      "Clear Notes": "清除備註",
      "Member-only": "會員限定",
      "Auto Brief": "自動摘要",
      "No brief generated yet.": "尚未產生摘要。",
      "Family Relay": "家屬轉達",
      "No family update generated yet.": "尚未產生家屬更新。",
      "Patient name": "病人姓名",
      "Patient name (e.g., Mr. Chan)": "病人姓名（例如：陳先生）",
      "Patient age": "病人年齡",
      "Age (e.g., 82)": "年齡（例如：82）",
      "Relative name": "家屬姓名",
      "Relative name (e.g., Mei)": "家屬姓名（例如：阿美）",
      "Relative relationship": "家屬關係",
      "Relationship (e.g., daughter)": "關係（例如：女兒）",
      "Preferred language for family update": "家屬更新偏好語言",
      "Preferred language for message (e.g., Cantonese, English)": "訊息偏好語言（例如：粵語、英語）",
      "Family phone number": "家屬電話號碼",
      "Phone number (e.g., +852 9123 4567)": "電話號碼（例如：+852 9123 4567）",
      "Call Phone Number": "致電此號碼",
      "Hospital phone number": "醫院電話號碼",
      "Hospital / ward phone number": "醫院／病房電話號碼",
      "Call Hospital": "致電醫院",
      "Family email address list": "家屬電郵地址清單",
      "Generate Family Update": "產生家屬更新",
      "Copy Update": "複製更新",
      "Send via WhatsApp": "透過 WhatsApp 傳送",
      "Send via SMS": "透過 SMS 傳送",
      "Send via Gmail": "透過 Gmail 傳送",
      "Voice command: say “contact relatives”, “call my family”, or “tell my daughter” to prepare a family update automatically.": "語音指令：講「聯絡家屬」、「打畀屋企人」或「話畀我女兒知」，即可自動準備家屬更新。",
      "AI TRIAGE SIGNAL": "AI 分流訊號",
      "Voice Input": "語音輸入",
      "Start/Stop recording": "開始／停止錄音",
      "Language selection": "語言選擇",
      "Transcription output": "轉錄輸出",
      "Please choose role and hospital. If hospital is Other, enter its name.": "請選擇身分同醫院；如果醫院選其他，請輸入醫院名稱。",
      "Profile saved. Member workspace unlocked.": "個人檔案已儲存，會員工作區已解鎖。",
      "Could not save profile. Please try again.": "未能儲存個人檔案，請再試一次。",
      "Please sign in first.": "請先登入。",
      "Please sign in before saving profile.": "請先登入，然後儲存個人檔案。",
      "Hospital staff selected. Choose hospital, then Save and Continue.": "已選擇醫院職員。請選擇醫院，然後按「儲存並繼續」。",
      "Guest mode active. Please sign in.": "訪客模式進行中，請登入。",
      "Signed in. Complete role and hospital setup to unlock the workspace.": "已登入。請完成身分同醫院設定，以解鎖工作區。",
      "Signed in. Hospital staff must create or join a hospital account before entering the workspace.": "已登入。醫院職員進入工作區前，必須建立或加入醫院帳戶。",
      "Hospital staff need a hospital account. Create one or join with a code below.": "醫院職員需要醫院帳戶。請在下方建立帳戶，或使用加入碼加入。",
      "Sign in first to create a hospital account.": "請先登入，然後建立醫院帳戶。",
      "Only hospital staff roles can create hospital accounts.": "只有醫院職員身分可以建立醫院帳戶。",
      "Enter a hospital account name first.": "請先輸入醫院帳戶名稱。",
      "Sign in first to join a hospital account.": "請先登入，然後加入醫院帳戶。",
      "Only hospital staff roles can join hospital accounts.": "只有醫院職員身分可以加入醫院帳戶。",
      "Enter a join code first.": "請先輸入加入碼。",
      "Join code not found. Check the code and try again.": "找不到加入碼。請檢查後再試一次。",
      "Join a hospital account first.": "請先加入醫院帳戶。",
      "Only account owner/admin can add staff emails.": "只有帳戶擁有人／管理員可以新增職員電郵。",
      "Enter a valid staff email.": "請輸入有效嘅職員電郵。",
      "Owner email cannot be removed.": "無法移除擁有人電郵。",
      "Enter the hospital official email domain first.": "請先輸入醫院官方電郵網域。",
      "Use a Google account from the hospital official email domain to register this hospital.": "請使用屬於醫院官方電郵網域嘅 Google 帳戶註冊此醫院。",
      "Add a public proof link from the hospital website or authorization document.": "請加入醫院網站或授權文件嘅公開證明連結。",
      "Hospital registration submitted for verification. Branding unlocks after approval.": "醫院註冊已提交審核；批准後才會解鎖醫院品牌顯示。"
    },
    de: {
      "BUSINESS PROPOSITION": "GESCHÄFTSPROPOSITION",
      "Voice-to-Care Continuum": "Sprach-zu-Pflege-Kontinuum",
      "DEPLOYMENT READINESS": "EINSATZBEREITSCHAFT",
      "Institutional Grade Rollout": "Rollout auf Institutionsniveau",
      "TRUST FRAMEWORK": "VERTRAUENSRAHMEN",
      "Responsible AI + Human Oversight": "Verantwortungsvolle KI + menschliche Aufsicht",
      "HEALTHCARE PROFESSIONALS": "GESUNDHEITSFACHKRÄFTE",
      "Built for Doctors, Nurses, and Care Managers": "Für Ärzte, Pflegekräfte und Care Manager entwickelt",
      "Doctor View": "Arztansicht",
      "Nursing Team": "Pflegeteam",
      "Care Manager": "Care Manager",
      "Open Professional Workspace": "Professionellen Arbeitsbereich öffnen",
      "View Evidence Library": "Evidenzbibliothek ansehen",
      "COMPANY POSITIONING": "UNTERNEHMENSPOSITIONIERUNG",
      "Start Product Demo": "Produktdemo starten",
      "View Market Potential": "Marktpotenzial ansehen",
      "CORE OFFERING": "KERNANGEBOT",
      "Voice-First Care OS": "Voice-First Care OS",
      "BUSINESS READINESS": "GESCHÄFTSREIFE",
      "B2B2C Expansion": "B2B2C-Expansion",
      "ACTIVE SESSION": "AKTIVE SITZUNG",
      "Member Access": "Mitgliederzugang",
      "OPERATIONS COCKPIT": "BETRIEBSCOCKPIT",
      "Member Workspace Overview": "Überblick Mitgliederarbeitsbereich",
      "SESSION MODE": "SITZUNGSMODUS",
      "Trial": "Testmodus",
      "SIGNED-IN MEMBER": "ANGEMELDETES MITGLIED",
      "Not Signed In": "Nicht angemeldet",
      "RISK EVENTS IN SESSION": "RISIKOEREIGNISSE IN DER SITZUNG",
      "LAST SYNC": "LETZTE SYNCHRONISIERUNG",
      "Not Synced": "Nicht synchronisiert",
      "Recent Voice Records": "Letzte Sprachaufzeichnungen",
      "Professional Checklist": "Professionelle Checkliste",
      "MEMBER COMMAND DECK": "MITGLIEDER-KOMMANDODECK",
      "Professional Follow-up Tools": "Professionelle Nachverfolgungstools",
      "Add Follow-up Note": "Nachverfolgungsnotiz hinzufügen",
      "Save Care Plan Snapshot": "Pflegeplan-Snapshot speichern",
      "Generate Session Brief": "Sitzungszusammenfassung erstellen",
      "Member Notes": "Mitgliedernotizen",
      "No notes yet.": "Noch keine Notizen.",
      "ASSESSMENT EVIDENCE": "BEWERTUNGSNACHWEISE",
      "GO-TO-MARKET": "GO-TO-MARKET",
      "REVENUE MODEL": "ERLÖSMODELL",
      "DEFENSIBILITY": "VERTEIDIGBARKEIT",
      "MARKET INTELLIGENCE": "MARKTINTELLIGENZ",
      "Verified Findings": "Verifizierte Erkenntnisse",
      "Platform": "Plattform",
      "Market": "Markt",
      "Live Demo": "Live-Demo"
    },
    ja: {
      "BUSINESS PROPOSITION": "ビジネス提案",
      "Voice-to-Care Continuum": "音声からケアまでの連続導線",
      "DEPLOYMENT READINESS": "導入準備",
      "Institutional Grade Rollout": "機関レベルの展開",
      "TRUST FRAMEWORK": "信頼フレームワーク",
      "Responsible AI + Human Oversight": "責任あるAI + 人間による監督",
      "HEALTHCARE PROFESSIONALS": "医療専門職",
      "Built for Doctors, Nurses, and Care Managers": "医師・看護師・ケアマネージャー向けに設計",
      "Doctor View": "医師ビュー",
      "Nursing Team": "看護チーム",
      "Care Manager": "ケアマネージャー",
      "Open Professional Workspace": "プロ向けワークスペースを開く",
      "View Evidence Library": "エビデンスライブラリを見る",
      "COMPANY POSITIONING": "企業ポジショニング",
      "Start Product Demo": "製品デモを開始",
      "View Market Potential": "市場ポテンシャルを見る",
      "CORE OFFERING": "コア提供価値",
      "Voice-First Care OS": "音声ファースト ケアOS",
      "BUSINESS READINESS": "事業準備性",
      "B2B2C Expansion": "B2B2C拡大",
      "ACTIVE SESSION": "アクティブセッション",
      "Member Access": "メンバーアクセス",
      "OPERATIONS COCKPIT": "運用コックピット",
      "Member Workspace Overview": "メンバーワークスペース概要",
      "SESSION MODE": "セッションモード",
      "Trial": "試用",
      "SIGNED-IN MEMBER": "ログイン中メンバー",
      "Not Signed In": "未ログイン",
      "RISK EVENTS IN SESSION": "セッション内リスクイベント",
      "LAST SYNC": "最終同期",
      "Not Synced": "未同期",
      "Recent Voice Records": "最近の音声記録",
      "Professional Checklist": "プロ向けチェックリスト",
      "MEMBER COMMAND DECK": "メンバーコマンドデッキ",
      "Professional Follow-up Tools": "プロ向けフォローアップツール",
      "Add Follow-up Note": "フォローアップメモを追加",
      "Save Care Plan Snapshot": "ケアプランのスナップショットを保存",
      "Generate Session Brief": "セッション要約を生成",
      "Member Notes": "メンバーノート",
      "No notes yet.": "まだノートはありません。",
      "ASSESSMENT EVIDENCE": "評価エビデンス",
      "GO-TO-MARKET": "市場展開",
      "REVENUE MODEL": "収益モデル",
      "DEFENSIBILITY": "防衛優位性",
      "MARKET INTELLIGENCE": "市場インテリジェンス",
      "Verified Findings": "検証済みの知見",
      "Platform": "プラットフォーム",
      "Market": "市場",
      "Live Demo": "ライブデモ"
    },
    es: {
      "BUSINESS PROPOSITION": "PROPUESTA DE NEGOCIO",
      "Voice-to-Care Continuum": "Continuo de voz a cuidado",
      "DEPLOYMENT READINESS": "PREPARACION DE DESPLIEGUE",
      "Institutional Grade Rollout": "Despliegue de nivel institucional",
      "TRUST FRAMEWORK": "MARCO DE CONFIANZA",
      "Responsible AI + Human Oversight": "IA responsable + supervision humana",
      "HEALTHCARE PROFESSIONALS": "PROFESIONALES DE LA SALUD",
      "Built for Doctors, Nurses, and Care Managers": "Disenado para medicos, enfermeria y gestores de cuidado",
      "Doctor View": "Vista del medico",
      "Nursing Team": "Equipo de enfermeria",
      "Care Manager": "Gestor de cuidado",
      "Open Professional Workspace": "Abrir espacio profesional",
      "View Evidence Library": "Ver biblioteca de evidencias",
      "COMPANY POSITIONING": "POSICIONAMIENTO DE LA EMPRESA",
      "Start Product Demo": "Iniciar demo del producto",
      "View Market Potential": "Ver potencial de mercado",
      "CORE OFFERING": "OFERTA PRINCIPAL",
      "Voice-First Care OS": "Sistema de cuidado priorizando voz",
      "BUSINESS READINESS": "PREPARACION DE NEGOCIO",
      "B2B2C Expansion": "Expansion B2B2C",
      "ACTIVE SESSION": "SESION ACTIVA",
      "Member Access": "Acceso de miembro",
      "OPERATIONS COCKPIT": "CABINA DE OPERACIONES",
      "Member Workspace Overview": "Resumen del espacio de miembros",
      "SESSION MODE": "MODO DE SESION",
      "Trial": "Prueba",
      "SIGNED-IN MEMBER": "MIEMBRO CON SESION",
      "Not Signed In": "Sin iniciar sesion",
      "RISK EVENTS IN SESSION": "EVENTOS DE RIESGO EN LA SESION",
      "LAST SYNC": "ULTIMA SINCRONIZACION",
      "Not Synced": "Sin sincronizar",
      "Recent Voice Records": "Registros de voz recientes",
      "Professional Checklist": "Lista profesional",
      "MEMBER COMMAND DECK": "PANEL DE COMANDOS DE MIEMBRO",
      "Professional Follow-up Tools": "Herramientas profesionales de seguimiento",
      "Add Follow-up Note": "Agregar nota de seguimiento",
      "Save Care Plan Snapshot": "Guardar instantanea del plan de cuidado",
      "Generate Session Brief": "Generar resumen de sesion",
      "Member Notes": "Notas del miembro",
      "No notes yet.": "Aun no hay notas.",
      "ASSESSMENT EVIDENCE": "EVIDENCIA DE EVALUACION",
      "GO-TO-MARKET": "SALIDA AL MERCADO",
      "REVENUE MODEL": "MODELO DE INGRESOS",
      "DEFENSIBILITY": "DEFENSIBILIDAD",
      "MARKET INTELLIGENCE": "INTELIGENCIA DE MERCADO",
      "Verified Findings": "Hallazgos verificados",
      "Platform": "Plataforma",
      "Market": "Mercado",
      "Live Demo": "Demo en vivo"
    },
    fr: {
      "BUSINESS PROPOSITION": "PROPOSITION COMMERCIALE",
      "Voice-to-Care Continuum": "Continuum de la voix aux soins",
      "DEPLOYMENT READINESS": "PREPARATION AU DEPLOIEMENT",
      "Institutional Grade Rollout": "Deploiement de niveau institutionnel",
      "TRUST FRAMEWORK": "CADRE DE CONFIANCE",
      "Responsible AI + Human Oversight": "IA responsable + supervision humaine",
      "HEALTHCARE PROFESSIONALS": "PROFESSIONNELS DE SANTE",
      "Built for Doctors, Nurses, and Care Managers": "Concu pour medecins, infirmiers et gestionnaires de soins",
      "Doctor View": "Vue medecin",
      "Nursing Team": "Equipe infirmiere",
      "Care Manager": "Gestionnaire de soins",
      "Open Professional Workspace": "Ouvrir l'espace professionnel",
      "View Evidence Library": "Voir la bibliotheque de preuves",
      "COMPANY POSITIONING": "POSITIONNEMENT DE L'ENTREPRISE",
      "Start Product Demo": "Demarrer la demo produit",
      "View Market Potential": "Voir le potentiel du marche",
      "CORE OFFERING": "OFFRE PRINCIPALE",
      "Voice-First Care OS": "OS de soins axe sur la voix",
      "BUSINESS READINESS": "MATURITE COMMERCIALE",
      "B2B2C Expansion": "Expansion B2B2C",
      "ACTIVE SESSION": "SESSION ACTIVE",
      "Member Access": "Acces membre",
      "OPERATIONS COCKPIT": "COCKPIT D'OPERATIONS",
      "Member Workspace Overview": "Vue d'ensemble de l'espace membre",
      "SESSION MODE": "MODE DE SESSION",
      "Trial": "Essai",
      "SIGNED-IN MEMBER": "MEMBRE CONNECTE",
      "Not Signed In": "Non connecte",
      "RISK EVENTS IN SESSION": "EVENEMENTS DE RISQUE EN SESSION",
      "LAST SYNC": "DERNIERE SYNCHRONISATION",
      "Not Synced": "Non synchronise",
      "Recent Voice Records": "Enregistrements vocaux recents",
      "Professional Checklist": "Checklist professionnelle",
      "MEMBER COMMAND DECK": "PANEL DE COMMANDES MEMBRE",
      "Professional Follow-up Tools": "Outils professionnels de suivi",
      "Add Follow-up Note": "Ajouter une note de suivi",
      "Save Care Plan Snapshot": "Enregistrer l'instantane du plan de soins",
      "Generate Session Brief": "Generer le brief de session",
      "Member Notes": "Notes membre",
      "No notes yet.": "Aucune note pour le moment.",
      "ASSESSMENT EVIDENCE": "PREUVES D'EVALUATION",
      "GO-TO-MARKET": "STRATEGIE GO-TO-MARKET",
      "REVENUE MODEL": "MODELE DE REVENUS",
      "DEFENSIBILITY": "DEFENDABILITE",
      "MARKET INTELLIGENCE": "INTELLIGENCE DE MARCHE",
      "Verified Findings": "Constats verifies",
      "Platform": "Plateforme",
      "Market": "Marche",
      "Live Demo": "Demo en direct"
    }
  };

  function normalizeStaticText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function getStaticFallbackText(text) {
    const fallbackMap = staticFallbackMaps[activeUiLang];
    const normalized = normalizeStaticText(text);
    return (fallbackMap && fallbackMap[normalized]) || text;
  }

  let staticFallbackTextNodeRecords = [];
  let staticFallbackAttributeRecords = [];

  function applyStaticFallback(lang) {
    const fallbackMap = staticFallbackMaps[lang];
    if (!fallbackMap) return;

    const leafElements = document.querySelectorAll("body *:not(script):not(style):not(noscript)");
    leafElements.forEach((el) => {
      if (el.closest("#google_translate_element")) return;
      if (el.childElementCount > 0) return;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;

      const normalized = normalizeStaticText(el.textContent);
      if (!normalized) return;

      const translated = fallbackMap[normalized];
      if (!translated) return;

      if (!el.dataset.cvOriginalText) {
        el.dataset.cvOriginalText = el.textContent || "";
      }
      el.textContent = translated;
      el.dataset.cvFallbackTranslated = "1";
    });

    const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node && node.parentElement ? node.parentElement : null;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("#google_translate_element")) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.dataset && parent.dataset.cvFallbackTranslated === "1") return NodeFilter.FILTER_REJECT;
        const normalized = normalizeStaticText(node.nodeValue);
        return normalized && fallbackMap[normalized] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    while (textWalker.nextNode()) {
      const node = textWalker.currentNode;
      const normalized = normalizeStaticText(node.nodeValue);
      staticFallbackTextNodeRecords.push({ node, value: node.nodeValue });
      node.nodeValue = String(node.nodeValue || "").replace(normalized, fallbackMap[normalized]);
    }

    const translatedAttributes = ["placeholder", "aria-label", "alt", "title"];
    const attrSelector = translatedAttributes.map((attr) => `[${attr}]`).join(",");
    document.querySelectorAll(attrSelector).forEach((el) => {
      if (el.closest("#google_translate_element")) return;
      translatedAttributes.forEach((attr) => {
        const original = el.getAttribute(attr);
        const normalized = normalizeStaticText(original);
        const translated = fallbackMap[normalized];
        if (!translated) return;
        staticFallbackAttributeRecords.push({ el, attr, value: original });
        el.setAttribute(attr, translated);
      });
    });
  }

  function restoreStaticFallback() {
    staticFallbackTextNodeRecords.forEach((record) => {
      if (record.node && record.node.parentNode) {
        record.node.nodeValue = record.value;
      }
    });
    staticFallbackTextNodeRecords = [];

    staticFallbackAttributeRecords.forEach((record) => {
      if (record.el) {
        record.el.setAttribute(record.attr, record.value);
      }
    });
    staticFallbackAttributeRecords = [];

    const translatedEls = document.querySelectorAll("[data-cv-fallback-translated='1']");
    translatedEls.forEach((el) => {
      if (typeof el.dataset.cvOriginalText === "string") {
        el.textContent = el.dataset.cvOriginalText;
      }
      delete el.dataset.cvFallbackTranslated;
      delete el.dataset.cvOriginalText;
    });
  }

  const countryThemeMeta = {
    en: {
      emoji: "🇺🇸",
      label: "Detected: English",
      coachImages: [
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "U.S. healthcare pronunciation coaching visual"
    },
    zh: {
      emoji: "🇭🇰",
      label: "偵測：中文",
      coachImages: [
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "Hong Kong healthcare pronunciation coaching visual"
    },
    de: {
      emoji: "🇩🇪",
      label: "Detected: German",
      coachImages: [
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "German healthcare pronunciation coaching visual"
    },
    ja: {
      emoji: "🇯🇵",
      label: "Detected: Japanese",
      coachImages: [
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "Japanese healthcare pronunciation coaching visual"
    },
    es: {
      emoji: "🇪🇸",
      label: "Detected: Spanish",
      coachImages: [
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "Spanish healthcare pronunciation coaching visual"
    },
    fr: {
      emoji: "🇫🇷",
      label: "Detected: French",
      coachImages: [
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "French healthcare pronunciation coaching visual"
    }
  };

  function getTranslation(lang, key) {
    return (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || key;
  }

  function applyLocalI18nText(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = getTranslation(lang, key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      const translated = getTranslation(lang, key);
      el.setAttribute("placeholder", translated);
      if (el.id === "seeSoundTarget") {
        el.value = translated;
      }
    });
  }

  function syncQuickLanguageButtons() {
    langBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  function setLanguageSwitchStatus(message, tone) {
    if (!languageSwitchStatus) return;
    languageSwitchStatus.textContent = message || "";
    languageSwitchStatus.classList.remove("is-loading", "is-success");
    if (tone === "loading") languageSwitchStatus.classList.add("is-loading");
    if (tone === "success") languageSwitchStatus.classList.add("is-success");
  }

  function setGoogTransCookie(targetLang) {
    const cookieValue = `/en/${targetLang}`;
    document.cookie = `googtrans=${cookieValue};path=/;SameSite=Lax`;
    const host = window.location && window.location.hostname ? window.location.hostname : "";
    if (host && host.includes(".") && host !== "localhost") {
      document.cookie = `googtrans=${cookieValue};path=/;domain=.${host};SameSite=Lax`;
    }
  }

  function getCookieValue(cookieName) {
    try {
      const cookies = String(document.cookie || "")
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      const entry = cookies.find((item) => item.startsWith(`${cookieName}=`));
      if (!entry) return "";
      return decodeURIComponent(entry.slice(cookieName.length + 1));
    } catch {
      return "";
    }
  }

  function setUiLangCookie(lang) {
    const maxAgeSeconds = 60 * 60 * 24 * 365 * 2;
    document.cookie = `${uiLangCookieKey}=${encodeURIComponent(lang)};path=/;Max-Age=${maxAgeSeconds};SameSite=Lax`;

    const host = window.location && window.location.hostname ? window.location.hostname : "";
    if (host && host.includes(".") && host !== "localhost") {
      document.cookie = `${uiLangCookieKey}=${encodeURIComponent(lang)};path=/;domain=.${host};Max-Age=${maxAgeSeconds};SameSite=Lax`;
    }
  }

  function disableFullPageTranslation() {
    ensureTranslateUiSuppressorInstalled();
    setGoogTransCookie("en");
    const translateSelect = document.querySelector(".goog-te-combo");
    if (translateSelect && translateSelect.value !== "en") {
      translateSelect.value = "en";
      translateSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (document && document.body) {
      Array.from(document.body.childNodes).forEach((node) => {
        if (node && node.nodeType === Node.TEXT_NODE && String(node.nodeValue || "").trim() === "✂") {
          document.body.removeChild(node);
        }
      });
    }
  }

  function cleanupTranslateArtifacts() {
    ensureTranslateUiSuppressorInstalled();
    if (!document || !document.body) return;
    Array.from(document.body.childNodes).forEach((node) => {
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      const value = String(node.nodeValue || "").trim();
      if (value === "✂") {
        document.body.removeChild(node);
      }
    });
  }

  function applyFullPageTranslation(uiLang, options = {}) {
    ensureTranslateUiSuppressorInstalled();
    const { showStatus = true, maxAttempts = 10 } = options;
    const targetLang = uiToGoogleLang[uiLang] || "en";
    let translationApplied = targetLang === "en";
    setGoogTransCookie(targetLang);

    if (translationRetryTimer) {
      clearTimeout(translationRetryTimer);
      translationRetryTimer = null;
    }

    const attemptTranslation = (attempt = 0) => {
      const translateSelect = document.querySelector(".goog-te-combo");

      if (!translateSelect) {
        pendingGoogleLang = targetLang;
        if (attempt === 0) {
          initFullPageTranslationEngine();
        }
      } else {
        if (translateSelect.value !== targetLang) {
          translateSelect.value = targetLang;
          translateSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
        translationApplied = true;
      }

      if (attempt < maxAttempts) {
        translationRetryTimer = setTimeout(() => attemptTranslation(attempt + 1), 320);
      } else {
        cleanupTranslateArtifacts();
        if (showStatus) {
          const statusKey = translationApplied ? "nav.switchDone" : "nav.switchLocalOnly";
          setLanguageSwitchStatus(getTranslation(activeUiLang, statusKey), "success");
          if (switchStatusTimer) clearTimeout(switchStatusTimer);
          switchStatusTimer = setTimeout(() => setLanguageSwitchStatus(""), 1400);
        }
      }
    };

    attemptTranslation();
  }

  function tryInitGoogleTranslateWidget() {
    ensureTranslateUiSuppressorInstalled();
    if (googleTranslateReady) return true;
    if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
      return false;
    }

    const host = document.getElementById("google_translate_element");
    if (!host) return false;

    host.innerHTML = "";
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        includedLanguages: "en,zh-TW,de,ja,es,fr"
      },
      "google_translate_element"
    );

    googleTranslateReady = true;
    if (pendingGoogleLang) {
      setTimeout(() => applyFullPageTranslation(activeUiLang), 250);
    }
    return true;
  }

  function initFullPageTranslationEngine() {
    allowGoogleTranslateInit = true;
    if (tryInitGoogleTranslateWidget()) return;

    let attempts = 0;
    const maxAttempts = 30;
    const timer = setInterval(() => {
      attempts += 1;
      const ready = tryInitGoogleTranslateWidget();
      if (ready || attempts >= maxAttempts) {
        clearInterval(timer);
        if (!ready) {
          setLanguageSwitchStatus(getTranslation(activeUiLang, "nav.switchLocalOnly"), "success");
          if (switchStatusTimer) clearTimeout(switchStatusTimer);
          switchStatusTimer = setTimeout(() => setLanguageSwitchStatus(""), 1800);
        }
      }
    }, 300);
  }

  function applyCountryTheme(lang) {
    const theme = countryThemeMeta[lang] || countryThemeMeta.en;
    if (countryThemeBadge) {
      countryThemeBadge.textContent = `${theme.emoji} ${theme.label}`;
    }

    if (seeSoundCoachImage) {
      const candidates = Array.isArray(theme.coachImages) ? theme.coachImages.slice() : [];
      const fallback = countryThemeMeta.en && Array.isArray(countryThemeMeta.en.coachImages)
        ? countryThemeMeta.en.coachImages[0]
        : "";

      let imageIndex = 0;
      const tryNextImage = () => {
        if (!seeSoundCoachImage) return;
        const nextSrc = candidates[imageIndex] || fallback;
        if (!nextSrc) return;
        seeSoundCoachImage.src = nextSrc;
        imageIndex += 1;
      };

      seeSoundCoachImage.onerror = () => {
        if (imageIndex < candidates.length) {
          tryNextImage();
        } else if (fallback && seeSoundCoachImage.src !== fallback) {
          seeSoundCoachImage.src = fallback;
        }
      };

      tryNextImage();
      seeSoundCoachImage.alt = theme.coachAlt;
    }
  }

  function applyUiLanguage(lang) {
    const safeLang = i18n[lang] ? lang : "en";
    activeUiLang = safeLang;
    document.documentElement.lang = safeLang;
    if (document.body) {
      document.body.setAttribute("data-ui-lang", safeLang);
    }

    // Apply local i18n first so language changes are visible immediately,
    // even when Google Translate is delayed or unavailable.
    applyLocalI18nText(safeLang);
    restoreStaticFallback();
    applyStaticFallback(safeLang);

    if (switchStatusTimer) {
      clearTimeout(switchStatusTimer);
      switchStatusTimer = null;
    }
    setLanguageSwitchStatus(getTranslation(safeLang, "nav.switching"), "loading");

    currentLang = uiToSpeechLang[safeLang] || "en-US";
    if (recognition) recognition.lang = currentLang;
    syncQuickLanguageButtons();
    localStorage.setItem(uiLangKey, safeLang);
    setUiLangCookie(safeLang);

    // Cantonese (zh) uses our built-in Cantonese UI strings. Avoid Google Translate
    // for this option so it doesn't turn into Putonghua-style translations.
    if (safeLang === "en" || safeLang === "zh") {
      disableFullPageTranslation();
      setLanguageSwitchStatus(getTranslation(safeLang, "nav.switchDone"), "success");
      if (switchStatusTimer) clearTimeout(switchStatusTimer);
      switchStatusTimer = setTimeout(() => setLanguageSwitchStatus(""), 1200);
    } else {
      applyFullPageTranslation(safeLang);
    }

    if (seeSoundTranscript) {
      const rawBox = transcriptBox ? String(transcriptBox.textContent || "") : "";
      const transcript = rawBox.startsWith("🗣️") ? rawBox.replace(/^🗣️\s*/u, "").trim() : "";
      updateSeeSoundPanel(transcript);
    }

    if (appExperience) {
      const isMember = !appExperience.classList.contains("locked-preview");
      setFeatureAccess(isMember);
    }

    applyCountryTheme(safeLang);
    syncVoiceQuickLanguageToggle(safeLang);
    syncShowcaseDemoForUiLang(safeLang);
    syncCorpNavHeightVar();
  }

  function reassertTranslationsOnReturn() {
    const desiredUiLang = detectUiLangFromLocation();
    const safeLang = i18n[desiredUiLang] ? desiredUiLang : "en";

    // If something changed the stored language while we were away, fully re-apply.
    if (safeLang !== activeUiLang) {
      applyUiLanguage(safeLang);
      return;
    }

    // Quietly re-apply the local strings in case the browser restored
    // stale DOM content (bfcache) while the tab/app was inactive.
    applyLocalI18nText(safeLang);
    restoreStaticFallback();
    applyStaticFallback(safeLang);

    // Then re-assert translation state.
    if (safeLang !== "en" && safeLang !== "zh") {
      applyFullPageTranslation(safeLang, { showStatus: false, maxAttempts: 6 });
    } else {
      disableFullPageTranslation();
    }

    if (seeSoundTranscript) {
      const rawBox = transcriptBox ? String(transcriptBox.textContent || "") : "";
      const transcript = rawBox.startsWith("🗣️") ? rawBox.replace(/^🗣️\s*/u, "").trim() : "";
      updateSeeSoundPanel(transcript);
    }

    if (appExperience) {
      const isMember = !appExperience.classList.contains("locked-preview");
      setFeatureAccess(isMember);
    }

    applyCountryTheme(safeLang);
    syncCorpNavHeightVar();
  }

  async function loadLocalLogs() {
    try {
      const parsed = await readSensitiveJson(localLogsKey, []);
      if (Array.isArray(parsed)) {
        parsed.slice(-200).forEach((item) => localLogs.push(item));
      }
    } catch (err) {
      console.warn("Could not parse local logs:", err);
    }
  }

  function persistLocalLog(entry) {
    localLogs.push(entry);
    const trimmed = localLogs.slice(-200);
    void writeSensitiveJson(localLogsKey, trimmed);
    localLogs.length = 0;
    trimmed.forEach((item) => localLogs.push(item));
  }

  function redactPII(text) {
    return String(text || "")
      .replace(/[A-Z]{1,2}\d{6}\([0-9A]\)/gi, "[HKID_REDACTED]")
      .replace(/\b[569]\d{7}\b/g, "[PHONE_REDACTED]")
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[EMAIL_REDACTED]");
  }

  function runHapticCue(urgency = "blue") {
    if (!navigator.vibrate) return;
    const pattern = urgency === "red" ? [180, 80, 180, 80, 260] : urgency === "amber" ? [120, 70, 120] : [80];
    navigator.vibrate(pattern);
  }

  function applyElderTextScale() {
    document.documentElement.style.setProperty("--elder-text-scale", String(elderTextScale));
  }

  applyElderTextScale();

  function getDataPromiseChoice() {
    try {
      return JSON.parse(localStorage.getItem(dataPromiseChoiceKey) || "null");
    } catch (err) {
      return null;
    }
  }

  function refreshDataPromiseStatus() {
    const choice = getDataPromiseChoice();
    if (dataPromiseStatus) {
      if (!choice) {
        dataPromiseStatus.textContent = "No data choice saved yet.";
      } else if (choice.mode === "care-workflow") {
        dataPromiseStatus.textContent = `Care workflow memory allowed on ${new Date(choice.timestamp).toLocaleString()}.`;
      } else {
        dataPromiseStatus.textContent = `Essential device memory only selected on ${new Date(choice.timestamp).toLocaleString()}.`;
      }
    }
    if (dataPromiseBanner) {
      dataPromiseBanner.classList.toggle("hidden", !!choice);
    }
  }

  function saveDataPromiseChoice(mode) {
    const value = {
      mode,
      timestamp: Date.now(),
      version: 1,
      note: mode === "care-workflow"
        ? "User allowed CareVoice device memory for care workflow continuity."
        : "User selected essential device memory only."
    };
    localStorage.setItem(dataPromiseChoiceKey, JSON.stringify(value));
    refreshDataPromiseStatus();
  }

  function clearCareVoiceDeviceMemory() {
    const confirmed = window.confirm("Clear CareVoice local device memory on this browser? This removes local encrypted logs, demo data, preferences, export history, and saved care workflow settings. Cloud records and Google sign-in are not deleted here.");
    if (!confirmed) return;
    const keysToRemove = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && key.startsWith("carevoice")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    try {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("carevoice")) sessionStorage.removeItem(key);
      });
    } catch (err) {
      // ignore session cleanup failures
    }
    if (dataPromiseStatus) dataPromiseStatus.textContent = "Local CareVoice device memory cleared. Refreshing...";
    setTimeout(() => window.location.reload(), 600);
  }

  function readLocalJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeLocalJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("Could not save local JSON:", err);
    }
  }

  function getRealWorldProfile() {
    return readLocalJson(realWorldProfileKey, {
      name: "",
      age: "",
      sex: "",
      conditions: "",
      allergies: "",
      medications: "",
      preferredHospital: "",
      language: "Cantonese / English"
    });
  }

  function getRealWorldContacts() {
    return readLocalJson(realWorldContactsKey, {
      whatsapp: "",
      sms: "",
      hospitalPhone: "",
      contactOrder: "Family WhatsApp, backup SMS, hospital phone"
    });
  }

  function getRealWorldConsent() {
    return readLocalJson(realWorldConsentKey, {
      familySharing: false,
      hospitalReview: false,
      fhirExport: false,
      emergencyOverride: false
    });
  }

  function getRealWorldInboxStatus() {
    return readLocalJson(realWorldInboxStatusKey, {});
  }

  function getRealWorldAudit() {
    return readLocalJson(realWorldAuditKey, []);
  }

  function addRealWorldAudit(action, detail) {
    const consent = getRealWorldConsent();
    const entry = {
      action,
      detail,
      timestamp: Date.now(),
      actor: currentMemberProfile && currentMemberProfile.role ? currentMemberProfile.role : "local-demo",
      consent: {
        familySharing: !!consent.familySharing,
        hospitalReview: !!consent.hospitalReview,
        fhirExport: !!consent.fhirExport,
        emergencyOverride: !!consent.emergencyOverride
      }
    };
    writeLocalJson(realWorldAuditKey, [entry, ...getRealWorldAudit()].slice(0, 60));
    renderRealWorldOpsPanel();
  }

  function isRealWorldProfileComplete(profile) {
    return !!(profile && profile.name && profile.age && profile.conditions && profile.medications && profile.preferredHospital);
  }

  function isRealWorldContactComplete(contacts) {
    return !!(contacts && (contacts.whatsapp || contacts.sms) && contacts.hospitalPhone);
  }

  function getHospitalInboxItems() {
    const statuses = getRealWorldInboxStatus();
    return localLogs
      .slice(-18)
      .reverse()
      .filter((item) => item && (item.category === "emergency" || ["red", "amber", "blue"].includes(item.urgency)))
      .slice(0, 8)
      .map((item, index) => {
        const id = `case-${item.timestamp || index}-${String(item.text || "").slice(0, 18).replace(/[^a-z0-9]+/gi, "-")}`;
        return {
          id,
          item,
          status: statuses[id] || "New"
        };
      });
  }

  function buildRealWorldBrief() {
    const profile = getRealWorldProfile();
    const latest = getLatestRelevantLog();
    const latestText = latest && latest.text ? latest.text : "No voice log captured yet.";
    const urgency = latest && latest.urgency ? String(latest.urgency).toUpperCase() : "ROUTINE";
    const action = latest ? getCareActionForLog(latest) : "Capture a patient check-in before sending.";
    return [
      `CareVoice SBAR for ${profile.name || "patient"}`,
      `S: ${urgency} check-in. ${latestText}`,
      `B: Age ${profile.age || "not set"}; conditions: ${profile.conditions || "not set"}; allergies: ${profile.allergies || "not set"}; medications: ${profile.medications || "not set"}.`,
      `A: ${latest && Array.isArray(latest.reasons) && latest.reasons.length ? latest.reasons.join("; ") : "AI support note prepared for human review."}`,
      `R: ${action}`,
      "CareVoice is assistive only and not a diagnosis."
    ].join("\n");
  }

  function updateRealWorldField(target) {
    if (!target || !target.dataset) return;
    if (target.dataset.rwProfile) {
      const profile = getRealWorldProfile();
      profile[target.dataset.rwProfile] = target.value;
      writeLocalJson(realWorldProfileKey, profile);
      addRealWorldAudit("Patient profile saved", "Structured medical profile updated for triage and reports.");
      return;
    }
    if (target.dataset.rwContact) {
      const contacts = getRealWorldContacts();
      contacts[target.dataset.rwContact] = target.value;
      writeLocalJson(realWorldContactsKey, contacts);
      addRealWorldAudit("Emergency contacts saved", "Contact order or phone channel updated.");
      return;
    }
    if (target.dataset.rwConsent) {
      const consent = getRealWorldConsent();
      consent[target.dataset.rwConsent] = !!target.checked;
      writeLocalJson(realWorldConsentKey, consent);
      addRealWorldAudit("Consent updated", `${target.dataset.rwConsent}: ${target.checked ? "allowed" : "not allowed"}.`);
    }
  }

  async function copyRealWorldBrief() {
    const brief = buildRealWorldBrief();
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(brief);
        addRealWorldAudit("Doctor SBAR copied", "Structured SBAR copied for clinical review.");
        window.alert("Doctor SBAR copied.");
        return;
      }
    } catch (err) {
      console.warn("Could not copy SBAR:", err);
    }
    window.prompt("Copy doctor SBAR:", brief);
  }

  function openRealWorldWhatsApp() {
    const consent = getRealWorldConsent();
    if (!consent.familySharing && !consent.emergencyOverride) {
      window.alert("Turn on family sharing consent, or emergency override, before preparing WhatsApp handoff.");
      return;
    }
    const contacts = getRealWorldContacts();
    const phone = normalizePhoneNumberForWhatsApp(contacts.whatsapp);
    if (!phone) {
      window.alert("Add a family WhatsApp number first.");
      return;
    }
    const url = new URL(`https://wa.me/${phone}`);
    url.searchParams.set("text", buildRealWorldBrief());
    window.open(url.toString(), "_blank", "noopener,noreferrer");
    addRealWorldAudit("WhatsApp brief prepared", `WhatsApp handoff opened for ${phone}.`);
  }

  function openRealWorldSms() {
    const consent = getRealWorldConsent();
    if (!consent.familySharing && !consent.emergencyOverride) {
      window.alert("Turn on family sharing consent, or emergency override, before preparing SMS handoff.");
      return;
    }
    const contacts = getRealWorldContacts();
    const phone = normalizePhoneNumberForTel(contacts.sms || contacts.whatsapp);
    if (!phone) {
      window.alert("Add a backup SMS number first.");
      return;
    }
    window.location.href = `sms:${encodeURIComponent(phone)}?&body=${encodeURIComponent(buildRealWorldBrief())}`;
    addRealWorldAudit("SMS brief prepared", `SMS handoff opened for ${phone}.`);
  }

  function callRealWorldHospital() {
    const contacts = getRealWorldContacts();
    const phone = normalizePhoneNumberForTel(contacts.hospitalPhone);
    if (!phone) {
      window.alert("Add a hospital or clinic phone number first.");
      return;
    }
    window.location.href = `tel:${phone}`;
    addRealWorldAudit("Hospital call started", `Phone dialer opened for ${phone}.`);
  }

  function simulateFhirHospitalSend() {
    const consent = getRealWorldConsent();
    if (!consent.hospitalReview || !consent.fhirExport) {
      window.alert("Turn on hospital review and FHIR/eHRSS export consent first.");
      return;
    }
    if (!requireExportConsent("FHIR/eHRSS hospital send simulation")) return;
    const bundle = buildFhirBundle("FHIR/eHRSS Hospital Send Simulation");
    addExportHistory("FHIR Send Simulation", bundle.entry.length);
    addRealWorldAudit("FHIR/eHRSS send simulation", `${bundle.entry.length} resources queued for hospital intake review.`);
    const status = document.getElementById("rwFhirSendStatus");
    if (status) {
      status.textContent = `Ready to send: ${bundle.entry.length} FHIR resources packaged with consent and AuditEvent metadata.`;
    }
    renderExportHistory();
  }

  function updateHospitalInboxStatus(caseId, status) {
    const statuses = getRealWorldInboxStatus();
    statuses[caseId] = status;
    writeLocalJson(realWorldInboxStatusKey, statuses);
    addRealWorldAudit("Hospital inbox updated", `${caseId} marked ${status}.`);
  }

  function loadRealWorldDemoCase() {
    const profile = getRealWorldProfile();
    if (!profile.name) {
      writeLocalJson(realWorldProfileKey, {
        name: "Chan Tai Man",
        age: "78",
        sex: "M",
        conditions: "Hypertension, diabetes, fall risk",
        allergies: "Penicillin",
        medications: "Amlodipine, Metformin",
        preferredHospital: "Queen Mary Hospital",
        language: "Cantonese"
      });
    }
    const contacts = getRealWorldContacts();
    if (!contacts.hospitalPhone) {
      writeLocalJson(realWorldContactsKey, {
        whatsapp: "+852 6123 4567",
        sms: "+852 6123 4567",
        hospitalPhone: "+852 2255 3838",
        contactOrder: "Family WhatsApp, backup SMS, hospital phone"
      });
    }
    const consent = getRealWorldConsent();
    writeLocalJson(realWorldConsentKey, { ...consent, familySharing: true, hospitalReview: true, fhirExport: true, emergencyOverride: true });
    [
      "我今日胸口有啲翳，行兩步就氣促。",
      "I missed my blood pressure medicine yesterday and feel dizzy today.",
      "He nearly fell walking to the toilet this morning."
    ].forEach((text) => {
      analyzeInput(text);
      commitPendingVoiceEntry();
    });
    addRealWorldAudit("Real-world demo loaded", "Profile, contacts, consent, red/amber cases, and hospital inbox examples created.");
  }

  function renderRealWorldOpsPanel() {
    if (!realWorldOps) return;
    const profile = getRealWorldProfile();
    const contacts = getRealWorldContacts();
    const consent = getRealWorldConsent();
    const inbox = getHospitalInboxItems();
    const audit = getRealWorldAudit();
    const profileReady = isRealWorldProfileComplete(profile);
    const contactsReady = isRealWorldContactComplete(contacts);
    const consentReady = consent.familySharing && consent.hospitalReview && consent.fhirExport;
    const fhirReady = consentReady && localLogs.length > 0;
    const inboxReady = inbox.length > 0;
    const auditReady = audit.length > 0;
    const checklist = [
      ["Emergency Contact Center", contactsReady, "WhatsApp, SMS, call, and SBAR handoff ready."],
      ["Patient Medical Profile", profileReady, "Age, conditions, allergies, medications, language, and hospital set."],
      ["Hospital Intake Inbox", inboxReady, "Amber/red patient cases appear for staff action."],
      ["FHIR/eHRSS Send Simulation", fhirReady, "Clinical bundle can be queued with consent and audit metadata."],
      ["Detailed Consent Manager", consentReady, "Family, hospital, and export permissions are specific."],
      ["Audit Trail Timeline", auditReady, "Actions are logged with actor, time, and consent state."]
    ];
    const checkedCount = checklist.filter((item) => item[1]).length;
    const inboxHtml = inbox.length
      ? inbox.map(({ id, item, status }) => `<li class="rw-inbox-item urgency-${escapeHtml(item.urgency || "green")}"><strong>${escapeHtml(String(item.urgency || item.category || "case").toUpperCase())} • ${escapeHtml(status)}</strong><span>${escapeHtml(item.text || "No transcript")}</span><small>${escapeHtml(getCareActionForLog(item))}</small><div class="rw-status-actions"><button class="secondary-btn" type="button" data-rw-inbox-action="Accepted" data-case-id="${escapeHtml(id)}">Accept</button><button class="secondary-btn" type="button" data-rw-inbox-action="Call Patient" data-case-id="${escapeHtml(id)}">Call Patient</button><button class="secondary-btn" type="button" data-rw-inbox-action="Escalated" data-case-id="${escapeHtml(id)}">Escalate</button><button class="secondary-btn" type="button" data-rw-inbox-action="Closed" data-case-id="${escapeHtml(id)}">Close</button></div></li>`).join("")
      : "<li>No hospital cases yet. Load a demo case or capture an amber/red voice note.</li>";
    const auditHtml = audit.length
      ? audit.slice(0, 8).map((entry) => `<li><strong>${escapeHtml(entry.action || "Action")}</strong><span>${escapeHtml(entry.detail || "")}</span><small>${new Date(entry.timestamp || Date.now()).toLocaleString()} • ${escapeHtml(entry.actor || "local-demo")}</small></li>`).join("")
      : "<li>No audit actions yet.</li>";

    realWorldOps.innerHTML = `
      <div class="section-head">
        <p class="section-eyebrow">Real-World Readiness</p>
        <h2>Healthcare Workflow Checklist</h2>
        <p class="welcome-copy">These are the real-life changes we talked about: FHIR/eHRSS, WhatsApp/SMS, patient profile, hospital inbox, consent, and audit tracking.</p>
      </div>
      <div class="rw-checklist-card">
        <div><strong>${checkedCount}/6 ready</strong><p>Complete the checklist to make the demo feel like a real patient-to-family-to-hospital workflow.</p></div>
        <button class="secondary-btn" type="button" data-rw-action="loadDemo">Load Real-World Demo Case</button>
      </div>
      <div class="rw-checklist-grid">
        ${checklist.map(([label, done, detail]) => `<article class="rw-check ${done ? "is-done" : ""}"><span>${done ? "✓" : ""}</span><div><strong>${escapeHtml(label)}</strong><p>${escapeHtml(detail)}</p></div></article>`).join("")}
      </div>
      <div class="rw-grid">
        <article class="ops-card rw-card"><h3>Patient Medical Profile</h3><div class="rw-form-grid"><label>Name<input data-rw-profile="name" value="${escapeHtml(profile.name || "")}"></label><label>Age<input data-rw-profile="age" value="${escapeHtml(profile.age || "")}"></label><label>Sex<input data-rw-profile="sex" value="${escapeHtml(profile.sex || "")}"></label><label>Preferred Hospital<input data-rw-profile="preferredHospital" value="${escapeHtml(profile.preferredHospital || "")}"></label><label>Conditions<textarea data-rw-profile="conditions">${escapeHtml(profile.conditions || "")}</textarea></label><label>Allergies<textarea data-rw-profile="allergies">${escapeHtml(profile.allergies || "")}</textarea></label><label>Medications<textarea data-rw-profile="medications">${escapeHtml(profile.medications || "")}</textarea></label><label>Language<input data-rw-profile="language" value="${escapeHtml(profile.language || "")}"></label></div></article>
        <article class="ops-card rw-card"><h3>Emergency Contact Center</h3><div class="rw-form-grid"><label>Family WhatsApp<input data-rw-contact="whatsapp" value="${escapeHtml(contacts.whatsapp || "")}"></label><label>Backup SMS<input data-rw-contact="sms" value="${escapeHtml(contacts.sms || "")}"></label><label>Clinic / Hospital Phone<input data-rw-contact="hospitalPhone" value="${escapeHtml(contacts.hospitalPhone || "")}"></label><label>Preferred Contact Order<input data-rw-contact="contactOrder" value="${escapeHtml(contacts.contactOrder || "")}"></label></div><div class="rw-actions"><button class="secondary-btn" type="button" data-rw-action="whatsapp">Send WhatsApp Brief</button><button class="secondary-btn" type="button" data-rw-action="sms">Send SMS Brief</button><button class="secondary-btn" type="button" data-rw-action="callHospital">Call Hospital</button><button class="secondary-btn" type="button" data-rw-action="copySbar">Copy Doctor SBAR</button></div></article>
        <article class="ops-card rw-card"><h3>Detailed Consent Manager</h3><label class="consent-check"><input type="checkbox" data-rw-consent="familySharing" ${consent.familySharing ? "checked" : ""}> Family sharing allowed</label><label class="consent-check"><input type="checkbox" data-rw-consent="hospitalReview" ${consent.hospitalReview ? "checked" : ""}> Hospital review allowed</label><label class="consent-check"><input type="checkbox" data-rw-consent="fhirExport" ${consent.fhirExport ? "checked" : ""}> FHIR/eHRSS export allowed</label><label class="consent-check"><input type="checkbox" data-rw-consent="emergencyOverride" ${consent.emergencyOverride ? "checked" : ""}> Emergency override allowed</label><p class="chart-footnote">Emergency override should only be used for urgent safety handoff.</p></article>
        <article class="ops-card rw-card"><h3>FHIR/eHRSS Send Simulation</h3><p class="brief-text">Packages Patient, Observation, MedicationStatement, Communication, CarePlan, Consent, and AuditEvent into a send-ready hospital bundle.</p><button class="secondary-btn" type="button" data-rw-action="sendFhir">Simulate Send to Hospital System</button><p id="rwFhirSendStatus" class="chart-footnote">${fhirReady ? "Ready after consent confirmation." : "Needs logs and export consent."}</p></article>
        <article class="ops-card rw-card rw-wide"><h3>Hospital Intake Inbox</h3><ul class="rw-inbox-list">${inboxHtml}</ul></article>
        <article class="ops-card rw-card rw-wide"><h3>Audit Trail Timeline</h3><ul class="recent-log-list">${auditHtml}</ul></article>
      </div>
    `;
  }

  function includesAnyText(text, terms) {
    const haystack = String(text || "").toLowerCase();
    return terms.some((term) => haystack.includes(String(term || "").toLowerCase()));
  }

  function extractTerms(text, termMap) {
    const haystack = String(text || "").toLowerCase();
    const matches = [];
    termMap.forEach((item) => {
      const terms = Array.isArray(item.terms) ? item.terms : [];
      if (terms.some((term) => haystack.includes(String(term || "").toLowerCase()))) {
        matches.push(item.label);
      }
    });
    return Array.from(new Set(matches));
  }

  const hkSymptomTerms = [
    { label: "chest discomfort", terms: ["心口痛", "胸口痛", "心口翳", "chest pain", "chest discomfort"] },
    { label: "shortness of breath", terms: ["氣促", "唔夠氣", "呼吸困難", "喘", "shortness of breath", "cannot breathe", "breathing"] },
    { label: "dizziness", terms: ["頭暈", "暈", "dizzy", "lightheaded"] },
    { label: "fall risk", terms: ["跌", "跌倒", "跌親", "fall", "fell"] },
    { label: "fever", terms: ["發燒", "發熱", "fever"] },
    { label: "pain", terms: ["痛", "pain"] },
    { label: "confusion", terms: ["唔記得", "混亂", "confused", "forgot", "forget"] },
    { label: "missed medication", terms: ["漏食", "忘記食", "冇食藥", "missed medicine", "missed medication", "forgot medicine"] }
  ];

  const hkRedFlagTerms = [
    { label: "chest pain", terms: ["心口痛", "胸口痛", "心口翳", "chest pain", "heart attack"] },
    { label: "breathing difficulty", terms: ["氣促", "唔夠氣", "呼吸困難", "cannot breathe", "not breathing", "shortness of breath"] },
    { label: "stroke signal", terms: ["中風", "口齒不清", "半邊身", "stroke", "face droop"] },
    { label: "fall or fainting", terms: ["跌倒", "跌親", "暈倒", "fainted", "fall", "fell"] },
    { label: "seizure or unconscious", terms: ["抽搐", "昏迷", "seizure", "unconscious"] }
  ];

  function getMedicationAdherence(text) {
    if (includesAnyText(text, ["漏食", "忘記食", "冇食藥", "missed medicine", "missed medication", "forgot medicine", "forgot my pill"])) {
      return "missed";
    }
    if (includesAnyText(text, ["食咗藥", "已經食", "took my medicine", "taken my medicine", "took my pill"])) {
      return "taken";
    }
    if (includesAnyText(text, ["副作用", "side effect", "唔舒服", "反胃"])) {
      return "side-effect concern";
    }
    return "unknown";
  }

  function buildAdvancedCareSignals(text, category, scores, confidence, nextStep) {
    const symptoms = extractTerms(text, hkSymptomTerms);
    const redFlags = extractTerms(text, hkRedFlagTerms);
    const medicationAdherence = getMedicationAdherence(text);
    const vagueConcern = includesAnyText(text, ["唔舒服", "怪怪", "唔係好得", "not well", "unwell", "feel bad"]);
    const distressScore = Math.min(100, Math.round(
      (Number(scores.emergency || 0) * 24)
      + (redFlags.length * 18)
      + (includesAnyText(text, ["救命", "help", "幫下我", "urgent", "now"]) ? 20 : 0)
      + (vagueConcern ? 8 : 0)
    ));

    let urgency = "green";
    if (category === "emergency" || redFlags.length || distressScore >= 75) {
      urgency = "red";
    } else if (category === "symptom" || medicationAdherence === "missed" || distressScore >= 45) {
      urgency = "amber";
    } else if (category === "medication") {
      urgency = "blue";
    }

    const urgencyScoreMap = { green: 25, blue: 45, amber: 68, red: 92 };
    const reasons = [];
    if (redFlags.length) reasons.push(`Red flags: ${redFlags.join(", ")}`);
    if (symptoms.length) reasons.push(`Detected symptoms: ${symptoms.join(", ")}`);
    if (medicationAdherence === "missed") reasons.push("Medication adherence risk detected");
    if (distressScore >= 45) reasons.push(`Distress score ${distressScore}/100`);
    if (confidence < 70) reasons.push("Lower confidence transcript needs human review");
    if (!reasons.length) reasons.push("No immediate red flag found; routine monitoring recommended");

    let clarificationPrompt = "Can you tell me when this started and whether it is getting worse?";
    if (redFlags.includes("chest pain") || redFlags.includes("breathing difficulty")) {
      clarificationPrompt = "Are you having chest pain, breathing trouble, sweating, or feeling faint right now?";
    } else if (symptoms.includes("dizziness") || symptoms.includes("fall risk")) {
      clarificationPrompt = "Did you fall, nearly fall, or feel too dizzy to walk safely?";
    } else if (medicationAdherence === "missed") {
      clarificationPrompt = "Which medicine was missed, and was it blood pressure, diabetes, or heart medication?";
    } else if (vagueConcern) {
      clarificationPrompt = "Is it mainly pain, dizziness, breathing, fever, stomach discomfort, or medicine-related?";
    }

    const recent = localLogs.slice(-14);
    const recentDizziness = recent.filter((item) => includesAnyText(item.text, ["頭暈", "dizzy", "暈"])).length;
    const recentMissedMeds = recent.filter((item) => getMedicationAdherence(item.text) === "missed").length;
    const recentUrgent = recent.filter((item) => ["red", "amber"].includes(item.urgency)).length;
    const baselineFlags = [];
    if (recentDizziness >= 2 && symptoms.includes("dizziness")) baselineFlags.push("Repeated dizziness above recent baseline");
    if (recentMissedMeds >= 2 || medicationAdherence === "missed") baselineFlags.push("Medication adherence needs follow-up");
    if (recentUrgent >= 2 && urgency !== "green") baselineFlags.push("Multiple amber/red care events in recent logs");

    const sbar = [
      `S: Voice check-in reported ${symptoms.length ? symptoms.join(", ") : category}.`,
      `B: ${baselineFlags.length ? baselineFlags.join("; ") : "No strong baseline deviation yet."}`,
      `A: ${urgency.toUpperCase()} priority, confidence ${confidence}%, distress ${distressScore}/100.`,
      `R: ${nextStep || clarificationPrompt}`
    ].join("\n");

    return {
      urgency,
      urgencyScore: urgencyScoreMap[urgency],
      symptoms,
      redFlags,
      reasons,
      clarificationPrompt,
      medicationAdherence,
      distressScore,
      baselineFlags,
      sbar
    };
  }

  function getUrgencyRank(urgency) {
    return { red: 4, amber: 3, blue: 2, green: 1 }[String(urgency || "green")] || 0;
  }

  function getCareActionForLog(item) {
    if (!item) return "Continue monitoring";
    if (item.urgency === "red") return "Notify family and nurse now; consider emergency assessment.";
    if (item.urgency === "amber") return "Review within 30 minutes and confirm symptoms or medication.";
    if (item.urgency === "blue") return "Confirm medication schedule and adherence.";
    return "Routine log; no immediate action required.";
  }

  function getAlertRoutingForLog(item) {
    if (!item) return "No routing decision yet.";
    if (item.urgency === "red") return "Route now: family caregiver + on-call nurse + hospital/emergency contact. Send WhatsApp/SMS/call summary immediately.";
    if (item.urgency === "amber") return "Route within 30 minutes: primary caregiver and assigned nurse review queue.";
    if (item.urgency === "blue") return "Route to medication owner: family caregiver confirms dose and next scheduled medicine.";
    return "Routine archive: keep in trend history, no active alert route.";
  }

  function refreshCareProductPanels() {
    const latestLogs = localLogs.slice(-20).sort((a, b) => {
      const urgencyDiff = getUrgencyRank(b.urgency) - getUrgencyRank(a.urgency);
      if (urgencyDiff) return urgencyDiff;
      return Number(b.timestamp || 0) - Number(a.timestamp || 0);
    });

    if (caregiverTriageQueue) {
      caregiverTriageQueue.innerHTML = "";
      const actionableLogs = latestLogs.filter((item) => ["red", "amber", "blue"].includes(item.urgency)).slice(0, 6);
      if (!actionableLogs.length) {
        const li = document.createElement("li");
        li.textContent = "No alerts waiting for review.";
        caregiverTriageQueue.appendChild(li);
      } else {
        actionableLogs.forEach((item) => {
          const li = document.createElement("li");
          li.className = `triage-queue-item urgency-${item.urgency || "green"}`;
          const time = new Date(item.timestamp || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const reason = Array.isArray(item.reasons) && item.reasons.length ? item.reasons[0] : getCareActionForLog(item);
          li.innerHTML = `<strong>${String(item.urgency || "green").toUpperCase()} • ${time}</strong><span>${reason}</span><small>${getCareActionForLog(item)}</small>`;
          caregiverTriageQueue.appendChild(li);
        });
      }
    }

    if (baselineRadarText) {
      const dizziness = localLogs.filter((item) => includesAnyText(item.text, ["頭暈", "dizzy", "暈"])).length;
      const missedMeds = localLogs.filter((item) => item.medicationAdherence === "missed" || getMedicationAdherence(item.text) === "missed").length;
      const amberRed = localLogs.filter((item) => ["red", "amber"].includes(item.urgency)).length;
      baselineRadarText.textContent = localLogs.length
        ? `Baseline signal: ${dizziness} dizziness mentions, ${missedMeds} missed-medication signals, and ${amberRed} amber/red events across ${localLogs.length} check-ins.`
        : "Capture several check-ins to compare symptoms, medication adherence, and communication clarity against the elder's usual pattern.";
    }

    if (careTeamPlanText) {
      const top = latestLogs[0];
      careTeamPlanText.textContent = top
        ? `${String(top.urgency || "green").toUpperCase()} care task: ${getCareActionForLog(top)} Prompt: ${top.clarificationPrompt || "Confirm the elder is safe."}`
        : "No active care task yet. Urgent voice logs will create suggested family, nurse, or hospital follow-up actions.";
    }

    if (alertRoutingText) {
      alertRoutingText.textContent = latestLogs.length ? getAlertRoutingForLog(latestLogs[0]) : "No routing decision yet. Red alerts route to family plus nurse; amber alerts route to caregiver review.";
    }

    if (impactTimeSaved) impactTimeSaved.textContent = `${Math.round(localLogs.length * 4.25)} min`;
    if (impactCompletion) impactCompletion.textContent = localLogs.length ? "92%" : "0%";
    if (impactEscalation) impactEscalation.textContent = String(localLogs.filter((item) => ["red", "amber"].includes(item.urgency)).length);
    if (impactExportCount) impactExportCount.textContent = String(careReportExportCount);
    renderFhirMappingPreview();
    renderExportHistory();
    renderRealWorldOpsPanel();
  }

  async function loadMemberNotes() {
    try {
      const parsed = await readSensitiveJson(memberNotesKey, []);
      if (Array.isArray(parsed)) {
        parsed.slice(-100).forEach((item) => memberNotes.push(item));
      }
    } catch (err) {
      console.warn("Could not parse member notes:", err);
    }
  }

  function persistMemberNote(text, type) {
    const entry = {
      text,
      type,
      timestamp: Date.now()
    };
    memberNotes.push(entry);
    const trimmed = memberNotes.slice(-100);
    void writeSensitiveJson(memberNotesKey, trimmed);
    memberNotes.length = 0;
    trimmed.forEach((item) => memberNotes.push(item));
  }

  function getLatestRelevantLog() {
    for (let index = localLogs.length - 1; index >= 0; index -= 1) {
      const item = localLogs[index];
      if (item && item.text) return item;
    }
    return null;
  }

  function buildFamilyRelaySummary(sourceText, category, nextStep, confidence) {
    const latestLog = getLatestRelevantLog();
    const activeProject = getActiveOrgProject();
    const recentLogText = latestLog && latestLog.text ? String(latestLog.text).trim() : "";
    const projectName = activeProject ? activeProject.name : "the care team";
    const familyProfile = getFamilyRelayProfile();
    const boardSummary = getLiveMonitorBoardSummary(activeProject);
    const activeRoom = activeProject && Array.isArray(activeProject.rooms)
      ? activeProject.rooms.find((room) => room && room.name === boardSummary.roomName)
      : null;
    const chartTags = normalizeRoomTags(activeRoom && activeRoom.tags ? activeRoom.tags : []);
    const monitorSnapshot = liveMonitorSnapshot || null;
    const monitorLine = monitorSnapshot
      ? `Latest monitor reading: heart rate ${monitorSnapshot.heartRate} bpm, SpO2 ${monitorSnapshot.spo2}%, temperature ${monitorSnapshot.temperature.toFixed(1)}°C, respiration ${monitorSnapshot.respiration}/min.`
      : "Latest monitor reading: no live monitor connected, using room chart context.";
    const relayNeed = category === "emergency"
      ? "urgent help"
      : category === "symptom"
        ? "a doctor or nurse review"
        : category === "medication"
          ? "medication confirmation"
          : "support and follow-up";

    const baseLine = sourceText && /relative|family|daughter|son|wife|husband|contact|call my/i.test(sourceText)
      ? "The patient wants relatives contacted."
      : "Generate a family update from the latest patient note.";

    const chartLine = chartTags.length
      ? `Chart tags: ${chartTags.slice(0, 4).join(", ")}.`
      : "Chart tags: no specific tags added yet.";
    const identityLine = [familyProfile.patientName, familyProfile.patientAge].filter(Boolean).join(", ") || "Patient identity not entered yet.";
    const familyLine = [familyProfile.relativeName, familyProfile.relationship].filter(Boolean).join(" - ") || "Family contact not entered yet.";
    const languageLine = familyProfile.preferredLanguage ? `Preferred language: ${familyProfile.preferredLanguage}.` : "Preferred language: not set.";
    const phoneLine = familyProfile.phoneNumber ? `Phone number: ${familyProfile.phoneNumber}.` : "Phone number: not set.";

    const lines = [
      `Family update for ${projectName}.`,
      baseLine,
      `Patient: ${identityLine}.`,
      `Family contact: ${familyLine}.`,
      languageLine,
      phoneLine,
      `Current need: ${relayNeed}.`,
      `Next step: ${nextStep || "Continue monitoring."}`,
      chartLine,
      monitorLine,
      recentLogText ? `Recent note: ${recentLogText}` : "",
      typeof confidence === "number" && confidence > 0 ? `AI confidence: ${confidence}%` : ""
    ].filter(Boolean);

    return lines.join(" ");
  }

  function updateFamilyRelayDraft(summary, persist = true) {
    familyRelayDraft = String(summary || "").trim();
    if (familyRelayText) {
      familyRelayText.textContent = familyRelayDraft || "No family update generated yet.";
    }
    if (persist && familyRelayDraft) {
      persistMemberNote(familyRelayDraft, "Family Relay");
      refreshMemberTools();
    }
  }

  async function copyFamilyRelayDraft() {
    const text = String(familyRelayDraft || (familyRelayText ? familyRelayText.textContent || "" : "")).trim();
    if (!text || text === "No family update generated yet.") {
      window.alert("Generate a family update first.");
      return;
    }

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        window.alert("Family update copied.");
        return;
      }
    } catch (err) {
      console.warn("Family relay copy failed:", err);
    }

    window.prompt("Copy family update:", text);
  }

  function getFamilyRelayProfile() {
    return {
      patientName: String(familyRelayPatientNameInput ? familyRelayPatientNameInput.value : "").trim(),
      patientAge: String(familyRelayPatientAgeInput ? familyRelayPatientAgeInput.value : "").trim(),
      relativeName: String(familyRelayRelativeNameInput ? familyRelayRelativeNameInput.value : "").trim(),
      relationship: String(familyRelayRelationshipInput ? familyRelayRelationshipInput.value : "").trim(),
      preferredLanguage: String(familyRelayPreferredLanguageInput ? familyRelayPreferredLanguageInput.value : "").trim(),
      phoneNumber: String(familyRelayPhoneInput ? familyRelayPhoneInput.value : "").trim(),
      hospitalPhoneNumber: String(familyRelayHospitalPhoneInput ? familyRelayHospitalPhoneInput.value : "").trim()
    };
  }

  function persistFamilyRelayProfile() {
    void writeSensitiveJson(familyRelayProfileKey, getFamilyRelayProfile());
  }

  async function loadFamilyRelayProfile() {
    try {
      const parsed = await readSensitiveJson(familyRelayProfileKey, {});
      if (parsed && typeof parsed === "object") {
        if (familyRelayPatientNameInput && parsed.patientName) familyRelayPatientNameInput.value = String(parsed.patientName);
        if (familyRelayPatientAgeInput && parsed.patientAge) familyRelayPatientAgeInput.value = String(parsed.patientAge);
        if (familyRelayRelativeNameInput && parsed.relativeName) familyRelayRelativeNameInput.value = String(parsed.relativeName);
        if (familyRelayRelationshipInput && parsed.relationship) familyRelayRelationshipInput.value = String(parsed.relationship);
        if (familyRelayPreferredLanguageInput && parsed.preferredLanguage) familyRelayPreferredLanguageInput.value = String(parsed.preferredLanguage);
        if (familyRelayPhoneInput && parsed.phoneNumber) familyRelayPhoneInput.value = String(parsed.phoneNumber);
        if (familyRelayHospitalPhoneInput && parsed.hospitalPhoneNumber) familyRelayHospitalPhoneInput.value = String(parsed.hospitalPhoneNumber);
      }
    } catch (err) {
      console.warn("Could not load family relay profile:", err);
    }
  }

  function normalizePhoneNumberForTel(raw) {
    const text = String(raw || "").trim();
    if (!text) return "";
    let normalized = text.replace(/(?!^)\+/g, "").replace(/[^\d+]/g, "");
    if (normalized.startsWith("++")) {
      normalized = normalized.replace(/^\++/, "+");
    }
    return normalized;
  }

  function normalizePhoneNumberForWhatsApp(raw) {
    return normalizePhoneNumberForTel(raw).replace(/^\+/, "").replace(/\D/g, "");
  }

  function getFamilyRelayChannelMessage() {
    const text = String(familyRelayDraft || (familyRelayText ? familyRelayText.textContent || "" : "")).trim();
    return text && text !== "No family update generated yet." ? text : buildFamilyRelaySummary("", "general", "Continue monitoring.", 0);
  }

  function openWhatsAppForFamilyRelay() {
    const phone = normalizePhoneNumberForWhatsApp(familyRelayPhoneInput ? familyRelayPhoneInput.value : "");
    if (!phone) {
      window.alert("Add a family phone number first.");
      return;
    }

    const body = getFamilyRelayChannelMessage();
    const url = new URL(`https://wa.me/${phone}`);
    url.searchParams.set("text", body);

    try {
      window.open(url.toString(), "_blank", "noopener,noreferrer");
      if (familyRelayText) {
        familyRelayText.textContent = `WhatsApp handoff prepared for ${phone}. Review the message in WhatsApp before sending.`;
      }
    } catch (err) {
      console.warn("Could not open WhatsApp:", err);
      window.prompt("Copy this WhatsApp message:", body);
    }
  }

  function openSmsForFamilyRelay() {
    const phone = normalizePhoneNumberForTel(familyRelayPhoneInput ? familyRelayPhoneInput.value : "");
    if (!phone) {
      window.alert("Add a family phone number first.");
      return;
    }

    const body = getFamilyRelayChannelMessage();
    const smsUrl = `sms:${phone}${body ? `?&body=${encodeURIComponent(body)}` : ""}`;

    try {
      window.location.href = smsUrl;
      if (familyRelayText) {
        familyRelayText.textContent = `SMS handoff prepared for ${phone}. If your device supports SMS, it will open the messaging app now.`;
      }
    } catch (err) {
      console.warn("Could not open SMS composer:", err);
      window.prompt("Copy this SMS message:", body);
    }
  }

  function openHospitalDialerForFamilyRelay() {
    const hospitalPhone = normalizePhoneNumberForTel(familyRelayHospitalPhoneInput ? familyRelayHospitalPhoneInput.value : "");
    if (!hospitalPhone) {
      window.alert("Add the hospital or ward phone number first.");
      return;
    }

    try {
      window.location.href = `tel:${hospitalPhone}`;
      if (familyRelayText) {
        familyRelayText.textContent = `Hospital call request prepared for ${hospitalPhone}.`;
      }
    } catch (err) {
      console.warn("Could not open hospital dialer:", err);
      window.prompt("Copy the hospital phone number and call manually:", hospitalPhone);
    }
  }

  function openPhoneDialerForFamilyRelay() {
    const phone = normalizePhoneNumberForTel(familyRelayPhoneInput ? familyRelayPhoneInput.value : "");
    if (!phone) {
      window.alert("Add a family phone number first.");
      return;
    }

    const telUrl = `tel:${phone}`;
    try {
      window.location.href = telUrl;
      if (familyRelayText) {
        familyRelayText.textContent = `Phone dial request prepared for ${phone}. If your device supports calls, it will open the dialer now.`;
      }
    } catch (err) {
      console.warn("Could not open dialer:", err);
      window.prompt("Copy the phone number and call manually:", phone);
    }
  }

  async function loadFamilyRelayRecipients() {
    if (!familyRelayEmailInput) return;
    try {
      const stored = await readSensitiveText(familyRelayRecipientsKey, "");
      if (stored) familyRelayEmailInput.value = stored;
    } catch (err) {
      console.warn("Could not load family relay recipients:", err);
    }
  }

  function persistFamilyRelayRecipients(value) {
    void writeSensitiveText(familyRelayRecipientsKey, String(value || ""));
  }

  function getFamilyRelayRecipients() {
    const raw = String(familyRelayEmailInput ? familyRelayEmailInput.value : "");
    const recipients = raw
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter((item) => item.includes("@"));
    persistFamilyRelayRecipients(recipients.join(", "));
    return recipients;
  }

  function buildFamilyRelayEmailSubject() {
    const activeProject = getActiveOrgProject();
    const familyProfile = getFamilyRelayProfile();
    const projectName = activeProject ? activeProject.name : "CareVoice family update";
    const patientName = familyProfile.patientName ? ` - ${familyProfile.patientName}` : "";
    return `CareVoice update for ${projectName}${patientName}`;
  }

  function buildFamilyRelayEmailBody() {
    const text = String(familyRelayDraft || (familyRelayText ? familyRelayText.textContent || "" : "")).trim();
    return text && text !== "No family update generated yet." ? text : buildFamilyRelaySummary("", "general", "Continue monitoring.", 0);
  }

  function openGmailComposeForFamilyRelay() {
    const recipients = getFamilyRelayRecipients();
    if (!recipients.length) {
      window.alert("Add at least one family email address first.");
      return;
    }

    const subject = buildFamilyRelayEmailSubject();
    const body = buildFamilyRelayEmailBody();
    const composeUrl = new URL("https://mail.google.com/mail/");
    composeUrl.searchParams.set("view", "cm");
    composeUrl.searchParams.set("fs", "1");
    composeUrl.searchParams.set("to", recipients.join(","));
    composeUrl.searchParams.set("su", subject);
    composeUrl.searchParams.set("body", body);

    const popup = window.open(composeUrl.toString(), "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = composeUrl.toString();
      return;
    }

    if (familyRelayText) {
      familyRelayText.textContent = `Gmail compose opened for ${recipients.join(", ")}. Review and send the update from Gmail.`;
    }
  }

  function detectVoiceCommand(text) {
    const lower = String(text || "").toLowerCase();
    const channelMatchers = [
      {
        channel: "whatsapp",
        patterns: [
          /\b(whatsapp|wa|what's app|whatapp)\b/i,
          /\b(send|message|text|notify)\b.*\bwhatsapp\b/i,
          /\bwhatsapp\b.*\b(send|message|text|notify)\b/i
        ],
        response: "📲 Voice command detected - preparing WhatsApp family update."
      },
      {
        channel: "sms",
        patterns: [
          /\b(sms|text message)\b/i,
          /\b(text|message)\b.*\b(family|relatives|daughter|son|wife|husband)\b/i,
          /\b(send|text|message|notify)\b.*\b(daughter|son|wife|husband|family|relatives)\b/i
        ],
        response: "💬 Voice command detected - preparing SMS family update."
      },
      {
        channel: "hospital",
        patterns: [
          /\b(call|dial|contact|reach)\b.*\b(hospital|ward|clinic|doctor|nurse)\b/i,
          /\b(hospital|ward|clinic)\b.*\b(call|dial|contact)\b/i
        ],
        response: "🏥 Voice command detected - preparing hospital call handoff."
      },
      {
        channel: "gmail",
        patterns: [
          /\b(gmail|email|mail)\b.*\b(family|relatives|daughter|son|wife|husband)\b/i,
          /\b(send|email|mail)\b.*\b(family|relatives|daughter|son)\b/i
        ],
        response: "✉️ Voice command detected - preparing Gmail family update."
      },
      {
        channel: "phone",
        patterns: [
          /\b(call|dial|phone|ring)\b.*\b(family|relative|relatives|daughter|son|wife|husband)\b/i,
          /\b(family|relative|relatives|daughter|son|wife|husband)\b.*\b(call|dial|phone|ring)\b/i
        ],
        response: "📞 Voice command detected - preparing family phone call."
      }
    ];

    const matchedChannel = channelMatchers.find((entry) => entry.patterns.some((pattern) => pattern.test(lower)));
    const familyCommandPatterns = [
      /\b(contact|call|tell|notify|reach|speak to)\b.*\b(relative|relatives|family|daughter|son|wife|husband|kids|children)\b/i,
      /\b(relative|relatives|family)\b.*\b(contact|call|tell|notify|reach)\b/i,
      /\bgo\s*zhai\b/i
    ];

    if (matchedChannel || familyCommandPatterns.some((pattern) => pattern.test(lower))) {
      return {
        type: "familyRelay",
        channel: matchedChannel ? matchedChannel.channel : null,
        title: "Family relay command",
        response: matchedChannel ? matchedChannel.response : "📣 Voice command detected - family update prepared."
      };
    }

    return null;
  }

  function setMarkItDownState(enabled) {
    if (!markItDownBtn) return;
    markItDownBtn.disabled = !enabled;
    markItDownBtn.textContent = enabled ? "Mark it down" : "Speak first, then mark it down";
  }

  function clearPendingVoiceEntry() {
    pendingVoiceEntry = null;
    setMarkItDownState(false);
  }

  function stageVoiceEntry(entry) {
    pendingVoiceEntry = entry;
    setMarkItDownState(true);
    if (statusPill) {
      statusPill.textContent = "Transcript ready - mark it down";
    }
  }

  function commitPendingVoiceEntry() {
    if (!pendingVoiceEntry) {
      if (statusPill) {
        statusPill.textContent = "Speak first, then mark it down";
      }
      return;
    }

    persistLocalLog(pendingVoiceEntry);
    refreshEvidence();
    saveToFirestore(pendingVoiceEntry);
    clearPendingVoiceEntry();
    refreshMemberTools();

    if (sessionBriefText) {
      sessionBriefText.textContent = buildSessionBrief();
    }

    if (statusPill) {
      statusPill.textContent = getTranslation(activeUiLang, "voice.status.ready");
    }
  }

  function seedJudgeDemoEvidence() {
    if (localLogs.length >= 3) return;

    const now = Date.now();
    const seedEntries = [
      {
        text: "I just took my blood pressure medicine. Do I need to take it again tonight?",
        category: "medication",
        lang: "en-US",
        latencyMs: 620,
        userId: "judge-demo",
        confidence: 88,
        severity: "Medium",
        source: "judge-demo",
        timestamp: now - 180000
      },
      {
        text: "我今日有啲頭暈同胸口唔舒服。",
        category: "symptom",
        lang: "zh-HK",
        latencyMs: 540,
        userId: "judge-demo",
        confidence: 84,
        severity: "Medium",
        source: "judge-demo",
        timestamp: now - 90000
      },
      {
        text: "He fainted in the bathroom, please help now.",
        category: "emergency",
        lang: "en-US",
        latencyMs: 480,
        userId: "judge-demo",
        confidence: 97,
        severity: "Critical",
        source: "judge-demo",
        timestamp: now - 30000
      }
    ];

    seedEntries.forEach((entry) => localLogs.push(entry));
    const trimmedLogs = localLogs.slice(-200);
    localStorage.setItem(localLogsKey, JSON.stringify(trimmedLogs));
    localLogs.length = 0;
    trimmedLogs.forEach((item) => localLogs.push(item));

    responseLatencies.length = 0;
    seedEntries.forEach((entry) => responseLatencies.push(entry.latencyMs));

    if (!memberNotes.length) {
      persistMemberNote("Judge demo seeded with medication, symptom, and emergency examples.", "Judge Mode");
    }

    if (sessionBriefText) {
      sessionBriefText.textContent = buildSessionBrief();
    }
    refreshEvidence();
    refreshMemberTools();
  }

  function normalizeEmail(rawEmail) {
    return String(rawEmail || "").trim().toLowerCase();
  }

  function getOrgDefaultRoomButtons(lang) {
    const map = {
      en: ["Call Nurse", "Med Check", "Fall Risk", "Vitals"],
      zh: ["叫護士", "用藥確認", "跌倒風險", "量度生命徵象"],
      de: ["Pflege rufen", "Med-Check", "Sturzrisiko", "Vitalwerte"],
      ja: ["ナース呼出", "投薬確認", "転倒リスク", "バイタル"],
      es: ["Llamar enfermería", "Chequeo medicación", "Riesgo de caída", "Signos vitales"],
      fr: ["Appeler infirmier", "Vérif. médicaments", "Risque de chute", "Constantes"]
    };
    return map[lang] || map.en;
  }

  function getPatientNeedSummary(watchouts, buttons) {
    const text = `${watchouts || ""} ${Array.isArray(buttons) ? buttons.join(" ") : ""}`.toLowerCase();
    const criticalTerms = ["chest pain", "cannot breathe", "not breathing", "emergency", "stroke", "bleeding", "faint", "昏迷", "中風", "叫救護車", "救命"];
    const urgentTerms = ["fall", "fall risk", "dizzy", "fever", "pain", "breathing", "chest", "跌倒", "頭暈", "發燒", "呼吸"];

    const hasAny = (terms) => terms.some((term) => text.includes(term));

    if (hasAny(criticalTerms)) {
      return {
        urgencyLabel: "Critical",
        nextAction: "Escalate immediately, call clinical staff, and prepare emergency support.",
      };
    }

    if (hasAny(urgentTerms)) {
      return {
        urgencyLabel: "Urgent",
        nextAction: "Nurse review now, check vitals, and confirm the care plan.",
      };
    }

    return {
      urgencyLabel: "Routine",
      nextAction: "Continue monitoring and keep the handoff note updated.",
    };
  }

  function getPatientNeedScore(watchouts, buttons) {
    const summary = getPatientNeedSummary(watchouts, buttons);
    const text = `${watchouts || ""} ${Array.isArray(buttons) ? buttons.join(" ") : ""}`.toLowerCase();
    const signalCount = ["pain", "fall", "fever", "chest", "breathing", "dizzy", "help now", "call nurse", "med check", "vitals"].reduce((count, term) => count + (text.includes(term) ? 1 : 0), 0);
    const buttonBonus = Array.isArray(buttons) ? Math.min(12, buttons.length * 3) : 0;

    if (summary.urgencyLabel === "Critical") {
      return Math.min(100, 88 + signalCount + buttonBonus);
    }
    if (summary.urgencyLabel === "Urgent") {
      return Math.min(100, 62 + signalCount + buttonBonus);
    }
    return Math.min(100, 28 + signalCount + buttonBonus);
  }

  function normalizeRoomTags(tags) {
    if (Array.isArray(tags)) {
      return tags.map((tag) => String(tag || "").trim()).filter(Boolean).slice(0, 12);
    }

    return String(tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  function getChartTagsText(room) {
    return Array.isArray(room && room.tags) ? room.tags.join(", ") : "";
  }

  function getLiveMonitorBoardSummary(project) {
    const rooms = project && Array.isArray(project.rooms) ? project.rooms : [];
    if (!rooms.length) {
      return {
        roomName: "Waiting for an active project",
        urgencyLabel: "Routine",
        score: 24,
        watchouts: "",
        buttons: []
      };
    }

    let topRoom = null;
    let topScore = -1;

    rooms.forEach((room) => {
      const watchouts = String(room && room.watchouts ? room.watchouts : "");
      const buttons = Array.isArray(room && room.buttons) ? room.buttons : [];
      const score = getPatientNeedScore(watchouts, buttons);
      if (score > topScore) {
        topScore = score;
        topRoom = room;
      }
    });

    const roomName = String(topRoom && topRoom.name ? topRoom.name : "Room");
    const watchouts = String(topRoom && topRoom.watchouts ? topRoom.watchouts : "");
    const buttons = Array.isArray(topRoom && topRoom.buttons) ? topRoom.buttons : [];
    const summary = getPatientNeedSummary(watchouts, buttons);

    return {
      roomName,
      urgencyLabel: summary.urgencyLabel,
      score: Math.max(24, topScore),
      watchouts,
      buttons
    };
  }

  function clampMonitorValue(value, min, max) {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return min;
    return Math.max(min, Math.min(max, numeric));
  }

  function normalizeLiveMonitorPayload(payload) {
    if (!payload || typeof payload !== "object") return null;

    const supportedTypes = ["monitor_update", "vital_update", "patient_monitor", "patient_vital_update"];
    const payloadType = String(payload.type || payload.messageType || payload.kind || "").trim();
    if (payloadType && !supportedTypes.includes(payloadType)) {
      return null;
    }

    const vitals = payload.vitals && typeof payload.vitals === "object" ? payload.vitals : (payload.readings && typeof payload.readings === "object" ? payload.readings : payload);
    const roomName = String(payload.roomName || payload.room || payload.unit || payload.location || "").trim();
    const heartRate = Number(vitals.heartRate ?? vitals.hr ?? vitals.pulse ?? vitals.heart_rate ?? vitals.bpm);
    const spo2 = Number(vitals.spo2 ?? vitals.spO2 ?? vitals.oxygen ?? vitals.oxygenSaturation ?? vitals.oxygen_percent);
    const temperature = Number(vitals.temperature ?? vitals.temp ?? vitals.bodyTemperature ?? vitals.temperatureC);
    const respiration = Number(vitals.respiration ?? vitals.respRate ?? vitals.rr ?? vitals.breathingRate ?? vitals.breathsPerMin);

    return {
      type: payloadType || "monitor_update",
      roomName,
      heartRate: Number.isFinite(heartRate) ? heartRate : null,
      spo2: Number.isFinite(spo2) ? spo2 : null,
      temperature: Number.isFinite(temperature) ? temperature : null,
      respiration: Number.isFinite(respiration) ? respiration : null,
      note: String(payload.note || payload.message || payload.status || "").trim(),
      deviceId: String(payload.deviceId || payload.monitorId || payload.source || "").trim(),
      patientId: String(payload.patientId || payload.patient || payload.caseId || "").trim(),
      updatedAt: Number(payload.updatedAt || payload.timestamp || Date.now())
    };
  }

  function getStreamReadingStatus(snapshot) {
    if (!snapshot) return "Simulation mode until a stream is connected.";
    const suffix = snapshot.deviceId ? ` from ${snapshot.deviceId}` : "";
    const patientSuffix = snapshot.patientId ? ` for ${snapshot.patientId}` : "";
    return `Connected to live stream${suffix}${patientSuffix}. Last update ${new Date(snapshot.updatedAt).toLocaleTimeString()}.`;
  }

  function getLiveMonitorSamplePayload() {
    const boardSummary = getLiveMonitorBoardSummary(getActiveOrgProject());
    const urgency = boardSummary.urgencyLabel;
    const roomName = boardSummary.roomName && boardSummary.roomName !== "Waiting for an active project" ? boardSummary.roomName : "Room 12";
    const samples = {
      Critical: { heartRate: 124, spo2: 88, temperature: 38.8, respiration: 30, note: "SpO2 dropped after a bathroom trip." },
      Urgent: { heartRate: 108, spo2: 93, temperature: 37.8, respiration: 24, note: "Patient looks short of breath and dizzy." },
      Routine: { heartRate: 78, spo2: 97, temperature: 36.8, respiration: 16, note: "Routine check-in from bedside monitor." }
    };
    const vitals = samples[urgency] || samples.Routine;

    return {
      type: "monitor_update",
      deviceId: `bed-${String(roomName).toLowerCase().replace(/[^a-z0-9]+/g, "-") || "12"}`,
      roomName,
      patientId: "patient-204",
      updatedAt: Date.now(),
      vitals: {
        heartRate: vitals.heartRate,
        spo2: vitals.spo2,
        temperature: vitals.temperature,
        respiration: vitals.respiration
      },
      note: vitals.note
    };
  }

  function serializeLiveMonitorPayload(payload) {
    return `${JSON.stringify(payload, null, 2)}`;
  }

  async function copyLiveMonitorSamplePayload() {
    const payload = serializeLiveMonitorPayload(getLiveMonitorSamplePayload());
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(payload);
        if (liveMonitorSourceStatus) liveMonitorSourceStatus.textContent = "Sample payload copied to clipboard.";
        return;
      }
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }

    window.prompt("Copy sample payload:", payload);
  }

  function applyLiveMonitorPayload(payload, sourceLabel) {
    const normalized = normalizeLiveMonitorPayload(payload);
    if (!normalized) return false;

    liveMonitorStreamReading = normalized;
    if (liveMonitorSourceStatus) {
      liveMonitorSourceStatus.textContent = sourceLabel || getStreamReadingStatus(normalized);
    }
    refreshLiveMonitorPanel();
    return true;
  }

  function runPastedLiveMonitorPayload() {
    if (!liveMonitorPasteInput) return;

    const raw = String(liveMonitorPasteInput.value || "").trim();
    if (!raw) {
      window.alert("Paste a JSON payload first.");
      return;
    }

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      window.alert("That text is not valid JSON.");
      return;
    }

    const ok = applyLiveMonitorPayload(parsed, "Pasted payload applied locally. This uses the same parser as the websocket stream.");
    if (!ok) {
      window.alert("The payload did not match a supported monitor message type.");
    }
  }

  function clearPastedLiveMonitorPayload() {
    if (liveMonitorPasteInput) {
      liveMonitorPasteInput.value = "";
      liveMonitorPasteInput.focus();
    }
  }

  function disconnectLiveMonitorSocket(message) {
    if (liveMonitorSocket) {
      try {
        liveMonitorSocket.close();
      } catch (err) {
        console.warn("Monitor socket close failed:", err);
      }
      liveMonitorSocket = null;
    }

    liveMonitorStreamReading = null;
    if (liveMonitorDisconnectBtn) liveMonitorDisconnectBtn.disabled = true;
    if (liveMonitorConnectBtn) liveMonitorConnectBtn.disabled = false;
    if (liveMonitorSourceStatus) {
      liveMonitorSourceStatus.textContent = message || "Simulation mode until a stream is connected.";
    }
    refreshLiveMonitorPanel();
  }

  function connectLiveMonitorSocket() {
    if (!liveMonitorUrlInput) return;

    const url = String(liveMonitorUrlInput.value || "").trim();
    if (!url) {
      window.alert("Enter a websocket URL for the monitor stream.");
      return;
    }

    if (liveMonitorSocket) {
      disconnectLiveMonitorSocket("Reconnecting to the live stream...");
    }

    try {
      localStorage.setItem(liveMonitorUrlKey, url);
    } catch (err) {
      console.warn("Could not store monitor URL:", err);
    }

    const socket = new WebSocket(url);
    liveMonitorSocket = socket;
    if (liveMonitorConnectBtn) liveMonitorConnectBtn.disabled = true;
    if (liveMonitorDisconnectBtn) liveMonitorDisconnectBtn.disabled = false;
    if (liveMonitorSourceStatus) liveMonitorSourceStatus.textContent = "Connecting to live stream...";

    socket.addEventListener("open", () => {
      if (liveMonitorSourceStatus) liveMonitorSourceStatus.textContent = "Connected to live stream. Waiting for readings...";
      if (liveMonitorConnectBtn) liveMonitorConnectBtn.disabled = false;
      if (liveMonitorDisconnectBtn) liveMonitorDisconnectBtn.disabled = false;
      refreshLiveMonitorPanel();
    });

    socket.addEventListener("message", (event) => {
      let parsed = null;
      try {
        parsed = JSON.parse(event.data);
      } catch (err) {
        parsed = { message: String(event.data || "") };
      }

      applyLiveMonitorPayload(parsed, getStreamReadingStatus(normalizeLiveMonitorPayload(parsed)));
    });

    socket.addEventListener("close", () => {
      if (liveMonitorSocket === socket) {
        liveMonitorSocket = null;
      }
      if (liveMonitorConnectBtn) liveMonitorConnectBtn.disabled = false;
      if (liveMonitorDisconnectBtn) liveMonitorDisconnectBtn.disabled = true;
      if (!liveMonitorStreamReading && liveMonitorSourceStatus) {
        liveMonitorSourceStatus.textContent = "Stream disconnected. Simulation mode restored.";
      }
      refreshLiveMonitorPanel();
    });

    socket.addEventListener("error", () => {
      if (liveMonitorSourceStatus) liveMonitorSourceStatus.textContent = "Stream connection error. Simulation mode restored.";
      if (liveMonitorConnectBtn) liveMonitorConnectBtn.disabled = false;
      if (liveMonitorDisconnectBtn) liveMonitorDisconnectBtn.disabled = true;
      liveMonitorStreamReading = null;
      refreshLiveMonitorPanel();
    });
  }

  function buildLiveMonitorSnapshot() {
    const project = getActiveOrgProject();
    const boardSummary = getLiveMonitorBoardSummary(project);
    const streaming = liveMonitorSocket && liveMonitorSocket.readyState === WebSocket.OPEN && liveMonitorStreamReading;
    const baselineScore = Math.max(24, Math.min(100, boardSummary.score));

    let heartRate;
    let spo2;
    let temperature;
    let respiration;
    let sourceNote;
    let sourceRoom = boardSummary.roomName;

    if (streaming) {
      sourceRoom = liveMonitorStreamReading.roomName || sourceRoom;
      heartRate = clampMonitorValue(liveMonitorStreamReading.heartRate ?? 0, 40, 180);
      spo2 = clampMonitorValue(liveMonitorStreamReading.spo2 ?? 0, 70, 100);
      temperature = clampMonitorValue(liveMonitorStreamReading.temperature ?? 36.6, 34, 42);
      respiration = clampMonitorValue(liveMonitorStreamReading.respiration ?? 16, 8, 40);
      sourceNote = liveMonitorStreamReading.note || `Live readings received from ${liveMonitorStreamReading.deviceId || "the connected monitor"}.`;
    } else {
      const liveWave = Math.sin((Date.now() / 2400) + liveMonitorTick * 0.18);
      const riskBoost = Math.round((baselineScore - 24) / 8);

      heartRate = 76 + riskBoost * 3 + Math.round(liveWave * 4);
      spo2 = 98 - Math.round(riskBoost * 0.7) - Math.max(0, Math.round(liveWave * 1.2));
      temperature = 36.6 + (riskBoost * 0.1) + Math.max(0, liveWave * 0.18);
      respiration = 16 + riskBoost + Math.round(Math.abs(liveWave) * 2);

      if (boardSummary.urgencyLabel === "Urgent") {
        heartRate += 8;
        spo2 -= 3;
        temperature += 0.3;
        respiration += 3;
      }

      if (boardSummary.urgencyLabel === "Critical") {
        heartRate += 18;
        spo2 -= 8;
        temperature += 0.7;
        respiration += 7;
      }

      sourceNote = "Simulation mode is mirroring the board until a websocket stream is connected.";
    }

    heartRate = clampMonitorValue(heartRate, 48, 148);
    spo2 = clampMonitorValue(spo2, 82, 100);
    temperature = clampMonitorValue(temperature, 35.3, 40.1);
    respiration = clampMonitorValue(respiration, 10, 34);

    let likelyCause = "Routine monitoring with no immediate concern.";
    let clinician = "Nurse";
    let action = "Keep monitoring and continue the handoff notes.";
    let trend = streaming ? "Streaming" : "Stable";
    let confidence = streaming ? 68 : 56;

    if (spo2 <= 91 || respiration >= 28) {
      likelyCause = "Possible respiratory strain or airway issue.";
      clinician = "Doctor";
      action = "Escalate immediately and call a doctor for respiratory review.";
      trend = "Worsening";
      confidence = 92;
    } else if (temperature >= 38.1 && heartRate >= 100) {
      likelyCause = "Possible fever, infection, or systemic stress.";
      clinician = "Nurse";
      action = "Call a nurse for bedside review and vitals re-check.";
      trend = "Needs attention";
      confidence = 86;
    } else if (heartRate >= 112 || boardSummary.urgencyLabel === "Critical") {
      likelyCause = "Possible pain, dehydration, or cardiac stress.";
      clinician = "Doctor";
      action = "Escalate to a doctor and document the urgent cause check.";
      trend = "Worsening";
      confidence = 88;
    } else if (heartRate >= 92 || spo2 <= 95 || boardSummary.urgencyLabel === "Urgent") {
      likelyCause = "Possible pain, dizziness, or medication-related instability.";
      clinician = "Nurse";
      action = "Call a nurse to review the patient and confirm the care plan.";
      trend = "Watch closely";
      confidence = 74;
    }

    if (liveMonitorSnapshot) {
      const hrDelta = heartRate - liveMonitorSnapshot.heartRate;
      const spo2Delta = spo2 - liveMonitorSnapshot.spo2;
      if (Math.abs(hrDelta) <= 3 && Math.abs(spo2Delta) <= 1 && trend === "Stable") {
        trend = "Steady";
      } else if (hrDelta > 4 || spo2Delta < -1) {
        trend = trend === "Stable" ? "Drifting up" : trend;
      }
    }

    return {
      roomName: sourceRoom,
      urgencyLabel: boardSummary.urgencyLabel,
      score: baselineScore,
      heartRate,
      spo2,
      temperature,
      respiration,
      likelyCause,
      clinician,
      action,
      trend,
      confidence,
      sourceNote,
      streaming
    };
  }

  function refreshLiveMonitorPanel() {
    const snapshot = buildLiveMonitorSnapshot();
    liveMonitorSnapshot = snapshot;

    if (liveMonitorStatus) {
      liveMonitorStatus.textContent = snapshot.streaming ? "Connected" : (snapshot.urgencyLabel === "Critical" ? "Critical" : "Live");
      liveMonitorStatus.className = `monitor-live-badge monitor-${snapshot.urgencyLabel.toLowerCase()}`;
    }
    if (liveMonitorRoomValue) liveMonitorRoomValue.textContent = snapshot.roomName;
    if (liveMonitorConfidence) liveMonitorConfidence.textContent = `${snapshot.confidence}%`;
    if (liveMonitorClinician) liveMonitorClinician.textContent = snapshot.clinician;
    if (liveMonitorTrend) liveMonitorTrend.textContent = snapshot.trend;
    if (liveMonitorHeartRate) liveMonitorHeartRate.textContent = `${snapshot.heartRate} bpm`;
    if (liveMonitorSpo2) liveMonitorSpo2.textContent = `${snapshot.spo2} %`;
    if (liveMonitorTemp) liveMonitorTemp.textContent = `${snapshot.temperature.toFixed(1)} °C`;
    if (liveMonitorResp) liveMonitorResp.textContent = `${snapshot.respiration} /min`;
    if (liveMonitorCause) liveMonitorCause.textContent = snapshot.likelyCause;
    if (liveMonitorAction) liveMonitorAction.textContent = snapshot.action;
    if (liveMonitorSourceStatus) {
      liveMonitorSourceStatus.textContent = snapshot.streaming
        ? (snapshot.sourceNote || getStreamReadingStatus(liveMonitorStreamReading))
        : "Simulation mode until a stream is connected.";
    }
    if (liveMonitorCallBtn) {
      liveMonitorCallBtn.textContent = snapshot.clinician === "Doctor" ? "Call Doctor" : "Call Nurse";
      liveMonitorCallBtn.disabled = !snapshot.roomName || snapshot.roomName === "Waiting for an active project";
    }

    return snapshot;
  }

  function triggerMonitorEscalation() {
    const snapshot = liveMonitorSnapshot || refreshLiveMonitorPanel();
    if (!snapshot || !snapshot.roomName || snapshot.roomName === "Waiting for an active project") return;

    persistMemberNote(`${snapshot.roomName} monitor escalated to ${snapshot.clinician}: ${snapshot.likelyCause}`, "Live Monitor");
    refreshMemberTools();
    window.alert(`${snapshot.clinician} escalation queued for ${snapshot.roomName}. ${snapshot.likelyCause}`);
    if (snapshot.urgencyLabel === "Critical") {
      triggerSOS(snapshot.likelyCause);
    }
  }

  function runLiveMonitorTestPayload() {
    const payload = getLiveMonitorSamplePayload();
    const ok = applyLiveMonitorPayload(payload, "Test payload injected locally. Use this to verify escalation and nurse/doctor routing.");
    if (!ok) {
      window.alert("Could not apply the test payload.");
      return;
    }

    if (liveMonitorCallBtn) {
      liveMonitorCallBtn.focus();
    }
  }

  function loadLiveMonitorUrlPreference() {
    if (!liveMonitorUrlInput) return;
    try {
      const stored = localStorage.getItem(liveMonitorUrlKey);
      if (stored) {
        liveMonitorUrlInput.value = stored;
      }
    } catch (err) {
      console.warn("Could not load monitor URL preference:", err);
    }
  }

  function getActiveOrgProject() {
    return orgProjects.find((p) => p && p.id === orgActiveProjectId) || null;
  }

  function setActiveOrgProject(projectId) {
    orgActiveProjectId = String(projectId || "");
    if (orgActiveProjectId) {
      localStorage.setItem(orgActiveProjectKey, orgActiveProjectId);
    } else {
      localStorage.removeItem(orgActiveProjectKey);
    }
  }

  async function loadOrgProjectsFromLocalStorage() {
    orgProjects.length = 0;
    try {
      const parsed = await readSensitiveJson(orgProjectsKey, []);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (item && item.id && item.name) {
            orgProjects.push({
              id: String(item.id),
              name: String(item.name),
              ownerUid: String(item.ownerUid || "local-demo"),
              memberEmails: Array.isArray(item.memberEmails) ? item.memberEmails.map(normalizeEmail).filter(Boolean) : [],
              hospitalAccountId: String(item.hospitalAccountId || ""),
              rooms: Array.isArray(item.rooms) ? item.rooms : []
            });
          }
        });
      }
    } catch (err) {
      console.warn("Could not parse org projects:", err);
    }

    if (orgProjects.length && (!orgActiveProjectId || !orgProjects.some((p) => p.id === orgActiveProjectId))) {
      setActiveOrgProject(orgProjects[0].id);
    }
  }

  function persistOrgProjectsToLocalStorage() {
    const trimmed = orgProjects.slice(-50);
    void writeSensitiveJson(orgProjectsKey, trimmed);
  }

  async function loadOrgProjectsFromFirestore(user) {
    if (!window.db || !user) return [];
    const resultsById = new Map();
    const ownedSnap = await window.db.collection("orgProjects").where("ownerUid", "==", user.uid).get();
    const projectDocs = [];
    ownedSnap.forEach((doc) => {
      projectDocs.push(doc);
    });

    const email = normalizeEmail(user.email);
    if (email) {
      const memberSnap = await window.db.collection("orgProjects").where("memberEmails", "array-contains", email).get();
      memberSnap.forEach((doc) => {
        projectDocs.push(doc);
      });
    }

    for (const doc of projectDocs) {
      const data = doc.data() || {};
      const hospitalAccountId = String(data.hospitalAccountId || "");
      const rooms = data.encryptedRooms
        ? await decryptOrgRoomsFromCloud(data.encryptedRooms, hospitalAccountId, Array.isArray(data.rooms) ? data.rooms : [])
        : (Array.isArray(data.rooms) ? data.rooms : []);
      resultsById.set(doc.id, {
        id: doc.id,
        name: String(data.name || "Untitled Project"),
        ownerUid: String(data.ownerUid || user.uid),
        memberEmails: Array.isArray(data.memberEmails) ? data.memberEmails.map(normalizeEmail).filter(Boolean) : [],
        hospitalAccountId,
        rooms
      });
    }

    return Array.from(resultsById.values());
  }

  async function saveOrgProjectToFirestore(project) {
    if (!window.db || !project || !project.id) return;
    const hospitalAccountId = String(project.hospitalAccountId || (currentHospitalMembership && currentHospitalMembership.accountId) || "");
    const encryptedRooms = hospitalAccountId ? await encryptOrgRoomsForCloud(project.rooms, hospitalAccountId) : "";
    const payload = {
      name: String(project.name || "Untitled Project"),
      ownerUid: String(project.ownerUid || ""),
      memberEmails: Array.isArray(project.memberEmails) ? project.memberEmails.map(normalizeEmail).filter(Boolean) : [],
      hospitalAccountId,
      rooms: encryptedRooms ? [] : (Array.isArray(project.rooms) ? project.rooms : []),
      encryptedRooms: encryptedRooms || null
    };
    await window.db.collection("orgProjects").doc(project.id).set(payload, { merge: true });
  }

  async function deleteOrgProjectFromFirestore(projectId) {
    if (!window.db || !projectId) return;
    await window.db.collection("orgProjects").doc(String(projectId)).delete();
  }

  function renderOrgProjectsUI() {
    if (!orgProjectSelect || !orgRoomsList || !orgMembersList) return;

    const active = getActiveOrgProject();
    const isOwner = !!(active && currentOrgUser && active.ownerUid && currentOrgUser.uid && active.ownerUid === currentOrgUser.uid);

    if (deleteOrgProjectBtn) deleteOrgProjectBtn.disabled = !active || !isOwner;
    if (addOrgMemberBtn) addOrgMemberBtn.disabled = !active || !isOwner;
    if (addOrgRoomBtn) addOrgRoomBtn.disabled = !active || !isOwner;
    if (applyRoomDefaultsBtn) applyRoomDefaultsBtn.disabled = !active || !isOwner;

    orgProjectSelect.innerHTML = "";
    if (!orgProjects.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No projects yet";
      orgProjectSelect.appendChild(opt);
      orgProjectSelect.disabled = true;
    } else {
      orgProjectSelect.disabled = false;
      orgProjects.forEach((project) => {
        const opt = document.createElement("option");
        opt.value = project.id;
        opt.textContent = project.name;
        if (project.id === orgActiveProjectId) opt.selected = true;
        orgProjectSelect.appendChild(opt);
      });
    }

    orgMembersList.innerHTML = "";
    const members = active && Array.isArray(active.memberEmails) ? active.memberEmails : [];
    if (!active) {
      const li = document.createElement("li");
      li.textContent = "Create or select a project to manage members.";
      orgMembersList.appendChild(li);
    } else if (!members.length) {
      const li = document.createElement("li");
      li.textContent = "No members added yet.";
      orgMembersList.appendChild(li);
    } else {
      members.slice(0, 30).forEach((email) => {
        const li = document.createElement("li");
        li.textContent = email;
        orgMembersList.appendChild(li);
      });
    }

    if (orgProjectStatus) {
      if (!active) {
        orgProjectStatus.textContent = "Create a project, add members, and set up rooms with watch-outs and custom action buttons.";
      } else {
        const roleLabel = isOwner ? "Owner" : "Member (view)";
        orgProjectStatus.textContent = `Active project: ${active.name} • ${roleLabel}`;
      }
    }

    const triageCriticalCount = document.getElementById("triageCriticalCount");
    const triageUrgentCount = document.getElementById("triageUrgentCount");
    const triageRoutineCount = document.getElementById("triageRoutineCount");
    const triageBoardScore = document.getElementById("triageBoardScore");

    orgRoomsList.innerHTML = "";
    const rooms = active && Array.isArray(active.rooms) ? active.rooms : [];
    if (!active) {
      const emptyCard = document.createElement("article");
      emptyCard.className = "ops-card";
      const h3 = document.createElement("h3");
      h3.textContent = "No active project";
      const p = document.createElement("p");
      p.className = "brief-text";
      p.textContent = "Create or select a project to view rooms.";
      emptyCard.appendChild(h3);
      emptyCard.appendChild(p);
      orgRoomsList.appendChild(emptyCard);
      return;
    }

    if (!rooms.length) {
      const emptyCard = document.createElement("article");
      emptyCard.className = "ops-card";
      const h3 = document.createElement("h3");
      h3.textContent = "No rooms yet";
      const p = document.createElement("p");
      p.className = "brief-text";
      p.textContent = "Add Room 1 / Room 2 and configure their buttons.";
      emptyCard.appendChild(h3);
      emptyCard.appendChild(p);
      orgRoomsList.appendChild(emptyCard);
      return;
    }

    rooms.slice(0, 40).forEach((room) => {
      const roomName = String(room && room.name ? room.name : "Room");
      const who = String(room && room.who ? room.who : "");
      const watchouts = String(room && room.watchouts ? room.watchouts : "");
      const buttons = Array.isArray(room && room.buttons) ? room.buttons.map((b) => String(b || "").trim()).filter(Boolean) : [];
      const tags = normalizeRoomTags(room && room.tags ? room.tags : []);
      const patientNeeds = [];
      const patientNeedSummary = getPatientNeedSummary(watchouts, buttons);
      const patientNeedScore = getPatientNeedScore(watchouts, buttons);

      if (watchouts) patientNeeds.push(watchouts);
      if (buttons.length) patientNeeds.push(buttons.slice(0, 4).join(", "));
      if (!patientNeeds.length) patientNeeds.push("Add a watch-out or action button to describe the patient's needs.");

      const card = document.createElement("article");
      card.className = "ops-card";
      const h3 = document.createElement("h3");
      h3.textContent = roomName;

      const meta = document.createElement("p");
      meta.className = "brief-text";
      const whoLine = who ? `Who: ${who}` : "Who: —";
      const watchLine = watchouts ? `Watch-outs: ${watchouts}` : "Watch-outs: —";
      meta.textContent = `${whoLine} • ${watchLine}`;

      const needBlock = document.createElement("div");
      needBlock.className = "patient-needs-block";
      const needLabel = document.createElement("p");
      needLabel.className = "patient-needs-label";
      needLabel.textContent = "Patient needs";
      const urgencyBadge = document.createElement("p");
      urgencyBadge.className = `patient-urgency-badge urgency-${patientNeedSummary.urgencyLabel.toLowerCase()}`;
      urgencyBadge.textContent = patientNeedSummary.urgencyLabel;
      const scoreRow = document.createElement("div");
      scoreRow.className = "patient-score-row";
      const scoreLabel = document.createElement("span");
      scoreLabel.className = "patient-score-label";
      scoreLabel.textContent = "Needs score";
      const scoreValue = document.createElement("span");
      scoreValue.className = "patient-score-value";
      scoreValue.textContent = `${patientNeedScore}/100`;
      const scoreTrack = document.createElement("div");
      scoreTrack.className = "patient-score-track";
      const scoreFill = document.createElement("div");
      scoreFill.className = `patient-score-fill score-${patientNeedSummary.urgencyLabel.toLowerCase()}`;
      scoreFill.style.width = `${patientNeedScore}%`;
      const needText = document.createElement("p");
      needText.className = "patient-needs-text";
      needText.textContent = patientNeeds.join(" • ");
      const tagLabel = document.createElement("p");
      tagLabel.className = "patient-needs-label";
      tagLabel.textContent = "Chart tags";
      const tagWrap = document.createElement("div");
      tagWrap.className = "chart-tag-wrap";
      if (!tags.length) {
        const emptyTag = document.createElement("span");
        emptyTag.className = "chart-tag-empty";
        emptyTag.textContent = "Add tags like fall risk or needs vitals.";
        tagWrap.appendChild(emptyTag);
      } else {
        tags.forEach((tag) => {
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = "chart-tag-chip";
          chip.textContent = tag;
          chip.addEventListener("click", () => {
            if (!currentOrgUser) {
              window.alert("Please sign in to mark a chart tag.");
              return;
            }
            persistMemberNote(`${active.name} / ${roomName} - Chart tag: ${tag}`, "Chart Tag");
            refreshMemberTools();
          });
          tagWrap.appendChild(chip);
        });
      }
      const actionLabel = document.createElement("p");
      actionLabel.className = "patient-needs-label";
      actionLabel.textContent = "What to do now";
      const actionText = document.createElement("p");
      actionText.className = "patient-next-action-text";
      actionText.textContent = patientNeedSummary.nextAction;

      const actionWrap = document.createElement("div");
      actionWrap.className = "tool-actions";
      const actionButtons = buttons.length ? buttons : getOrgDefaultRoomButtons(activeUiLang);
      actionButtons.slice(0, 8).forEach((label) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "secondary-btn";
        btn.textContent = label;
        btn.addEventListener("click", () => {
          if (!currentOrgUser) {
            window.alert("Please sign in to use room actions.");
            return;
          }
          const details = window.prompt(`Action note for ${roomName} / ${label} (optional):`, "") || "";
          const detailSuffix = details.trim() ? ` — ${details.trim()}` : "";
          persistMemberNote(`${active.name} / ${roomName} — ${label}${detailSuffix}`, "Room Action");
          refreshMemberTools();
        });
        actionWrap.appendChild(btn);
      });

      card.appendChild(h3);
      card.appendChild(meta);
        card.appendChild(needBlock);
        needBlock.appendChild(needLabel);
      needBlock.appendChild(urgencyBadge);
        scoreRow.appendChild(scoreLabel);
        scoreRow.appendChild(scoreValue);
        needBlock.appendChild(scoreRow);
        scoreTrack.appendChild(scoreFill);
        needBlock.appendChild(scoreTrack);
        needBlock.appendChild(needText);
        needBlock.appendChild(tagLabel);
        needBlock.appendChild(tagWrap);
      needBlock.appendChild(actionLabel);
      needBlock.appendChild(actionText);
      card.appendChild(actionWrap);

      if (isOwner) {
        const adminWrap = document.createElement("div");
        adminWrap.className = "tool-actions";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "secondary-btn";
        editBtn.textContent = "Edit Room";
        editBtn.addEventListener("click", async () => {
          const nextWho = window.prompt(`Who is it? (${roomName})`, who) || "";
          const nextWatchouts = window.prompt(`What to look out for? (${roomName})`, watchouts) || "";
          const nextButtonsRaw = window.prompt(`Buttons (comma-separated) (${roomName})`, (buttons || []).join(", ")) || "";
          const nextButtons = nextButtonsRaw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10);
          const nextTagsRaw = window.prompt(`Chart tags (comma-separated) (${roomName})`, getChartTagsText(room)) || "";
          const nextTags = normalizeRoomTags(nextTagsRaw);

          room.who = nextWho.trim();
          room.watchouts = nextWatchouts.trim();
          room.buttons = nextButtons;
          room.tags = nextTags;
          await persistActiveOrgProject();
          renderOrgProjectsUI();
        });

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "secondary-btn";
        removeBtn.textContent = "Remove Room";
        removeBtn.addEventListener("click", async () => {
          const ok = window.confirm(`Remove ${roomName}?`);
          if (!ok) return;
          active.rooms = active.rooms.filter((r) => r !== room);
          await persistActiveOrgProject();
          renderOrgProjectsUI();
        });

        adminWrap.appendChild(editBtn);
        adminWrap.appendChild(removeBtn);
        card.appendChild(adminWrap);
      }

      const counts = rooms.reduce((acc, roomItem) => {
        const summary = getPatientNeedSummary(String(roomItem && roomItem.watchouts ? roomItem.watchouts : ""), Array.isArray(roomItem && roomItem.buttons) ? roomItem.buttons : []);
        if (summary.urgencyLabel === "Critical") acc.critical += 1;
        else if (summary.urgencyLabel === "Urgent") acc.urgent += 1;
        else acc.routine += 1;
        return acc;
      }, { critical: 0, urgent: 0, routine: 0 });

      const avgBoardScore = rooms.length
        ? Math.round(rooms.reduce((sum, roomItem) => sum + getPatientNeedScore(String(roomItem && roomItem.watchouts ? roomItem.watchouts : ""), Array.isArray(roomItem && roomItem.buttons) ? roomItem.buttons : []), 0) / rooms.length)
        : 0;

      if (triageCriticalCount) triageCriticalCount.textContent = String(counts.critical);
      if (triageUrgentCount) triageUrgentCount.textContent = String(counts.urgent);
      if (triageRoutineCount) triageRoutineCount.textContent = String(counts.routine);
      if (triageBoardScore) triageBoardScore.textContent = `${avgBoardScore}%`;

      orgRoomsList.appendChild(card);
    });

    refreshLiveMonitorPanel();
  }

  async function persistActiveOrgProject() {
    const active = getActiveOrgProject();
    if (!active) return;

    if (currentOrgUser && window.db) {
      if (!active.ownerUid) active.ownerUid = currentOrgUser.uid;
      await saveOrgProjectToFirestore(active);
      return;
    }

    persistOrgProjectsToLocalStorage();
  }

  async function initOrgProjectsForUser(user) {
    if (!orgProjectSelect && !createOrgProjectBtn && !orgRoomsList) return;

    currentOrgUser = user || null;
    const identity = user && user.uid ? `uid:${user.uid}` : "local";
    if (orgLoadedForIdentity === identity) {
      renderOrgProjectsUI();
      return;
    }

    orgLoadedForIdentity = identity;
    orgProjects.length = 0;

    if (user && window.db) {
      try {
        const loaded = await loadOrgProjectsFromFirestore(user);
        loaded.forEach((p) => orgProjects.push(p));
      } catch (err) {
        console.warn("Could not load org projects from Firestore:", err);
        await loadOrgProjectsFromLocalStorage();
      }
    } else {
      await loadOrgProjectsFromLocalStorage();
    }

    if (orgProjects.length && (!orgActiveProjectId || !orgProjects.some((p) => p.id === orgActiveProjectId))) {
      setActiveOrgProject(orgProjects[0].id);
    }

    renderOrgProjectsUI();
  }

  function buildSessionBrief() {
    const latestLogs = localLogs.slice(-10);
    if (!latestLogs.length) {
      return "No interaction data yet. Capture voice input to generate a session brief.";
    }

    const categoryCounts = { general: 0, medication: 0, symptom: 0, emergency: 0 };
    latestLogs.forEach((item) => {
      if (categoryCounts[item.category] !== undefined) {
        categoryCounts[item.category] += 1;
      }
    });

    const dominantCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0][0];
    const avgLatency = responseLatencies.length
      ? Math.round(responseLatencies.reduce((a, b) => a + b, 0) / responseLatencies.length)
      : 0;

    const urgentCount = latestLogs.filter((item) => ["red", "amber"].includes(item.urgency)).length;
    const latestSbar = latestLogs[latestLogs.length - 1] && latestLogs[latestLogs.length - 1].sbar
      ? ` Latest SBAR: ${latestLogs[latestLogs.length - 1].sbar.replace(/\n/g, " ")}`
      : "";

    return `Latest 10 interactions processed. Dominant category: ${dominantCategory}. Emergency events: ${categoryCounts.emergency}. Amber/red tasks: ${urgentCount}. Average response latency: ${avgLatency} ms.${latestSbar}`;
  }

  function refreshMemberTools() {
    if (memberNotesList) {
      const latestNotes = memberNotes.slice(-6).reverse();
      memberNotesList.innerHTML = "";
      if (!latestNotes.length) {
        const li = document.createElement("li");
        li.textContent = "No notes yet.";
        memberNotesList.appendChild(li);
      } else {
        latestNotes.forEach((note) => {
          const li = document.createElement("li");
          li.textContent = `${new Date(note.timestamp).toLocaleString()} - ${note.type}: ${note.text}`;
          memberNotesList.appendChild(li);
        });
      }
    }

    if (sessionBriefText && sessionBriefText.textContent === "No brief generated yet.") {
      sessionBriefText.textContent = buildSessionBrief();
    }

    if (familyRelayText && familyRelayDraft && familyRelayText.textContent !== familyRelayDraft) {
      familyRelayText.textContent = familyRelayDraft;
    }

    if (sendFamilyRelayGmailBtn) {
      sendFamilyRelayGmailBtn.disabled = !familyRelayDraft && (!familyRelayText || familyRelayText.textContent === "No family update generated yet.");
    }

    refreshCareProductPanels();
    refreshLiveMonitorPanel();
  }

  function setJourneyTutorialMessage(message) {
    if (journeyTutorialStatus) {
      journeyTutorialStatus.textContent = message;
    }
  }

  function setJourneyTutorialProgress(stepIndex) {
    const totalSteps = journeyTutorialSteps.length || 1;
    const currentStep = Math.min(stepIndex + 1, totalSteps);
    const percent = Math.max(0, Math.min(100, Math.round((currentStep / totalSteps) * 100)));

    if (journeyTutorialProgressBar) {
      journeyTutorialProgressBar.style.width = `${percent}%`;
    }
    if (journeyTutorialCounter) {
      journeyTutorialCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
    }
  }

  function setJourneyTutorialActive(stepId) {
    tutorialStepChips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.tourStep === stepId);
    });
  }

  function stopJourneyTutorial() {
    if (journeyTutorialTimer) {
      clearInterval(journeyTutorialTimer);
      journeyTutorialTimer = null;
    }
    if (startJourneyTutorialBtn) {
      startJourneyTutorialBtn.textContent = "Start Tutorial";
    }
    setJourneyTutorialProgress(journeyTutorialSteps.length - 1);
  }

  function goToJourneyTutorialStep(stepIndex) {
    const step = journeyTutorialSteps[stepIndex];
    if (!step) return;

    journeyTutorialIndex = stepIndex;
    setJourneyTutorialActive(step.id);
    setJourneyTutorialMessage(step.message);
    setJourneyTutorialProgress(stepIndex);

    const target = step.id === "member"
      ? document.getElementById("memberWorkspaceBtn") || document.getElementById("memberAccess")
      : document.getElementById(step.target);

    if (target) {
      glideToElement(target, step.offset);
    }
  }

  function startJourneyTutorial() {
    if (!journeyTutorialSteps.length) return;

    if (journeyTutorialTimer) {
      stopJourneyTutorial();
      setJourneyTutorialMessage("Tutorial stopped");
      setJourneyTutorialActive("");
      return;
    }

    seedJudgeDemoEvidence();
    if (startJourneyTutorialBtn) {
      startJourneyTutorialBtn.textContent = "Stop Tutorial";
    }

    goToJourneyTutorialStep(0);
    journeyTutorialTimer = setInterval(() => {
      journeyTutorialIndex += 1;
      if (journeyTutorialIndex >= journeyTutorialSteps.length) {
        stopJourneyTutorial();
        setJourneyTutorialActive("member");
        setJourneyTutorialMessage("Tutorial complete. Use the live demo or export CSV now.");
        return;
      }
      goToJourneyTutorialStep(journeyTutorialIndex);
    }, 3500);
  }

  function smoothScrollToY(targetY, duration) {
    const startY = window.scrollY;
    const delta = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + delta * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function glideToElement(element, offset) {
    if (!element) return;
    const targetY = element.getBoundingClientRect().top + window.scrollY - (offset || 0);
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.scrollTo(0, Math.max(0, targetY));
    } else {
      smoothScrollToY(Math.max(0, targetY), 700);
    }
  }

  function glideToPortal() {
    if (!loginPortal) return;
    glideToElement(loginPortal, 22);
  }

  function showLoginPortal() {
    if (!loginPortal) return;
    loginPortal.classList.remove("hidden");
    glideToPortal();
    shinePortal();
  }

  function shinePortal() {
    if (!loginPortal) return;
    loginPortal.classList.remove("portal-shine");
    requestAnimationFrame(() => {
      loginPortal.classList.add("portal-shine");
    });
  }

  function setupSmoothAnchorGlide() {
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (href === "#" || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const header = document.querySelector(".corp-nav");
      const headerOffset = header ? Math.ceil(header.getBoundingClientRect().height) + 28 : 18;
      glideToElement(target, headerOffset);

      // Keep URL hash aligned with current section.
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    });
  }

  function setupNavScrollSpy() {
    const header = document.querySelector(".corp-nav");
    const navLinks = Array.from(document.querySelectorAll('.corp-nav .nav-links a[href^="#"]'));
    if (!navLinks.length) return;

    const linkPairs = navLinks
      .map((link) => {
        const href = link.getAttribute("href") || "";
        const id = href.startsWith("#") ? href.slice(1) : "";
        if (!id) return null;
        const section = document.getElementById(id);
        if (!section) return null;
        return { link, section, id };
      })
      .filter(Boolean);

    if (!linkPairs.length) return;

    const setActiveLink = (active) => {
      linkPairs.forEach(({ link }) => {
        if (link === active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    let ticking = false;
    const updateActive = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const offset = headerHeight + 24;

        let best = null;
        let bestScore = Number.POSITIVE_INFINITY;

        for (const { link, section } of linkPairs) {
          const rect = section.getBoundingClientRect();
          const topDelta = rect.top - offset;
          const bottomDelta = rect.bottom - offset;

          if (topDelta <= 0 && bottomDelta > 0) {
            best = link;
            break;
          }

          if (topDelta <= 0) {
            const score = Math.abs(topDelta);
            if (score < bestScore) {
              bestScore = score;
              best = link;
            }
          }
        }

        if (!best) {
          const firstRect = linkPairs[0].section.getBoundingClientRect();
          if (firstRect.top - offset > 0) {
            best = linkPairs[0].link;
          } else {
            best = linkPairs[linkPairs.length - 1].link;
          }
        }

        setActiveLink(best);
      });
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    updateActive();
  }

  function syncCorpNavHeightVar() {
    const header = document.querySelector(".corp-nav");
    if (!header) return;

    const isMobile = window.matchMedia
      && window.matchMedia("(max-width: 1024px), (hover: none) and (pointer: coarse)").matches;
    const isForceFixed = document.body && document.body.classList.contains("nav-force-fixed");
    if (!isMobile && !isForceFixed) {
      document.documentElement.style.removeProperty("--corp-nav-h");
      return;
    }

    const height = Math.max(0, Math.ceil(header.getBoundingClientRect().height || 0));
    document.documentElement.style.setProperty("--corp-nav-h", `${height}px`);
  }

  function setupParallax() {
    const parallaxTargets = document.querySelectorAll(
      ".welcome-story-card, .portal-check-card, .gallery-card, .member-dashboard, .showcase"
    );

    if (!parallaxTargets.length) return;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    function applyParallax() {
      const y = window.scrollY;
      parallaxTargets.forEach((el, index) => {
        const factor = ((index % 4) + 1) * 0.08;
        const shift = Math.max(-12, Math.min(12, (y * factor) / 10));
        // Use translate instead of transform so it composes with hover + reveal transforms.
        el.style.translate = `0 ${shift.toFixed(2)}px`;
      });
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyParallax);
    }, { passive: true });

    applyParallax();
  }

  function setupNavChromeMotion() {
    const header = document.querySelector(".corp-nav");
    if (!header) return;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    const apply = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          apply();
          ticking = false;
        });
      },
      { passive: true }
    );

    apply();
  }

  function setupNavStickyFallback() {
    const header = document.querySelector(".corp-nav");
    if (!header) return;

    const isMobile = window.matchMedia
      && window.matchMedia("(max-width: 1024px), (hover: none) and (pointer: coarse)").matches;
    if (isMobile) return;

    const initialPos = getComputedStyle(header).position;
    if (initialPos === "fixed") return;

    const stickySupported = (window.CSS && typeof window.CSS.supports === "function")
      ? (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky"))
      : true;
    if (!stickySupported) {
      document.body.classList.add("nav-force-fixed");
      syncCorpNavHeightVar();
      return;
    }

    let forced = false;
    let ticking = false;

    const getExpectedTop = () => {
      const top = parseFloat(getComputedStyle(header).top || "0");
      return Number.isFinite(top) ? top : 0;
    };

    const check = () => {
      if (forced) return;
      if ((window.scrollY || 0) < 8) return;

      const rectTop = header.getBoundingClientRect().top;
      const expectedTop = getExpectedTop();

      // If sticky is working, rectTop stays near the configured `top` value.
      // If sticky is broken, the nav scrolls away and rectTop diverges.
      if (Math.abs(rectTop - expectedTop) > 24) {
        forced = true;
        document.body.classList.add("nav-force-fixed");
        syncCorpNavHeightVar();
      }
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
      },
      { passive: true }
    );

    window.addEventListener("resize", () => {
      if (!document.body.classList.contains("nav-force-fixed")) return;
      syncCorpNavHeightVar();
    });

    // Run once on load and shortly after layout settles.
    check();
    setTimeout(check, 250);
  }

  function setupBrandHomeButton() {
    if (!brandHomeLink) return;
    brandHomeLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (loginPortal) loginPortal.classList.add("hidden");
      glideToElement(document.getElementById("top"), 0);
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", "#top");
      }
    });
  }

  function setFeatureAccess(isMember) {
    if (appExperience) {
      appExperience.classList.toggle("locked-preview", !isMember);
    }

    if (memberGateBanner) {
      memberGateBanner.classList.toggle("hidden", isMember);
    }

    memberLockables.forEach((section) => {
      section.classList.toggle("is-locked", !isMember);
    });

    memberOnlyBadges.forEach((badge) => {
      badge.classList.toggle("hidden", isMember);
    });

    const controlledElements = [
      addQuickNoteBtn,
      saveCarePlanBtn,
      generateBriefBtn,
      downloadNotesBtn,
      copyBriefBtn,
      clearNotesBtn,
      createOrgProjectBtn,
      deleteOrgProjectBtn,
      addOrgMemberBtn,
      addOrgRoomBtn,
      applyRoomDefaultsBtn
    ];

    controlledElements.forEach((el) => {
      if (!el) return;
      el.disabled = !isMember;
    });

    if (!isMember) {
      if (statusPill) statusPill.textContent = getTranslation(activeUiLang, "status.trial");
      if (judgeModeStatus) judgeModeStatus.textContent = getTranslation(activeUiLang, "judge.trialMessage");
      return;
    }

    if (statusPill && !isListening) statusPill.textContent = getTranslation(activeUiLang, "voice.status.ready");
    if (judgeModeStatus && judgeModeStatus.textContent.includes("Preview mode")) {
      judgeModeStatus.textContent = "Judge Mode idle";
    }
  }

  function refreshEvidence() {
    let medicationCount = 0;
    let symptomCount = 0;
    let emergencyCount = 0;
    let latestLog = null;

    localLogs.forEach((item) => {
      if (item.category === "medication") medicationCount += 1;
      if (item.category === "symptom") symptomCount += 1;
      if (item.category === "emergency") emergencyCount += 1;
      if (!latestLog || Number(item.timestamp || 0) > Number(latestLog.timestamp || 0)) {
        latestLog = item;
      }
    });

    const categoryTotals = [
      ["medication", medicationCount],
      ["symptom", symptomCount],
      ["emergency", emergencyCount]
    ];
    const dominantEntry = categoryTotals.sort((a, b) => b[1] - a[1])[0];
    const dominantCategory = dominantEntry && dominantEntry[1] > 0 ? dominantEntry[0] : "general";
    const readinessBase = localLogs.length >= 3 ? 45 : localLogs.length * 10;
    const readinessMix = Math.min(20, (medicationCount > 0 ? 7 : 0) + (symptomCount > 0 ? 7 : 0) + (emergencyCount > 0 ? 6 : 0));
    const readinessLatency = responseLatencies.length
      ? Math.max(0, 20 - Math.min(20, Math.round((responseLatencies.reduce((a, b) => a + b, 0) / responseLatencies.length) / 50)))
      : 0;
    const readinessExport = localLogs.length > 0 ? 10 : 0;
    const readinessScore = Math.min(100, readinessBase + readinessMix + readinessLatency + readinessExport);

    const avgLatency = responseLatencies.length
      ? Math.round(responseLatencies.reduce((a, b) => a + b, 0) / responseLatencies.length)
      : 0;

    if (evidenceTotal) evidenceTotal.textContent = String(localLogs.length);
    if (evidenceMix) evidenceMix.textContent = `${medicationCount} / ${symptomCount} / ${emergencyCount}`;
    if (evidenceLatency) evidenceLatency.textContent = avgLatency ? `${avgLatency} ms` : "-- ms";
    if (evidenceSus) evidenceSus.textContent = "82 / 100";
    if (analyticsCategory) {
      analyticsCategory.textContent = dominantCategory === "general"
        ? "General"
        : dominantCategory.charAt(0).toUpperCase() + dominantCategory.slice(1);
    }
    if (analyticsSignal) {
      if (latestLog) {
        const shortText = String(latestLog.text || "").trim();
        analyticsSignal.textContent = `${latestLog.category.toUpperCase()}: ${shortText.length > 56 ? `${shortText.slice(0, 56)}…` : shortText}`;
      } else {
        analyticsSignal.textContent = "No signal yet";
      }
    }
    if (analyticsReadiness) {
      analyticsReadiness.textContent = `${readinessScore}%`;
    }

    if (memberRiskValue) memberRiskValue.textContent = String(emergencyCount);

    if (recentLogsList) {
      const latestLogs = localLogs.slice(-5).reverse();
      recentLogsList.innerHTML = "";
      if (!latestLogs.length) {
        const fallback = document.createElement("li");
        fallback.textContent = "No records yet.";
        recentLogsList.appendChild(fallback);
      } else {
        latestLogs.forEach((item) => {
          const li = document.createElement("li");
          const readableTime = new Date(item.timestamp).toLocaleString();
          const severityLabel = item.severity ? ` (${item.severity})` : "";
          li.textContent = `${readableTime} - ${item.category.toUpperCase()}${severityLabel} - ${item.text}`;
          recentLogsList.appendChild(li);
        });
      }
    }

    refreshCareProductPanels();
  }

  function simpleWordDistance(a, b) {
    const s1 = (a || "").toLowerCase().trim();
    const s2 = (b || "").toLowerCase().trim();
    if (!s1 && !s2) return 0;

    const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0));
    for (let i = 0; i <= s1.length; i += 1) dp[i][0] = i;
    for (let j = 0; j <= s2.length; j += 1) dp[0][j] = j;

    for (let i = 1; i <= s1.length; i += 1) {
      for (let j = 1; j <= s2.length; j += 1) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[s1.length][s2.length];
  }

  function toIpaApproxEnglish(text) {
    const dict = {
      i: "aɪ",
      need: "niːd",
      help: "hɛlp",
      with: "wɪð",
      pronunciation: "prəˌnʌnsiˈeɪʃən",
      hello: "həˈloʊ",
      emergency: "ɪˈmɝːdʒənsi",
      medicine: "ˈmɛdɪsɪn",
      pain: "peɪn",
      cough: "kɒf",
      fever: "ˈfiːvər"
    };

    const tokens = (text || "")
      .toLowerCase()
      .replace(/[^a-z\s']/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    if (!tokens.length) return "/ - /";

    const ipaTokens = tokens.map((token) => {
      if (dict[token]) return dict[token];
      return token
        .replace(/tion/g, "ʃən")
        .replace(/th/g, "θ")
        .replace(/sh/g, "ʃ")
        .replace(/ch/g, "tʃ")
        .replace(/oo/g, "uː")
        .replace(/ee/g, "iː")
        .replace(/a/g, "æ")
        .replace(/e/g, "ɛ")
        .replace(/i/g, "ɪ")
        .replace(/o/g, "ɒ")
        .replace(/u/g, "ʌ");
    });

    return `/${ipaTokens.join(" ")}/`;
  }

  function toIpaApproxCantonese(text) {
    const charMap = {
      我: "ŋɔː",
      你: "nei̯",
      佢: "kʰɵy̯",
      食: "sɪk̚",
      藥: "jœːk̚",
      痛: "tʰʊŋ",
      頭: "tʰɐu̯",
      暈: "wɐn",
      咳: "kʰɐt̚",
      熱: "jiːt̚",
      救: "kɐu̯",
      急: "kɐp̚",
      呼: "fuː",
      吸: "kʰɐp̚",
      難: "naːn",
      氣: "hei̯"
    };

    const chars = Array.from((text || "").trim()).filter((char) => char !== " ");
    if (!chars.length) return "/ - /";

    const ipa = chars.map((char) => charMap[char] || char).join(" ");
    return `/${ipa}/`;
  }

  function generatePronunciationAdvice(score, transcript, target) {
    if (score >= 90) return getTranslation(activeUiLang, "seesound.advice.excellent");
    if (score >= 75) return getTranslation(activeUiLang, "seesound.advice.good");
    if (score >= 55) return getTranslation(activeUiLang, "seesound.advice.moderate");
    if (!transcript) return getTranslation(activeUiLang, "seesound.advice.needTranscript");
    if (!target) return getTranslation(activeUiLang, "seesound.advice.needTarget");
    return getTranslation(activeUiLang, "seesound.advice.low");
  }

  function getMouthHintFromIpa(ipa) {
    const value = (ipa || "").toLowerCase();
    if (!value || value === "/ - /") {
      return { className: "mouth-neutral", hintKey: "mouth.hint.neutral" };
    }
    if (/[ouɔʊu]/.test(value)) {
      return { className: "mouth-rounded", hintKey: "mouth.hint.rounded" };
    }
    if (/[aæɑ]/.test(value)) {
      return { className: "mouth-open", hintKey: "mouth.hint.open" };
    }
    if (/[iɪeɛ]/.test(value)) {
      return { className: "mouth-wide", hintKey: "mouth.hint.wide" };
    }
    return { className: "mouth-neutral", hintKey: "mouth.hint.neutral" };
  }

  function triggerMouthGuideAnimation() {
    if (!seeSoundMouth) return;

    seeSoundMouth.classList.remove("mouth-guiding");
    // Force reflow so animation can restart on each guidance update.
    void seeSoundMouth.offsetWidth;
    seeSoundMouth.classList.add("mouth-guiding");

    if (mouthGuideTimer) {
      clearTimeout(mouthGuideTimer);
    }

    mouthGuideTimer = setTimeout(() => {
      if (seeSoundMouth) seeSoundMouth.classList.remove("mouth-guiding");
    }, 1500);
  }

  function updateSeeSoundPanel(transcript) {
    if (!seeSoundTranscript || !seeSoundIpa || !seeSoundScore || !seeSoundAdvice) return;

    const target = seeSoundTarget ? seeSoundTarget.value.trim() : "";
    const cleanTranscript = (transcript || "").trim();
    const ipaSource = cleanTranscript || target;
    const ipa = currentLang === "zh-HK"
      ? toIpaApproxCantonese(ipaSource)
      : toIpaApproxEnglish(ipaSource);

    const distance = simpleWordDistance(cleanTranscript, target || cleanTranscript);
    const denominator = Math.max((target || cleanTranscript).length, 1);
    const rawScore = Math.max(0, Math.round(100 - (distance / denominator) * 100));
    const score = cleanTranscript ? rawScore : 0;

    const waitingText = getTranslation(activeUiLang, "voice.waitingForVoice");
    seeSoundTranscript.textContent = cleanTranscript || waitingText;
    seeSoundTranscript.dataset.empty = cleanTranscript ? "0" : "1";
    seeSoundIpa.textContent = ipa;
    seeSoundScore.textContent = `${score}/100`;
    seeSoundAdvice.textContent = generatePronunciationAdvice(score, cleanTranscript, target);

    if (seeSoundMouth && seeSoundMouthHint) {
      const mouthHint = getMouthHintFromIpa(ipa);
      seeSoundMouth.classList.remove("mouth-neutral", "mouth-open", "mouth-rounded", "mouth-wide");
      seeSoundMouth.classList.add(mouthHint.className);
      seeSoundMouthHint.textContent = getTranslation(activeUiLang, mouthHint.hintKey);
      triggerMouthGuideAnimation();
    }
  }

  function updateAuthUI(user) {
    if (user) {
      const providerLabel = user.providerData && user.providerData[0] && user.providerData[0].providerId === "google.com"
        ? "Google"
        : "Authenticated";
      const userLabel = user.displayName || user.email || user.uid;
      if (authStatusText) {
        authStatusText.textContent = `${providerLabel} login active: ${userLabel}. Cloud sync enabled.`;
      }
      if (memberStatusText) {
        memberStatusText.textContent = `${providerLabel} account: ${userLabel}`;
      }
      if (memberNameValue) memberNameValue.textContent = userLabel;
      if (memberModeValue) memberModeValue.textContent = "Member";
      if (googleLoginBtn) googleLoginBtn.disabled = true;
      if (googleRegisterBtn) googleRegisterBtn.disabled = true;
      if (switchAccountBtn) switchAccountBtn.disabled = false;
      if (logoutBtn) logoutBtn.disabled = false;
      if (reopenRoleSetupBtn) reopenRoleSetupBtn.disabled = false;
      if (loginPortal) loginPortal.classList.add("hidden");
      if (memberWorkspaceBtn) memberWorkspaceBtn.classList.remove("hidden");
      loadHospitalAccounts();
      if (!currentMemberProfile) {
        loadMemberProfileForUser(user);
      }
      loadHospitalMembershipForUser(user);
      updateCareTermsGate(user);
      updateSessionNotificationBar(user);
      initSecureChatForUser(user);

      if (profileEntryPanel && !isMemberWorkspacePage()) {
        profileEntryPanel.classList.remove("hidden");
        if (profileEntryStatus) {
          const savedRoleLabel = currentMemberProfile && currentMemberProfile.role ? getMemberRoleLabel(currentMemberProfile.role) : "";
          const pendingRoleLabel = getPendingRoleChoice() ? getMemberRoleLabel(getPendingRoleChoice()) : "";
          profileEntryStatus.textContent = savedRoleLabel
            ? `Signed in as ${userLabel}. Saved role: ${savedRoleLabel}. Choose the same role to continue, or choose another role to update this account.`
            : pendingRoleLabel
              ? `Signed in as ${userLabel}. You selected ${pendingRoleLabel} before login. Opening role setup now.`
            : `Signed in as ${userLabel}. Choose Patient, Hospital Staff, or Family Member to continue.`;
        }
        glideToElement(profileEntryPanel, 22);
      }

      if (isMemberWorkspacePage()) {
        const pendingRole = getPendingRoleChoice();
        if (!isMemberProfileComplete(currentMemberProfile) && pendingRole) {
          chooseRoleAndRedirect(pendingRole);
          return;
        }
        applyMemberOnboardingGate(user);
        const profileLabel = currentMemberProfile ? getHospitalLabelFromProfile(currentMemberProfile) : "";
        if (memberStatusText && currentMemberProfile && currentMemberProfile.role) {
          const roleLabel = String(currentMemberProfile.role).replace(/_/g, " ");
          memberStatusText.textContent = `${providerLabel} account: ${userLabel} • Role: ${roleLabel}${profileLabel ? ` • Hospital: ${profileLabel}` : ""}`;
        }
        if (routeToRoleWorkspaceIfNeeded(user)) {
          return;
        }
      } else {
        const desiredRoute = getPostAuthRoute();
        if (desiredRoute === "member") {
          clearPostAuthRoute();
          if (routeToRoleWorkspaceIfNeeded(user, true)) {
            return;
          }
          window.location.href = "member.html";
          return;
        }
        setFeatureAccess(false);
        clearPostAuthRoute();
        return;
      }

      // If the user just completed a login/register action from the home page,
      // route them to the dedicated member workspace page.
      const desiredRoute = getPostAuthRoute();
      if (desiredRoute === "member" && !isMemberWorkspacePage()) {
        clearPostAuthRoute();
        if (routeToRoleWorkspaceIfNeeded(user, true)) {
          return;
        }
        window.location.href = "member.html";
        return;
      }
      if (desiredRoute === "member" && isMemberWorkspacePage()) {
        clearPostAuthRoute();
      }
    } else {
      if (authStatusText) {
        authStatusText.textContent = "Not signed in. Trial mode is active for core testing. Sign in from Member Login to unlock full features.";
      }
      if (memberStatusText) {
        memberStatusText.textContent = "Trial mode active. Member login required for exports, judge mode, and cloud sync.";
      }
      if (memberNameValue) memberNameValue.textContent = "Not Signed In";
      if (memberModeValue) memberModeValue.textContent = "Trial";
      if (googleLoginBtn) googleLoginBtn.disabled = false;
      if (googleRegisterBtn) googleRegisterBtn.disabled = false;
      if (switchAccountBtn) switchAccountBtn.disabled = true;
      if (logoutBtn) logoutBtn.disabled = true;
      if (reopenRoleSetupBtn) reopenRoleSetupBtn.disabled = true;
      if (memberWorkspaceBtn) memberWorkspaceBtn.classList.add("hidden");
      if (profileEntryPanel && !isMemberWorkspacePage()) {
        profileEntryPanel.classList.remove("hidden");
        if (profileEntryStatus) {
          profileEntryStatus.textContent = "Sign in with Google, then choose Patient, Hospital Staff, or Family Member to open the correct workspace.";
        }
      } else if (profileEntryPanel) {
        profileEntryPanel.classList.add("hidden");
      }
      currentMemberProfile = null;
      currentHospitalMembership = null;
      verifiedHospitalAccountIds = new Set();
      forceShowMemberOnboarding = false;
      applyHospitalBranding(null);
      applyRoleScopedSections("");
      updateSessionNotificationBar(null);
      initSecureChatForUser(null);
      updateCareTermsGate(null);
      setFeatureAccess(false);
      if (memberOnboarding) memberOnboarding.classList.add("hidden");
      if (hospitalAccountCenter) hospitalAccountCenter.classList.add("hidden");
    }

    syncCorpNavHeightVar();
  }

  async function initAuth() {
    if (!window.auth || !window.db) {
      console.info("Firebase not configured. Running in local demo mode.");
      updateAuthUI(null);
      initOrgProjectsForUser(null);
      refreshEvidence();
      return;
    }

    try {
      // If we previously fell back to redirect-based auth (popup blocked),
      // finalize that flow as soon as the app loads.
      await window.auth.getRedirectResult();
    } catch (error) {
      console.warn("Google redirect sign-in failed:", error);
      const code = error && error.code ? String(error.code) : "";
      const host = window.location && window.location.hostname ? window.location.hostname : "this domain";
      if (authStatusText) {
        if (code === "auth/unauthorized-domain") {
          authStatusText.textContent = `Google sign-in blocked (unauthorized domain). In Firebase Console → Authentication → Settings → Authorized domains, add: ${host}. If you're using a Vercel Preview URL, deploy to a stable Production/custom domain and authorize that instead.`;
        } else {
          authStatusText.textContent = "Google sign-in failed after redirect. Please try again.";
        }
      }
    }

    window.auth.onAuthStateChanged(async (user) => {
      if (user && user.uid) {
        activeUserId = user.uid;
      } else {
        activeUserId = "local-demo";
      }
      await hydrateHospitalAccessForUser(user);
      await hydrateMemberProfileForUser(user);
      updateAuthUI(user);
      initOrgProjectsForUser(user);
    });

    refreshEvidence();
  }

  async function signInWithGoogle() {
    if (!window.auth || !window.firebase) {
      if (authStatusText) {
        authStatusText.textContent = "Google sign-in unavailable (Firebase not initialized). Check firebase-config.js and that Firebase Auth is enabled.";
      }
      return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    if (authStatusText) {
      authStatusText.textContent = "Opening Google sign-in…";
    }

    try {
      // Redirect-based auth is the most reliable across iPhone/iPad Safari,
      // strict privacy settings, and deployments that set COOP headers.
      await window.auth.signInWithRedirect(provider);
    } catch (error) {
      console.warn("Google redirect sign-in failed:", error);

      const code = error && error.code ? String(error.code) : "";
      const host = window.location && window.location.hostname ? window.location.hostname : "";

      if (authStatusText) {
        if (code === "auth/unauthorized-domain") {
          authStatusText.textContent = `Google sign-in blocked (unauthorized domain). In Firebase Console → Authentication → Settings → Authorized domains, add: ${host || "your Vercel domain"}. Note: Vercel Preview URLs change; prefer a stable Production/custom domain.`;
        } else {
          authStatusText.textContent = "Google sign-in failed. Check Firebase provider setup and authorized domains.";
        }
      }
    }
  }

  async function signOutCurrentUser() {
    if (!window.auth) return;

    try {
      await window.auth.signOut();
      if (memberLastSyncValue) memberLastSyncValue.textContent = "Not Synced";
    } catch (error) {
      console.warn("Sign out failed:", error);
    }
  }

  // Web Speech API Setup (optional: some pages don't include voice UI)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const hasVoiceUi = Boolean(recordBtn && transcriptBox && aiResponse);
  if (hasVoiceUi && !SpeechRecognition) {
    transcriptBox.innerHTML = "<p>⚠️ 此瀏覽器不支援語音輸入。請使用 Chrome/Edge。</p>";
    if (statusPill) {
      statusPill.textContent = "瀏覽器不支援 / Browser unsupported";
    }
  }

  function initRecognition() {
    if (!SpeechRecognition || !hasVoiceUi) return;
    recognition = new SpeechRecognition();
    recognition.lang = currentLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      clearPendingVoiceEntry();
      recordBtn.classList.add("listening");
      recordBtn.textContent = getTranslation(activeUiLang, "voice.recordBtnListening");
      if (statusPill) {
        statusPill.textContent = getTranslation(activeUiLang, "voice.status.listening");
      }
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const bestTranscript = (finalTranscript || interimTranscript || "").trim();
      if (bestTranscript) {
        transcriptBox.textContent = `🗣️ ${bestTranscript}`;
        if (mockTranscript) {
          mockTranscript.textContent = bestTranscript;
        }
        updateSeeSoundPanel(bestTranscript);
      }

      if (finalTranscript && finalTranscript.trim()) {
        if (statusPill) {
          statusPill.textContent = "Transcript ready - mark it down";
        }
        analyzeInput(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      clearPendingVoiceEntry();
      aiResponse.textContent = getTranslation(activeUiLang, "voice.speechErrorMessage");
      aiResponse.dataset.category = "error";
      if (statusPill) {
        statusPill.textContent = getTranslation(activeUiLang, "voice.status.speechError");
      }
    };

    recognition.onend = () => {
      isListening = false;
      recordBtn.classList.remove("listening");
      recordBtn.textContent = getTranslation(activeUiLang, "voice.recordBtn");
      if (statusPill && !pendingVoiceEntry) {
        statusPill.textContent = getTranslation(activeUiLang, "voice.status.ready");
      }
    };
  }

  const initialUiLang = detectUiLangFromLocation();
  if (initialUiLang !== "en" && initialUiLang !== "zh") {
    initFullPageTranslationEngine();
  }
  if (globalLangSelect) {
    globalLangSelect.disabled = true;
    globalLangSelect.hidden = true;
    globalLangSelect.setAttribute("aria-hidden", "true");
    globalLangSelect.value = i18n[initialUiLang] ? initialUiLang : "en";
  }
  applyUiLanguage(initialUiLang);

  syncCorpNavHeightVar();
  window.addEventListener("resize", () => syncCorpNavHeightVar());

  let tabReturnTimer = null;
  const scheduleReassertTranslations = () => {
    if (tabReturnTimer) {
      clearTimeout(tabReturnTimer);
    }
    tabReturnTimer = setTimeout(() => {
      reassertTranslationsOnReturn();
    }, 180);
  };

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      scheduleReassertTranslations();
    }
  });
  window.addEventListener("focus", scheduleReassertTranslations);
  window.addEventListener("pageshow", scheduleReassertTranslations);

  initRecognition();
  if (seeSoundTarget && String(seeSoundTarget.value || "").trim()) {
    updateSeeSoundPanel("");
  }
  loadHospitalAccounts();
  applyRoleScopedSections("");
  if (loginPortal) loginPortal.classList.add("hidden");
  setupSmoothAnchorGlide();
  setupNavScrollSpy();
  setupNavChromeMotion();
  setupNavStickyFallback();
  setupParallax();
  setupBrandHomeButton();
  Promise.all([
    loadLocalLogs(),
    loadMemberNotes(),
    loadFamilyRelayProfile(),
    loadFamilyRelayRecipients()
  ]).finally(() => {
    refreshEvidence();
    refreshMemberTools();
    renderFhirMappingPreview();
    renderExportHistory();
    refreshConsentStatus();
    refreshDataPromiseStatus();
    renderRealWorldOpsPanel();
  });
  initAuth();

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      signInWithGoogle();
    });
  }

  if (googleRegisterBtn) {
    googleRegisterBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      signInWithGoogle();
    });
  }

  if (openPortalBtn) {
    openPortalBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      showLoginPortal();
    });
  }

  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      showLoginPortal();
    });
  }

  if (memberUnlockBtn) {
    memberUnlockBtn.addEventListener("click", showLoginPortal);
  }

  if (globalLangSelect) {
    globalLangSelect.addEventListener("change", () => {
      globalLangSelect.value = activeUiLang;
    });
  }

  if (backWelcomeBtn) {
    backWelcomeBtn.addEventListener("click", () => {
      if (loginPortal) {
        loginPortal.classList.add("hidden");
      }
    });
  }

  if (switchAccountBtn) {
    switchAccountBtn.addEventListener("click", signInWithGoogle);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", signOutCurrentUser);
  }

  if (reopenRoleSetupBtn) {
    reopenRoleSetupBtn.addEventListener("click", reopenRoleSetup);
  }

  if (homeChoosePatientBtn) {
    homeChoosePatientBtn.addEventListener("click", () => chooseHomeIdentityAndRedirect("patient"));
  }

  if (homeChooseHospitalStaffBtn) {
    homeChooseHospitalStaffBtn.addEventListener("click", () => chooseHomeIdentityAndRedirect("hospital_staff"));
  }

  if (homeChooseFamilyMemberBtn) {
    homeChooseFamilyMemberBtn.addEventListener("click", () => chooseHomeIdentityAndRedirect("family_member"));
  }

  if (careTermsScroll) {
    careTermsScroll.addEventListener("scroll", () => updateCareTermsGate(window.auth && window.auth.currentUser ? window.auth.currentUser : null));
  }

  if (careTermsAgreeCheck) {
    careTermsAgreeCheck.addEventListener("change", () => updateCareTermsGate(window.auth && window.auth.currentUser ? window.auth.currentUser : null));
  }

  if (careTermsAcceptBtn) {
    careTermsAcceptBtn.addEventListener("click", () => {
      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user || !user.uid) {
        if (careTermsStatus) careTermsStatus.textContent = "Sign in before accepting the CareVoice terms.";
        return;
      }
      if (!hasScrolledCareTermsToEnd() || !careTermsAgreeCheck || !careTermsAgreeCheck.checked) {
        updateCareTermsGate(user);
        return;
      }
      if (markCareTermsAccepted(user) && pendingHomeRoleChoice) {
        const role = pendingHomeRoleChoice;
        pendingHomeRoleChoice = "";
        chooseHomeIdentityAndRedirect(role);
      }
    });
  }

  if (chatFocusBtn && secureChatRoom) {
    chatFocusBtn.addEventListener("click", () => {
      secureChatRoom.scrollIntoView({ behavior: "smooth", block: "start" });
      if (secureChatInput) secureChatInput.focus();
    });
  }

  if (sendSecureChatBtn) {
    sendSecureChatBtn.addEventListener("click", async () => {
      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user || !user.uid) {
        if (secureChatStatus) secureChatStatus.textContent = "Sign in to send encrypted chat messages.";
        return;
      }
      const text = secureChatInput ? secureChatInput.value : "";
      const sent = await addSecureChatMessage(user, text, user.displayName || user.email || "CareVoice Member");
      if (sent && secureChatInput) secureChatInput.value = "";
      if (secureChatStatus) secureChatStatus.textContent = sent ? "Encrypted message saved locally and queued for cloud sync." : "Type a message before sending.";
    });
  }

  if (secureChatInput) {
    secureChatInput.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && sendSecureChatBtn) {
        event.preventDefault();
        sendSecureChatBtn.click();
      }
    });
  }

  if (memberHospitalSelect) {
    memberHospitalSelect.addEventListener("change", updateHospitalOtherVisibility);
  }

  if (saveMemberProfileBtn) {
    saveMemberProfileBtn.addEventListener("click", () => {
      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user) {
        if (memberOnboardingStatus) {
          memberOnboardingStatus.textContent = getStaticFallbackText("Please sign in before saving profile.");
        }
        return;
      }

      if (saveMemberProfileForUser(user)) {
        loadMemberProfileForUser(user);
        const unlocked = applyMemberOnboardingGate(user);
        refreshMemberTools();
        if (unlocked) {
          routeToRoleWorkspaceIfNeeded(user, true);
        }
      }
    });
  }

  if (chooseHospitalStaffBtn) {
    chooseHospitalStaffBtn.addEventListener("click", () => chooseRoleAndRedirect("hospital_staff"));
  }

  if (choosePatientBtn) {
    choosePatientBtn.addEventListener("click", () => chooseRoleAndRedirect("patient"));
  }

  if (chooseFamilyMemberBtn) {
    chooseFamilyMemberBtn.addEventListener("click", () => chooseRoleAndRedirect("family_member"));
  }

  if (createHospitalAccountBtn) {
    createHospitalAccountBtn.addEventListener("click", async () => {
      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user || !user.uid) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Sign in first to create a hospital account.");
        return;
      }

      if (!currentMemberProfile || String(currentMemberProfile.role || "") !== "hospital_staff") {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Only hospital staff roles can create hospital accounts.");
        return;
      }

      const requestedName = String(hospitalAccountNameInput ? hospitalAccountNameInput.value : "").trim();
      const fallbackName = getHospitalLabelFromProfile(currentMemberProfile) || "Hospital Team";
      const accountName = requestedName || fallbackName;
      if (!accountName) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Enter a hospital account name first.");
        return;
      }

      const officialDomain = normalizeOfficialDomain(hospitalOfficialDomainInput ? hospitalOfficialDomainInput.value : "");
      const proofUrl = String(hospitalProofUrlInput ? hospitalProofUrlInput.value : "").trim();
      const userEmail = getUserEmail(user);
      const userDomain = getEmailDomain(userEmail);

      if (!officialDomain || !officialDomain.includes(".")) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Enter the hospital official email domain first.");
        return;
      }

      if (!userDomain || userDomain !== officialDomain) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Use a Google account from the hospital official email domain to register this hospital.");
        return;
      }

      if (!/^https?:\/\//i.test(proofUrl)) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Add a public proof link from the hospital website or authorization document.");
        return;
      }

      loadHospitalAccounts();
      let code = generateHospitalJoinCode();
      let attempts = 0;
      while (getHospitalAccountByCode(code) && attempts < 20) {
        code = generateHospitalJoinCode();
        attempts += 1;
      }

      const account = {
        id: `hosp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: accountName,
        code,
        ownerUid: user.uid,
        ownerEmail: getUserEmail(user),
        admins: [user.uid],
        adminEmails: [userEmail],
        members: [user.uid],
        memberEmails: [userEmail],
        officialDomain,
        proofUrl,
        verificationStatus: "pending",
        proofSubmittedAt: Date.now(),
        createdAt: Date.now()
      };

      hospitalAccounts.push(account);
      persistHospitalAccounts();
      try {
        await saveHospitalAccountToFirestore(account);
      } catch (err) {
        console.warn("Could not save hospital account to Firestore:", err);
      }
      saveHospitalMembershipForUser(user, { accountId: account.id, role: "staff", joinedAt: Date.now() });
      if (hospitalAccountNameInput) hospitalAccountNameInput.value = "";
      if (hospitalOfficialDomainInput) hospitalOfficialDomainInput.value = "";
      if (hospitalProofUrlInput) hospitalProofUrlInput.value = "";
      if (hospitalAccountStatus) {
        hospitalAccountStatus.textContent = getStaticFallbackText("Hospital registration submitted for verification. Branding unlocks after approval.");
      }
      refreshHospitalAccountUi(user);
      const unlocked = applyMemberOnboardingGate(user);
      if (unlocked) {
        routeToRoleWorkspaceIfNeeded(user, true);
      }
    });
  }

  if (joinHospitalAccountBtn) {
    joinHospitalAccountBtn.addEventListener("click", async () => {
      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user || !user.uid) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Sign in first to join a hospital account.");
        return;
      }

      if (!currentMemberProfile || String(currentMemberProfile.role || "") !== "hospital_staff") {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Only hospital staff roles can join hospital accounts.");
        return;
      }

      const code = String(joinHospitalAccountCodeInput ? joinHospitalAccountCodeInput.value : "").trim().toUpperCase();
      if (!code) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Enter a join code first.");
        return;
      }

      loadHospitalAccounts();
      const account = getHospitalAccountByCode(code);
      if (!account) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Join code not found. Check the code and try again.");
        return;
      }

      normalizeAccountMembers(account);
      const email = getUserEmail(user);
      if (!account.members.includes(user.uid)) account.members.push(user.uid);
      if (email && !account.memberEmails.includes(email)) account.memberEmails.push(email);
      persistHospitalAccounts();
      try {
        await saveHospitalAccountToFirestore(account);
      } catch (err) {
        console.warn("Could not update hospital account in Firestore:", err);
      }
      saveHospitalMembershipForUser(user, { accountId: account.id, role: "staff", joinedAt: Date.now() });
      if (joinHospitalAccountCodeInput) joinHospitalAccountCodeInput.value = "";
      refreshHospitalAccountUi(user);
      const unlocked = applyMemberOnboardingGate(user);
      if (unlocked) {
        routeToRoleWorkspaceIfNeeded(user, true);
      }
    });
  }

  if (hospitalInviteBtn) {
    hospitalInviteBtn.addEventListener("click", async () => {
      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user || !user.uid || !currentHospitalMembership || !currentHospitalMembership.accountId) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Join a hospital account first.");
        return;
      }

      const account = getHospitalAccountById(currentHospitalMembership.accountId);
      if (!account || !canManageHospitalAccount(user, account)) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Only account owner/admin can add staff emails.");
        return;
      }

      const email = String(hospitalInviteEmailInput ? hospitalInviteEmailInput.value : "").trim().toLowerCase();
      if (!email || !email.includes("@")) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Enter a valid staff email.");
        return;
      }

      normalizeAccountMembers(account);
      if (!account.memberEmails.includes(email)) {
        account.memberEmails.push(email);
      }
      persistHospitalAccounts();
      try {
        await saveHospitalAccountToFirestore(account);
      } catch (err) {
        console.warn("Could not persist invited member to Firestore:", err);
      }
      if (hospitalInviteEmailInput) hospitalInviteEmailInput.value = "";
      refreshHospitalAccountUi(user);
    });
  }

  if (hospitalAccountMembersList) {
    hospitalAccountMembersList.addEventListener("click", async (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const email = target.dataset ? target.dataset.removeHospitalMemberEmail : "";
      if (!email) return;

      const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
      if (!user || !user.uid || !currentHospitalMembership || !currentHospitalMembership.accountId) return;

      const account = getHospitalAccountById(currentHospitalMembership.accountId);
      if (!account || !canManageHospitalAccount(user, account)) return;

      normalizeAccountMembers(account);
      const ownerEmail = String(account.ownerEmail || "").trim().toLowerCase();
      if (ownerEmail && ownerEmail === String(email).toLowerCase()) {
        if (hospitalAccountStatus) hospitalAccountStatus.textContent = getStaticFallbackText("Owner email cannot be removed.");
        return;
      }

      account.memberEmails = account.memberEmails.filter((entry) => String(entry || "").toLowerCase() !== String(email).toLowerCase());
      persistHospitalAccounts();
      try {
        await saveHospitalAccountToFirestore(account);
      } catch (err) {
        console.warn("Could not persist member removal to Firestore:", err);
      }
      refreshHospitalAccountUi(user);
    });
  }

  if (addQuickNoteBtn) {
    addQuickNoteBtn.addEventListener("click", () => {
      const note = window.prompt("Add follow-up note for the care team:");
      if (!note || !note.trim()) return;
      persistMemberNote(note.trim(), "Follow-up");
      refreshMemberTools();
    });
  }

  if (generateFamilyRelayBtn) {
    generateFamilyRelayBtn.addEventListener("click", () => {
      const latestLog = getLatestRelevantLog();
      const sourceText = latestLog && latestLog.text ? latestLog.text : "";
      const category = latestLog && latestLog.category ? latestLog.category : "general";
      const nextStep = latestLog && latestLog.severity ? latestLog.severity : "Continue monitoring.";
      const summary = buildFamilyRelaySummary(sourceText, category, nextStep, latestLog && latestLog.confidence ? latestLog.confidence : 0);
      updateFamilyRelayDraft(summary, true);
    });
  }

  if (copyFamilyRelayBtn) {
    copyFamilyRelayBtn.addEventListener("click", copyFamilyRelayDraft);
  }

  if (familyRelayEmailInput) {
    familyRelayEmailInput.addEventListener("input", () => persistFamilyRelayRecipients(familyRelayEmailInput.value));
  }

  [
    familyRelayPatientNameInput,
    familyRelayPatientAgeInput,
    familyRelayRelativeNameInput,
    familyRelayRelationshipInput,
    familyRelayPreferredLanguageInput,
    familyRelayPhoneInput,
    familyRelayHospitalPhoneInput
  ].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      persistFamilyRelayProfile();
      if (familyRelayDraft && familyRelayDraft !== "No family update generated yet.") {
        updateFamilyRelayDraft(buildFamilyRelaySummary("", "general", "Continue monitoring.", 0), false);
      }
    });
  });

  if (callFamilyRelayPhoneBtn) {
    callFamilyRelayPhoneBtn.addEventListener("click", openPhoneDialerForFamilyRelay);
  }

  if (callFamilyRelayHospitalBtn) {
    callFamilyRelayHospitalBtn.addEventListener("click", openHospitalDialerForFamilyRelay);
  }

  if (sendFamilyRelayWhatsAppBtn) {
    sendFamilyRelayWhatsAppBtn.addEventListener("click", openWhatsAppForFamilyRelay);
  }

  if (sendFamilyRelaySmsBtn) {
    sendFamilyRelaySmsBtn.addEventListener("click", openSmsForFamilyRelay);
  }

  if (sendFamilyRelayGmailBtn) {
    sendFamilyRelayGmailBtn.addEventListener("click", openGmailComposeForFamilyRelay);
  }

  if (liveMonitorConnectBtn) {
    liveMonitorConnectBtn.addEventListener("click", connectLiveMonitorSocket);
  }

  if (liveMonitorDisconnectBtn) {
    liveMonitorDisconnectBtn.addEventListener("click", () => disconnectLiveMonitorSocket("Disconnected from the live stream. Simulation mode restored."));
  }

  if (liveMonitorCopySampleBtn) {
    liveMonitorCopySampleBtn.addEventListener("click", copyLiveMonitorSamplePayload);
  }

  if (liveMonitorTestBtn) {
    liveMonitorTestBtn.addEventListener("click", runLiveMonitorTestPayload);
  }

  if (liveMonitorPasteRunBtn) {
    liveMonitorPasteRunBtn.addEventListener("click", runPastedLiveMonitorPayload);
  }

  if (liveMonitorPasteClearBtn) {
    liveMonitorPasteClearBtn.addEventListener("click", clearPastedLiveMonitorPayload);
  }

  if (liveMonitorCallBtn) {
    liveMonitorCallBtn.addEventListener("click", triggerMonitorEscalation);
  }

  if (applyRoomDefaultsBtn) {
    applyRoomDefaultsBtn.addEventListener("click", () => {
      if (!orgRoomButtonsInput) return;
      orgRoomButtonsInput.value = getOrgDefaultRoomButtons(activeUiLang).join(", ");
    });
  }

  if (orgProjectSelect) {
    orgProjectSelect.addEventListener("change", () => {
      const nextId = orgProjectSelect.value;
      setActiveOrgProject(nextId);
      renderOrgProjectsUI();
    });
  }

  if (createOrgProjectBtn) {
    createOrgProjectBtn.addEventListener("click", async () => {
      const name = orgProjectNameInput ? String(orgProjectNameInput.value || "").trim() : "";
      if (!name) return;
      if (!currentOrgUser) {
        window.alert("Please sign in to create organization projects.");
        return;
      }

      const id = `p_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const project = {
        id,
        name,
        ownerUid: currentOrgUser.uid,
        memberEmails: [],
        rooms: []
      };

      orgProjects.unshift(project);
      setActiveOrgProject(id);
      if (orgProjectNameInput) orgProjectNameInput.value = "";
      await persistActiveOrgProject();
      renderOrgProjectsUI();
    });
  }

  if (deleteOrgProjectBtn) {
    deleteOrgProjectBtn.addEventListener("click", async () => {
      const active = getActiveOrgProject();
      if (!active) return;
      if (!currentOrgUser || active.ownerUid !== currentOrgUser.uid) {
        window.alert("Only the project owner can delete this project.");
        return;
      }
      const ok = window.confirm(`Delete project "${active.name}"?`);
      if (!ok) return;

      const idToDelete = active.id;
      const idx = orgProjects.findIndex((p) => p.id === idToDelete);
      if (idx >= 0) orgProjects.splice(idx, 1);
      if (orgActiveProjectId === idToDelete) {
        setActiveOrgProject(orgProjects.length ? orgProjects[0].id : "");
      }

      try {
        await deleteOrgProjectFromFirestore(idToDelete);
      } catch (err) {
        console.warn("Project delete failed:", err);
      }

      persistOrgProjectsToLocalStorage();
      renderOrgProjectsUI();
    });
  }

  if (addOrgMemberBtn) {
    addOrgMemberBtn.addEventListener("click", async () => {
      const active = getActiveOrgProject();
      if (!active) return;
      if (!currentOrgUser || active.ownerUid !== currentOrgUser.uid) {
        window.alert("Only the project owner can add members.");
        return;
      }
      const email = normalizeEmail(orgMemberEmailInput ? orgMemberEmailInput.value : "");
      if (!email || !email.includes("@")) return;
      active.memberEmails = Array.from(new Set([...(active.memberEmails || []), email]));
      if (orgMemberEmailInput) orgMemberEmailInput.value = "";
      await persistActiveOrgProject();
      renderOrgProjectsUI();
    });
  }

  if (addOrgRoomBtn) {
    addOrgRoomBtn.addEventListener("click", async () => {
      const active = getActiveOrgProject();
      if (!active) return;
      if (!currentOrgUser || active.ownerUid !== currentOrgUser.uid) {
        window.alert("Only the project owner can add rooms.");
        return;
      }

      const name = String(orgRoomNameInput ? orgRoomNameInput.value : "").trim();
      if (!name) return;
      const who = String(orgRoomWhoInput ? orgRoomWhoInput.value : "").trim();
      const watchouts = String(orgRoomWatchoutsInput ? orgRoomWatchoutsInput.value : "").trim();
      const buttonsRaw = String(orgRoomButtonsInput ? orgRoomButtonsInput.value : "");
      const buttons = buttonsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 10);
      const tags = normalizeRoomTags(orgRoomTagsInput ? orgRoomTagsInput.value : "");

      const room = {
        id: `r_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        name,
        who,
        watchouts,
        buttons,
        tags
      };
      active.rooms = Array.isArray(active.rooms) ? active.rooms : [];
      active.rooms.unshift(room);

      if (orgRoomNameInput) orgRoomNameInput.value = "";
      if (orgRoomWhoInput) orgRoomWhoInput.value = "";
      if (orgRoomWatchoutsInput) orgRoomWatchoutsInput.value = "";
      if (orgRoomButtonsInput) orgRoomButtonsInput.value = "";
      if (orgRoomTagsInput) orgRoomTagsInput.value = "";

      await persistActiveOrgProject();
      renderOrgProjectsUI();
    });
  }

  if (saveCarePlanBtn) {
    saveCarePlanBtn.addEventListener("click", () => {
      const summary = `Care plan snapshot saved with ${localLogs.length} total records.`;
      persistMemberNote(summary, "Care Plan");
      refreshMemberTools();
      if (sessionBriefText) {
        sessionBriefText.textContent = buildSessionBrief();
      }
    });
  }

  if (generateBriefBtn) {
    generateBriefBtn.addEventListener("click", () => {
      if (sessionBriefText) {
        sessionBriefText.textContent = buildSessionBrief();
      }
    });
  }

  if (downloadNotesBtn) {
    downloadNotesBtn.addEventListener("click", () => {
      exportMemberNotesCsv();
    });
  }

  if (exportDoctorReportBtn) {
    exportDoctorReportBtn.addEventListener("click", exportDoctorReport);
  }

  if (exportFhirBtn) {
    exportFhirBtn.addEventListener("click", exportFhirBundle);
  }

  if (exportEhrssBtn) {
    exportEhrssBtn.addEventListener("click", exportEhrssReadyPack);
  }

  [consentPatientExportCheck, consentNoAudioCheck, consentRedactionCheck].forEach((checkbox) => {
    if (checkbox) checkbox.addEventListener("change", refreshConsentStatus);
  });

  dataPromiseAcceptBtns.forEach((button) => {
    button.addEventListener("click", () => saveDataPromiseChoice("care-workflow"));
  });

  dataPromiseEssentialBtns.forEach((button) => {
    button.addEventListener("click", () => saveDataPromiseChoice("essential-only"));
  });

  clearDeviceMemoryBtns.forEach((button) => {
    button.addEventListener("click", clearCareVoiceDeviceMemory);
  });

  if (realWorldOps) {
    realWorldOps.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        updateRealWorldField(target);
      }
    });

    realWorldOps.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const actionButton = target.closest("[data-rw-action], [data-rw-inbox-action]");
      if (!(actionButton instanceof HTMLElement)) return;

      const inboxAction = actionButton.dataset.rwInboxAction;
      if (inboxAction) {
        updateHospitalInboxStatus(actionButton.dataset.caseId || "case", inboxAction);
        return;
      }

      const action = actionButton.dataset.rwAction;
      if (action === "loadDemo") loadRealWorldDemoCase();
      if (action === "whatsapp") openRealWorldWhatsApp();
      if (action === "sms") openRealWorldSms();
      if (action === "callHospital") callRealWorldHospital();
      if (action === "copySbar") void copyRealWorldBrief();
      if (action === "sendFhir") simulateFhirHospitalSend();
    });
  }

  if (seedAdvancedDemoBtn) {
    seedAdvancedDemoBtn.addEventListener("click", () => {
      const demoTexts = [
        "我今日有啲頭暈，唔記得食血壓藥。",
        "My mother says her chest feels tight and she is short of breath.",
        "我唔係好記得今日有冇食糖尿藥。",
        "He nearly fell when walking to the bathroom."
      ];
      demoTexts.forEach((text) => {
        analyzeInput(text);
        commitPendingVoiceEntry();
      });
      if (judgeModeStatus) judgeModeStatus.textContent = "HKICT demo data loaded with medication, red-flag, cognitive, and fall-risk examples.";
    });
  }

  if (elderModeBtn) {
    elderModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("elder-mode");
      elderModeBtn.textContent = document.body.classList.contains("elder-mode") ? "Exit Elder Mode" : "Elder Mode";
    });
  }

  if (highContrastBtn) {
    highContrastBtn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast-mode");
      highContrastBtn.textContent = document.body.classList.contains("high-contrast-mode") ? "Normal Contrast" : "High Contrast";
    });
  }

  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener("click", () => {
      elderTextScale = Math.min(1.35, Math.round((elderTextScale + 0.1) * 100) / 100);
      localStorage.setItem("carevoice.elderTextScale.v1", String(elderTextScale));
      applyElderTextScale();
    });
  }

  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener("click", () => {
      elderTextScale = Math.max(0.95, Math.round((elderTextScale - 0.1) * 100) / 100);
      localStorage.setItem("carevoice.elderTextScale.v1", String(elderTextScale));
      applyElderTextScale();
    });
  }

  if (hapticTestBtn) {
    hapticTestBtn.addEventListener("click", () => {
      runHapticCue("amber");
      if (guidedPromptText) guidedPromptText.textContent = "Haptic cue sent if this device supports vibration.";
    });
  }

  if (repeatPromptBtn) {
    repeatPromptBtn.addEventListener("click", () => {
      const prompt = guidedPromptText ? guidedPromptText.textContent : "Tell me how you feel today.";
      if (window.speechSynthesis && prompt) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(prompt));
      }
    });
  }

  if (guidedDemoBtn) {
    guidedDemoBtn.addEventListener("click", () => {
      const demoText = "我今日有啲頭暈，唔記得食血壓藥。";
      if (transcriptBox) transcriptBox.innerHTML = `<p>🗣️ ${demoText}</p>`;
      analyzeInput(demoText);
    });
  }

  if (copyBriefBtn) {
    copyBriefBtn.addEventListener("click", () => {
      if (sessionBriefText && sessionBriefText.textContent === "No brief generated yet.") {
        sessionBriefText.textContent = buildSessionBrief();
      }
      copySessionBriefToClipboard();
    });
  }

  if (clearNotesBtn) {
    clearNotesBtn.addEventListener("click", () => {
      clearMemberNotes();
    });
  }

  if (seeSoundCompareBtn) {
    seeSoundCompareBtn.addEventListener("click", () => {
      const rawText = seeSoundTranscript ? seeSoundTranscript.textContent : "";
      const transcript = seeSoundTranscript && seeSoundTranscript.dataset.empty === "1" ? "" : rawText;
      updateSeeSoundPanel(transcript);
    });
  }

  if (seeSoundTarget) {
    seeSoundTarget.addEventListener("input", () => {
      updateSeeSoundPanel("");
    });
  }

  if (startJourneyTutorialBtn) {
    startJourneyTutorialBtn.addEventListener("click", startJourneyTutorial);
  }

  tutorialStepChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const stepIndex = journeyTutorialSteps.findIndex((step) => step.id === chip.dataset.tourStep);
      if (stepIndex >= 0) {
        stopJourneyTutorial();
        goToJourneyTutorialStep(stepIndex);
      }
    });
  });

  function renderDemoScenario(index) {
    const scenario = demoScenarios[index % demoScenarios.length];
    if (!scenario) return;

    if (demoScenarioLabel) demoScenarioLabel.textContent = scenario.label;
    if (demoScenarioText) demoScenarioText.textContent = scenario.note;
    if (mockTranscript) mockTranscript.textContent = scenario.transcript;
    if (mockInsight) mockInsight.textContent = scenario.insight;
  }

  function pulseSignal() {
    if (!mockSignal) return;
    mockSignal.textContent = getTranslation(activeUiLang, "demo.signal.live");
    mockSignal.style.color = "#7df6d9";
    setTimeout(() => {
      mockSignal.textContent = getTranslation(activeUiLang, "demo.signal.sync");
      mockSignal.style.color = "#98c8ff";
    }, 1300);
  }

  setInterval(() => {
    scenarioIndex = (scenarioIndex + 1) % demoScenarios.length;
    renderDemoScenario(scenarioIndex);
    pulseSignal();
  }, 5200);

  setInterval(() => {
    liveMonitorTick += 1;
    refreshLiveMonitorPanel();
  }, 4200);

  // Reveal animation on scroll for storytelling sections
  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // KPI counter animation for investor-facing metrics
  function animateCounter(el) {
    const target = Number(el.dataset.target || "0");
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));
  } else {
    counterEls.forEach((el) => {
      el.textContent = el.dataset.target || "0";
    });
  }

  // Language Toggle
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      currentLang = btn.dataset.lang;
      if (recognition) {
        recognition.lang = currentLang;
      }
      syncQuickLanguageButtons();

      const mappedUiLang = quickSpeechToUiLang[currentLang];
      if (mappedUiLang) {
        if (globalLangSelect) {
          globalLangSelect.value = mappedUiLang;
        }
        applyUiLanguage(mappedUiLang);
      }
    });
  });

  // Record Button
  if (recordBtn) {
    let lastPointerActionAt = 0;
    const startListening = () => {
      if (!recognition) return;
      if (isListening) return;
      try {
        recognition.start();
      } catch (e) {
        console.warn(e);
      }
    };

    const stopListening = () => {
      if (!recognition) return;
      if (!isListening) return;
      try {
        recognition.stop();
      } catch (e) {
        console.warn(e);
      }
    };

    // Prefer press-and-hold on mobile; keep click-to-toggle as fallback.
    if ("PointerEvent" in window) {
      recordBtn.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        lastPointerActionAt = Date.now();
        recordBtn.setPointerCapture(event.pointerId);
        startListening();
      });
      recordBtn.addEventListener("pointerup", (event) => {
        event.preventDefault();
        lastPointerActionAt = Date.now();
        stopListening();
      });
      recordBtn.addEventListener("pointercancel", () => {
        lastPointerActionAt = Date.now();
        stopListening();
      });
      recordBtn.addEventListener("lostpointercapture", () => {
        lastPointerActionAt = Date.now();
        stopListening();
      });
    }

    recordBtn.addEventListener("click", () => {
      if (Date.now() - lastPointerActionAt < 550) return;
      if (!recognition) return;
      if (!isListening) {
        startListening();
      } else {
        stopListening();
      }
    });
  }

  if (markItDownBtn) {
    markItDownBtn.addEventListener("click", commitPendingVoiceEntry);
    setMarkItDownState(false);
  }

  // Simple AI Analysis (Client-Side MVP)
  function analyzeInput(text) {
    const startedAt = performance.now();
    const safeText = String(text || "").trim();
    const lower = safeText.toLowerCase();

    const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const isAsciiTerm = (term) => /^[\x00-\x7F]+$/.test(term);
    const findTermOccurrences = (haystack, needle) => {
      if (!needle) return [];
      const term = String(needle);
      const occurrences = [];

      // For single English words, use word boundaries to reduce false positives.
      if (isAsciiTerm(term) && !term.includes(" ")) {
        const re = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
        let match;
        while ((match = re.exec(haystack)) !== null) {
          occurrences.push(match.index);
        }
        return occurrences;
      }

      let idx = 0;
      while (idx >= 0) {
        idx = haystack.indexOf(term, idx);
        if (idx >= 0) {
          occurrences.push(idx);
          idx = idx + Math.max(1, term.length);
        }
      }
      return occurrences;
    };

    const negationTokensEn = ["no", "not", "without", "never"];
    const negationTokensZh = ["冇", "無", "唔", "唔係", "未", "唔係"];
    const isNegatedAt = (index, term, haystackLower) => {
      if (index < 0) return false;
      const windowStart = Math.max(0, index - 24);
      const prefixWindow = haystackLower.slice(windowStart, index);

      if (isAsciiTerm(term)) {
        return negationTokensEn.some((neg) => prefixWindow.includes(`${neg} `) || prefixWindow.endsWith(neg));
      }

      const closePrefix = haystackLower.slice(Math.max(0, index - 2), index);
      if (negationTokensZh.some((neg) => closePrefix.includes(neg))) return true;
      return negationTokensZh.some((neg) => prefixWindow.includes(neg));
    };

    const weightedLexicon = {
      medication: [
        { term: "藥", weight: 1.0 },
        { term: "食藥", weight: 1.5 },
        { term: "藥丸", weight: 1.5 },
        { term: "藥水", weight: 1.4 },
        { term: "服用", weight: 1.4 },
        { term: "劑量", weight: 1.5 },
        { term: "藥量", weight: 1.5 },
        { term: "漏食", weight: 1.6 },
        { term: "忘記食", weight: 1.7 },
        { term: "胰島素", weight: 1.8 },
        { term: "打針", weight: 1.4 },
        { term: "血糖", weight: 1.6 },
        { term: "pill", weight: 1.5 },
        { term: "dose", weight: 1.4 },
        { term: "medication", weight: 1.5 },
        { term: "prescription", weight: 1.5 },
        { term: "refill", weight: 1.4 },
        { term: "insulin", weight: 1.8 },
        { term: "side effect", weight: 1.4 },
        { term: "blood pressure", weight: 1.6 },
        { term: "diabetes", weight: 1.6 },
        { term: "血壓", weight: 1.6 },
        { term: "高血壓", weight: 1.6 },
        { term: "糖尿", weight: 1.6 }
      ],
      symptom: [
        { term: "痛", weight: 0.9 },
        { term: "好痛", weight: 1.4 },
        { term: "心口痛", weight: 2.2 },
        { term: "胸口痛", weight: 2.2 },
        { term: "頭暈", weight: 1.6 },
        { term: "暈", weight: 1.1 },
        { term: "咳", weight: 1.1 },
        { term: "咳嗽", weight: 1.2 },
        { term: "發燒", weight: 1.6 },
        { term: "發熱", weight: 1.4 },
        { term: "熱", weight: 1.0 },
        { term: "喉嚨痛", weight: 1.3 },
        { term: "嘔", weight: 1.2 },
        { term: "嘔吐", weight: 1.4 },
        { term: "肚痛", weight: 1.3 },
        { term: "腹瀉", weight: 1.4 },
        { term: "呼吸困難", weight: 2.4 },
        { term: "呼吸", weight: 1.2 },
        { term: "氣喘", weight: 1.9 },
        { term: "喘", weight: 1.3 },
        { term: "麻痺", weight: 2.0 },
        { term: "跌倒", weight: 1.9 },
        { term: "dizzy", weight: 1.4 },
        { term: "pain", weight: 1.4 },
        { term: "cough", weight: 1.2 },
        { term: "fever", weight: 1.3 },
        { term: "chest pain", weight: 2.3 },
        { term: "chest", weight: 1.3 },
        { term: "shortness of breath", weight: 2.4 },
        { term: "breathing", weight: 1.4 },
        { term: "breath", weight: 1.4 },
        { term: "nausea", weight: 1.3 },
        { term: "vomit", weight: 1.4 },
        { term: "diarrhea", weight: 1.4 },
        { term: "numb", weight: 2.0 },
        { term: "weak", weight: 1.4 },
        { term: "fall", weight: 1.7 }
      ],
      emergency: [
        { term: "救命", weight: 3.6 },
        { term: "幫下我", weight: 3.2 },
        { term: "叫救護車", weight: 3.6 },
        { term: "叫白車", weight: 3.5 },
        { term: "急救", weight: 3.2 },
        { term: "緊急", weight: 3.1 },
        { term: "emergency", weight: 3.2 },
        { term: "sos", weight: 3.0 },
        { term: "暈倒", weight: 3.1 },
        { term: "昏迷", weight: 3.4 },
        { term: "抽搐", weight: 3.5 },
        { term: "癲癇", weight: 3.5 },
        { term: "中風", weight: 3.6 },
        { term: "流血", weight: 3.2 },
        { term: "大出血", weight: 3.8 },
        { term: "faint", weight: 3.0 },
        { term: "bleeding", weight: 3.1 },
        { term: "unconscious", weight: 3.4 },
        { term: "seizure", weight: 3.5 },
        { term: "stroke", weight: 3.6 },
        { term: "heart attack", weight: 3.8 },
        { term: "help now", weight: 3.3 },
        { term: "call ambulance", weight: 3.6 },
        { term: "cannot breathe", weight: 3.5 },
        { term: "not breathing", weight: 3.9 }
      ]
    };

    const scores = {
      medication: 0,
      symptom: 0,
      emergency: 0
    };

    let hasEmergencyTrigger = false;

    Object.entries(weightedLexicon).forEach(([categoryKey, terms]) => {
      terms.forEach((entry) => {
        const occurrences = findTermOccurrences(lower, entry.term);
        if (!occurrences.length) return;
        occurrences.forEach((idx) => {
          const adjustedWeight = isNegatedAt(idx, entry.term, lower) ? entry.weight * 0.35 : entry.weight;
          scores[categoryKey] += adjustedWeight;
          if (categoryKey === "emergency" && adjustedWeight >= 2.8) {
            hasEmergencyTrigger = true;
          }
        });
      });
    });

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topCategory, topScore] = sortedScores[0];
    const totalScore = sortedScores.reduce((sum, [, value]) => sum + value, 0);

    let category = topScore >= 1.0 ? topCategory : "general";
    if (hasEmergencyTrigger) category = "emergency";

    let confidence = totalScore > 0 ? Math.min(98, Math.round((topScore / totalScore) * 100)) : 0;
    if (topScore < 1.0) {
      confidence = Math.min(confidence, 55);
    }

    let severity = getTranslation(activeUiLang, "ai.severity.low");
    let nextStep = getTranslation(activeUiLang, "ai.next.default");

    if (category === "emergency" || topScore >= 3.2) {
      severity = getTranslation(activeUiLang, "ai.severity.critical");
      nextStep = getTranslation(activeUiLang, "ai.next.critical");
    } else if (category === "symptom" && topScore >= 2.2) {
      severity = getTranslation(activeUiLang, "ai.severity.medium");
      nextStep = getTranslation(activeUiLang, "ai.next.symptom");
    } else if (category === "medication" && topScore >= 2.2) {
      severity = getTranslation(activeUiLang, "ai.severity.medium");
      nextStep = getTranslation(activeUiLang, "ai.next.medication");
    }

    let response = getTranslation(activeUiLang, "ai.response.logged");
    let familyRelayHit = false;
    const voiceCommand = detectVoiceCommand(safeText);

    if (category === "emergency") {
      response = getTranslation(activeUiLang, "ai.response.emergency");
      triggerSOS(text);
    } else if (category === "medication") {
      response = getTranslation(activeUiLang, "ai.response.medication");
    } else if (category === "symptom") {
      response = getTranslation(activeUiLang, "ai.response.symptom");
    }

    const familyIntentTerms = ["contact my relatives", "contact relatives", "call my family", "tell my family", "tell my relatives", "call my daughter", "call my son", "call my wife", "call my husband", "family", "relatives", "go zhai"];
    const hasFamilyIntent = familyIntentTerms.some((term) => lower.includes(term));
    if (hasFamilyIntent || (voiceCommand && voiceCommand.type === "familyRelay")) {
      familyRelayHit = true;
      response = voiceCommand && voiceCommand.response ? voiceCommand.response : "📣 Family update ready - the patient asked to contact relatives.";
      familyRelayDraft = buildFamilyRelaySummary(text, category, nextStep, confidence);
      if (familyRelayText) familyRelayText.textContent = familyRelayDraft;
      persistMemberNote(familyRelayDraft, "Family Relay");
      refreshMemberTools();

      const requestedChannel = voiceCommand && voiceCommand.channel ? voiceCommand.channel : null;
      if (requestedChannel === "whatsapp") {
        openWhatsAppForFamilyRelay();
      } else if (requestedChannel === "sms") {
        openSmsForFamilyRelay();
      } else if (requestedChannel === "hospital") {
        openHospitalDialerForFamilyRelay();
      } else if (requestedChannel === "gmail") {
        openGmailComposeForFamilyRelay();
      } else if (requestedChannel === "phone") {
        openPhoneDialerForFamilyRelay();
      }
    }

    const redactedText = redactPII(safeText);
    const advancedCare = buildAdvancedCareSignals(redactedText, category, scores, confidence, nextStep);
    const explainableResponse = `${response} ${advancedCare.urgency.toUpperCase()} priority. ${advancedCare.reasons.slice(0, 2).join(" ")} Next question: ${advancedCare.clarificationPrompt}`;

    if (guidedPromptText) {
      guidedPromptText.textContent = advancedCare.clarificationPrompt;
    }

    if (aiResponse) {
      aiResponse.textContent = explainableResponse;
      aiResponse.dataset.category = familyRelayHit ? "family" : category;
      aiResponse.dataset.urgency = advancedCare.urgency;
    }
    if (mockInsight) {
      mockInsight.textContent = explainableResponse;
    }

    if (aiSignalCategory) {
      aiSignalCategory.textContent = familyRelayHit ? "Family relay" : getTranslation(activeUiLang, `ai.category.${category}`);
    }
    if (aiSignalConfidence) aiSignalConfidence.textContent = familyRelayHit ? "90%" : `${confidence}%`;
    if (aiSignalSeverity) aiSignalSeverity.textContent = familyRelayHit ? "Medium" : `${severity} / ${advancedCare.urgency.toUpperCase()}`;
    if (aiSignalNextStep) {
      const requestedChannel = voiceCommand && voiceCommand.channel ? voiceCommand.channel : "";
      if (familyRelayHit && requestedChannel === "whatsapp") {
        aiSignalNextStep.textContent = "Review and send the WhatsApp draft.";
      } else if (familyRelayHit && requestedChannel === "sms") {
        aiSignalNextStep.textContent = "Review and send the SMS draft.";
      } else if (familyRelayHit && requestedChannel === "hospital") {
        aiSignalNextStep.textContent = "Place the hospital call and share the latest update.";
      } else if (familyRelayHit && requestedChannel === "gmail") {
        aiSignalNextStep.textContent = "Review and send the Gmail draft.";
      } else if (familyRelayHit && requestedChannel === "phone") {
        aiSignalNextStep.textContent = "Call the family contact and read the generated summary.";
      } else {
        aiSignalNextStep.textContent = familyRelayHit ? "Prepare a family update and copy the message." : `${nextStep} ${advancedCare.clarificationPrompt}`;
      }
    }

    runHapticCue(advancedCare.urgency);

    const latencyMs = Math.max(1, Math.round(performance.now() - startedAt));
    responseLatencies.push(latencyMs);
    if (responseLatencies.length > 100) {
      responseLatencies.shift();
    }

    const logEntry = {
      text: redactedText,
      piiRedacted: redactedText !== safeText,
      category,
      lang: currentLang,
      latencyMs,
      userId: activeUserId,
      confidence,
      severity,
      urgency: advancedCare.urgency,
      urgencyScore: advancedCare.urgencyScore,
      symptoms: advancedCare.symptoms,
      redFlags: advancedCare.redFlags,
      reasons: advancedCare.reasons,
      clarificationPrompt: advancedCare.clarificationPrompt,
      medicationAdherence: advancedCare.medicationAdherence,
      distressScore: advancedCare.distressScore,
      baselineFlags: advancedCare.baselineFlags,
      sbar: advancedCare.sbar,
      source: "web-demo",
      timestamp: Date.now()
    };

    stageVoiceEntry(logEntry);
  }

  // SOS Handler
  function triggerSOS(reason) {
    if (!sosBtn) return;
    sosBtn.textContent = getTranslation(activeUiLang, "sos.sending");
    setTimeout(() => {
      sosBtn.textContent = getTranslation(activeUiLang, "sos.sent");
      setTimeout(() => sosBtn.textContent = getTranslation(activeUiLang, "sos.button"), 3000);
    }, 1500);
  }
  if (sosBtn) {
    sosBtn.addEventListener("click", () => triggerSOS("Manual SOS"));
  }

  // Firestore Save (Placeholder logic)
  async function saveToFirestore(entry) {
    if (!window.db || !window.firebase) return;
    if (!window.auth || !window.auth.currentUser) return;

    try {
      const currentUser = window.auth.currentUser;
      const encryptedText = await encryptCloudLogText(entry.text, currentUser.uid);
      const docRef = await window.db.collection("logs").add({
        encryptedText,
        encryptionVersion: 1,
        category: entry.category,
        lang: entry.lang,
        latencyMs: entry.latencyMs,
        source: entry.source,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: currentUser.uid
      });
      console.log("Saved with ID:", docRef.id);
      if (memberLastSyncValue) memberLastSyncValue.textContent = new Date().toLocaleTimeString();
    } catch (error) {
      console.warn("Firestore save failed (expected in demo mode):", error);
    }
  }

  function exportEvidenceCsv() {
    const headers = ["timestamp", "userId", "lang", "category", "urgency", "urgencyScore", "distressScore", "medicationAdherence", "latencyMs", "reasons", "text"];
    const rows = localLogs.map((item) => {
      const isoTime = new Date(item.timestamp).toISOString();
      const escapedText = String(item.text || "").replace(/"/g, '""');
      const escapedReasons = (Array.isArray(item.reasons) ? item.reasons.join("; ") : "").replace(/"/g, '""');
      return [isoTime, item.userId, item.lang, item.category, item.urgency || "green", item.urgencyScore || 0, item.distressScore || 0, item.medicationAdherence || "unknown", item.latencyMs, `"${escapedReasons}"`, `"${escapedText}"`].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carevoice-evidence-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    careReportExportCount += 1;
    localStorage.setItem("carevoice.reportExports.v1", String(careReportExportCount));
    refreshCareProductPanels();
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[<>&]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[char]));
  }

  function buildDoctorReportHtml() {
    const latest = localLogs.slice(-12);
    const rows = latest.map((item) => `<tr><td>${new Date(item.timestamp || Date.now()).toLocaleString()}</td><td>${String(item.urgency || "green").toUpperCase()}</td><td>${escapeHtml(item.category || "general")}</td><td>${escapeHtml(item.text || "")}</td><td>${escapeHtml(Array.isArray(item.reasons) ? item.reasons.join("; ") : "")}</td></tr>`).join("");
    const latestSbar = latest.length && latest[latest.length - 1].sbar ? latest[latest.length - 1].sbar : "No SBAR generated yet.";
    return `<!doctype html><html><head><meta charset="utf-8"><title>CareVoice Doctor Report</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#172033}table{border-collapse:collapse;width:100%;margin-top:16px}td,th{border:1px solid #d7deea;padding:8px;text-align:left;vertical-align:top}th{background:#eef6ff}.note{color:#5f6b7a}</style></head><body><h1>CareVoice Doctor Visit Report</h1><p class="note">Generated from voice check-ins. This report supports clinical review and is not a diagnosis.</p><h2>Latest SBAR</h2><pre>${escapeHtml(latestSbar)}</pre><h2>Recent Check-ins</h2><table><thead><tr><th>Time</th><th>Urgency</th><th>Category</th><th>Transcript</th><th>Reasons</th></tr></thead><tbody>${rows || "<tr><td colspan=\"5\">No logs yet.</td></tr>"}</tbody></table></body></html>`;
  }

  function exportDoctorReport() {
    const blob = new Blob([buildDoctorReportHtml()], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carevoice-doctor-report-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    careReportExportCount += 1;
    localStorage.setItem("carevoice.reportExports.v1", String(careReportExportCount));
    refreshCareProductPanels();
  }

  function getConsentState() {
    return {
      patientConfirmed: !!(consentPatientExportCheck && consentPatientExportCheck.checked),
      noRawAudio: !consentNoAudioCheck || consentNoAudioCheck.checked,
      redactionEnabled: !consentRedactionCheck || consentRedactionCheck.checked,
      confirmedBy: currentMemberProfile && currentMemberProfile.role ? currentMemberProfile.role : "carevoice-user",
      confirmedAt: new Date().toISOString()
    };
  }

  function requireExportConsent(exportLabel) {
    const consent = getConsentState();
    if (consent.patientConfirmed && consent.noRawAudio && consent.redactionEnabled) return true;
    if (consentStatusText) {
      consentStatusText.textContent = `${exportLabel} blocked: confirm patient/family consent, no raw audio, and PII redaction first.`;
    }
    if (judgeModeStatus) {
      judgeModeStatus.textContent = `${exportLabel} requires consent confirmation.`;
    }
    return false;
  }

  function refreshConsentStatus() {
    if (!consentStatusText) return;
    const consent = getConsentState();
    if (consent.patientConfirmed && consent.noRawAudio && consent.redactionEnabled) {
      consentStatusText.textContent = "Consent ready: FHIR/eHRSS exports may be generated for doctor or care-team review.";
    } else {
      consentStatusText.textContent = "FHIR/eHRSS exports require consent confirmation, no raw audio, and PII redaction.";
    }
    renderFhirMappingPreview();
  }

  function getPatientResource(patientId) {
    const profile = getFamilyRelayProfile ? getFamilyRelayProfile() : {};
    const displayName = profile.patientName || (currentMemberProfile && currentMemberProfile.displayName) || "CareVoice demo patient";
    const ageText = String(profile.patientAge || "").trim();
    return {
      resourceType: "Patient",
      id: patientId,
      name: [{ text: displayName }],
      extension: ageText ? [{ url: "https://carevoice.ai/fhir/StructureDefinition/reported-age", valueString: ageText }] : [],
      managingOrganization: { display: currentHospitalMembership && currentHospitalMembership.accountId ? "Verified hospital workspace" : "CareVoice local workspace" }
    };
  }

  function getFhirObservation(item, index, patientId) {
    return {
      resourceType: "Observation",
      id: `voice-observation-${item.timestamp || index}`,
      status: "preliminary",
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "survey", display: "Survey" }] }],
      code: { text: `CareVoice voice triage: ${item.category || "general"}` },
      subject: { reference: `Patient/${patientId}` },
      effectiveDateTime: new Date(item.timestamp || Date.now()).toISOString(),
      valueString: String(item.text || ""),
      note: [{ text: Array.isArray(item.reasons) ? item.reasons.join("; ") : "No AI reason recorded" }],
      component: [
        { code: { text: "urgency" }, valueString: String(item.urgency || "green") },
        { code: { text: "urgencyScore" }, valueInteger: Number(item.urgencyScore || 0) },
        { code: { text: "distressScore" }, valueInteger: Number(item.distressScore || 0) },
        { code: { text: "medicationAdherence" }, valueString: String(item.medicationAdherence || "unknown") },
        { code: { text: "PII redacted" }, valueBoolean: !!item.piiRedacted }
      ]
    };
  }

  function getMedicationStatement(item, index, patientId) {
    if (!item || item.medicationAdherence === "unknown" || item.category !== "medication") return null;
    return {
      resourceType: "MedicationStatement",
      id: `medication-statement-${item.timestamp || index}`,
      status: item.medicationAdherence === "missed" ? "not-taken" : "active",
      medicationCodeableConcept: { text: "Patient-reported medication check-in" },
      subject: { reference: `Patient/${patientId}` },
      effectiveDateTime: new Date(item.timestamp || Date.now()).toISOString(),
      statusReason: [{ text: `CareVoice adherence signal: ${item.medicationAdherence}` }],
      note: [{ text: String(item.text || "") }]
    };
  }

  function getCommunicationResource(item, index, patientId) {
    if (!item || !item.sbar) return null;
    return {
      resourceType: "Communication",
      id: `sbar-communication-${item.timestamp || index}`,
      status: "completed",
      subject: { reference: `Patient/${patientId}` },
      sent: new Date(item.timestamp || Date.now()).toISOString(),
      payload: [{ contentString: item.sbar }],
      note: [{ text: "SBAR generated from voice check-in for doctor/care-team review." }]
    };
  }

  function getCarePlanResource(latestLog, patientId) {
    return {
      resourceType: "CarePlan",
      id: `carevoice-care-plan-${patientId}`,
      status: "active",
      intent: "plan",
      subject: { reference: `Patient/${patientId}` },
      title: "CareVoice shared follow-up plan",
      description: latestLog ? getCareActionForLog(latestLog) : "No active triage action yet.",
      activity: latestLog ? [{ detail: { status: "scheduled", description: `${getCareActionForLog(latestLog)} ${latestLog.clarificationPrompt || ""}`.trim() } }] : []
    };
  }

  function getConsentResource(patientId, consent) {
    return {
      resourceType: "Consent",
      id: `carevoice-consent-${Date.now()}`,
      status: consent.patientConfirmed ? "active" : "draft",
      scope: { text: "Patient-authorized care coordination export" },
      category: [{ text: "CareVoice doctor visit / care team review" }],
      patient: { reference: `Patient/${patientId}` },
      dateTime: consent.confirmedAt,
      provision: { type: consent.patientConfirmed ? "permit" : "deny", purpose: [{ text: "care coordination" }] },
      note: [{ text: `No raw audio: ${consent.noRawAudio}. PII redaction: ${consent.redactionEnabled}. Confirmed by: ${consent.confirmedBy}.` }]
    };
  }

  function getAuditEventResource(patientId, exportType, recordCount) {
    return {
      resourceType: "AuditEvent",
      id: `carevoice-audit-${Date.now()}`,
      type: { text: `CareVoice ${exportType} prepared` },
      recorded: new Date().toISOString(),
      outcome: "0",
      agent: [{ who: { display: currentMemberProfile && currentMemberProfile.role ? currentMemberProfile.role : "CareVoice user" }, requestor: true }],
      source: { observer: { display: "CareVoice" } },
      entity: [{ what: { reference: `Patient/${patientId}` }, role: { text: "export" }, detail: [{ type: "recordCount", valueString: String(recordCount) }] }]
    };
  }

  function buildFhirBundle(exportType = "FHIR Bundle") {
    const patientId = `carevoice-${String(activeUserId || "local-demo").replace(/[^a-z0-9-]/gi, "-")}`;
    const consent = getConsentState();
    const latestLogs = localLogs.slice(-20);
    const latestLog = latestLogs[latestLogs.length - 1] || null;
    const resources = [
      getPatientResource(patientId),
      getConsentResource(patientId, consent),
      getCarePlanResource(latestLog, patientId)
    ];

    latestLogs.forEach((item, index) => {
      resources.push(getFhirObservation(item, index, patientId));
      const medication = getMedicationStatement(item, index, patientId);
      if (medication) resources.push(medication);
      const communication = getCommunicationResource(item, index, patientId);
      if (communication) resources.push(communication);
    });

    resources.push(getAuditEventResource(patientId, exportType, latestLogs.length));

    return {
      resourceType: "Bundle",
      type: "collection",
      timestamp: new Date().toISOString(),
      entry: resources.map((resource) => ({
        fullUrl: `urn:uuid:${resource.resourceType}-${resource.id || Math.random().toString(16).slice(2)}`,
        resource
      }))
    };
  }

  function addExportHistory(type, recordCount) {
    const item = {
      type,
      recordCount,
      timestamp: Date.now(),
      consentConfirmed: getConsentState().patientConfirmed
    };
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(exportHistoryKey) || "[]");
    } catch (err) {
      history = [];
    }
    history.unshift(item);
    localStorage.setItem(exportHistoryKey, JSON.stringify(history.slice(0, 20)));
    renderExportHistory();
  }

  function renderExportHistory() {
    if (!exportHistoryList) return;
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(exportHistoryKey) || "[]");
    } catch (err) {
      history = [];
    }
    exportHistoryList.innerHTML = "";
    if (!history.length) {
      const li = document.createElement("li");
      li.textContent = "No exports yet.";
      exportHistoryList.appendChild(li);
      return;
    }
    history.slice(0, 6).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${new Date(item.timestamp).toLocaleString()} - ${item.type} - ${item.recordCount} records - consent ${item.consentConfirmed ? "confirmed" : "missing"}`;
      exportHistoryList.appendChild(li);
    });
  }

  function renderFhirMappingPreview() {
    if (!fhirMappingPreview) return;
    const bundle = buildFhirBundle("preview");
    const counts = bundle.entry.reduce((acc, entry) => {
      const type = entry && entry.resource ? entry.resource.resourceType : "Unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    fhirMappingPreview.textContent = JSON.stringify({ resources: counts, fieldMap: {
      userId: "Patient.id / Observation.subject.reference",
      transcript: "Observation.valueString",
      urgency: "Observation.component[urgency]",
      medicationAdherence: "MedicationStatement.statusReason",
      sbar: "Communication.payload.contentString",
      carePlan: "CarePlan.activity.detail.description",
      consent: "Consent.provision",
      exportAudit: "AuditEvent"
    } }, null, 2);
  }

  function exportFhirBundle() {
    if (!requireExportConsent("FHIR export")) return;
    const bundle = buildFhirBundle("FHIR Bundle");
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/fhir+json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carevoice-fhir-bundle-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    careReportExportCount += 1;
    localStorage.setItem("carevoice.reportExports.v1", String(careReportExportCount));
    addExportHistory("FHIR Bundle", localLogs.length);
    refreshCareProductPanels();
  }

  function exportEhrssReadyPack() {
    if (!requireExportConsent("eHRSS-ready export")) return;
    const consent = getConsentState();
    const bundle = buildFhirBundle("eHRSS-ready pack");
    const pack = {
      exportType: "CareVoice eHRSS-ready simulation pack",
      generatedAt: new Date().toISOString(),
      consent: {
        status: consent.patientConfirmed ? "confirmed" : "missing",
        confirmedBy: consent.confirmedBy,
        confirmedAt: consent.confirmedAt,
        note: "Prototype pack only. Real eHRSS connection requires official approval, patient consent, and institutional integration."
      },
      privacy: {
        rawAudioStored: false,
        piiRedaction: "HKID, HK phone numbers, and email-like strings redacted before log storage/export",
        encryption: "Local sensitive logs use Web Crypto AES-GCM where supported"
      },
      fhirBundle: bundle,
      audit: localLogs.slice(-20).map((item) => ({
        timestamp: new Date(item.timestamp || Date.now()).toISOString(),
        action: "voice-triage-export-prepared",
        urgency: item.urgency || "green",
        category: item.category || "general"
      }))
    };
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carevoice-ehrss-ready-pack-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    careReportExportCount += 1;
    localStorage.setItem("carevoice.reportExports.v1", String(careReportExportCount));
    addExportHistory("eHRSS-ready Pack", localLogs.length);
    refreshCareProductPanels();
  }

  function exportMemberNotesCsv() {
    const headers = ["timestamp", "type", "text"];
    const rows = memberNotes.map((item) => {
      const isoTime = new Date(item.timestamp).toISOString();
      const escapedType = String(item.type || "").replace(/"/g, '""');
      const escapedText = String(item.text || "").replace(/"/g, '""');
      return [isoTime, `"${escapedType}"`, `"${escapedText}"`].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carevoice-member-notes-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copySessionBriefToClipboard() {
    const text = sessionBriefText ? String(sessionBriefText.textContent || "").trim() : "";
    if (!text) return;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        window.alert("Session brief copied.");
        return;
      }
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }

    window.prompt("Copy session brief:", text);
  }

  function clearMemberNotes() {
    const confirmed = window.confirm("Clear all member notes on this device?");
    if (!confirmed) return;
    memberNotes.length = 0;
    localStorage.removeItem(memberNotesKey);
    refreshMemberTools();
  }

  function formatJudgeModeTime(seconds) {
    const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function startJudgeMode() {
    if (!judgeModeStatus || !demoModeBtn) return;

    seedJudgeDemoEvidence();

    if (judgeModeTimer) {
      clearInterval(judgeModeTimer);
      judgeModeTimer = null;
      demoModeBtn.textContent = "Start 3-Min Judge Mode";
      judgeModeStatus.textContent = "Judge Mode stopped";
      return;
    }

    judgeModeRemaining = 180;
    demoModeBtn.textContent = "Stop Judge Mode";
    judgeModeStatus.textContent = `Judge Mode running - ${formatJudgeModeTime(judgeModeRemaining)} remaining`;

    judgeModeTimer = setInterval(() => {
      judgeModeRemaining -= 1;

      if (judgeModeRemaining === 120) {
        scenarioIndex = 1;
        renderDemoScenario(scenarioIndex);
      }

      if (judgeModeRemaining === 60) {
        scenarioIndex = 2;
        renderDemoScenario(scenarioIndex);
      }

      if (judgeModeRemaining <= 0) {
        clearInterval(judgeModeTimer);
        judgeModeTimer = null;
        demoModeBtn.textContent = "Start 3-Min Judge Mode";
        judgeModeStatus.textContent = "Judge Mode complete - move to Q&A now";
        return;
      }

      judgeModeStatus.textContent = `Judge Mode running - ${formatJudgeModeTime(judgeModeRemaining)} remaining`;
    }, 1000);
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportEvidenceCsv);
  }

  loadLiveMonitorUrlPreference();

  if (demoModeBtn) {
    demoModeBtn.addEventListener("click", startJudgeMode);
  }

  // Register Service Worker for PWA
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("✅ PWA ready"))
      .catch(err => console.warn("⚠️ SW registration failed", err));
  }
});
