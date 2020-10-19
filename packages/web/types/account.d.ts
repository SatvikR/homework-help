export interface FormRes {
  refresh: string;
  access: Access;
  error?: string;
}

export interface Access {
  token: string;
  expires: string;
}
