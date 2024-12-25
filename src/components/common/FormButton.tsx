import { Button } from "@nextui-org/button";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const FormButton = ({ children, isLoading }: FormButtonProps) => {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      color="success"
      className="text-white font-titleFont"
    >
      {children}
    </Button>
  );
};

export default FormButton;
