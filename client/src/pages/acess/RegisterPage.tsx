import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../component/Input"; // Ajusta la ruta según tu estructura de archivos
import { Button } from "../../component/Button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth.Context";
import { useEffect } from "react";
import { useError } from "../../context/error/useError.Context";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { errors: RegisterError } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/project");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    signup(data);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <section className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {RegisterError?.map((msg, index) => (
              <Alert key={index} variant="danger">
                {msg}
              </Alert>
            ))}
            {/* <Row className="mb-2"> */}
            <Form.Label className="invisible sr-only">
              Enter your username*:
            </Form.Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              minLength={8}
              maxLength={25}
              register={register}
            />
            {errors.username && (
              <Alert variant="danger"> {errors.username.message}</Alert>
            )}
            {/* </Row> */}
            {/* <Row className="mb-2"> */}
            <Form.Label className="invisible sr-only">
              Enter your email*:
            </Form.Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              register={register}
            />
            {errors.email && (
              <Alert variant="danger">{errors.email.message}</Alert>
            )}
            {/* </Row> */}
            {/* <Row className="mb-2"> */}
            <Form.Label className="invisible sr-only">
              Enter your password*:
            </Form.Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              maxLength={30}
              register={register}
            />
            {errors.password && (
              <Alert variant="danger">{errors.password.message}</Alert>
            )}
            {/* </Row> */}
            {/* <Row className="mb-2"> */}
            <Form.Label className="invisible sr-only">
              Confirm password*:
            </Form.Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="confirm your password"
              required
              minLength={6}
              maxLength={30}
              register={register}
            />
            {errors.confirmPassword && (
              <Alert variant="danger">{errors.confirmPassword.message}</Alert>
            )}
            {/* </Row> */}
            {/* <Row className="mb-3 d-flex justify-content-center"> */}
            <div className="container-button">
              <Button
                type="submit"
                value="Register"
                variant="outline-light"
                classname="col-lg-3 col-md-5 col-sm-7"
              />
            </div>
            {/* </Row> */}
            {/* <Row> */}
            <p className="text-access">
              Do you actually have an account? <Link to="/login">Log in</Link>
            </p>
            {/* </Row> */}
          </Form>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
