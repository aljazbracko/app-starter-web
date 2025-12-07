import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../api/user.ts/user';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: IUserAuth) => loginUser(data),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (data: IUserAuth) => registerUser(data),
  });
}
