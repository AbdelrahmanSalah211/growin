export const isEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const isLengthAtLeast = (value: string, length: number): boolean => {
  const re = new RegExp(`.{${length},}`);
  return re.test(value);
};

export const isLengthAtMost = (value: string, length: number): boolean => {
  const re = new RegExp(`.{0,${length}}`);
  return re.test(value);
};

export const hasUpperCase = (value: string): boolean => {
  const re = /[A-Z]/;
  return re.test(value);
};

export const hasLowerCase = (value: string): boolean => {
  const re = /[a-z]/;
  return re.test(value);
};

export const hasNumber = (value: string): boolean => {
  const re = /[0-9]/;
  return re.test(value);
};

export const hasSpecialChar = (value: string): boolean => {
  const re = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return re.test(value);
};

export const isInternationalName = (value: string): boolean => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;
  return re.test(value);
};

export const isUsername = (value: string): boolean => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 '-]+$/u;
  return re.test(value);
};


export const splitAtFirstUpperCase = (value: string): string[] => {
  const re = /(?=[A-Z])/;
  return value.split(re);
};
