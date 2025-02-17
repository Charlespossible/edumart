export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
  }

  export interface user {
    id: number;
    name: string;
    email: string;
    phone: string;
  }
 