export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
  }

  export interface user{
    id: string;
    email: string;
    name: string;
  }
  