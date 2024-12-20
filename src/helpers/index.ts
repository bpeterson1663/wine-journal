import type { AuthError } from "firebase/auth";
import type { WineT } from "schemas/cellar";
import type { TastingT } from "schemas/tastings";
import { isTastingT } from "schemas/utils";
import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from "../components/form-tasting/form-tasting.constants";

export const getLabel = (type: "BODY" | "TANNIN" | "ACIDITY" | "ALCOHOL" | "SWEET", value: number) => {
  switch (type) {
    case "BODY": {
      const body = BODY_MARKS.find((mark) => mark.value === value);
      if (body) return body.label;
      break;
    }
    case "TANNIN":
    case "ACIDITY": {
      const tanninAcidity = TANNIN_ACIDITY_MARKS.find((mark) => mark.value === value);
      if (tanninAcidity) return tanninAcidity.label;
      break;
    }
    case "ALCOHOL": {
      const alcohol = ALCOHOL_MARKS.find((mark) => mark.value === value);
      if (alcohol) return alcohol.label;
      break;
    }
    case "SWEET": {
      const sweet = SWEET_MARKS.find((mark) => mark.value === value);
      if (sweet) return sweet.label;
      break;
    }
  }
};

export const uppercaseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateAuthErrorMessage = (err: AuthError): string => {
  const { code } = err;
  switch (code) {
    case "auth/wrong-password":
      return "The password you entered appears incorrect.";
    case "auth/user-not-found":
      return "Email address does not appear to be in use.";
    case "auth/email-already-in-use":
      return "Email address is already being used.";
    default:
      return "An error occurred";
  }
};

export function getWineImage(wine: WineT | TastingT) {
  if (isTastingT(wine)) {
    const { color } = wine;
    switch (color) {
      case "red":
        return require("images/wine/red-wine.jpeg");
      case "white":
        return require("images/wine/white-wine.jpeg");
      default:
        return require("images/wine/red-wine.jpeg");
    }
  }

  return require("images/wine/red-wine.jpeg");
}
