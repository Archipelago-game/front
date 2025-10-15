import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";

export default function AuthDonePage() {
  const redirectUrl =
    "https://api.backendless.com/921EA541-5840-4551-9113-0FD60D6B3802/E21FF1D5-DAE8-4ACE-B1DB-E86A67A23FDC/users/oauth/googleplus/authorize";

  const handleRedirect = () => {
    window.location.href = redirectUrl;
  };

  return (
    <CustomFormContextProvider>
      <div>
        <button onClick={handleRedirect}>Login</button>
      </div>
      <div>AUTH DONE</div>
    </CustomFormContextProvider>
  );
}
