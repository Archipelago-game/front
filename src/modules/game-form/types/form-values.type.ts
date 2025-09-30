export interface FormValues {
  name: string;
  age: number;
  homeland: string;
  languages: string;
  luck: number;
  experience: {
    total: number;
    used: number;
  };
}
