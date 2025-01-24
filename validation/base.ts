/* eslint-disable @typescript-eslint/no-explicit-any */
import { REGEXS, VALIDATION_MESSAGES } from "@/constants/validators";
import * as yup from "yup";
const defaultMessage = {
  mixed: {
    required: VALIDATION_MESSAGES.REQUIRED,
  },
  string: {
    min: VALIDATION_MESSAGES.MIN,
    max: VALIDATION_MESSAGES.MAX,
    email: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
};
function isValidPassword(this: any) {
  return this.matches(REGEXS.PASSWORD, VALIDATION_MESSAGES.INVALID_PASSWORD);
}
function isAtLeast(this: any) {
  return this.matches(REGEXS.AT_LEAST, VALIDATION_MESSAGES.INVALID_AT_LEAST);
}
function isValidEmail(this: any) {
  return this.matches(REGEXS.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL);
}
function isSameId(this: any) {
  return this.test({
    name: "sameId",
    message: VALIDATION_MESSAGES.SAME_ID,
    test: function () {
      const email = this.parent?.email;
      if (!email) {
        return true;
      }
      const password = this.parent?.password;
      const emailParts = email.split("@");
      return !emailParts.some((part: string) => {
        return password.includes(part);
      });
    },
  });
}

yup.addMethod(yup.string, "password", isValidPassword);
yup.addMethod(yup.string, "email", isValidEmail);
yup.addMethod(yup.string, "sameId", isSameId);
yup.addMethod(yup.string, "atLeast", isAtLeast);
yup.setLocale(defaultMessage);
export default yup;
