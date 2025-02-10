export interface IREGISTER   {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    referer?: string; 
    otp?: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface RegistrationFormProps {
    onSubmit: (data: IREGISTER ) => void;
  }
  