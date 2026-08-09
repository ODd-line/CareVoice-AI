# iENA 2026 Peer Reviews

## 1. Ready to Cook

### Strengths of the Proposal

The proposal addresses a recognizable problem: time-constrained workers may lack the capacity to prepare nutritionally balanced meals after work. Combining protein, carbohydrates, and vegetables in a convenient three-course package could offer practical value, while the intention to use environmentally responsible packaging adds a sustainability dimension. The concept is also feasible to prototype because a sample meal, package, preparation method, and user survey can be produced without specialized engineering equipment.

### Direct Critical Assessment

At present, “Ready to Cook” describes a supermarket ready meal, not a new invention. Protein, carbohydrates, vegetables, and convenient packaging are standard product attributes already offered by countless frozen meals, chilled meal boxes, and meal-kit services. The proposal does not state what users actually receive, how it is cooked, how long it lasts, why three courses are advantageous, or what mechanism makes it meaningfully different from existing products. Calling the packaging environmentally friendly without naming the material, manufacturing impact, or disposal route is an unsupported marketing claim. More seriously, a food proposal that omits refrigeration, shelf life, allergens, contamination control, reheating temperature, and nutritional evidence has skipped the difficult part of making the product safe. Several form sections are incomplete, so even the claimed innovation cannot currently be assessed.

### Recommended Next Step

Develop one meal prototype and compare it with a supermarket ready meal using preparation time, cost, nutritional composition, taste, packaging mass, and user satisfaction. This would convert a broad food concept into a testable product proposition.

---

## 2. STEELSHADER

### Strengths of the Proposal

STEELSHADER targets occupational heat exposure among steel fixers, a significant safety issue in Hong Kong’s construction environment. The proposal demonstrates strong systems thinking by combining deployable shade, remote positioning, solar power, a storage station, and construction-site logistics. Its focus on supporting workers rather than replacing them is socially responsible, and the visual diagram communicates the intended deployment scenario effectively. The concept could potentially reduce radiant heat exposure, fatigue, heat stress, and interruption to construction work.

### Direct Critical Assessment

The principal concern is physical and operational feasibility. Consider an illustrative 10 m × 10 m canopy. At a modest wind speed of 10 m/s, the standard dynamic-pressure approximation, $q = 0.613v^2$, gives 61.3 Pa. If only the projected canopy area is used, the resulting force is approximately $F = qA = 6.13$ kN, equivalent to the weight of about 625 kg before applying aerodynamic coefficients, gust factors, or a safety factor. At 15 m/s, this rises to 13.8 kN, or roughly 1.4 tonnes-force. Real tethers and anchor points would need to survive substantially higher design loads, while a changing canopy angle could generate lift, oscillation, or collapse.

Buoyancy presents a second hard constraint. Helium provides only about 1.0 kg of net lift per cubic metre under ideal conditions. Lifting a 100 kg assembly would therefore require at least 100 m³ of helium before accounting for balloon envelopes and rigging, approximately a 5.8 m diameter sphere. If four drones instead shared a 100 kg payload, each would need to sustain roughly 25 kg plus rigging while resisting canopy-induced lateral loads; this is outside ordinary small-drone operation and creates serious rotor, battery, redundancy, and regulatory hazards above workers. A black 100 m² membrane absorbing even 700 W/m² would receive about 70 kW of solar heat, directly contradicting the thermal objective unless the outer surface is highly reflective.

These estimates make the proposed drone-and-balloon architecture operationally implausible without major redesign. The product tries to suspend an enormous sail beside a tower crane, precisely where wind loading, cable entanglement, rotor failure, dropped components, and restricted visibility are most dangerous. The drawing does not show credible anchors, load paths, gust response, emergency descent, crane clearance, or what happens when one drone fails. The black membrane also undermines the product’s purpose by maximizing solar absorption. Machine learning is presented as though it could make the system safe, but it cannot cancel wind force, increase helium lift, extend battery endurance, or guarantee separation from crane operations. In three months, the team could integrate a pretrained detector such as YOLO, DETR, or Deformable DETR into a demonstration, but it could not collect and validate enough construction-site footage to entrust worker safety to that model. Random Forest or Extra Trees could classify structured telemetry, but neither fixes the unsolved mechanical architecture. The proposal currently adds AI and drones to a problem that a fixed or retractable reflective canopy solves more safely and cheaply.

### Recommended Next Step

