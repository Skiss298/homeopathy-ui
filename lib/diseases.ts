export type DiseaseInfo = {
  slug: string;
  name: string;
  whatIs: string;
  symptoms: string[];
  causes: string[];
};

export const DISEASES: DiseaseInfo[] = [
  {
    slug: "allergies",
    name: "Allergies",
    whatIs:
      "Allergies are immune system reactions to substances like dust, pollen, foods, or pet dander that are usually harmless to others.",
    symptoms: [
      "Sneezing and runny nose",
      "Itchy or watery eyes",
      "Skin rashes or itching",
      "Breathing discomfort in some cases",
    ],
    causes: [
      "Family history of allergies",
      "Exposure to allergens (dust, pollen, mold, pet dander)",
      "Environmental pollution or seasonal triggers",
      "Immune system hypersensitivity",
    ],
  },
  {
    slug: "skin-problems",
    name: "Skin Problems",
    whatIs:
      "Skin problems include recurring issues such as eczema, acne, fungal infections, urticaria, and dry or inflamed skin.",
    symptoms: [
      "Itching, redness, or irritation",
      "Rashes, bumps, or patches",
      "Dry, flaky, or cracked skin",
      "Burning sensation or skin sensitivity",
    ],
    causes: [
      "Allergic tendency or immune imbalance",
      "Hormonal changes",
      "Poor skincare habits or cosmetic irritation",
      "Dietary and lifestyle triggers",
    ],
  },
  {
    slug: "asthma",
    name: "Asthma",
    whatIs:
      "Asthma is a chronic condition where the airways become inflamed and narrow, making breathing difficult at times.",
    symptoms: [
      "Wheezing sound while breathing",
      "Shortness of breath",
      "Chest tightness",
      "Night-time or early-morning cough",
    ],
    causes: [
      "Genetic predisposition",
      "Respiratory infections",
      "Dust, smoke, cold air, or pollen exposure",
      "Exercise or stress triggers",
    ],
  },
  {
    slug: "diabetes-support",
    name: "Diabetes Support",
    whatIs:
      "Diabetes is a metabolic condition in which blood sugar levels remain high due to issues with insulin production or insulin response.",
    symptoms: [
      "Increased thirst and frequent urination",
      "Unexplained tiredness",
      "Slow wound healing",
      "Frequent infections or blurred vision",
    ],
    causes: [
      "Family history",
      "Insulin resistance",
      "Sedentary lifestyle and weight gain",
      "Diet high in refined sugars and processed foods",
    ],
  },
  {
    slug: "migraine",
    name: "Migraine",
    whatIs:
      "Migraine is a neurological headache disorder that can cause repeated severe headaches with associated symptoms.",
    symptoms: [
      "Throbbing headache, often one-sided",
      "Nausea or vomiting",
      "Sensitivity to light and sound",
      "Visual aura in some patients",
    ],
    causes: [
      "Stress and sleep disturbance",
      "Hormonal fluctuations",
      "Specific food triggers",
      "Family history and nervous system sensitivity",
    ],
  },
  {
    slug: "kidney-stones",
    name: "Kidney Stones",
    whatIs:
      "Kidney stones are hard mineral deposits formed in the urinary tract, often causing intense pain while passing urine.",
    symptoms: [
      "Severe side or lower back pain",
      "Painful urination",
      "Frequent urge to urinate",
      "Blood in urine in some cases",
    ],
    causes: [
      "Low water intake",
      "High salt or high oxalate diet",
      "Urinary tract infections",
      "Family tendency to stone formation",
    ],
  },
  {
    slug: "thyroid-disorders",
    name: "Thyroid Disorders",
    whatIs:
      "Thyroid disorders involve overactive or underactive thyroid function, affecting metabolism, energy, and hormonal balance.",
    symptoms: [
      "Fatigue and weight fluctuations",
      "Hair fall or dry skin",
      "Mood changes and poor concentration",
      "Irregular menstrual cycles",
    ],
    causes: [
      "Autoimmune conditions",
      "Iodine imbalance",
      "Genetic factors",
      "Hormonal changes",
    ],
  },
  {
    slug: "pcos",
    name: "PCOS",
    whatIs:
      "PCOS (Polycystic Ovary Syndrome) is a hormonal condition in women that can affect periods, fertility, skin, and weight.",
    symptoms: [
      "Irregular periods",
      "Acne and excess facial/body hair",
      "Weight gain or difficulty losing weight",
      "Hair thinning and mood swings",
    ],
    causes: [
      "Hormonal imbalance",
      "Insulin resistance",
      "Genetic predisposition",
      "Lifestyle factors",
    ],
  },
  {
    slug: "arthritis-joint-pain",
    name: "Arthritis & Joint Pain",
    whatIs:
      "Arthritis is inflammation of joints that causes pain, stiffness, and reduced mobility over time.",
    symptoms: [
      "Joint pain and swelling",
      "Morning stiffness",
      "Reduced range of movement",
      "Pain that worsens with activity",
    ],
    causes: [
      "Age-related joint wear and tear",
      "Autoimmune inflammation",
      "Previous injury",
      "Family history",
    ],
  },
  {
    slug: "sinusitis",
    name: "Sinusitis",
    whatIs:
      "Sinusitis is inflammation of sinus passages, often after allergies, cold, or infection, causing blocked nose and facial pressure.",
    symptoms: [
      "Nasal congestion",
      "Facial pain or heaviness",
      "Post-nasal drip",
      "Headache and reduced smell",
    ],
    causes: [
      "Recurring upper respiratory infections",
      "Allergic rhinitis",
      "Pollution and dust exposure",
      "Structural nasal issues",
    ],
  },
];

export const DISEASE_BY_SLUG: Record<string, DiseaseInfo> = Object.fromEntries(
  DISEASES.map((disease) => [disease.slug, disease])
);
