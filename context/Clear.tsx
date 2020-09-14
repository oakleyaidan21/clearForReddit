import { createContext } from "react";
import Snoowrap from "snoowrap";

interface ClearContextInferface {
  clear: { snoowrap: Snoowrap | null };
}

const ClearContext = createContext<ClearContextInferface>({
  clear: { snoowrap: null },
});

export default ClearContext;