Abandon drone deployment for the three-month prototype and begin with a small, ground-anchored retractable canopy. Test reflective and dark membranes under the same lamp or sunlight, measuring temperature beneath each material. Then measure canopy force with a load cell at several fan speeds and compare the result with the $v^2$ wind-load relationship. A credible continuation decision should require a defined temperature reduction, anchor safety factor, maximum operating wind speed, redundant retraction mechanism, and exclusion zone. If these basic tests fail, the airborne architecture should be classified as unfeasible rather than supplemented with machine learning.

---

## 3. Automatic Fall-Detection Pendant

### Strengths of the Proposal

The pendant responds to a clearly articulated safety need: an older adult who falls may be unconscious, disoriented, physically unable to reach a phone, or unfamiliar with smartphone interfaces. Automatic fall detection combined with a 60-second cancellation period is a sensible human-in-the-loop design because it permits intervention while reducing unnecessary alerts. The pendant form is familiar, portable, and more accessible than a complex mobile application. The proposed materials are affordable, making a functional prototype achievable within the development period.

### Direct Critical Assessment

The proposal treats “detect motion” and “detect a dangerous fall” as if they were the same problem. They are not. Sitting abruptly, dropping the pendant, lying down, bending, or exercising can all produce fall-like signals, while a slow collapse may produce no obvious impact. The proposed 60-second cancellation timer does not solve false detection if the pendant itself is dropped in another room, and it may delay help when a genuine user is unconscious. The diagram also jumps directly from sensing to contacting family or paramedics without specifying Bluetooth, Wi-Fi, cellular service, a paired phone, subscription costs, indoor coverage, or what happens during network failure. A device advertised for emergencies but lacking a manual SOS control, battery warning, waterproofing, and staged escalation is not yet dependable. Random Forest, Extra Trees, or XGBoost could classify engineered accelerometer features in a prototype, but a small dataset of classmates pretending to fall would not prove reliability for elderly users with different movement patterns.

### Recommended Next Step

Create a prototype using an accelerometer-enabled microcontroller and test it against a labelled dataset of falls and ordinary activities. Report sensitivity, false-alarm rate, alert latency, and battery life. Use a staged workflow: audible warning, cancel button, caregiver notification, then emergency escalation according to an approved protocol.

---

## 4. Wall-Cleaning Robot

### Strengths of the Proposal

The proposal addresses a genuine domestic safety problem: cleaning high walls and ceilings may require ladders, while mould, dust, and insects often accumulate in inaccessible areas. A robot capable of adhering to both vertical and inverted surfaces could reduce fall risk and repetitive manual work. The combination of suction, movable cleaning modules, orbital vibration, replaceable cloths, and debris filtration shows an attempt to integrate locomotion and cleaning into one physical system. The hand-drawn views also help communicate the mechanical concept.

### Direct Critical Assessment

The proposal assumes suction will work on the exact surfaces most likely to need cleaning: dusty, porous, cracked, textured, or damp walls. Those are also the surfaces least able to maintain a vacuum seal. For a 3 kg robot with a safety factor of 3, the system must sustain at least 88 N before vibration and movement are considered. Even if 20 kPa pressure differential were achieved, the theoretical sealed area is about 0.0044 m²; leakage can destroy that holding force almost immediately. On a ceiling, one failed seal turns the cleaning product into a falling object. The design does not show independent suction chambers, pressure monitoring, a safety tether, edge detection, controlled descent, or a credible wall-to-ceiling transition. The cleaning claim is equally weak: vibrating mould with a cloth may disperse spores through the room, and wiping does not address the moisture source that caused the mould. Before discussing autonomous navigation or stain-recognition models, the team must prove the robot can remain attached without damaging paint or endangering people below.

### Recommended Next Step

Narrow the first prototype to a tethered robot operating on a smooth vertical test board. Measure holding force, payload capacity, cleaning coverage, noise, energy consumption, and performance on several surface finishes. Once stable adhesion is demonstrated, add edge sensors and debris extraction before attempting ceiling operation.

---

## 5. Silver Care

### Strengths of the Proposal

Silver Care presents a well-defined accessibility problem supported by demographic context and competitor analysis. The smart drug-bag scanning feature is particularly relevant in Hong Kong, where medicine labels and schedules may be difficult for older adults to interpret. The proposed fallback procedure—reading recognized information aloud and requesting confirmation before saving—is a strong example of error-aware interaction design. Voice guidance, reminders, family connection, and accessible health management could improve autonomy while reducing caregiver workload.

### Direct Critical Assessment

