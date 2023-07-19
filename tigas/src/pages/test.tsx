import { UserCreate } from "../api/endpoints/UserCreate";
import { UserLogin } from "../api/endpoints/UserLogin";
import { UserLogout } from "../api/endpoints/UserLogout";
import { UserAuthentication } from "../api/endpoints/UserAuthentication";

export default function Produto() {


  return (
    <>
      <UserCreate />
      <UserLogin />
      <UserLogout />
      <UserAuthentication />
    </>
  );
}