import { InputType } from '@/app/enums/input-type.enum';
import { Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';

interface FormInputProps {
  label: string;
  name: string;
  type?: InputType;
  rules?: Rule[];
}

const FormInput = ({ label, name, type = InputType.TEXT, rules }: FormInputProps) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      {type === InputType.PASSWORD ? <Input.Password /> : <Input type={type} />}
    </Form.Item>
  );
};

export default FormInput;