Silver Care is not one product so much as an entire digital-health company compressed into one student timeline. It promises medication scanning, AI consultation, appointment support, exercise monitoring, reminders, family communication, IoT integration, and health-record storage without identifying which function is the actual invention. The drug-bag scanner is the strongest idea, but it is also the most dangerous claim: one OCR error in a drug name, dose, frequency, or patient identity could create a harmful reminder. Reading the result aloud does not make it correct. Models such as TrOCR, LayoutLMv3, or Donut could generate a convincing demonstration, but three months is not enough to validate them across multilingual labels, handwriting, glare, folds, low-resolution photographs, and pharmacy-specific layouts. The “AI Health Consultation” claim is even less defensible because no model can safely diagnose from unrestricted user conversation without clinical governance and escalation rules. The proposal also asks families to access sensitive records without defining consent, permissions, encryption, or what happens after access should be revoked. Its current breadth makes nearly every feature superficial.

### Recommended Next Step

Prioritize one end-to-end workflow: scan a Hong Kong medicine bag, highlight uncertain fields, confirm the schedule, deliver a bilingual voice reminder, and notify an approved caregiver only when necessary. Evaluate character-level accuracy, field-level accuracy, correction rate, completion time, and usability with simulated labels before expanding into broader health functions.

### Deployed Prototype Review

The deployed Silver Care website is a polished mobile-app-style prototype, but it does not yet demonstrate a functioning medical system. Public inspection of the interface and client-side JavaScript confirms that its most important workflows are staged. The sign-in screen accepts any phone number with the public hard-coded code `123456`; no SMS is sent and no server-side identity check is performed. Uploading any image always produces the same Atorvastatin result after a timer, so the prototype does not inspect the image or perform OCR. The medicine box reports that compartment 5 has detected medicine after a 1.5-second timeout rather than receiving a hardware or sensor event. Medicine-taking state exists only in the page DOM and is neither durable nor auditable.

The health assistant uses browser speech recognition and speech synthesis, but its replies are deterministic keyword branches rather than an AI consultation. The walking feature is a timer with a fixed step count rather than sensor or health-platform integration. Family call and message buttons only display confirmation toasts. Most seriously, the emergency control finishes with a `Demo: calling emergency services` message and does not place a telephone call or notify a caregiver. These simulations are acceptable in a clearly labelled interface demonstration, but they must not be presented as operational safety features. A user could otherwise believe that medicine was recognized, hardware responded, or emergency help was requested when none of those events occurred.

### Comparable Products

Silver Care overlaps with several established product categories. Hero and MedMinder combine connected medicine dispensers with scheduled dispensing, adherence tracking, caregiver controls, and mobile applications. EllieGrid provides a Bluetooth pill box with alarms, light-guided compartments, sensor-based adherence reports, and caregiver notifications. Medisafe provides mature medication reminders, adherence support, and caregiver engagement without requiring a dispenser. Silver Care's most defensible distinction is not the general combination of reminders, family support, and a smart box; it is the proposed bilingual recognition of Hong Kong Hospital Authority and pharmacy medicine bags for older adults. That distinction will only be credible when the team demonstrates real field extraction, uncertainty handling, correction, and verified hardware acknowledgement.

### Security, Privacy, and Safety Findings

The site uses HTTPS and HSTS, and no exposed production secret or service-account credential was found in the inspected public code. Uploaded medicine images remain local to the browser in the current prototype, and dynamic assistant messages are inserted with safe text DOM APIs rather than obvious `innerHTML` rendering. These are positive implementation choices.

However, the hard-coded OTP is not authentication and cannot protect health information. The prototype has no demonstrated server-authoritative account, authorization boundary, database persistence, caregiver consent, access revocation, audit history, or medication-record integrity. No privacy policy, retention policy, account-deletion process, or health-data consent flow is visible. The deployed response includes HSTS but lacks observed Content Security Policy, Permissions Policy, Referrer Policy, MIME-sniffing protection, and clickjacking protection. Those missing headers are defence-in-depth weaknesses rather than proof of compromise, but they should be added before the site handles sensitive information.

The larger risk is product safety. A fixed medicine result can falsely imply successful recognition of a blank, unrelated, or wrong-patient image. There is no confidence score, uncertain-field highlighting, patient matching, allergy check, duplicate-medication warning, pharmacy verification, or mandatory human correction. The emergency and medicine-box controls likewise have no real acknowledgement, timeout, mismatch, escalation, or recovery path. These are not merely unfinished conveniences; they are the controls that determine whether the product's health claims are safe.

### App-Like Presentation Versus Application Capability

