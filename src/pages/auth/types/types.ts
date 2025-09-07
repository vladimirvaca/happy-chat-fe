export type LoginData = {
  email: string;
  password: string;
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginFormErrors = {
  email?: string
  password?: string
}

export type SignUpFormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormErrors = {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type LoginResponse = {
  accessToken: string;
};
