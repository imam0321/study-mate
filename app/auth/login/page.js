import LoginForm from "./_components/LoginForm/LoginForm";
import SocialLogins from "./_components/SocialLogins/SocialLogins";

export default function LoginPage() {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <LoginForm />
        <SocialLogins />
      </div>
    </div>
  );
}
