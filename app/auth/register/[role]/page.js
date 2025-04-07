import SignupForm from "../_components/SignupForm/SignupForm";

export default function RegisterPage({params: {role}}) {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignupForm role={role} />
      </div>
    </div>
  );
}
