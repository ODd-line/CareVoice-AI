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