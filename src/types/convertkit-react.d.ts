declare module 'convertkit-react' {
  interface ConvertKitFormProps {
    formId: number;
    template?: string;
    className?: string;
    newTab?: boolean;
    buttonBackground?: string;
    [key: string]: any;
  }

  const ConvertKitForm: React.FC<ConvertKitFormProps>;
  export default ConvertKitForm;
}