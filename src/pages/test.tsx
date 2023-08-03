import { UserInformation } from '../api/UserInformation';
import { UserCreate } from '../api/UserCreate';
import { UserLogin } from '../api/UserLogin';
import { UserLogout } from '../api/UserLogout';
import { UserAuthentication } from '../api/UserAuthentication';
import { UserEmailVerification } from '../api/UserEmailVerification';
import { UserPasswordReset } from '../api/UserPasswordReset';
import { UserLoginGoogle } from '../api/UserLoginGoogle';

export default function Produto() {
  return (
    <>
      <UserInformation />
      <UserCreate />
      <UserLogin />
      <UserLogout />
      <UserAuthentication />
      <UserEmailVerification />
      <UserPasswordReset />
      <UserLoginGoogle />
    </>
  );
}
