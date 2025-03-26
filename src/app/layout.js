import AuthForm from "../app/components/Form";
import "./globals.css";

export default function Layout({ children }) {
  return (
   
      <html>
      <body>
     
      <main>
        {children}
        <AuthForm action="signup" />
        <AuthForm action="login" />
      </main>
      </body>
      </html>
    
  );
}
