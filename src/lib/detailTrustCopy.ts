export type DetailTrustCopyCategory = "stay" | "experience" | "charter";

const DETAIL_TRUST_COPY = {
  default: "Inquiry only. AntiguaBella will review and follow up.",
  stay: "Inquiry only. Availability is confirmed after review.",
  experienceOrCharter:
    "Inquiry only. Availability and pricing are confirmed after review where relevant.",
} as const;

export const getDetailTrustCopy = (category: DetailTrustCopyCategory) => {
  if (category === "stay") return DETAIL_TRUST_COPY.stay;
  if (category === "experience" || category === "charter") {
    return DETAIL_TRUST_COPY.experienceOrCharter;
  }

  return DETAIL_TRUST_COPY.default;
};

