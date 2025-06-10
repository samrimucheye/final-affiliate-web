// hooks/useLinks.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AffiliateLink } from "@/services/affiliate-link";

export const useLinks = () => {
  return useQuery<AffiliateLink[]>({
    queryKey: ["links"],
    queryFn: async () => {
      const res = await axios.get("/api/affiliate-links");
      return res.data;
    },
  });
};
