import { Form, Button } from 'antd';
import FormInput from '../../inputs/FormInput';
import { InputType } from '@/app/enums/input-type.enum';

interface LoginFormProps {
  onFinish: (values: IUserAuth) => void;
}

const LoginForm = ({ onFinish }: LoginFormProps) => {
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
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;