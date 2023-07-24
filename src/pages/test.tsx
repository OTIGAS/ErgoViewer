import { UserCreate } from '../api/UserCreate';
import { UserLogin } from '../api/UserLogin';
import { UserLogout } from '../api/UserLogout';
import { UserAuthentication } from '../api/UserAuthentication';
import { UserEmailVerification } from '../api/UserEmailVerification';
import { UserPasswordReset } from '../api/UserPasswordReset';

export default function Produto() {
  return (
    <>
      <UserCreate />
      <UserLogin />
      <UserLogout />
      <UserAuthentication />
      <UserEmailVerification />
      <UserPasswordReset />
    </>
  );
}
