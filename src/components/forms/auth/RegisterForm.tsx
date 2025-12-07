import { Form, Button } from 'antd';
import FormInput from '../../inputs/FormInput';
import { InputType } from '@/app/enums/input-type.enum';

interface RegisterFormProps {
  onFinish: (values: IUserAuth & { confirm: string }) => void;
}

const RegisterForm = ({ onFinish }: RegisterFormProps) => {
  return (
    <Form onFinish={onFinish} layout="vertical">
      <FormInput
        label="Email"
        name="email"
        type={InputType.EMAIL}
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
      />
      <FormInput
        label="Password"
        name="password"
        type={InputType.PASSWORD}
        rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}
      />
      <FormInput
        label="Confirm Password"
        name="confirm"
        type={InputType.PASSWORD}
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match'));
            },
          }),
        ]}
      />
      <Button type="primary" htmlType="submit">Register</Button>
    </Form>
  );
};

export default RegisterForm;