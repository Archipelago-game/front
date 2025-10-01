export interface CheckBoxList {
  amount: number;
  list: {
    checked: boolean;
  }[];
}

export interface FormValues {
  name: string;
  age: number;
  homeland: string;
  languages: string;
  luck: CheckBoxList;
  experience: {
    total: number;
    used: number;
  };
}