The prototype feels like a mobile app because it uses a narrow phone shell, simulated status bar, full-screen onboarding, fixed bottom tabs, large touch controls, camera input, hold gestures, modals, and hidden-panel navigation. It is nevertheless a single-page website served from Netlify: sections are shown and hidden inside one document, the URL does not change, and individual views cannot be bookmarked or shared. At a desktop width of 1440 pixels, the experience remains a 430-pixel phone column rather than adapting into a useful caregiver or clinical web layout.

It is also not currently an installable Progressive Web App. No web app manifest or service worker was found, so there is no install metadata, offline cache, or demonstrated background reminder support. It has no native Android or iOS package, push notifications, reliable background execution, Bluetooth box communication, health-platform connection, real telephone or messaging integration, or durable backend synchronization. The accurate description is therefore a mobile-app-style interactive website prototype, not a native app or complete PWA.

### Prototype Improvement Priorities

1. Narrow the MVP to medicine-bag scanning, confirmation, reminders, and one approved-caregiver escalation path.
2. Label all simulated actions persistently, especially OCR, box detection, AI advice, family contact, and emergency calling.
3. Implement field-level OCR confidence and require correction of uncertain patient, medicine, dose, frequency, and instruction fields.
4. Never load a compartment or schedule a reminder from unconfirmed extraction.
5. Replace the timer-based box sequence with a documented device protocol containing acknowledgement, timeout, mismatch, and reconnect states.
6. Add real authentication, scoped caregiver consent, access revocation, server-side audit events, and data-retention controls before storing health data.
7. Either implement a real, tested emergency path with clear delivery acknowledgement or remove the emergency claim.
8. Add a Content Security Policy and the missing browser hardening headers.
9. Measure character accuracy, field accuracy, correction rate, task completion, error rate, comprehension, and completion time with representative older users.

---

## 6. CareVoice Micro

### Strengths of the Proposal

CareVoice Micro translates an existing digital-health platform into a tangible accessibility device. Its strongest innovation is the integration of large tactile controls, multimodal feedback, NFC-based personalization, an inexpensive Android interface, and a Raspberry Pi local hub. This architecture could reduce dependence on complex touchscreen navigation and preserve essential ward functions during internet disruption. The proposal has a coherent labelled diagram, realistic components, clearly identified users, and a staged timeline. The combination of care communication and social activities also recognizes that well-being includes autonomy and social connection, not only clinical monitoring.

### Direct Critical Assessment

CareVoice Micro is the physical bedside controller with eight large healthcare keys, a rotary dial, joystick, NFC/QR profiles, RGB/sound/vibration feedback, Bluetooth/USB-C, an Android display, and a Raspberry Pi ward hub. That physical accessibility focus is its defensible distinction. The problem is that the proposal keeps attaching features until the controller begins to resemble an oversized macro keypad connected to several unfinished applications. Voice assistance, medication reminders, nurse requests, family calls, profiles, local networking, and multiplayer games each require a complete workflow, yet the proposal does not prove that any one workflow is safer or easier than an existing nurse-call button or tablet interface. NFC personalization sounds convenient until a card is lost, the wrong profile is loaded, or the previous patient’s information remains visible. Medication and nurse controls are meaningless without acknowledgement, escalation, audit history, timeout behavior, and recovery after network or power failure. The joystick and games may support social engagement, but they also weaken the clinical focus unless user evidence shows that they improve adoption. CareVoice Micro does not need custom machine learning in three months; using AI would distract from the harder and more relevant test: whether patients with visual, motor, hearing, or cognitive limitations can complete essential tasks more accurately than with existing controls.

### Recommended Next Step

Build an MVP with four controls: CareVoice, medication, family, and nurse request. Demonstrate one complete workflow in which an NFC card loads an accessibility profile, a verified reminder appears, the patient responds physically, and the result reaches a local staff dashboard. Evaluate task-completion rate, error rate, response time, user comprehension, network recovery, and cleaning durability before adding games or further controls.

---

## Cross-Project Observation

The shared weakness is not a shortage of features; it is the failure to test the claim most likely to make each product collapse. Ready to Cook must prove novelty and food safety. STEELSHADER must survive wind and construction-site constraints. The pendant must distinguish genuine falls and deliver an alert through a specified network. The wall robot must remain attached to imperfect surfaces. Silver Care must prevent unsafe medication extraction and unjustified clinical advice. CareVoice Micro must demonstrate a measurable accessibility advantage over existing controls. Until those claims are tested, additional apps, drones, games, or AI terminology only enlarge the proposals without strengthening them.