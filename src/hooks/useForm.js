import { useState } from "react";

export const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const setData = (event) => {
    const { value, id } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return [formData, setData];
};
