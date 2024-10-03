'use client'

import { withReduxPage } from "@/app/hooks/ReduxPage";
import Login from "@/components/loginPage";

const LoginPage = () => {
  return <Login />;
};

export default withReduxPage()(LoginPage);
