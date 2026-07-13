document.addEventListener("DOMContentLoaded", () => {
  const materialButtons = document.querySelectorAll(".material-btn");
  const copySourcesBtn = document.getElementById("copySourcesBtn");
  const packStatus = document.getElementById("packStatus");

  const sourceList = [
    "World Bank SP.POP.65UP.TO.ZS: https://api.worldbank.org/v2/country/HKG/indicator/SP.POP.65UP.TO.ZS?format=json",
    "World Bank IT.NET.USER.ZS: https://api.worldbank.org/v2/country/HKG/indicator/IT.NET.USER.ZS?format=json",
    "World Bank SP.DYN.LE00.IN: https://api.worldbank.org/v2/country/HKG/indicator/SP.DYN.LE00.IN?format=json",
    "World Bank SP.POP.DPND.OL: https://api.worldbank.org/v2/country/HKG/indicator/SP.POP.DPND.OL?format=json",
    "World Bank indicator page (HK 65+): https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS?locations=HK",
    "Hong Kong C&SD Table 110-01001: https://www.censtatd.gov.hk/en/web_table.html?id=1A",
    "Hong Kong C&SD Population Estimates: https://www.censtatd.gov.hk/en/scode150.html",
    "Hong Kong Hospital Authority Portal: https://www.ha.org.hk/visitor/ha_visitor_index.asp?Lang=ENG",
    "WHO Global Health Observatory: https://www.who.int/data/gho",
    "OECD Health Statistics: https://www.oecd.org/en/data/datasets/oecd-health-statistics.html",
    "OECD Health at a Glance 2025: https://www.oecd.org/en/publications/health-at-a-glance-2025_8f9e3f98-en.html",
    "MIT AgeLab: https://agelab.mit.edu/",
    "Stanford Center on Longevity: https://longevity.stanford.edu/",
    "Stanford HAI policy note: https://hai.stanford.edu/news/universities-must-reclaim-ai-research-for-the-public-good"
  ];

  const packs = {
    onepager: {
      fileName: "carevoice-investor-one-pager.txt",
      body: [
        "CAREVOICE AI - INVESTOR ONE-PAGER",
        "",
        "1) Problem",
        "Hong Kong is aging rapidly and care coordination requires low-friction communication tools.",
        "",
        "2) Verified market signals",
        "- 65+ population share (HK): 17.2% in 2018 -> 22.7% in 2024 (World Bank SP.POP.65UP.TO.ZS)",
        "- Internet usage (HK): 90.5% in 2018 -> 95.8% in 2024 (World Bank IT.NET.USER.ZS)",
        "- Total population (HK): 7,510.8 thousand in 2024 (C&SD Table 110-01001)",
        "",
        "3) Product thesis",
        "Voice-first elderly care communication with AI-assisted triage and caregiver escalation.",
        "",
        "4) Next pilot metrics to collect (fillable)",
        "- 30-day retention: [fill pilot value]",
        "- Escalation precision: [fill pilot value]",
        "- Caregiver workflow time saved: [fill pilot value]",
        "",
        "5) Source links",
        ...sourceList
      ].join("\n")
    },
    kpi: {
      fileName: "carevoice-kpi-definition-sheet.txt",
      body: [
        "CAREVOICE AI - KPI DEFINITION SHEET",
        "",
        "KPI 1: Active elderly users",
        "Definition: unique elderly profiles with >=1 completed voice interaction in 30 days.",
        "",
        "KPI 2: Caregiver response lag",
        "Definition: median minutes between high-risk signal and caregiver acknowledgment.",
        "",
        "KPI 3: Escalation quality",
        "Definition: percentage of escalated cases judged appropriate by clinician or trained reviewer.",
        "",
        "KPI 4: Follow-up completion",
        "Definition: percentage of flagged cases with follow-up action recorded within SLA.",
        "",
        "Reference market context sources",
        ...sourceList
      ].join("\n")
    },
    risk: {
      fileName: "carevoice-risk-mitigation-register.txt",
      body: [
        "CAREVOICE AI - RISK & MITIGATION REGISTER",
        "",
        "R1 Clinical misuse risk",
        "Mitigation: explicit non-diagnostic messaging, assisted-not-automated decisions, escalation pathways.",
        "",
        "R2 Model confidence error",
        "Mitigation: confidence display, conservative thresholding, human review for high-risk categories.",
        "",
        "R3 Data governance",
        "Mitigation: user-scoped records, Firebase auth controls, audit logs, least-privilege policy.",
        "",
        "R4 Adoption friction in elderly users",
        "Mitigation: voice-first flow, bilingual prompts, larger UI controls, caregiver onboarding scripts.",
        "",
        "R5 Investor due diligence gap",
        "Mitigation: maintain source-backed evidence room and pilot KPI definitions before funding round.",
        "",
        "Reference source list",
        ...sourceList
      ].join("\n")
    },
    roadmap: {
      fileName: "carevoice-12-month-milestone-plan.txt",
      body: [
        "CAREVOICE AI - 12-MONTH MILESTONE PLAN",
        "",
        "Month 1-2",
        "- Finalize pilot protocol, governance checklist, and baseline KPI instrumentation.",
        "",
        "Month 3-4",
        "- Start NGO/clinic pilot cohort A, monitor engagement and triage signal quality.",
        "",
        "Month 5-6",
        "- Interim review: refine triage lexicon and escalation handoff process.",
        "",
        "Month 7-9",
        "- Expand cohort and run caregiver workflow efficiency study.",
        "",
        "Month 10-12",
        "- Produce investor pack: retention, escalation quality, workflow impact, and governance audit summary.",
        "",
        "Market rationale sources",
        ...sourceList
      ].join("\n")
    },
    reports: {
      fileName: "carevoice-legitimate-reports-index.txt",
      body: [
        "CAREVOICE AI - LEGITIMATE REPORTS INDEX",
        "",
        "A) Government / Official Hong Kong",
        "- C&SD Population Estimates: https://www.censtatd.gov.hk/en/scode150.html",
        "- C&SD Table 110-01001: https://www.censtatd.gov.hk/en/web_table.html?id=1A",
        "- Hospital Authority Portal: https://www.ha.org.hk/visitor/ha_visitor_index.asp?Lang=ENG",
        "",
        "B) Multilateral / International",
        "- World Bank SP.POP.65UP.TO.ZS API: https://api.worldbank.org/v2/country/HKG/indicator/SP.POP.65UP.TO.ZS?format=json",
        "- World Bank IT.NET.USER.ZS API: https://api.worldbank.org/v2/country/HKG/indicator/IT.NET.USER.ZS?format=json",
        "- World Bank SP.DYN.LE00.IN API: https://api.worldbank.org/v2/country/HKG/indicator/SP.DYN.LE00.IN?format=json",
        "- World Bank SP.POP.DPND.OL API: https://api.worldbank.org/v2/country/HKG/indicator/SP.POP.DPND.OL?format=json",
        "- WHO Global Health Observatory: https://www.who.int/data/gho",
        "- OECD Health Statistics: https://www.oecd.org/en/data/datasets/oecd-health-statistics.html",
        "- OECD Health at a Glance 2025: https://www.oecd.org/en/publications/health-at-a-glance-2025_8f9e3f98-en.html",
        "",
        "C) University / Policy",
        "- MIT AgeLab: https://agelab.mit.edu/",
        "- Stanford Center on Longevity: https://longevity.stanford.edu/",
        "- Stanford HAI Policy: https://hai.stanford.edu/news/universities-must-reclaim-ai-research-for-the-public-good",
        "",
        "D) Media / Expert",
        "- Stanford Longevity News: https://longevity.stanford.edu/longevity-news/",
        "- TechCrunch interview: https://techcrunch.com/2025/02/08/ai-pioneer-fei-fei-li-says-ai-policy-must-be-based-on-science-not-science-fiction/",
        "- TIME feature: https://time.com/7339693/fei-fei-li-ai/",
        "- Eric Topol: https://www.scripps.edu/faculty/topol/",
        "- Fei-Fei Li: https://hai.stanford.edu/people/fei-fei-li",
        "- Andrew Ng: https://www.andrewng.org/"
      ].join("\n")
    }
  };

  function setStatus(text) {
    if (packStatus) packStatus.textContent = text;
  }

  function downloadTextFile(fileName, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  materialButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-pack");
      const pack = packs[key];
      if (!pack) return;
      downloadTextFile(pack.fileName, pack.body);
      setStatus(`Downloaded ${pack.fileName}`);
    });
  });

  if (copySourcesBtn) {
    copySourcesBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(sourceList.join("\n"));
        setStatus("Source list copied to clipboard.");
      } catch (error) {
        setStatus("Clipboard access blocked. You can still copy sources from the page links.");
      }
    });
  }
});
