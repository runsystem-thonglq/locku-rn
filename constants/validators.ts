/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
export const VALIDATION_MESSAGES = {
  REQUIRED: "${path} is required",
  MAX: "${path} is ${max} characters or less",
  MIN: "${path} is ${min} characters or more",
  INVALID_AT_LEAST: "Password must contain at least one letter and one number",
  INVALID_PASSWORD: "${path} must be a string of 6 to 72 characters",
  INVALID_PHONE: "${path} must be a valid phone number",
  INVALID_EMAIL: "${path} must be a valid email address",
  INVALID_BIRTHDAY: "${path} must be a valid date of birth",
  SAME_ID: "${path} must be different from the email address",
  DISABLE_REGISTER_UNDER_AGE: "${path} is ${age} years or older",
};
export const REGEXS = {
  PHONE: /^0([0-9]){9,10}$/,
  AT_LEAST: /(?=.*[a-zA-Z])(?=.*[0-9])/,
  PASSWORD: /^([a-zA-Z0-9`~!@#$%^&*()\-_+=\[\]{}:;'"\|<>,.?\/\\]{6,72})$/,
  EMAIL:
    /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  YOUTUBE:
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  TWITTER:
    /^https?:\/\/(mobile\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\?.*?)?$/,
  YOUTUBE_SHORT:
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/,
  SPACES: /(\r\n|\n|\r|\t)/gm,
  URL: /(http(s?)):\/\/[^\s]+/gi,
  INSTAGRAM:
    /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([^/?#&]+)).*/,
  CHARACTER_FULL_SIZE: /[Ａ-ｚァ-ヶぁ-ゞ一-龯０-９　]/g,
  STRIP_TAGS: /(<([^>]+)>)/gi,
  MOBILE_AGENTS:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  IOS: /iPad|iPhone|iPod/,
  IOS_VERSION: /CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i,
  ANDROID_VERSION: /Android\s([0-9\.]*)/i,
  ANDROID: /Android/,
  CHROME: /Chrome\/(\d+)\./,
  SAFARI: /Safari\/(\d+)\./,
  TIKTOK:
    /^https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/(\d+)?(\?[\w=&-amp;]+)?$/,
};
