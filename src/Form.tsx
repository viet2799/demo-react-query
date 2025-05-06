// src/components/UserForm.tsx
import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form, Input, Button, message } from "antd";

interface UserFormValues {
  name: string;
  email: string;
}

interface UserFormProps {
  onSubmit: SubmitHandler<UserFormValues>;
  initialValues?: UserFormValues;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialValues = { name: "", email: "" },
}) => {
  const { control, handleSubmit, reset } = useForm<UserFormValues>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit(data);
    reset();
    message.success("Thao tác thành công!");
  };

  useEffect(() => {
    reset(initialValues);
  }, [JSON.stringify(initialValues), reset]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <Form.Item label="Họ và tên" name="name">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} />
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} />
            </>
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Lưu
      </Button>
    </Form>
  );
};

export default UserForm;
